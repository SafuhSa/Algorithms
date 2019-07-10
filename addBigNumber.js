function add(str1, str2) {
   str1 = str1.split('.');
   str2 = str2.split('.');

  let ldec = str1[1] || '0';
  let sdec = str2[1] || '0';

  if(sdec.length > ldec.length) {
    let temp = ldec;
    ldec = sdec;
    sdec = temp;
  }

  let result = ''
  let carry  = 0;

  for (let i = 0; i < ldec.length; i++) {
    let idx = ldec.length - 1 - i;
    let num1 = ldec[idx];
    let num2 = sdec[idx] || "0";
    sum = (parseInt(num1) + parseInt(num2) + carry);
    carry = 0;
    if(sum >= 10) {
      sum-=10;
      carry = 1;
    }
    result = (sum + "") + result;
}

if(result.length) {
  result = '.' + result;
}

  let lstr = str1[0] || "0";
  let sstr = str2[0] || "0";
  if(lstr.length < sstr.length) {
    let temp = lstr;
    lstr = sstr;
    sstr = temp;
  }


  for(let i = 0; i < lstr.length; i++) {
    let num1 = lstr[lstr.length - 1 - i];
    let num2 = sstr[sstr.length - 1 - i] || "0";
    sum = (parseInt(num1) + parseInt(num2) + carry);
    carry =0;
    if (sum >= 10) {
      sum -= 10;
      carry = 1;
    }
    result = (sum + "") + result;
  }
  return result;
}

console.log('3.14, 0.9', add("3.14", "0.9"))
console.log('3.0014, 0.00009', add("3.0014", "0.00009"))
console.log('3.14, 0.90000', add("3.14", "549.90000"))