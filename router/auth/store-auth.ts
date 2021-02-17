const cn = require("../../db");

class Store {
  async AuthCodeAccessMovil(codeAccess: string) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT * FROM LoginMovil WHERE codeAccess = '${codeAccess}';`
    );
  }
}

export default new Store();
