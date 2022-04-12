const express = require("express");
const { GetAllProducts, CreateProduct, UpdateProduct, DeleteProduct, GetProductDetails } = require("../controller/productController");

const router = express.Router();

router.route("/products").get(GetAllProducts);

router.route("/products/new").post(CreateProduct);

router.route("/products/:id").put(UpdateProduct).delete(DeleteProduct);

router.route("/products/:id").get(GetProductDetails)



module.exports = router
