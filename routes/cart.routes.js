import express from 'express';
import Cart from '../models/Cart.js';

const cartRouter = express.Router();

//! POST create a new cart()
cartRouter.post('/', async (req, res) => {
  try {
    const { userId, bookId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, cartItems: [{ bookId, quantity }] });
    } else {
      // Update existing cart: check if item already in cart, if yes, increment quantity
      const existingItem = cart.cartItems.find(item => item.bookId.toString() === bookId);
      if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity
      } else {
        cart.cartItems.push({ bookId, quantity }); // Add new item
      }
    }

    await cart.save(); // Save the cart
    res.status(201).json(cart);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//! GET get cart items by UserId
cartRouter.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({userId});//find cart for the user

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart.cartItems); //send only the cart items
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

//! PATCH update a cart item    
cartRouter.patch('/:userId/item/:bookId', async (req, res) => {
  try {
    const {userId,bookId} = req.params;
    const {quantity} = req.body;
    const cart = await Cart.findOne({userId});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    } 
    const Item = cart.cartItems.find(item => item.bookId.toString() === bookId);
    if (!Item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const cartItem = await Cart.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    } 
    Item.quantity = quantity; //update quantity
    await cart.save();
    res.json(cart); //return updated cart
    }  catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message});
    }
});
// Decrement Item Quantity (auto-remove if quantity is 0)
cartRouter.patch('/:userId/item/:bookId/decrement', async (req, res) => {
  try {
    const {userId, bookId} = req.params;
    const cart = await Cart.findOne({userId});
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    const itemIndex = cart.cartItems.findIndex(item => item.bookId.toString() === bookId);
    if (itemIndex===-1) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const item = cart.cartItems[itemIndex];
    item.quantity -= 1; // Decrement quantity

    if (item.quantity <= 0) {
      cart.cartItems.splice(itemIndex, 1); // Remove item if quantity is 0
    } 
    await cart.save();
    res.json(cart); // Return updated cart
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

//! DELETE a cart item  
cartRouter.delete('/:userId/item/:bookId', async (req, res) => {
  try {
    const {userId, bookId} = req.params;

    const cart = await Cart.findOne({userId});
   if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    cart.cartItems = cart.cartItems.filter(item => item.bookId.toString() !== bookId);
    await cart.save();
    res.json(cart);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error deleting cart item' });
  }
});
export default cartRouter;