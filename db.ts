const { credenciales } = require("./config");
const sql = require("mssql/msnodesqlv8");

const config = {
  user: credenciales.dbUser,
  password: credenciales.dbPassword,
  server: credenciales.dbHost,
  database: credenciales.dbName,
  port: credenciales.dbPort,
  driver: "msnodesqlv8",
  options: {
    trustedconnection: true,
    enableArithAort: true,
    instancename: "AUTOMAT",
  },
};

async function connectioMssql() {
  try {
    const cn = new sql.ConnectionPool(config);
    return await cn.connect();
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  connectioMssql,
};
