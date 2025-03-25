import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    cartItems:[
        {
            bookId:{
                type: String,
                required:true
            },
            quantity:{
                type:Number,
                default:1,
                min:1,
                max:20,
                required:true
            }
        }
    ]
},
{
    timestamps:true
})
cartSchema.index({userId:1})
export default mongoose.model('Cart',cartSchema)