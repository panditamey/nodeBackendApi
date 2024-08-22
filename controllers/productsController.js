import pool from "../db/db.js";

const getProducts = async (req, res) => {
    try {
       const selectProductsQuery = "SELECT * FROM amey.products";

       const products = await pool.query(selectProductsQuery);
       if(products.rowCount>1 ){
        return res.status(200).json(products.rows);
       }
       else {
        return res.status(404).json({error: 'No products found'})
       }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Something went wrong'})
    }
}


export { getProducts };