//условимся, что нумерация букв в строке S начинается с 1
let fs = require('fs');
let arg = process.argv;

let S = fs.readFileSync(arg[2], 'utf8');
S.toString();
let n = S.length;
console.log('string: ' + S);

let T = fs.readFileSync(arg[3], 'utf8');
T.toString();
let m = T.length;
console.log('substring: ' + T);

let Shift1 = new Array();
for (let i = 0; i < T.length; i++)
    Shift1[T[i]] = i;

let Shift2 = new Array();
for (let i = 0; i < m + 1; i++)
    Shift2[i] = 0;
let f = new Array();
let k = m + 1;
f[m] = k;
for (let i = m; i > 0; i--) {
    while (k <= m && T[i - 1] != T[k - 1]) {
        if (Shift2[k] == 0)
            Shift2[k] = k - i;
        k = f[k];
    }
    k--;
    f[i - 1] = k;
}
let prefCount = f[0];
for (let i = 0; i <= m; i++) {
    if (Shift2[i] == 0)
        Shift2[i] = prefCount;
    if (i == prefCount)
        prefCount = f[prefCount];
}

let result = new Array();
let i = 0;
while (i <= n - m) {
    for (j = m - 1; j >= 0 && T[j] == S[i + j]; j--);
        if (j < 0) {
            result.push(i);
            i += Shift2[j + 1];
        }
		else 
            i += Math.max(Shift2[j + 1],((Shift1[S[i + j]]) ? Math.max(j - Shift1[S[i + j]], 1) : j));
}

if (result.length == 0)
    console.log('no substring found in string');

else {
    for (let i = 0; i < result.length; i++) 
		console.log('substring occurred in the string starting from the ' + (result[i] + 1) + ' character');
}
