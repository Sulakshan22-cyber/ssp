const express = require('express');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
 res.render('index');
});
app.post('/submit', (req, res) => {
 const submittedName = req.body.studentName;
 const submittedEmail = req.body.studentEmail;
 const submittedPhoneNumber = req.body.phoneNumber;
 const submittedAge = req.body.age;
 const submittedReligion = req.body.religion;
 const submittedFatherName = req.body.fatherName;
 const submittedMotherName = req.body.motherName;
 
 res.render('success', { 
 name: submittedName, 
 email: submittedEmail,
 phoneNumber: submittedPhoneNumber,
 age: submittedAge,
 religion: submittedReligion,
 fatherName: submittedFatherName,
 motherName: submittedMotherName
 });
});
app.listen(PORT, () => {
 console.log(`Server is successfully running on port ${PORT}`);
});