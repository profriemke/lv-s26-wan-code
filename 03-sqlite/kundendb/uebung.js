const Database = require('better-sqlite3')

const kunden_db = new Database('./kunde.sqlite')

let stadt
let kunden

const kundenInStadt = kunden_db.prepare('SELECT * FROM kunde WHERE ort=?')


stadt = 'Stuttgart'
kunden = kundenInStadt.all(stadt)
console.log(kunden)

stadt = 'München'
kunden = kundenInStadt.all(stadt)
console.log(kunden)

stadt = 'Hamburg'
kunden = kundenInStadt.all(stadt)
console.log(kunden)

stadt = 'Paderborn'
kunden = kundenInStadt.all(stadt)
console.log(kunden)