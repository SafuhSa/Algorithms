function sherlockAndAnagrams(s) {
  let count = 0;
  let hsh = {};

  for(let i = 0; i < s.length; i++) {
    let arr = new Array(26).fill(0);
    for(let j = i; j < s.length; j++) {
      let char = s[j];
      arr[char.charCodeAt(0)-97]++;
      let sig = arr.join();
      // console.log(count, hsh, sig)
      if(hsh[sig]) {
        count += hsh[sig];
        hsh[sig]++;
      }else {
        hsh[sig] = 1;
      }
    }
  }
  return count;
};

let s = 'abba';
let res = 4;
console.log('s', s, sherlockAndAnagrams(s), 'expected', res);
s = 'abcd';
res = 0;
console.log('s', s, sherlockAndAnagrams(s), 'expected', res);
s = 'ifailuhkqq';
res = 3;
console.log('s', s, sherlockAndAnagrams(s), 'expected', res);
s = 'kkkk';
res = 10;
console.log('s', s, sherlockAndAnagrams(s), 'expected', res);
s = 'cdcd';
res = 5;
console.log('s', s, sherlockAndAnagrams(s), 'expected', res);
