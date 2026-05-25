class Scene {
  constructor() {
    this.stars = [];
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: Math.random() * 800,
        y: Math.random() * 300,
        size: Math.random() < 0.7 ? 1 : 2,
        speed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2
      });
    }
    this.time = 0;
    this.gradient = this._buildGradient();
  }

  _buildGradient() {
    const g = document.createElement('canvas').getContext('2d').createLinearGradient(0, 0, 0, 500);
    g.addColorStop(0, '#0a0a2e');
    g.addColorStop(0.5, '#151540');
    g.addColorStop(0.7, '#1a1a3e');
    g.addColorStop(1, '#1c1c2e');
    return g;
  }

  update(dt) {
    this.time += dt;
  }

  render(ctx) {
    ctx.clearRect(0, 0, 800, 500);
    ctx.fillStyle = this.gradient;
    ctx.fillRect(0, 0, 800, 500);

    this.renderStars(ctx);
    this.renderGround(ctx);
    this.renderWalls(ctx);
  }

  renderStars(ctx) {
    for (const star of this.stars) {
      const brightness = 0.4 + Math.sin(this.time * star.speed + star.phase) * 0.3 + 0.3;
      ctx.globalAlpha = Math.max(0.2, Math.min(1, brightness));
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
    }
    ctx.globalAlpha = 1;
  }

  renderGround(ctx) {
    const gy = GROUND_Y;

    ctx.fillStyle = '#2a2030';
    ctx.fillRect(0, gy, 800, 100);

    for (let x = 0; x < 20; x++) {
      ctx.fillStyle = x % 2 === 0 ? '#352840' : '#2e2438';
      ctx.fillRect(x * 40, gy, 40, 4);
    }

    ctx.strokeStyle = '#f0db4f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, gy + 4);
    ctx.lineTo(800, gy + 4);
    ctx.stroke();

    ctx.fillStyle = '#3a2c48';
    for (let x = 20; x < 780; x += 60) {
      ctx.fillRect(x, gy + 8, 4, 4);
    }

    for (let y = gy + 16; y < 500; y += 40) {
      for (let x = 0; x < 800; x += 40) {
        ctx.fillStyle = '#221a2a';
        ctx.fillRect(x, y, 40, 1);
        ctx.fillStyle = '#1a1420';
        ctx.fillRect(x, y + 20, 40, 1);
      }
    }
  }

  renderWalls(ctx) {
    ctx.fillStyle = '#3a2a4a';
    for (let y = GROUND_Y - 80; y < GROUND_Y; y += 8) {
      ctx.fillRect(0, y, 8, 4);
      ctx.fillRect(792, y, 8, 4);
    }

    ctx.fillStyle = '#f0db4f';
    ctx.fillRect(0, GROUND_Y - 80, 2, 80);
    ctx.fillRect(798, GROUND_Y - 80, 2, 80);
  }
}
