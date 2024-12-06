const Print = require('../models/print');

class PrintRepository {
  async findByName(name) {
    return await Print.findOne({ Name: name });
  }
  async create(data) {
    return await Print.create(data);
  }
  async findAll() {
    return await Print.find();
  }
  async deleteByName(name) {
    return await Print.deleteOne({ Name: name });
  }

  async updateOneByName(name, updates) {
    return await Print.findOneAndUpdate(
      { Name: name },
      { $set: updates },
      { new: true }
    );
  }
}

module.exports = new PrintRepository();