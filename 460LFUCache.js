/*
460. LFU Cache
Design and implement a data structure for Least Frequently Used(LFU) cache.It should support the following operations: get and put.

  get(key) - Get the value(will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present.When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item.For the purpose of this problem, when there is a tie(i.e., two or more keys that have the same frequency), the least recently used key would be evicted.

Follow up:
Could you do both operations in O(1) time complexity ?

  Example :

  LFUCache cache = new LFUCache(2 capacity);

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.get(3);       // returns 3.
cache.put(4, 4);    // evicts key 1.
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4
*/

var Node = function (key = null, val = null, lfu = null, next = null, prev = null) {
  this.key = key;
  this.val = val;
  this.next = next;
  this.prev = prev;
  this.lfu = lfu;
};

var LFUnode = function (rank = 0, next = null, prev = null) {
  this.rank = rank;
  this.next = next;
  this.prev = prev;
  this.size = 0;

  this.head = new Node();
  this.tail = new Node();
  this.head.next = this.tail;
  this.tail.prev = this.head;
}
LFUnode.prototype.removeSelf = function () {
  this.next.prev = this.prev;
  this.prev.next = this.next;
  this.prev = null;
  this.next = null;
  return true;
};
LFUnode.prototype.pop = function () {
  let temp = this.tail.prev;
  temp.next = null;
  this.tail.prev = null;
  this.tail = temp;
  this.size--;
  if (this.size === 0) this.removeSelf();
  return temp;
};

LFUnode.prototype.remove = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
  node.next = null;
  node.prev = null;
  node.lfu = null;
  this.size--;
  if (this.size === 0) this.removeSelf();
  return node;
};

LFUnode.prototype.insert = function (node) {
  node.next = this.head.next;
  node.prev = this.head;
  node.lfu = this;
  this.head.next.prev = node;
  this.head.next = node;
  this.size++;
  return node;
};


var LFUCache = function (capacity) {
  this.capacity = capacity || 0;
  this.size = 0;
  this.cache = {};

  this.head = new LFUnode();
  this.tail = new LFUnode();
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

LFUCache.prototype.get = function (key) {
  let node = this.cache[key];
  if (!node) return -1;

  this.increaseCount(key);
  return node.val
};

LFUCache.prototype.increaseCount = function (key) {
  let node = this.cache[key];
  let LFUnode = node.lfu;
  let nxtLFUnode = LFUnode.next;
  if (nxtLFUnode.rank !== LFUnode.rank + 1) nxtLFUnode = this.LFUinsert(LFUnode, LFUnode.rank + 1);
  LFUnode.remove(node);
  nxtLFUnode.insert(node);
};

LFUCache.prototype.put = function (key, value) {
  if (!this.capacity) return;
  let node = this.cache[key];
  if (node) {
    node.val = value;
    this.increaseCount(key);
    return value;
  };
  if (this.size === this.capacity) this.pop();

  node = new Node(key, value);
  let fstLFUNode = this.head.next;
  if (fstLFUNode.rank !== 1) fstLFUNode = this.LFUinsert(this.head, 1);

  node.lfu = fstLFUNode;

  fstLFUNode.insert(node);

  this.cache[key] = node;
  this.size++;
};

LFUCache.prototype.pop = function () {
  let node = this.head.next.pop();
  this.size--;
  delete this.cache[node.key];
  return node.val;
}

LFUCache.prototype.LFUinsert = function (prevNode, rank) {
  let temp = new LFUnode(rank);
  temp.next = prevNode.next;
  temp.prev = prevNode;
  prevNode.next.prev = temp;
  prevNode.next = temp;

  return temp;
};

let cache = new LFUCache(2);
console.log('put(1, 1)', cache.put(1, 1));
console.log('put(2, 2)', cache.put(2, 2));
console.log('get(1)', cache.get(1), 'expected', 1);       // returns 1
console.log('put(3, 3)', cache.put(3, 3));    // evicts key 2
// this.caches[2].
// console.log('this.caches[2]', cache.cache[2].lfu.rank)
// console.log('this.caches[1]', cache.cache[1].lfu.rank)
console.log('get(2)', cache.get(2), 'expected', -1);       // returns -1 (not found)
console.log('get(3)', cache.get(3),'expected',3);       // returns 3.
console.log('put(4, 4)', cache.put(4, 4));    // evicts key 1.
console.log('get(1)', cache.get(1), 'expected', -1);       // returns -1 (not found)
// console.log('cache.head==', cache.head)
// let one = cache.head.next
// console.log('cache.head.next.prev==', one.next)
// console.log('')
// console.log('rank =====',cache.cache[3].lfu.rank)
console.log('get(3)', cache.get(3), 'expected', 3);// returns 3
console.log('get(4)', cache.get(4), 'expected', 4); // returns 4


// freq:  1  2   3
//        4  3 
//           1
//              
       