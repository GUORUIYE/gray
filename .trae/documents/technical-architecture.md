## 1. 架构设计

本游戏是一个纯前端单页应用，所有逻辑在浏览器中运行，无后端依赖。

```mermaid
flowchart TD
    "渲染层(Canvas 2D)" --> "游戏引擎层"
    "输入层(键盘事件)" --> "游戏引擎层"
    "游戏引擎层" --> "物理/碰撞系统"
    "游戏引擎层" --> "战斗/伤害系统"
    "游戏引擎层" --> "动画状态机"
    "物理/碰撞系统" --> "场景&角色渲染"
    "战斗/伤害系统" --> "HUD/血条渲染"
    "动画状态机" --> "角色精灵渲染"
```

## 2. 技术选型

- **前端**：原生 HTML5 + CSS3 + JavaScript (ES6+)
- **渲染**：Canvas 2D API 进行像素风格渲染
- **构建工具**：无构建步骤，直接使用 index.html
- **字体**：Google Fonts - "Press Start 2P" 像素字体
- **外部依赖**：无（纯原生实现）

## 3. 项目结构

```
/
├── index.html          # 入口页面，包含样式和脚本
├── style.css           # 页面样式（内联在 index.html 或独立）
└── game.js             # 核心游戏逻辑（内联在 index.html 或独立）
```

## 4. 核心模块设计

### 4.1 游戏循环 (Game Loop)
使用 `requestAnimationFrame` 实现固定时间步长的游戏循环：
- `update(deltaTime)`: 更新游戏状态（位置、碰撞、血量等）
- `render()`: 渲染所有画面元素

### 4.2 游戏状态管理 (Game State)

```javascript
// 游戏阶段
const GAME_STATE = {
  TITLE: 'title',      // 标题画面
  PLAYING: 'playing',  // 对战中
  GAME_OVER: 'gameOver' // 结算画面
};

// 机甲角色状态
class Mecha {
  constructor(x, y, color, facing, controls) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width = 48;
    this.height = 64;
    this.hp = 100;
    this.maxHp = 100;
    this.color = color;        // 主题色
    this.facing = facing;      // 朝向 (1: 右, -1: 左)
    this.isAttacking = false;
    this.isDefending = false;
    this.isGrounded = true;
    this.attackCooldown = 0;
    this.animFrame = 0;
    this.animTimer = 0;
    this.state = 'idle';       // idle, running, attacking, hit, defending, jumping
    this.controls = controls;  // 按键映射
  }
}
```

### 4.3 输入系统 (Input System)
监听键盘 `keydown` / `keyup` 事件，维护当前按键状态字典。

### 4.4 碰撞检测 (Collision Detection)
- 使用 AABB（轴对齐包围盒）进行碰撞检测
- 攻击判定：检测攻击者的攻击框是否与防御者的受击框重叠
- 边界约束：角色不能移出画布边界

### 4.5 战斗系统 (Combat System)
- 攻击命中判定 → 检查防御状态 → 计算伤害 → 应用伤害 → 检查胜负
- 攻击范围：以角色朝向方向延伸约 40px 的矩形区域

### 4.6 动画系统 (Animation System)
使用像素绘图在 Canvas 上绘制机甲精灵，不同状态切换不同绘制效果：
- **待机 (idle)**: 轻微上下浮动呼吸效果
- **移动 (running)**: 脚步交替，身体前后摆动
- **攻击 (attacking)**: 手臂向前伸展，产生攻击特效
- **受击 (hit)**: 后仰闪烁，短暂硬直
- **防御 (defending)**: 手臂交叉在前方，护盾光效
- **跳跃 (jumping)**: 身体蜷缩，上升/下落姿态

### 4.7 场景渲染 (Scene Rendering)
- **背景**：渐变色夜空 + 像素风格星星/远山/建筑剪影
- **地面**：像素风格砖块纹理地面
- **平台**：简单的战斗平台/场地边界

## 5. 数据模型

### 5.1 机甲属性
| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| x | number | - | 水平位置 |
| y | number | - | 垂直位置（地面为基准） |
| hp | number | 100 | 当前血量 |
| maxHp | number | 100 | 最大血量 |
| speed | number | 200 | 移动速度 (px/s) |
| jumpForce | number | 400 | 跳跃力度 (px/s) |
| attackDamage | number | 10 | 攻击伤害 |
| attackRange | number | 50 | 攻击范围 (px) |
| attackCooldown | number | 0.5 | 攻击冷却 (秒) |

### 5.2 按键配置
| 玩家 | 向左 | 向右 | 跳跃 | 攻击 | 防御 |
|------|------|------|------|------|------|
| 玩家1 | A | D | W | S | Q |
| 玩家2 | ← | → | ↑ | ↓ | / |

## 6. 素材方案

由于是纯代码实现的像素风格游戏，所有"素材"均通过 Canvas 绘图 API 程序化生成：
- **机甲角色**：使用 `fillRect` 等基础绘图方法绘制像素块组成的机甲形象
- **场景背景**：程序化生成的像素云朵、远山、地面纹理
- **特效**：攻击闪光、防御护盾、受击闪烁、跳跃灰尘等
- **UI元素**：像素风格血条、边框装饰、文字效果

这种方法不需要任何外部图片资源，完全自包含。
