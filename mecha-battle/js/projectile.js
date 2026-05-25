const PROJECTILE_SPEED = 350;
const PROJECTILE_SIZE = 6;
const PROJECTILE_LIFETIME = 1.5;
const REMOTE_DAMAGE = 10;

class Projectile {
  constructor(x, y, facing, owner) {
    this.x = x;
    this.y = y - 12;
    this.vx = PROJECTILE_SPEED * facing;
    this.facing = facing;
    this.w = PROJECTILE_SIZE;
    this.h = PROJECTILE_SIZE;
    this.owner = owner;
    this.lifetime = PROJECTILE_LIFETIME;
    this.alive = true;
    this.trail = [];
  }

  update(dt) {
    this.lifetime -= dt;
    if (this.lifetime <= 0) {
      this.alive = false;
      return;
    }

    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 6) this.trail.shift();

    this.x += this.vx * dt;

    if (this.x < 0 || this.x > 800) {
      this.alive = false;
    }
  }

  render(ctx) {
    const p = 4;

    for (let i = 0; i < this.trail.length; i++) {
      const alpha = (i / this.trail.length) * 0.4;
      ctx.globalAlpha = alpha;
      const sz = 2 + (i / this.trail.length) * 2;
      ctx.fillStyle = '#6ac8ff';
      ctx.fillRect(Math.floor(this.trail[i].x), Math.floor(this.trail[i].y), sz, sz);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#f0db4f';
    ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.w, this.h);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(Math.floor(this.x) + 1, Math.floor(this.y) + 1, this.w - 2, this.h - 2);
  }

  getHitbox() {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }
}
