const express = require('express');
const session = require('express-session');
const fs = require('fs');
const app = express();
const port = 3000;
const actualYear = new Date().getFullYear();

app.use('/static', express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const logRequest = (req, res, next) => {
    fs.open('request.log', 'w', () => {
        fs.appendFile('request.log', `> ${new Date().toLocaleTimeString()} - ${req.ip} - [${req.method}] ${req.originalUrl}`, function (err) {});
    });
    next();
};

app.use(logRequest);

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
    res.redirect('/');
});

app.get('/task/:id/done', (req, res) => {
    if (req.session.tasks[req.params.id]) {
        req.session.tasks[req.params.id].done = true;
    }
    res.redirect('/');
});

app.get('/task/:id/delete', (req, res) => {
    if (req.session.tasks[req.params.id]) {
        req.session.tasks.splice(req.params.id, 1);
    }
    res.redirect('/');
});

app.get('/agree', (req, res) => {
    req.session.agreeWithCookie = true;
    res.redirect('/');
});

app.get('/', (req, res) => {
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
    res.render('todolist', {
        tasks: req.session.tasks,
        actualYear,
        agreeWithCookie: req.session.agreeWithCookie,
    });
})

app.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}`);
});