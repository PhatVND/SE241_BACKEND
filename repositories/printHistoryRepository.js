const PrintHistory = require('../models/printHistory');
const { ObjectId } = require('mongodb');

class PrintHistoryRepository {
    async findByName(name) {
        return await PrintHistory.find({ printerName: name });
    }
    async create(data) {
        return await PrintHistory.create(data);
    }
    async findAll() {
        return await PrintHistory.find();
    }
    async deleteByName(name) {
        return await PrintHistory.deleteOne({ name });
    }
    async findHistoryByName(printerName) {
        return await PrintHistory.find({ printerName: printerName });
    }
    async findByEmailUser(email) {

        return await PrintHistory.find({ email: email });
    }
}

module.exports = new PrintHistoryRepository();