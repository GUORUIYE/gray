const KEY = {
  W: 'KeyW', A: 'KeyA', S: 'KeyS', D: 'KeyD',
  UP: 'ArrowUp', DOWN: 'ArrowDown', LEFT: 'ArrowLeft', RIGHT: 'ArrowRight',
  SPACE: 'Space', ENTER: 'Enter',
  F: 'KeyF', E: 'KeyE',
  SLASH: 'Slash', PERIOD: 'Period'
};

class InputHandler {
  constructor() {
    this.keys = {};
    this.justPressed = {};
    this._onKeyDown = (e) => {
      if (!this.keys[e.code]) {
        this.justPressed[e.code] = true;
      }
      this.keys[e.code] = true;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }
    };
    this._onKeyUp = (e) => {
      this.keys[e.code] = false;
    };
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
  }

  isDown(code) {
    return !!this.keys[code];
  }

  wasPressed(code) {
    if (this.justPressed[code]) {
      this.justPressed[code] = false;
      return true;
    }
    return false;
  }

  clearJustPressed() {
    this.justPressed = {};
  }

  getPlayer1Input() {
    return {
      left: this.isDown(KEY.A),
      right: this.isDown(KEY.D),
      jump: this.wasPressed(KEY.W),
      attack: this.wasPressed(KEY.SPACE),
      defend: this.isDown(KEY.S),
      remoteAttack: this.wasPressed(KEY.F),
      dash: this.wasPressed(KEY.E)
    };
  }

  getPlayer2Input() {
    return {
      left: this.isDown(KEY.LEFT),
      right: this.isDown(KEY.RIGHT),
      jump: this.wasPressed(KEY.UP),
      attack: this.wasPressed(KEY.ENTER),
      defend: this.isDown(KEY.DOWN),
      remoteAttack: this.wasPressed(KEY.SLASH),
      dash: this.wasPressed(KEY.PERIOD)
    };
  }

  destroy() {
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
  }
}
