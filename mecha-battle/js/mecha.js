const PIXEL = 4;
const GROUND_Y = 400;
const MELEE_RANGE = 48;
const MOVE_SPEED = 180;
const JUMP_VELOCITY = -350;
const GRAVITY = 900;
const ATTACK_DAMAGE = 15;
const ATTACK_ACTIVE_FRAMES = 0.2;
const ATTACK_COOLDOWN = 0.5;
const HIT_STUN = 0.3;
const DEFENSE_DAMAGE_MULT = 0.4;
const KNOCKBACK = 120;
const MAX_HP = 100;
const MAX_ENERGY = 100;
const ENERGY_REGEN = 18;
const REMOTE_ENERGY_COST = 30;
const DASH_ENERGY_COST = 20;
const DASH_SPEED = 420;
const DASH_DURATION = 0.18;

class Mecha {
  constructor(x, colors, facing, name) {
    this.spawnX = x;
    this.x = x;
    this.y = GROUND_Y - 60;
    this.vx = 0;
    this.vy = 0;
    this.w = 32;
    this.h = 56;
    this.colors = colors;
    this.facing = facing;
    this.name = name;
    this.hp = MAX_HP;
    this.maxHp = MAX_HP;

    this.state = 'idle';
    this.animTimer = 0;
    this.animFrame = 0;
    this.idleBob = 0;

    this.attackTimer = 0;
    this.cooldownTimer = 0;
    this.hitStunTimer = 0;
    this.defendTimer = 0;
    this.attackHitRegistered = false;

    this.isGrounded = true;
    this.hitFlash = 0;

    this.energy = MAX_ENERGY;
    this.dashTimer = 0;
    this.remoteCdTimer = 0;
    this.remoteTriggered = false;
    this.dashTriggered = false;
  }

  get centerX() { return this.x + this.w / 2; }
  get centerY() { return this.y + this.h / 2; }
  get alive() { return this.hp > 0; }

  reset() {
    this.x = this.spawnX;
    this.y = GROUND_Y - 60;
    this.vx = 0;
    this.vy = 0;
    this.hp = MAX_HP;
    this.state = 'idle';
    this.animTimer = 0;
    this.animFrame = 0;
    this.attackTimer = 0;
    this.cooldownTimer = 0;
    this.hitStunTimer = 0;
    this.defendTimer = 0;
    this.attackHitRegistered = false;
    this.isGrounded = true;
    this.hitFlash = 0;
    this.idleBob = 0;
    this.energy = MAX_ENERGY;
    this.dashTimer = 0;
    this.remoteCdTimer = 0;
    this.remoteTriggered = false;
    this.dashTriggered = false;
  }

  getAttackHitbox() {
    if (this.attackTimer <= 0 || this.attackTimer > ATTACK_ACTIVE_FRAMES) return null;
    return {
      x: this.facing === 1 ? this.x + this.w : this.x - MELEE_RANGE,
      y: this.y,
      w: MELEE_RANGE,
      h: this.h * 0.7
    };
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }

  takeDamage(amount, attackerX) {
    const isDefending = this.state === 'defend';
    const finalDmg = isDefending ? Math.round(amount * DEFENSE_DAMAGE_MULT) : amount;
    this.hp = Math.max(0, this.hp - finalDmg);
    this.hitFlash = 0.15;
    const knockDir = this.centerX < attackerX ? -1 : 1;
    if (!isDefending) {
      this.state = 'hit';
      this.hitStunTimer = HIT_STUN;
      this.vx = KNOCKBACK * knockDir;
    } else {
      this.vx = KNOCKBACK * knockDir * 0.3;
    }
    return finalDmg;
  }

  update(dt, input) {
    if (!this.alive) return;

    this.hitFlash = Math.max(0, this.hitFlash - dt);
    this.cooldownTimer = Math.max(0, this.cooldownTimer - dt);
    this.idleBob += dt * 3;
    this.energy = Math.min(MAX_ENERGY, this.energy + ENERGY_REGEN * dt);
    this.remoteCdTimer = Math.max(0, this.remoteCdTimer - dt);

    this.dashTimer = Math.max(0, this.dashTimer - dt);

    if (this.hitStunTimer > 0) {
      this.hitStunTimer -= dt;
      if (this.hitStunTimer <= 0) {
        this.state = 'idle';
        this.hitStunTimer = 0;
      }
    }

    if (this.attackTimer > 0) {
      this.attackTimer -= dt;
      if (this.attackTimer <= 0) {
        this.attackTimer = 0;
        this.cooldownTimer = ATTACK_COOLDOWN;
        this.attackHitRegistered = false;
        if (this.state === 'attack') this.state = 'idle';
      }
    }

    if (this.state === 'hit') {
      this.x += this.vx * dt;
      this.applyGravity(dt);
      this.clampPosition();
      this.animTimer += dt;
      return;
    }

    if (this.state === 'attack') {
      this.applyGravity(dt);
      this.clampPosition();
      return;
    }

    if (this.dashTimer > 0) {
      this.x += this.vx * dt;
      this.applyGravity(dt);
      this.clampPosition();
      return;
    }

    let moveDir = 0;
    if (input && this.state !== 'defend') {
      if (input.left) moveDir = -1;
      else if (input.right) moveDir = 1;
    }

    if (this.state !== 'defend') {
      this.vx = moveDir * MOVE_SPEED;
    } else {
      this.vx = 0;
    }

    if (input && input.attack && this.cooldownTimer <= 0 && this.attackTimer <= 0 && this.state !== 'defend' && this.isGrounded) {
      this.state = 'attack';
      this.attackTimer = ATTACK_ACTIVE_FRAMES + 0.1;
      this.attackHitRegistered = false;
      this.vx = 0;
    }

    if (input && input.defend && this.isGrounded && this.state !== 'attack') {
      this.state = 'defend';
      this.vx = 0;
    } else if (this.state === 'defend' && (!input || !input.defend)) {
      this.state = 'idle';
    }

    if (input && input.jump && this.isGrounded && this.state !== 'defend' && this.state !== 'attack') {
      this.vy = JUMP_VELOCITY;
      this.isGrounded = false;
      this.state = 'jump';
    }

    if (input && input.remoteAttack && this.energy >= REMOTE_ENERGY_COST && this.remoteCdTimer <= 0 && this.state !== 'defend' && this.state !== 'attack') {
      this.energy -= REMOTE_ENERGY_COST;
      this.remoteCdTimer = 0.8;
      this.remoteTriggered = true;
    }

    if (input && input.dash && this.energy >= DASH_ENERGY_COST && this.isGrounded && this.state !== 'defend' && this.state !== 'attack' && this.dashTimer <= 0) {
      this.energy -= DASH_ENERGY_COST;
      this.dashTimer = DASH_DURATION;
      this.vx = DASH_SPEED * this.facing;
      this.dashTriggered = true;
    }

    if (this.state === 'idle' && this.vx !== 0) {
      this.state = 'walk';
    } else if (this.state === 'walk' && this.vx === 0) {
      this.state = 'idle';
    }

    if (this.state === 'jump' && this.isGrounded) {
      this.state = 'idle';
    }

    this.applyGravity(dt);
    this.x += this.vx * dt;
    this.clampPosition();

    if (this.state === 'walk' || this.state === 'idle') {
      this.animTimer += dt;
    }
  }

  applyGravity(dt) {
    if (!this.isGrounded) {
      this.vy += GRAVITY * dt;
      this.y += this.vy * dt;
      if (this.y >= GROUND_Y - this.h) {
        this.y = GROUND_Y - this.h;
        this.vy = 0;
        this.isGrounded = true;
      }
    }
  }

  clampPosition() {
    if (this.x < 10) this.x = 10;
    if (this.x > 800 - this.w - 10) this.x = 800 - this.w - 10;
  }

  consumeRemoteTrigger() {
    if (this.remoteTriggered) {
      this.remoteTriggered = false;
      return true;
    }
    return false;
  }

  consumeDashTrigger() {
    if (this.dashTriggered) {
      this.dashTriggered = false;
      return true;
    }
    return false;
  }

  render(ctx) {
    if (!this.alive) return;
    const p = PIXEL;
    const bx = Math.floor(this.x);
    const by = Math.floor(this.y);
    const c = this.colors;
    const bob = this.state === 'idle' ? Math.sin(this.idleBob) * 1 : 0;
    const flash = this.hitFlash > 0 && Math.floor(this.hitFlash * 30) % 6 < 3;

    ctx.save();
    ctx.translate(bx + this.w / 2, by + this.h + bob);

    if (this.facing < 0) {
      ctx.scale(-1, 1);
    }

    ctx.translate(-this.w / 2, -this.h);

    if (flash) {
      ctx.globalAlpha = 0.6;
    }

    const f = this.state;
    const isAttacking = f === 'attack' && this.attackTimer > ATTACK_ACTIVE_FRAMES * 0.3;
    const walkCycle = Math.sin(this.animTimer * 12) * 2;
    const torsoLean = f === 'attack' ? -4 : 0;

    ctx.save();
    ctx.translate(0, torsoLean);

    this.drawPixelMecha(ctx, p, c, f, isAttacking, walkCycle);

    ctx.restore();

    if (this.dashTimer > 0) {
      ctx.globalAlpha = 0.4;
      for (let i = 0; i < 4; i++) {
        const ly = 2 + Math.random() * 12;
        ctx.fillStyle = '#c0c0ff';
        ctx.fillRect(-this.w / 2 - Math.random() * 14, ly * p, 6, 1);
      }
      ctx.globalAlpha = 1;
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  drawPixelMecha(ctx, p, c, state, isAttacking, walkCycle) {
    const DW = 10;
    const DH = 16;

    for (let row = 0; row < DH; row++) {
      const segments = [];
      let curColor = null;
      let startCol = -1;
      for (let col = 0; col < DW; col++) {
        let color = null;

        if (row === 0 && col >= 2 && col <= 7) color = c.head;
        else if (row === 1 && col >= 1 && col <= 8) color = c.head;
        else if (row === 2 && col >= 1 && col <= 8) color = c.head;
        else if (row === 3 && col >= 2 && col <= 7) color = c.body;
        else if (row === 4 && col >= 1 && col <= 8) color = c.body;
        else if (row === 5 && col >= 1 && col <= 8) {
          if (col === 1 || col === 7) {
            color = state === 'defend' ? c.armor : c.arm;
          } else if (col === 2 || col === 6) {
            color = state === 'defend' ? c.armor : c.body;
          } else {
            color = c.body;
          }
        }
        else if (row === 6 && col >= 2 && col <= 7) color = c.body;
        else if (row === 7 && col >= 2 && col <= 7) {
          color = (col === 4 || col === 5) ? c.energy : c.body;
        }
        else if (row === 8 && col >= 1 && col <= 8) color = c.body;
        else if (row === 9 && col >= 1 && col <= 8) {
          color = (col === 1 || col === 8) ? c.leg : c.body;
        }
        else if (row === 10 && col >= 3 && col <= 6) color = c.body;
        else if (row === 11 && col >= 3 && col <= 6) color = c.leg;
        else if (row === 12 && col >= 3 && col <= 6) {
          color = (col === 4 || col === 5) ? c.leg : c.foot;
        }
        else if (row === 13 && col >= 4 && col <= 5) color = c.foot;

        if (color !== curColor) {
          if (curColor !== null && startCol >= 0) {
            segments.push({ col: startCol, w: col - startCol, color: curColor });
          }
          curColor = color;
          startCol = color !== null ? col : -1;
        }
      }
      if (curColor !== null && startCol >= 0) {
        segments.push({ col: startCol, w: DW - startCol, color: curColor });
      }

      let ox = 0, oy = 0;
      if (state === 'walk' || (!this.isGrounded && state !== 'idle')) {
        if (row >= 10) ox = Math.floor(walkCycle);
        if (row <= 3) oy = Math.sin(this.animTimer * 12) * 0.5;
      }
      if (isAttacking && row >= 3 && row <= 7) {
        for (let i = segments.length - 1; i >= 0; i--) {
          const s = segments[i];
          if (s.col >= 7) {
            segments.splice(i, 1);
          } else if (s.col + s.w > 7) {
            s.w = 7 - s.col;
          }
        }
      }

      const drawY = row + Math.round(oy);
      for (const seg of segments) {
        const dc = seg.col + ox;
        if (dc >= 0 && dc < DW) {
          const w = Math.min(seg.w, DW - dc);
          ctx.fillStyle = seg.color;
          ctx.fillRect(dc * p, drawY * p, w * p, p);
        }
      }
    }

    if (state === 'attack' && this.attackTimer > 0) {
      ctx.fillStyle = '#f0db4f';
      ctx.fillRect(DW * p, 5 * p, 4, 3);
      ctx.fillStyle = '#fff';
      ctx.fillRect(DW * p + 4, 6 * p, 2, 1);
    }
  }
}
