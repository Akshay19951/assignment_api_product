const { 
    ProductModel, 
    insertProduct, 
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} = require("../../models/products.model")

async function getAllProducts(req, res){
    try {
        const {page=1, size=20, sortBy='name', orderBy='asc'} = req.query
        const offset = (page-1)*size
        const sortOrder = orderBy.toLowerCase() === 'desc' ? -1 : 1;
        const sort = { [sortBy]: sortOrder };
        const products = await getProducts(offset, size, sort);
        return res.status(200).json(products);   
    } catch (error) {
        console.log(error)
    }
}

async function createProduct(req, res){
    try {
        const {name, description, price, quantity} = req.body;
        if(!name || !description || !price || !quantity) 
            return res.status(400).json({msg: "All fields required"})
        
        if(typeof name != "string") 
            return res.status(400).json({msg: "Please provide valid name"})
        
        if(typeof description != "string") 
            return res.status(400).json({msg: "Please provide valid description"})

        if(typeof price != "number") 
            return res.status(400).json({msg: "Please provide valid price"})

        if(typeof quantity != "number") 
            return res.status(400).json({msg: "Please provide valid quantity"})

        let data = {name, description, price, quantity};
        const result = await insertProduct(data)

        return res.status(201).json(result);
    } catch (error) {
        console.log(error)
    }
}

async function getProductByIdDetail(req, res){
    try {
        const {id} = req.params
        if(id > 0) res.status(400).json({msg:"Id is not valid!!"})

        const productById = await getProductById(id);
        if(productById && !productById[0]) 
            return res.status(200).json({msg: "Id not exists!!!"})

        const product = await getProductById(id)
        res.status(200).json(product[0]);
    } catch (error) {
        console.log(error)        
    }
}

async function updateProductByIdDetail(req, res){
    try {
        const {id} = req.params
        const {name, description, price, quantity} = req.body;
        const product = await getProductById(id)
        if(product && !product[0]) 
            return res.status(400).json({msg: "Id not exists!!!"})

        if(name)
            product[0].name = name;
        if(description)
            product[0].description = description;
        if(price)
            product[0].price = price;
        if(quantity)
            product[0].quantity = quantity;

        await updateProductById(id, product[0]);
        return res.status(200).json({msg:`${product[0].name} is updated.`, product: product[0]});
    } catch (error) {
        console.log(error)
    }
}

async function removeProductById(req, res){
    try {
        const {id} = req.params
        const productById = await getProductById(id);
        if(productById && !productById[0]) 
            return res.status(400).json({msg: "Id not exists!!!"})
        const deletedProduct = await deleteProductById(id)
        return res.status(200).json({msg: `${deletedProduct.name} deleted from records`});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getProductByIdDetail,
    updateProductByIdDetail,
    removeProductById
}