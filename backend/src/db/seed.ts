import { get } from "http";
import { db, deleteDataFromDB, getDataFromDB } from "./db";

const seed = async () => {
  try {
    await db.promise().query("CREATE DATABASE IF NOT EXISTS sales_table");
    await db.promise().query("USE sales_table");
    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS sales_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        month VARCHAR(10) NOT NULL,
        last_year INT NOT NULL,
        this_year INT NOT NULL
      )
    `);
    await deleteDataFromDB();
    const data = await getDataFromDB();
    await db.promise().query(`
      INSERT INTO sales_data (month, last_year, this_year) VALUES 
      ('Jan', 5000, 6000), 
      ('Feb', 10000, 2000), 
      ('Mar', 20000, 40000), 
      ('Apr', 32000, 21000), 
      ('May', 12000, 9200), 
      ('Jun', 13000, 8700)
    `);
    console.log("Database seeded successfully ✅");
  } catch (err) {
    console.error("Error seeding database ❌", err);
  } finally {
    db.end(); // Close the DB connection
  }
};

// Run the seed function
seed();
