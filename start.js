const fs = require('fs');
const csv = require('csv-parser');
const NeDB = require('nedb');

let db = new NeDB({ filename: 'books.db', autoload: true });

fs.createReadStream('updateBooks.csv')
.pipe(csv())
.on('data', (data) => {
    db.insert(data, function(err) {
        if (err) console.log(err);
    });
});
