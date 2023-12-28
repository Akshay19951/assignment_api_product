const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true
    },
    description: {
        type:String, 
        required: true
    },
    price: {
        type:Number, 
        required: true
    },
    quantity: {
        type:Number, 
        required: true
    }
})

const ProductModel = mongoose.model("Products", productSchema)

module.exports = {
    ProductModel,
    getProducts: async(offset, size, sort) => {
        return await ProductModel.find({})
                                .skip(offset)
                                .limit(size)
                                .sort(sort)
    },
    insertProduct: async (data) => await ProductModel.create(data),
    getProductById: async (id) => await ProductModel.find({_id: id}),
    updateProductById: async(id, data) => await ProductModel.findByIdAndUpdate(id, data),
    deleteProductById: async(id) => await ProductModel.findByIdAndDelete({_id:id})
}