const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
db.all('SELECT * FROM students', [], (err, rows) => {
if (err) {
return console.error(err.message);
}
res.render('index', { students: rows });
});
});
app.post('/submit', (req, res) => {
const submittedName = req.body.studentName;
const submittedEmail = req.body.studentEmail;
const submittedProgram = req.body.program;
const submittedPhone = req.body.phone;
const submittedIcNumber = req.body.icNumber;
db.run(
'INSERT INTO students (name, email, program, phone, icNumber) VALUES (?, ?, ?, ?, ?)',
[submittedName, submittedEmail, submittedProgram, submittedPhone, submittedIcNumber],
(err) => {
if (err) {
return console.error(err.message);
}
res.redirect('/');
}
);
});
app.listen(PORT, () => {
console.log(`Server is successfully running on port ${PORT}`);
});