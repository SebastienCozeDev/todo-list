const express = require('express');
const app = express();
const post = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('todolist');
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});