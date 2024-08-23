import bcrypt from "bcrypt";
import pool from "../db/db.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phonenumber } = req.body;
    // console.log(req.body); // to check if the data is coming
    const saltRounds = 8;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const query = `INSERT INTO amey.users (name, email, password, phonenumber) VALUES ('${name}', '${email}', '${hashedPassword}', '${phonenumber}') RETURNING *`;
    // console.log(query); // to check if the query is correct

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await pool.query(query);
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error Caught: " + error.message);
    return res
      .status(500)
      .json({ error: `Internal Server Error ${error.message}` });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const SECRET = process.env.JWT_SECRET;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = `SELECT * FROM amey.users WHERE email = '${email}'`;

    const result = await pool.query(query);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        SECRET,
        {
          expiresIn: "2m",
        }
      );
      return res.json({
        message: "Login successful",
        token: token,
      });
    }
  } catch (error) {
    console.error("Error Caught: " + error.message);
    return res
      .status(500)
      .json({ error: `Internal Server Error ${error.message}` });
  }
};

export { registerUser, loginUser };
