import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});




db.connect((err) => {
  if (err) {
      console.error("Error al concetar en la base de datos", err)
          return;
    }
    console.log("conectado a la base de datos MYSQL")
});

export default db;