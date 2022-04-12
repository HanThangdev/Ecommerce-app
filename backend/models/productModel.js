const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:[true, "Please Enter product name"]
    },
    description: {
        type:String,
        required:[true,"Please enter product description"]
    },
    price: {
        type: Number,
        required: [true,"Please enter product price"],
        maxLength:[8,"Price canit exceed 8 characters"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4, "Stock cannot exceed 4 character"],
        default:1
    },
    numOfReviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    createAt:{
        type:Date,
        default:Date.now 
    }

})

module.exports = mongoose.model("Product", productSchema)