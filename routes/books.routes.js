import express from 'express';
import Book from '../models/Book.js';

const bookRouter = express.Router();

//! POST create a new book(post/api/books)
bookRouter.post("/", async (req, res) => {
  try {
    const { bookId, title, authors, thumbnail, category, description } = req.body;

    // Check if the book already exists
    let existingBook = await Book.findOne({ bookId });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = new Book({
      bookId,
      title,
      authors,
      thumbnail,
      category,
      description,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error });
  }
});
// bookRouter.post('/', async (req, res) => {
//   try { 
//     const book = new Book(req.body);//create a new book
//     await book.save();  //save the book
//     res.status(201).json(book);//send the saved book as response
//   } catch (e) {
//     console.error(e);
//     res.status(400).json({ message: e.message });
//   }
// });

//! GET get all books(GET/api/books)
bookRouter.get('/', async (req, res) => {
  try {
    const books = await Book.find();//fetch all books fm DB
    res.json(books);  //return list of books.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// GET book by the id(GET/api/books/:bookId)
bookRouter.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findOne({bookId:req.params.id});
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }       
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching book' });
  } 
});

//! PATCH update a book(PATCH/api/books/:bookId)
bookRouter.patch('/:bookId', async (req, res) => {
  try {
    const updates = req.body;
    const book = await Book
      .findOneAndUpdate({bookId:req.params.id}, updates, { new: true });    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }   
    res.json(book);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating book' });
    }
});

//! DELETE delete a book(DELETE/api/books/:bookId)
bookRouter.delete('/:bookId', async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({bookId:req.params.id});
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting book' });
  }
});
export default bookRouter;