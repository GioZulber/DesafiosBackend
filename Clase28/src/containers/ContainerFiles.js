const fs = require('fs');

class ContainerFiles {
  constructor(path) {
    this.path = path;
  }
  getData = async () => {
    try {
      if (fs.existsSync(this.path)) {
        let data = await fs.promises.readFile(this.path, 'utf8');
        return await JSON.parse(data);
      } else {
        return { id: 'mensajes', mensajes: [] };
      }
    } catch (error) {
      console.log(error);
    }
  };
  setData = async (data) => {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
      console.log('Data saved');
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ContainerFiles;
