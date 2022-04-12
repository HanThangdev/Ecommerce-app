const Product = require("../models/productModel");

//Create product
exports.CreateProduct = async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
}

//Get all product
exports.GetAllProducts = async (req, res) => {

    const products = await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}

//Get product details
exports.GetProductDetails = async (req, res, next) => {
    let product = Product.findById(req.params.id);


    if(!product) {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    res.status(200).json({
        success:true,
        product
    })
}

//Update Product
exports.UpdateProduct = async(req, res, next) => {
    let product = Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
    })

    res.status(200).json({
        success:true,
        product
    })
}

//Delete Product
exports.DeleteProduct = async(req, res, next) => {
    let product = Product.findById(req.params.id);

    if(!product) {
        return res.status(500).json({
            success:false,
            message:"Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:"Product delete successfully"
    })
}

