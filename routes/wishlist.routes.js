import express from 'express';
import Wishlist from '../models/Wishlist.js';

const wishlistRouter = express.Router();

//! POST create a new wishlist
wishlistRouter.post('/', async (req, res) => {
  try {
    const wishlistItems = new Wishlist(req.body);
    await wishlistItems.save();
    res.status(201).json(wishlistItems);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});

//! GET get all wishlist items
wishlistRouter.get('/', async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find();
    res.json(wishlistItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wishlist items' });
  }
});

// GET wishlist item by the id
wishlistRouter.get('/:id', async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findById(req.params.id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching wishlist item' });
  }
});

//! PATCH update a wishlist item
wishlistRouter.patch('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const wishlistItem = await Wishlist.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.json(wishlistItem);
    } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating wishlist item' });
    }   
});

//! DELETE delete a wishlist item
wishlistRouter.delete('/:id', async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }
    res.json({ message: 'Wishlist item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting wishlist item' });
  }
});
export default wishlistRouter;