import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();


/**
 * POST create a new user
 */
userRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation for email or password format
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: e.message });
  }
});


/**
 * GET get all users
 */
userRouter.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
})

/**
 * GET user by the id
 */
userRouter.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        
    }
});

userRouter.patch('/:id', async(req,res)=>{
  try {
    const updates =req.body;
    const user = await User.findByIdAndUpdate
    (req.params.id, updates, {new:true});
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    res.json(user);
  } catch(error){
    console.error(error);
    res.status(400).json({message: error.message});
  }
});

userRouter.delete('/:id', async(req,res)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      return res.status(404).json({message: 'User not found'});
    }
    res.json({message: 'User deleted successfully'});
  } catch(error){
    console.error(error);
    res.status(500).json({message: error.message});
  }
});

export default userRouter;