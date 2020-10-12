import { Request, Connection } from "tedious";
const sql = require("mssql/msnodesqlv8");

const config = {
  user: "root",
  password: "rottweilas10",
  server: "DESKTOP-TJ48NPL",
  database: "coello-test",
  port: 1433,
  driver: "msnodesqlv8",
  options: {
    trustedconnection: true,
    enableArithAort: true,
    instancename: "AUTOMAT",
  },
};

async function connectioMssql() {
  try {
    /*const pool = await sql.connect(config);
    let response = await pool.request().query("SELECT * FROM none");
    console.log(response);
    pool.close();*/
    const cn = new sql.ConnectionPool(config);
    let pool = await cn.connect();
    let response = await pool.query("SELECT * FROM none");
    console.log(response);
    return sql.close();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  connectioMssql,
};
