import mysql from "mysql2";
import dotenv from "dotenv";


dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "hopper.proxy.rlwy.net",
  port: process.env.DB_PORT || "10852",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "railway",
  password: process.env.DB_PASSWORD || "BeBeLboUXeGNyITkIspfzLYpejycICbH"
});



db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

export default db;


