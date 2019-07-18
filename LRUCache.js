// 146. LRU Cache
// Medium

// 3180

// 114

// Favorite

// Share
// Design and implement a data structure for Least Recently Used(LRU) cache.It should support the following operations: get and put.

//   get(key) - Get the value(will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present.When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

// The cache is initialized with a positive capacity.

// Follow up:
// Could you do both operations in O(1) time complexity ?

//   Example :

//   LRUCache cache = new LRUCache(2 /* capacity */);

// cache.put(1, 1);
// cache.put(2, 2);
// cache.get(1);       // returns 1
// cache.put(3, 3);    // evicts key 2
// cache.get(2);       // returns -1 (not found)
// cache.put(4, 4);    // evicts key 1
// cache.get(1);       // returns -1 (not found)
// cache.get(3);       // returns 3
// cache.get(4);       // returns 4
var Node = function (val = null, key = null, next = null, prev = null) {
  this.val = val;
  this.key = key;
  this.next = next;
  this.prev = prev;
}
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.size = 0;
  this.head = null;
  this.tail = null;
  this.cache = {};
};
LRUCache.prototype.get = function (key) {
  let node = this.cache[key];
  if (node === undefined) return -1;
  this.put(key, node.val);

  return node.val;
};

LRUCache.prototype.remove = function (key) {
  let node = this.cache[key];
  if (node === undefined) return;

  if (node === this.tail) {
    this.tail = this.tail.prev;
    if (this.size === 0) this.head = null;
    delete this.cache[key];
    this.size--;
    return node;
  }

  if (node.next) {
    node.next.prev = node.prev;
  };

  if (node.prev) {
    node.prev.next = node.next;
  };

  delete this.cache[key];
  this.size--;
  return node;
}


LRUCache.prototype.put = function (key, value) {
  this.remove(key);
  if (this.capacity === this.size) this.remove(this.tail.key);
  
  let node = new Node(value, key);
  if (this.size === 0) {
    this.head = node;
    this.tail = node;
  } else if (this.size === 1) {
    this.head = node;
    this.tail.prev = node;
    this.head.next = this.tail;
  } else {
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
  }

  this.size += 1;
  this.cache[key] = node;
};

// ________________________________________________________

// // var Node = function(key=null, val=null, next=null, prev=null) {
// //     this.key = key;
// //     this.val = val;
// //     this.next = next;
// //     this.prev = prev;
// // }

// var LRUCache = function (capacity) {
//   this.capacity = capacity;
//   this.cache = new Map();
// };
// // this.capacity = capacity;
// // this.head = null;
// // this.tail = null;
// // this.size = 0;
// // this.hsh = {};

// LRUCache.prototype.get = function (key) {
//   let val = this.cache.get(key);
//   if (val !== undefined) {
//     this.cache.delete(key);
//     this.cache.set(key, val);
//   }

//   return val || -1;
// };
// // let node = this.hsh[key];
// // if(node) {
// //   this.put(key, node.val)
// //     return node.val;
// // }
// // return -1;

// LRUCache.prototype.put = function (key, value) {
//   let val = this.cache.get(key);
//   if (val !== undefined) {
//     this.cache.delete(key);
//   }
//   this.cache.set(key, value);

//   if (this.cache.size > this.capacity) {
//     let iterator = this.cache.keys();
//     this.cache.delete(iterator.next().value);
//   }
// };
// var LRUCache = function (capacity) {

// };

// //     if(this.hsh[key]) this.remove(key);

// //     if(this.size === this.capacity) this.remove(this.tail.key);

// //     let node = new Node(key, value);

// //     if(!this.head && !this.tail) {
// //         this.head = node;
// //         this.tail = node;
// //     // }else if(this.size === 1) {
// //     //     node.next = this.tail;
// //     //    this.head =  node;
// //     }else {
// //         node.next = this.head;
// //         this.head.prev = node;
// //         this.head = node;
// //     }
// //     this.size += 1;
// //     this.hsh[key] = node;

// // LRUCache.prototype.remove = function(key) {
// //     const node = this.hsh[key];

// //     if(node.next) {
// //         node.next.prev = node.prev;
// //     }else {
// //         this.tail = node.prev;
// //     }

// //     if(node.prev) {
// //         node.prev.next = node.next;
// //     }else {
// //         this.head = node.next;
// //     }

// //     delete this.hsh[key];
// //     this.size--;
// // };
