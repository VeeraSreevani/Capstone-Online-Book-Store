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
                type:String,//book api id
                ref:'Book',
                required:true
            },
            // authors:{
            //     type:[String],
            //     required:true

            // },
            // thumbnail:{
            //     type:String,//book cover image url
            //     required:true
            // }
        }
    ]
},
{
    timestamps:true
})
wishlistSchema.index({userId:1,bookId:1})
export default mongoose.model('Wishlist',wishlistSchema)