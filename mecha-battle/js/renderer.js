class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  clear() {
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, 800, 500);
  }

  drawRect(x, y, w, h, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
  }

  drawPixelBlock(x, y, size, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(Math.floor(x), Math.floor(y), size, size);
  }

  drawHealthBar(x, y, w, h, ratio, isRight) {
    const borderColor = '#3a3a5a';
    const bgColor = '#1a1a2a';
    this.drawRect(x, y, w, h, borderColor);
    this.drawRect(x + 2, y + 2, w - 4, h - 4, bgColor);

    const fillW = Math.max(0, (w - 4) * ratio);
    let color = '#2ecc71';
    if (ratio < 0.4) color = '#e74c3c';
    else if (ratio < 0.7) color = '#f39c12';

    if (!isRight) {
      this.drawRect(x + 2, y + 2, fillW, h - 4, color);
    } else {
      this.drawRect(x + 2 + (w - 4 - fillW), y + 2, fillW, h - 4, color);
    }
  }

  drawText(text, x, y, color, size, align = 'left') {
    this.ctx.font = `${size}px "Press Start 2P"`;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, Math.floor(x), Math.floor(y));
  }

  drawShadowText(text, x, y, color, shadowColor, size, align = 'left') {
    this.drawText(text, x + 2, y + 2, shadowColor, size, align);
    this.drawText(text, x, y, color, size, align);
  }

  drawFlashEffect(x, y, w, h, timer, duration) {
    if (timer > 0 && timer < duration) {
      const alpha = Math.sin(timer * 0.3) * 0.5 + 0.5;
      this.ctx.globalAlpha = alpha * 0.3;
      this.drawRect(x, y, w, h, '#ffffff');
      this.ctx.globalAlpha = 1;
    }
  }

  drawAttackSwing(cx, cy, facing, timer) {
    if (timer <= 0) return;
    const len = Math.min(timer * 8, 24);
    const alpha = Math.max(0, 1 - timer / 8);

    this.ctx.globalAlpha = alpha * 0.8;
    this.ctx.strokeStyle = '#f0db4f';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    const sx = cx + facing * 20;
    const sy = cy - 8;
    this.ctx.moveTo(sx, sy);
    this.ctx.lineTo(sx + facing * len, sy);
    this.ctx.stroke();

    for (let i = 0; i < 3; i++) {
      const px = cx + facing * (20 + len * 0.5) + (Math.random() - 0.5) * 16;
      const py = cy - 8 + (Math.random() - 0.5) * 16;
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(Math.floor(px), Math.floor(py), 2, 2);
    }
    this.ctx.globalAlpha = 1;
  }

  drawDefenseShield(cx, cy, facing) {
    this.ctx.globalAlpha = 0.3;
    this.ctx.strokeStyle = '#6ac8ff';
    this.ctx.lineWidth = 2;
    const sx = cx + facing * 16;
    const sy = cy - 16;
    this.ctx.beginPath();
    this.ctx.arc(sx, sy, 16, -Math.PI * 0.6, Math.PI * 0.6);
    this.ctx.stroke();
    this.ctx.fillStyle = '#6ac8ff';
    this.ctx.fill();
    this.ctx.globalAlpha = 1;
  }
}
