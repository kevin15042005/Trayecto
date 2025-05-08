import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Edi9708*",
  database: "uber",
});
db.connect((err) => {
  if (err) {
      console.error("Error al concetar en la base de datos", err)
          return;
    }
    console.log("conectado a la base de datos MYSQL")
});

export default db;