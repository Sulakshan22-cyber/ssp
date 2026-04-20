const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./school.db', (err) => {
if (err) {
console.error("Database connection error:", err.message);
} else {
console.log('Connected to the SQLite database.');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    program TEXT,
    phone TEXT,
    icNumber TEXT
  )`);

  db.all(`PRAGMA table_info(students)`, [], (err, columns) => {
    if (err) {
      return console.error('Failed to read student table schema:', err.message);
    }

    const existingNames = columns.map((col) => col.name);
    const requiredFields = [
      { name: 'program', type: 'TEXT' },
      { name: 'phone', type: 'TEXT' },
      { name: 'icNumber', type: 'TEXT' },
    ];

    requiredFields.forEach((field) => {
      if (!existingNames.includes(field.name)) {
        db.run(`ALTER TABLE students ADD COLUMN ${field.name} ${field.type}`, (alterErr) => {
          if (alterErr) {
            console.error(`Failed to add column ${field.name}:`, alterErr.message);
          }
        });
      }
    });
  });
});
}
});
module.exports = db;
