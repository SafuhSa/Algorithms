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
  this.size--;
  if (this.size === 0) this.removeSelf();
  return node;
};
LFUnode.prototype.insert = function (node) {
  this.size++;
  node.next = this.head.next;
  node.prev = this.head;
  this.head.next.prev = node;
  this.head.next = node;
};

var Node = function (key = null, val = null, lfu = null, next = null, prev = null) {
  this.key = key;
  this.val = val;
  this.next = next;
  this.prev = prev;
  this.lfu = lfu;
}

var LFUCache = function (capacity) {
  this.capacity = capacity;
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
  console.log(node)
  let prev = node.lfu;
  let curr = prev.next;
  if (!curr || curr.rank !== prev.rank + 1) curr = this.LFUinsert(prev, prev.rank + 1);
  prev.remove(node);
  curr.insert(node);
};

LFUCache.prototype.put = function (key, value) {
  let node = this.cache[key];
  if (node) {
    node.val = value;
    this.increaseCount(key);
    return value;
  };

  if (this.size === this.capacity) this.pop();
  node = new Node(key, value);

  let firstCntNode = this.head.next;
  if (firstCntNode.rank !== 1) firstCntNode = this.LFUinsert(this.head, 1);

  node.lfu = firstCntNode;

  firstCntNode.insert(node);

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
}