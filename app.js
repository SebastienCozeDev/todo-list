const express = require('express');
const app = express();
const port = 3000;

const tasks = [
    {
        title: "Apprendre à programmer",
        done: false,
    },
    {
        title: "Faire les courses",
        done: true,
    },
];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('todolist', { tasks });
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});