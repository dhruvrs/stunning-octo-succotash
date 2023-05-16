const express = require('express');
const bodyParser = require('body-parser');
const NeDB = require('nedb');

let db = new NeDB({ filename: 'your_database.db', autoload: true });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
    <form method="POST" action="/search">
        <input type="text" name="search_term">
        <input type="submit" value="Search">
    </form>
    `);
});

app.post('/search', (req, res) => {
    let searchTerm = req.body.search_term;
    db.find({ your_column: new RegExp(searchTerm) }, (err, docs) => {
        if(err) {
            console.error(err);
            res.status(500).send('An error occurred during the search. Please try again later.');
        } else {
            res.json(docs);
        }
    });
});

app.listen(3000, () => console.log('App listening on port 3000'));
