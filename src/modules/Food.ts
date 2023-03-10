// 定義食物類 Food
class Food {
  // 定義一個屬性表示食物所對應的元素
  element: HTMLElement
  constructor() {
    // 已在頁面定義不可能為空，使用非空斷言
    this.element = document.getElementById('food')!
  }
  // 定義一個獲取食物 X 軸坐標的方法
  get X() {
    return this.element.offsetLeft
  }
  // 定義一個獲取食物 Y 軸坐標的方法
  get Y() {
    return this.element.offsetTop
  }
  // 修改食物的位置
  change() {
    // 生成一個隨機位置
    // 食物位置最小是 0，最大是 290
    // 蛇移動一次就是一格，一格的大小的就是 10，所以要求食物的坐標必須是整 10
    // Math.floor，取到 0 和 29 的值和其他值相同
    // Math.round，0 和 29 的機率是其他值的一半
    let top = Math.floor(Math.random() * 30) * 10 
    let left = Math.floor(Math.random() * 30) * 10 
    this.element.style.top = top + 'px'
    this.element.style.left = left + 'px'
  }
}

export default Food