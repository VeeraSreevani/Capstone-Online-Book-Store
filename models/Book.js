import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    bookId: { 
        type: String,
        required: true,
        unique: true
     },
    title:{
        type: String,
        // required: true
    },
    authors:{
        type: [String], // Array of authors
        // required: true,
    },
    thumbnail: {
        type: String, //image url
        // required: true
    },
    category:{
        type: String,   //fiction, non-fiction
        //required: true
    },
    publishedDate:{
        type: String,
        // required: true
    },
    description:{
        type: String,
        //required: true,
    },
    price:{
        type: Number,
        //required: true
    },
    rating:{
        type: Number,
        // required: true
    }  
},
{
    timestamps:true
} );

export default mongoose.model('Book', bookSchema);