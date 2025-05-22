// routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.post('/add', bookController.addBook);
router.delete('/delete/:id', bookController.deleteBook)
router.get('/book/:id', bookController.getBook)
router.put('/edit/:id', bookController.updateBook)
module.exports = router;
