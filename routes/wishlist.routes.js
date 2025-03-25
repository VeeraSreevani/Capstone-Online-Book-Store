import express from 'express';
import Wishlist from '../models/Wishlist.js';

const wishlistRouter = express.Router();

//! POST create a new wishlist
wishlistRouter.post("/", async (req, res) => {
  try {
    const { userId, bookId, title, authors, thumbnail } = req.body;

    // Check if the user already has a wishlist
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      // Create a new wishlist for the user
      wishlist = new Wishlist({ userId, wishlistItems: [] });
    }

    // Check if the book is already in the wishlist
    const bookExists = wishlist.wishlistItems.some((item) => item.bookId === bookId);

    if (!bookExists) {
      wishlist.wishlistItems.push({ bookId, title, authors, thumbnail });
      await wishlist.save();
      return res.status(201).json({ message: "Book added to wishlist", wishlist });
    }

    res.status(400).json({ message: "Book is already in the wishlist" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding book to wishlist" });
  }
});

//! GET get all wishlist items
wishlistRouter.get('/:userId', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wishlist items' });
  }
});

//! DELETE delete a wishlist item
wishlistRouter.delete('/:userId/:booId', async (req, res) => {
  try {
    const { userId, bookId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    // Remove the book from the wishlist
    wishlist.wishlistItems = wishlist.wishlistItems.filter((item) => item.bookId !== bookId);
    await wishlist.save();

    res.json({ message: "Book removed from wishlist", wishlist });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting wishlist item' });
  }
});
export default wishlistRouter;


// // GET wishlist item by the id
// wishlistRouter.get('/:id', async (req, res) => {
//   try {
//     const wishlistItem = await Wishlist.findById(req.params.id);
//     if (!wishlistItem) {
//       return res.status(404).json({ message: 'Wishlist item not found' });
//     }
//     res.json(wishlistItem);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching wishlist item' });
//   }
// });

// // PATCH update a wishlist item
// wishlistRouter.patch('/:id', async (req, res) => {
//   try {
//     const updates = req.body;
//     const wishlistItem = await Wishlist.findByIdAndUpdate(req.params.id, updates, { new: true });
//     if (!wishlistItem) {
//       return res.status(404).json({ message: 'Wishlist item not found' });
//     }
//     res.json(wishlistItem);
//     } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating wishlist item' });
//     }   
// });