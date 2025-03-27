import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index:true
      
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      // required:true,
      // minlength: 8, 
      // maxlength: 20,
      // match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
     
    }
    // cart:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref:'Cart'
    // },
    // wishlist:{
    //   type:mongoose.Schema.Types.ObjectId, 
    //   ref: 'Wishlist'
    // }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", userSchema);




// if the field is marked as "unique: true" 
// we don't need to create and index:
//  https://mongoosejs.com/docs/guide.html#indexes
// userSchema.index({username: 1});
// userSchema.index({email: 1});
//module.exports = mongoose.model('User', userSchema);