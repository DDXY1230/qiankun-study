class LRUCache {
  map
  length
    constructor(length) {
      this.map = new Map();
      this.length = length;
    }
  has(key) {
    return this.map.has(key);
  }
  get(key) {
    if (!this.map.has(key)) return null;
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.map.has(key)) {
      this.map.delete(key);
    }
    this.map.set(key, value)
    if(this.map.size > this.length) {
      console.log(this.map.keys())
      console.log(this.map.keys().next())
      console.log(this.map.keys().next().value)
      this.map.delete(this.map.keys().next().value)
    }
  }
}
let l = new LRUCache(3)
l.set(3,333)
l.set(4,444)
l.set(5,555)
l.set(6,666)
// l.get(3)
console.log(l.map)
console.log(l.has(3))