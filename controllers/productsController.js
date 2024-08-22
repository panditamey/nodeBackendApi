import pool from "../db/db.js";

const getProducts = async (req, res) => {
  try {
    const selectProductsQuery = "SELECT * FROM amey.products";

    const products = await pool.query(selectProductsQuery);
    if (products.rowCount > 1) {
      return res.status(200).json(products.rows);
    } else {
      return res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getProductsById = async (req, res) => {
  try {
    const id = req.params.id;
    const selectProductQuery = `SELECT * FROM amey.products WHERE product_id = ${id}`;
    const products = await pool.query(selectProductQuery);

    if (products.rowCount > 0) {
      return res.status(200).json(products.rows);
    } else {
      return res.status(404).json({ error: "No product found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export { getProducts, getProductsById };
