const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;
const actualYear = new Date().getFullYear();

/*
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
*/

app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'CA5D315486AD34CDA99A166D4943C',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');

app.post('/task', (req, res) => {
    if (req.body.task) {
        req.session.tasks.push({
            title: req.body.task,
            done: false
        });
    };
    console.log(req.session.tasks);
    res.redirect('/');
});

app.get('/task/:id/done', (req, res) => {
    if (req.session.tasks[req.params.id]) {
        req.session.tasks[req.params.id].done = true;
    }
    console.log(req.session.tasks);
    res.redirect('/');
});

app.get('/task/:id/delete', (req, res) => {
    if (req.session.tasks[req.params.id]) {
        req.session.tasks.splice(req.params.id, 1);
    }
    console.log(req.session.tasks);
    res.redirect('/');
});

app.get('/', (req, res) => {
    console.log(req.session.tasks);
    if (!req.session.tasks) {
        req.session.tasks = [
            {
                title: "Aller sur Todo List",
                done: true,
            },
            {
                title: "Ajouter mes premières tâches",
                done: false,
            },
        ];
    }
    console.log(req.session.tasks);
    res.render('todolist', {
        tasks: req.session.tasks,
        actualYear,
        agreeWithCookie: req.session.agreeWithCookie,
    });
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});