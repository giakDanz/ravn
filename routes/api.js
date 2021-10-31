var express = require('express');
var router = express.Router();

const { Client } = require('pg');

const client = new Client({
    user: 'user',
    host: '',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

client.connect();


router.get('/get', function(req, res, next) {
    if(!req.query.cantidad){
        client.query('SELECT SUM(sale_items.quantity*sale_items.item_price) AS Monto, authors.name FROM sale_items INNER JOIN books ON sale_items.book_id = books.id INNER JOIN authors ON books.author_id = authors.id GROUP BY authors.name ORDER BY Monto LIMIT 10')
            .then(response => {
                res.send(response.rows)
            })
            .catch(err => {
                client.end()
            })
    }else{
        let val = req.query.cantidad
        client.query('SELECT SUM(sale_items.quantity*sale_items.item_price) AS Monto, authors.name FROM sale_items INNER JOIN books ON sale_items.book_id = books.id INNER JOIN authors ON books.author_id = authors.id GROUP BY authors.name ORDER BY Monto LIMIT $1', [val])
            .then(response => {
                res.send(response.rows)
            })
            .catch(err => {
                client.end()
            })
    }

});

module.exports = router;
