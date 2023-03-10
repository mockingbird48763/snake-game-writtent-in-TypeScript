// 定義表示記分牌的類
class ScorePanel {
  // score 和 level 用來記錄分數和等級
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement

  // 最大等級
  maxLevel: number
  // 升級所需分數
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }
  // 設置一個加分的方法
  addScore() {
    this.score++
    this.scoreEle.innerHTML = this.score + ''
    // 判斷分數是多少
    // 每 n 分升級
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  // 提升等級的方法
  levelUp() {
    // 限制等級上限
    if(this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + ''
    }
  }
}

export default ScorePanel
