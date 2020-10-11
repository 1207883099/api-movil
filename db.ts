import { Request, Connection } from "tedious";
const sql = require("mssql");
require("msnodesqlv8");

const config = {
  server: "localhost", //'DESKTOP-TJ48NPL',
  port: 1433,
  user: "root",
  password: "rottweilas10",
  database: "coello-test",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

async function connectioMssql() {
  try {
    const pool = await sql.connect(config);
    let response = await pool.request().query("SELECT * FROM none");
    console.log(response);
    pool.close();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  connectioMssql,
};
