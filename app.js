const express = require('express');
const app = express();
const port = 3000;
const actualYear = new Date().getFullYear();

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

app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.post('/task', (req, res) => {
    tasks.push({
        title: req.body.task,
        done: false
    });
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('todolist', { tasks, actualYear });
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});