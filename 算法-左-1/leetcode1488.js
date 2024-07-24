// leetcode 1488 湖泊问题js版本
// 先准备一个小顶堆用来处理干活(抽干哪个湖泊的优先级)的优先级
class MinHeap {
  constructor() {
    this.heap = []
  }
  getParentIndex(i) {
    return (i - 1) >> 1
  }
  getLeftIndex(i) {
    return (i * 2) + 1
  }
  getRightIndex(i) {
    return (i * 2) + 2
  }
  shiftDown(index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)
    if(this.heap[leftIndex] && this.heap[leftIndex].nextRain < this.heap[index].nextRain) {
      this.swap(leftIndex,index)
      this.shiftDown(leftIndex)
    }
    if(this.heap[rightIndex] && this.heap[rightIndex].nextRain < this.heap[index].nextRain) {
      this.swap(rightIndex,index)
      this.shiftDown(rightIndex)
    }
  }
  shiftUp(index) {
    if(index == 0) return
    const parentIndex = this.getParentIndex(index)
    if(this.heap[parentIndex].nextRain > this.heap[index].nextRain){
      this.swap(parentIndex,index)
      this.shiftUp(parentIndex)
    } 
  }
  swap(i1,i2) {
    const temp = this.heap[i1]
    this.heap[i1] = this.heap[i2]
    this.heap[i2] = temp
  }
  insert(value) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  // 删除堆顶的元素
  pop() {
    const t = this.heap[0] 
    if(this.size() == 1) {
      this.heap = []
      return t
    }
    
    this.heap[0] = this.heap.pop()
    this.shiftDown(0)
    return t
  }
  // 获取堆顶
  peek() {
    return this.heap[0]
  }
  size() {
    return this.heap.length
  }
}

var avoidFlood = function(rains) {
  let n = rains.length
  let ans = [] // 没有洪水的返回数组,数组中有值
  let invalid = [] // 洪水来了,直接返回空数组


  let map = new Map() // 用来记录某个湖泊在哪些天会下雨
  for(let i = 0; i < n; i++) {
    if(rains[i] != 0) {
      // 第i天有湖泊下雨
      if(!map.get(rains[i])) {
        map.set(rains[i],[])
      }
      map.get(rains[i]).push(i)
    }
  }

  // 没抽干的湖泊表
  // 某个湖泊如果满了,加入到set里
  // 某个湖泊被抽干了,从set中剔除
  let set = new Set()
  // 用小顶堆来分配最先处理哪个湖泊,也就是最先需要干的活
  const heap = new MinHeap()
  for(let i = 0; i < n; i++) {
    console.log('rains',i,rains[i])
    console.log('截止上次待抽干的湖泊set',set)
    console.log('截止上次待干的活heap',heap.heap)
    if(rains[i] != 0) { // 今天下雨,不干活返回ans[ℹ] = -1,但是要准备干活的计划,
      if(set.has(rains[i])) {
        console.log('rains==>2',i,rains[i])
        console.log('set==>',set)
        // 该湖泊原本没抽干,这次又下雨,必然洪水,直接返回空数组
        return invalid
      }
      // 放入到没抽干的列表
      set.add(rains[i])
      // 同时该湖泊在哪些天下雨,最前面的时间可以去除掉了
      map.get(rains[i]).shift()
      //
      if(map.get(rains[i]).length != 0 ) {
        // 说明该湖泊后面会下雨,可能会有洪水,我得找个合适的时间事先抽干,不然会发洪水
        // 所以添加任务到小顶堆
        heap.insert({lake: rains[i],nextRain: map.get(rains[i])[0]})
      }
      ans[i] = -1 // 
    }else {
      // 今天干活,抽干某个湖泊的水,肯定是先抽干最近要下雨的湖泊,躲避洪水呀
      // 看看小顶堆的干活表中有没有活可以干
      if(heap.size() == 0) {
        // 没有活可干
        ans[i] = 1  // 题目规定,无活可干返回1
      }else {
        let work = heap.pop()
        console.log('work',work)
        console.log('workset',set)
        set.delete(work.lake)
        ans[i] = work.lake
        console.log('从待抽干的set抽干',set)
        console.log('从待干的活中干完一个',heap)
      }
    }
    console.log('----------------------------------')
  }
  return ans
};

let ans = avoidFlood([1,0,1,0,2,0,2])//[-1,1,-1,1,-1,2,-1]
console.log(ans)
