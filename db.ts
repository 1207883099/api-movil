import { Request, Connection } from "tedious";

var config = {
  server: "APPSERVER1SQL2016",
  authentication: {
    type: "default",
    options: {
      userName: "saEspanol",
      password: "SSss123",
      database: "Clementina",
    },
  },
  options: {
    database: "Clementina",
  },
};

var connection = new Connection(config);

connection.on("connect", function (err: any) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected");
    executeStatement();
  }
});

function executeStatement() {
  const request = new Request("SELECT * FROM Empleados", (err: any) => {
    if (err) console.log(err.message);
  });

  let result = "";
  request.on("row", function (columns: any) {
    columns.forEach(function (column: any) {
      if (column === null) {
        console.log("NULL - NADA");
      } else {
        result += column.value + " ";
      }
      console.log(result);
      result = "";
    });
  });

  request.on("done", function (rowCount: any, more: any) {
    console.log(rowCount + " rows returned");
  });

  connection.execSql(request);
}
