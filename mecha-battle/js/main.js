(function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');

  const menuOverlay = document.getElementById('menu-overlay');
  const resultOverlay = document.getElementById('result-overlay');
  const startBtn = document.getElementById('startBtn');
  const restartBtn = document.getElementById('restartBtn');
  const menuBtn = document.getElementById('menuBtn');
  const winnerText = document.getElementById('winnerText');
  const p1HealthBar = document.getElementById('p1Health');
  const p2HealthBar = document.getElementById('p2Health');
  const p1EnergyBar = document.getElementById('p1Energy');
  const p2EnergyBar = document.getElementById('p2Energy');
  const hud = document.getElementById('hud');

  const renderer = new Renderer(ctx);
  const scene = new Scene();
  const input = new InputHandler();

  const player1Colors = {
    head: '#e74c3c', body: '#c0392b', arm: '#e67e22',
    leg: '#922b21', foot: '#7b241c', energy: '#f0db4f',
    armor: '#5dade2'
  };
  const player2Colors = {
    head: '#3498db', body: '#2980b9', arm: '#1abc9c',
    leg: '#1a5276', foot: '#154360', energy: '#f0db4f',
    armor: '#e74c3c'
  };

  const mecha1 = new Mecha(150, player1Colors, 1, '红色机甲');
  const mecha2 = new Mecha(618, player2Colors, -1, '蓝色机甲');
  const combat = new CombatSystem(mecha1, mecha2);

  let phase = 'menu';
  let lastTime = 0;
  let comboFlashTimer = 0;

  function updateHUD() {
    const r1 = mecha1.hp / mecha1.maxHp;
    const r2 = mecha2.hp / mecha2.maxHp;
    p1HealthBar.style.width = `${r1 * 100}%`;
    p2HealthBar.style.width = `${r2 * 100}%`;

    let c1 = '#2ecc71';
    if (r1 < 0.4) c1 = '#e74c3c';
    else if (r1 < 0.7) c1 = '#f39c12';
    p1HealthBar.style.background = c1;

    let c2 = '#2ecc71';
    if (r2 < 0.4) c2 = '#e74c3c';
    else if (r2 < 0.7) c2 = '#f39c12';
    p2HealthBar.style.background = c2;

    const e1 = mecha1.energy / MAX_ENERGY;
    const e2 = mecha2.energy / MAX_ENERGY;
    p1EnergyBar.style.width = `${e1 * 100}%`;
    p2EnergyBar.style.width = `${e2 * 100}%`;
  }

  function startBattle() {
    mecha1.reset();
    mecha2.reset();
    combat.reset();
    phase = 'battle';
    lastTime = 0;
    comboFlashTimer = 0;
    menuOverlay.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    hud.classList.remove('hidden');
    updateHUD();
  }

  function showResult(winner) {
    phase = 'result';
    hud.classList.add('hidden');
    const name = winner === 1 ? '红色机甲' : '蓝色机甲';
    const color = winner === 1 ? '#e74c3c' : '#3498db';
    winnerText.textContent = `${name} 获胜！`;
    winnerText.style.color = color;
    winnerText.style.textShadow = `3px 3px 0 ${winner === 1 ? '#922b21' : '#1a5276'}`;
    resultOverlay.classList.remove('hidden');
  }

  startBtn.addEventListener('click', startBattle);
  restartBtn.addEventListener('click', startBattle);
  menuBtn.addEventListener('click', () => {
    phase = 'menu';
    resultOverlay.classList.add('hidden');
    menuOverlay.classList.remove('hidden');
  });

  function gameLoop(timestamp) {
    const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
    lastTime = timestamp;

    scene.update(dt);

    if (phase === 'battle') {
      const input1 = input.getPlayer1Input();
      const input2 = input.getPlayer2Input();

      mecha1.update(dt, input1);
      mecha2.update(dt, input2);
      combat.update(dt);

      updateHUD();

      if (combat.comboCount >= 2) {
        comboFlashTimer = 0.1;
      }
      comboFlashTimer = Math.max(0, comboFlashTimer - dt);

      if (combat.gameOver) {
        setTimeout(() => showResult(combat.winner), 500);
        phase = 'ending';
      }
    }

    scene.render(ctx);

    if (phase === 'battle' || phase === 'ending') {
      mecha1.render(ctx);
      mecha2.render(ctx);

      combat.render(ctx, renderer);

      if (mecha1.state === 'defend') {
        renderer.drawDefenseShield(mecha1.centerX, mecha1.centerY, mecha1.facing);
      }
      if (mecha2.state === 'defend') {
        renderer.drawDefenseShield(mecha2.centerX, mecha2.centerY, mecha2.facing);
      }

      if (mecha1.state === 'attack') {
        renderer.drawAttackSwing(mecha1.centerX, mecha1.centerY, mecha1.facing, mecha1.attackTimer);
      }
      if (mecha2.state === 'attack') {
        renderer.drawAttackSwing(mecha2.centerX, mecha2.centerY, mecha2.facing, mecha2.attackTimer);
      }

      if (comboFlashTimer > 0 && combat.comboCount >= 2) {
        renderer.drawShadowText(
          `${combat.comboCount}x 连击!`,
          400, 200,
          '#f0db4f', '#000', 14, 'center'
        );
      }
    }

    input.clearJustPressed();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
})();
