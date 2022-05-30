const ContainerFiles = require('../containers/ContainerFiles');

class MsgFiles extends ContainerFiles {
  constructor() {
    super('src/files/msgFiles.json');
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
