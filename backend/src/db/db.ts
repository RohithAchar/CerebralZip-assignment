import mysql from "mysql2";
import dotenv from "dotenv";
import { RowDataPacket } from "mysql2";

dotenv.config();

// Database connection
export const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "yourpassword",
});
// Check database connection
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to the database.");
  }
});

// Get data from the database
export const getDataFromDB = (): Promise<RowDataPacket[]> => {
  // Select the database
  db.query("USE sales_table");
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM sales_data", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results as RowDataPacket[]); // Explicitly cast as RowDataPacket[]
      }
    });
  });
};

export const deleteDataFromDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM sales_data", (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
