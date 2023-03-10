class Snake {
  // 表示蛇頭的元素
  head: HTMLElement
  // 表示蛇的身體(包含蛇頭)，該集合是實時刷新
  // HTMLCollectionOf<HTMLElement>
  bodies: HTMLCollection
  // 獲取蛇的容器
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    // querySelectorAll 的 NodeList 是靜態集合 
    this.bodies = this.element.getElementsByTagName('div')
  }
  // 獲取蛇頭的坐標
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }

  // 設置蛇頭的坐標
  set X(value: number) {
    // 如果新值和舊值相同，則直接返回不再修改
    if (this.X === value) {
      return
    }

    // X 的值合法範圍 0~290 之間
    if (value < 0 || value > 290) {
      // 進入判斷說明蛇撞牆了
      throw new Error('蛇撞牆了!')
    }

    // 蛇向左移動時，不能向右移動，反之亦然
    // 先判斷第二節是否存在，如果蛇頭移動位置等於第二節位置，說明發生水平移動
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      // 如果發生了掉頭，讓蛇向反方向繼續移動
      if (value > this.X) {
        // 反向補正，抵消本次掉頭，等於沒有移動
        // 如果新值 value 大於舊值 X，說明蛇向右走，此時發生掉頭，應該使蛇繼續向左走
        value = this.X - 10
      } else {
        value = this.X + 10
      }
    }

    // 移動身體
    this.moveBody()

    this.head.style.left = value + 'px'

    // 檢查有沒有撞到自己
    this.ckeckHeadBody()
  }
  set Y(value: number) {
    if (this.Y === value) {
      return
    }
    // Y 的值合法範圍 0~290 之間
    if (value < 0 || value > 290) {
      // 進入判斷說明蛇撞牆了
      throw new Error('蛇撞牆了!')
    }

    // 檢查 Y 軸 offsetTop
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10
      } else {
        value = this.Y + 10
      }
    }

    // 移動身體
    this.moveBody()

    this.head.style.top = value + 'px'

    // 檢查有沒有撞到自己
    this.ckeckHeadBody()
  }

  // 設置增加身體的方法
  addBody() {
    // 向 element 中添加一個 div
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }

  // 蛇身體移動的方法
  moveBody() {
    // 將後邊的身體設置為前邊身體的位置
    // 第 4 節 = 第 3 節位置
    // 第 3 節 = 第 2 節位置
    // 第 2 節 = 第 1 節位置
    // 0 是蛇頭位置，不用更改
    // 另一種方法，蛇尾變蛇頭下一個位置
    for(let i=this.bodies.length-1; i>0; i--) {
      // 獲取前邊身體的位置
      let X = (<HTMLElement>this.bodies[i-1]).offsetLeft
      let Y = (<HTMLElement>this.bodies[i-1]).offsetTop
      // 將值設置到當前身體上
      ;(<HTMLElement>this.bodies[i]).style.left = X + 'px'
      ;(<HTMLElement>this.bodies[i]).style.top = Y + 'px'
    }
  }

  // 檢查頭和身體有無相撞
  ckeckHeadBody() {
    // 獲取所有的身體，檢查其是否和蛇頭的坐標發生重疊
    // 不檢查 [0] 因為是蛇頭
    for(let i=1; i<this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 進入判斷說明蛇頭撞到身體，遊戲結束
        throw new Error('撞到自己')
      }
    }
  }
}

export default Snake