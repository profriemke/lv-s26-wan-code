const fs = require('fs')




let data = fs.readFileSync('mein_text.txt')
console.log(data.toString())