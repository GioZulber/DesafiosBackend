const ContainerMongo = require('../containers/ContainerMongoDb');
const msgSchema = require('../schema/msgSchema');

class MsgMongo extends ContainerMongo {
  constructor() {
    super(msgSchema, 'messages');
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
      let res = await this.model.findOneAndUpdate(
        { id: 'mensajes' },
        { mensaje: msg }
      );
      return res;
    } catch (error) {
      console.log(`Can't set data in ${this.path}`);
    }
  };
}

module.exports = MsgMongo;
