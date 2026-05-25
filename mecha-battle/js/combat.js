const COMBO_WINDOW = 2;
const COMBO_BONUS = 5;
const COMBO_MAX_BONUS = 10;

class CombatSystem {
  constructor(mecha1, mecha2) {
    this.mecha1 = mecha1;
    this.mecha2 = mecha2;
    this.hitEffects = [];
    this.projectiles = [];
    this.comboCount = 0;
    this.comboTimer = 0;
    this.lastAttacker = null;
    this.gameOver = false;
    this.winner = null;
  }

  reset() {
    this.hitEffects = [];
    this.projectiles = [];
    this.comboCount = 0;
    this.comboTimer = 0;
    this.lastAttacker = null;
    this.gameOver = false;
    this.winner = null;
  }

  update(dt) {
    if (this.gameOver) return;

    this.updateFacing();
    this.processAttack(this.mecha1, this.mecha2);
    this.processAttack(this.mecha2, this.mecha1);
    this.processProjectiles(dt);
    this.processRemoteFire(this.mecha1);
    this.processRemoteFire(this.mecha2);

    this.comboTimer = Math.max(0, this.comboTimer - dt);
    if (this.comboTimer <= 0) {
      this.comboCount = 0;
      this.lastAttacker = null;
    }

    this.checkGameOver();

    this.hitEffects = this.hitEffects.filter(e => {
      e.timer -= dt;
      return e.timer > 0;
    });
  }

  processRemoteFire(mecha) {
    if (mecha.consumeRemoteTrigger()) {
      const px = mecha.facing === 1 ? mecha.x + mecha.w : mecha.x - 6;
      const p = new Projectile(px, mecha.centerY, mecha.facing, mecha);
      this.projectiles.push(p);
    }
  }

  processProjectiles(dt) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt);
      if (!p.alive) {
        this.projectiles.splice(i, 1);
        continue;
      }
      const target = p.owner === this.mecha1 ? this.mecha2 : this.mecha1;
      if (target.alive && this.rectsOverlap(p.getHitbox(), target.getHitbox())) {
        const dmg = target.takeDamage(REMOTE_DAMAGE, p.owner.centerX);
        this.addHitEffect((p.owner.centerX + target.centerX) / 2, target.centerY, dmg);
        p.alive = false;
        this.projectiles.splice(i, 1);
      }
    }
  }

  getComboBonus() {
    if (this.comboCount <= 1) return 0;
    return Math.min((this.comboCount - 1) * COMBO_BONUS, COMBO_MAX_BONUS);
  }

  processAttack(attacker, defender) {
    const atkHitbox = attacker.getAttackHitbox();
    if (!atkHitbox || attacker.attackHitRegistered) return;

    const defHitbox = defender.getHitbox();
    if (this.rectsOverlap(atkHitbox, defHitbox)) {
      attacker.attackHitRegistered = true;

      if (this.lastAttacker === attacker && this.comboTimer > 0) {
        this.comboCount++;
      } else {
        this.comboCount = 1;
      }
      this.lastAttacker = attacker;
      this.comboTimer = COMBO_WINDOW;

      const bonus = this.getComboBonus();
      const totalDmg = ATTACK_DAMAGE + bonus;
      const dmg = defender.takeDamage(totalDmg, attacker.centerX);
      this.addHitEffect((attacker.centerX + defender.centerX) / 2, defender.centerY, dmg);
    }
  }

  addHitEffect(x, y, damage) {
    this.hitEffects.push({
      x, y, timer: 0.3, damage
    });
  }

  rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  updateFacing() {
    if (this.mecha1.alive && this.mecha2.alive) {
      if (this.mecha1.centerX < this.mecha2.centerX) {
        this.mecha1.facing = 1;
        this.mecha2.facing = -1;
      } else {
        this.mecha1.facing = -1;
        this.mecha2.facing = 1;
      }
    }
  }

  checkGameOver() {
    if (!this.mecha1.alive) {
      this.gameOver = true;
      this.winner = 2;
    } else if (!this.mecha2.alive) {
      this.gameOver = true;
      this.winner = 1;
    }
  }

  render(ctx, renderer) {
    for (const p of this.projectiles) {
      p.render(ctx);
    }
    for (const e of this.hitEffects) {
      const alpha = e.timer / 0.3;
      renderer.drawShadowText(
        `-${e.damage}`,
        e.x - 12,
        e.y - 30 - (1 - alpha) * 20,
        '#ff4444',
        '#000',
        10,
        'center'
      );
    }
  }
}
