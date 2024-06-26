import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Computer from "../models/Computer.js";

export const getProducts = async(req,res) =>{
    try{
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product)=>{
                const stat = await ProductStat.find({
                    productId: product._id
                })
                return{
                    ...product._doc,
                    stat,
                }
            })
        );
        res.status(200).json(productsWithStats);
    } catch(error){
        res.status(404).json({message: error.message})
    }
}

export const getComputers = async(req, res) =>{
    try{
        const computers =await Computer.find().sort('field').sort('location');
        res.status(200).json(computers);
    }catch(error){
        res.status(404).json({message: error.message})
    }
}