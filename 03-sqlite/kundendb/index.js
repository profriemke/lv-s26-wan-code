const Database = require('better-sqlite3')

const db = new Database('./kunde.sqlite')
let anzahl = 200
let ort='Stuttgart'
// never ever: const kunden = db.prepare("SELECT * FROM kunde WHERE ort='"+ort+"' LIMIT "+anzahl).all()
const kunden = db.prepare('SELECT * FROM kunde WHERE ort=? LIMIT ?').all(ort, anzahl)
for(i=0; i< kunden.length; i++){
    console.log(kunden[i].anrede, kunden[i].nachname, kunden[i].ort)
}