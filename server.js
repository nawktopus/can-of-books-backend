'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const Book = require('./books.js');

mongoose.connect(process.env.DB_KEY);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {

  response.status(200).send('Welcome to Our Server!');

});

app.get('/books', getBooks);

app.post('/books', postBooks);

app.delete('/books/:bookID', deleteBooks);

app.put('/books/:bookID', updateBook);

async function getBooks(request, response, next){
  try {
    let results = await Book.find();
    console.log(results);

    response.status(200).send(results);
  } catch (error) {
    next(error);
  }
}

async function postBooks(request, response, next) {
  try {
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
  } catch (error) {
    next(error);
  }
}

async function deleteBooks(request, response, next){
  try {
    let id = request.params.bookID;
    await Book.findByIdAndDelete(id);
    response.status(200).send('Book was deleted');
  } catch (error) {
    next(error);
  }
}

async function updateBook(request, response, next){
  try {
    // REQUEST.PARAMS & REQUEST.BODY
    let id = request.params.bookID;
    let data = request.body;

    //findByIdAndUpdate - 3 arguments
    //1. id of the thing to update
    //2. update date
    //3.option object - { new: true, overwrite: true}

    const updatedBook = await Book.findByIdAndUpdate(id, data, { new: true, overwrite: true});

    response.status(201).send(updatedBook);

  } catch (error) {
    next(error);

  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
