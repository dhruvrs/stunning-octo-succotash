const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'books.db', autoload: true });

app.use(express.static('public'));
app.use(express.json());

// Import CSV data and populate the database
fs.createReadStream('/Users/dhruvsridhar/Developer/bookProject/stunning-octo-succotash/updateBooks.csv')
  .pipe(csv())
  .on('data', (data) => {
    db.insert(data);
  })
  .on('end', () => {
    console.log('CSV data imported into the database.');
  });

app.post('/search', (req, res) => {
  const query = req.body;
  db.find(query, (err, books) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while searching for books.' });
      return;
    }
    res.json(books);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
