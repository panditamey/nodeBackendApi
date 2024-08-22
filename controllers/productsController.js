import pool from "../db/db.js";

const getProducts = async (req, res) => {
  try {
    const selectProductsQuery = "SELECT * FROM amey.products";

    const products = await pool.query(selectProductsQuery);
    if (products.rowCount > 0) {
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

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM amey.products WHERE product_id = ${id}`;
    const response = await pool.query(query);
    if (response.rowCount == 1) {
      return res.status(200).json({ message: "Product deleted successfully" });
    } else {
      return res.status(404).json({ error: "No product found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const selectQuery = `select * from amey.products where category ILIKE '${category}'`;
    const result = await pool.query(selectQuery);
    if (result.rowCount > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.log("Error Caught " + error?.message);
    return res.status(500).json({ error: "Internal Error" });
  }
};

const getProductsByPriceRange = async (req, res) => {
  try {
    const min = req.query.min;
    const max = req.query.max;
    const selectQuery = `select * from amey.products where price between $1 and $2`;
    const queryValues = [min, max];
    const result = await pool.query(selectQuery,queryValues);
    if (result.rowCount > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ error: "No products found" });
    }
  } catch (error) {
    console.log("Error Caught " + error?.message);
    return res.status(500).json({ error: "Internal Error" });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = req.body;
    const insertQuery = `INSERT INTO amey.products (product_name, price, category, star_rating, description, product_code, imageurl) VALUES ('${product.product_name}', ${product.price}, '${product.category}', ${product.star_rating}, '${product.description}', '${product.product_code}', '${product.imageurl}') RETURNING *`;
    const response = await pool.query(insertQuery);
    if (response.rowCount > 0) {
      return res.status(200).json({ message: "Product added successfully" ,
        product: response.rows[0]
      });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export {
  getProducts,
  getProductsById,
  deleteById,
  getProductsByCategory,
  getProductsByPriceRange,
  addProduct,
};
