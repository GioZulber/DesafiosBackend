const ContainerFiles = require('../containers/ContainerFiles');
const config = require('../config.json');

class MsgFiles extends ContainerFiles {
  constructor() {
    super(config.databases.paths.msg);
  }
  getMsg = async () => {
    try {
      let msg = await this.getData();
      return msg;
    } catch (error) {
      console.log(`Can't get data from ${this.path}`);
    }
  };
  setMsg = async (msg) => {
    try {
      await this.setData(msg);
    } catch (error) {
      console.log(`Can't set data to ${this.path}`);
    }
  };
}

module.exports = MsgFiles;
