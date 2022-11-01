'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_KEY);

const Book = require('./books.js');

async function seed() {

  await Book.create({
    title: 'Nineteen Eighty-Four',
    description: 'Nineteen Eighty-Four is a dystopian social science fiction novel and cautionary tale written by the English writer George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime.',
    status: true,
  });

  console.log('Book 1 was created');

  await Book.create({
    title: 'The Catcher in the Rye',
    description: ' The Catcher in the Rye is an American novel by J. D. Salinger that was partially published in serial form from 1945 - 1946 before being novelized in 1951. Originally intended for adults, it is often read by adolescents for its themes of angst and alienation, and as a critique of superficiality in society.',
    status: true,
  });

  console.log('Book 2 was created');

  await Book.create({
    title: 'The Great Gatsby',
    description: ' The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
    status: false,
  });

  console.log('Book 3 was created');

  mongoose.disconnect();

}

seed();
