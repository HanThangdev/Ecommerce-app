const Product = require("../models/productModel");
const ErrorHandle = require("../utils/errorHander");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeature = require("../utils/apifearture")
//Create product
exports.CreateProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(200).json({
        success:true,
        product
    })
})

//Get all product
exports.GetAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 5

    const productCount =await Product.countDocuments();

    const apiFeature = new ApiFeature(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success:true,
        products,
        productCount
    })
})

//Get product details
exports.GetProductDetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandle("Product not found", 404));
    }

    res.status(200).json({
        success:true,
        product
    })
})

//Update Product
exports.UpdateProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandle("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
    })

    res.status(200).json({
        success:true,
        product
    })
})

//Delete Product
exports.DeleteProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandle("Product not found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product delete successfully"
    })
})

