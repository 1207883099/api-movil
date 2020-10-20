const cn = require("../../db");

class Store {
  async AuthIpPublic(ip_movil: string) {
    let poll = await cn.connectioMssql();
    return await poll.query(
      `SELECT * FROM LoginMovil WHERE movil_ip = '${ip_movil}';`
    );
  }
}

export default new Store();
