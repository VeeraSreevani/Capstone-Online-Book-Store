import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        index:true
    },
    wishlistItems:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Book',
                required:true
            }
        }
    ]
},
{
    timestamps:true
}
)
export default mongoose.model('Wishlist',wishlistSchema)