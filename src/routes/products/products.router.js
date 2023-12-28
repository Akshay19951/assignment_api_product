const express = require("express")
const { isAuthenticated } = require("../../middlewares/token_validate")
const { 
    getAllProducts,
    createProduct,
    getProductByIdDetail,
    updateProductByIdDetail,
    removeProductById
} = require("./products.controller")
const router = express.Router();

router.get('/product', getAllProducts)
router.post('/product', isAuthenticated, createProduct)
router.get('/product/:id', getProductByIdDetail)
router.patch('/product/:id', isAuthenticated, updateProductByIdDetail)
router.delete('/product/:id', isAuthenticated, removeProductById)

module.exports = router