const express = require('express');
const app = express();
const PORT = 3000;
app.get('/', (request, response) => {
 response.send('MILA IS THE BEST');
});
app.listen(PORT, () => {
 console.log(`Server is successfully running on port ${PORT}`);
});