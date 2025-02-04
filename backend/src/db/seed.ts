import { db } from "./db";

const customerDevice = [
  { date: "2024-01", webSales: 2000, offlineSales: 1000 },
  { date: "2024-02", webSales: 2400, offlineSales: 1500 },
  { date: "2024-03", webSales: 3000, offlineSales: 2000 },
  { date: "2024-04", webSales: 3200, offlineSales: 2500 },
  { date: "2024-05", webSales: 4000, offlineSales: 3000 },
  { date: "2024-06", webSales: 7500, offlineSales: 3500 },
];

const products = [
  {
    id: 1,
    name: "Camera MI 360°",
    imageUrl:
      "https://imgs.search.brave.com/XG1xLLDkGgqSE5W8f9TWulAr6zcWsWF_7I-me8d2Maw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNi9EaWdp/dGFsLVNMUi1DYW1l/cmEtUE5HLUltYWdl/LnBuZw", // MI 360° Camera
    soldAmount: 432,
    unitPrice: 120,
    revenue: 51840,
    rating: 4.81,
  },
  {
    id: 2,
    name: "Massage Gun",
    imageUrl:
      "https://imgs.search.brave.com/Fn8yAoI95Hg-jZ16Edl9Iftgdu53k_DMVbSk1vuTqeM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5naXRlbS5jb20v/cGltZ3MvbS8yODEt/MjgxMDAwM19tYXNz/YWdlLWd1bi1oZC1w/bmctZG93bmxvYWQu/cG5n", // Massage Gun
    soldAmount: 120,
    unitPrice: 112,
    revenue: 25440,
    rating: 3.44,
  },
  {
    id: 3,
    name: "Vacuum-Mop 2 Pro",
    imageUrl:
      "https://imgs.search.brave.com/hi3YgRZOzcfUSBhUMHPzTTSkkF-HDZ7_6Y1wj62zu1o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGlnaXRhbGNpdGl6/ZW4ubGlmZS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMi8wMy9t/aV9yb2JvdF92YWNj/dW1fbW9wMl9wcm8t/My5wbmc", // Vacuum-Mop 2 Pro
    soldAmount: 221,
    unitPrice: 320,
    revenue: 15123,
    rating: 3.22,
  },
  {
    id: 4,
    name: "Vacuum-Mop 2",
    imageUrl:
      "https://imgs.search.brave.com/doL5mqWtrxRcOGaI9dUjtncH22hZnZZeZkU_Ubl6i2s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pMDEu/YXBwbWlmaWxlLmNv/bS93ZWJmaWxlL2ds/b2JhbGltZy9wcm9k/dWN0cy9wYy9taS1y/b2JvdC12YWN1dW0t/bW9wLTIvaWNvbjAz/LnBuZw", // Vacuum-Mop 2
    soldAmount: 223,
    unitPrice: 234,
    revenue: 32812,
    rating: 3.0,
  },
];

const seed = async () => {
  try {
    // Create database if it doesn't exist
    await db.promise().query("CREATE DATABASE IF NOT EXISTS sales_table");

    // Use the database
    await db.promise().query("USE sales_table");

    // Create tables
    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS sales_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        month VARCHAR(10) NOT NULL,
        last_year INT NOT NULL,
        this_year INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS channel_sales (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date VARCHAR(7) NOT NULL,
        web_sales INT NOT NULL,
        offline_sales INT NOT NULL
      )
    `);

    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        sold_amount INT NOT NULL,
        unit_price INT NOT NULL,
        revenue INT NOT NULL,
        rating FLOAT NOT NULL
      )
    `);

    // Delete existing data
    await db.promise().query("DELETE FROM sales_data");
    await db.promise().query("DELETE FROM channel_sales");
    await db.promise().query("DELETE FROM products");

    // Insert yearly comparison data
    await db.promise().query(`
      INSERT INTO sales_data (month, last_year, this_year) VALUES 
      ('Jan', 5000, 6000), 
      ('Feb', 10000, 2000), 
      ('Mar', 20000, 40000), 
      ('Apr', 32000, 21000), 
      ('May', 12000, 9200), 
      ('Jun', 13000, 8700)
    `);

    // Insert channel sales data
    const channelSalesValues = customerDevice
      .map(
        ({ date, webSales, offlineSales }) =>
          `('${date}', ${webSales}, ${offlineSales})`
      )
      .join(", ");

    await db.promise().query(`
      INSERT INTO channel_sales (date, web_sales, offline_sales)
      VALUES ${channelSalesValues}
    `);

    // Insert products data
    const productValues = products
      .map(
        ({ id, name, imageUrl, soldAmount, unitPrice, revenue, rating }) =>
          `(${id}, '${name}', '${imageUrl}', ${soldAmount}, ${unitPrice}, ${revenue}, ${rating})`
      )
      .join(", ");

    await db.promise().query(`
      INSERT INTO products (id, name, image_url, sold_amount, unit_price, revenue, rating)
      VALUES ${productValues}
    `);

    console.log("Database seeded successfully ✅");

    // Verify the data
    const [yearlyResults] = await db
      .promise()
      .query("SELECT * FROM sales_data");
    const [channelResults] = await db
      .promise()
      .query("SELECT * FROM channel_sales");
    const [productResults] = await db.promise().query("SELECT * FROM products");

    console.log("\nYearly Comparison Data:");
    console.table(yearlyResults);

    console.log("\nChannel Sales Data:");
    console.table(channelResults);

    console.log("\nProducts Data:");
    console.table(productResults);
  } catch (err) {
    console.error("Error seeding database ❌", err);
  } finally {
    db.end(); // Close the DB connection
  }
};

seed();
