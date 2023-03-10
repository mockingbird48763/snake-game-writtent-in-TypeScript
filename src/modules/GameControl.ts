// 引入其他類
import Food from "./Food"
import ScorePanel from "./ScorePanel"
import Snake from "./Snake"

// 遊戲控制器，控制其他所有類
class GameControl {
  snake: Snake
  food: Food
  scorePanel: ScorePanel

  // 存儲蛇的移動方向(也就是按鍵的方向)
  direction: string = ''

  // 記錄遊戲是否結束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 2)
    this.init()
  }
  // 遊戲初始化方法，調用後遊戲即開始
  init() {
    // 綁定鍵盤事件
    // 注意 this 指向問題
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    this.run()
  }

  // 鍵盤事件的響應函數
  keydownHandler(event: KeyboardEvent) {
    // console.log(this)
    // ArrowUP ArrowDown ArrwoLeft ArrowRight
    // IE: Up Down Left Right
    // 需要檢查 event.key 的值是否合法
    // 修改 direction 屬性
    this.direction = event.key
  }

  // 創建一個控制蛇移動的方法
  run() {
    // 根據方向(direction)使蛇改變位置
    /**
     * 向上 top 減少
     * 向下 down 增加
     * 向左 left 減少
     * 向右 right 增加
     */
    // 獲取蛇現在坐標
    let X = this.snake.X
    let Y = this.snake.Y
    // 根據按鍵方向來修改 X 值和 Y 值
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        Y -= 10
        break
      case "ArrowDown":
      case "Down":
        Y += 10
        break
      case "ArrowLeft":
      case "Left":
        X -= 10
        break
      case "ArrowRight":
      case "Right":
        X += 10
        break
    }

    // 檢查蛇是否吃到食物
    this.checkEat(X, Y)

    // 修改蛇的 X 值和 Y 值
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e) {
      // 進入 catch，說明出現異常，遊戲結束
      alert((e as Error).message + ' Game Over!')
      this.isLive = false
    }
    

    // 開啟定時調用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 檢查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      console.log('吃到食物了')
      // 食物位置重置
      this.food.change()
      // 分數增加
      this.scorePanel.addScore()
      // 蛇增加一節
      this.snake.addBody()
    }
  }
}

export default GameControl