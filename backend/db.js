import mysql from "mysql2";

const db = mysql.createConnection({
  host: "hopper.proxy.rlwy.net",
  user: "root",
  password: "BeBeLboUXeGNyITkIspfzLYpejycICbH*",
  database: "UBER",
});
db.connect((err) => {
  if (err) {
      console.error("Error al concetar en la base de datos", err)
          return;
    }
    console.log("conectado a la base de datos MYSQL")
});

export default db;