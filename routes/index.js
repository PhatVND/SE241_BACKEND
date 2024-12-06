const homeRouter = require('./homeRouter');
const userRouter = require('./userRouter');
const printRouter = require('./printRouter');
const adminRouter = require('./adminRouter');
const { authMiddleware } = require('../middlerware/authMiddleware');
const adminMiddleware = require('../middlerware/adminMiddleware');

module.exports = (app) => {
  app.use("/user", authMiddleware, userRouter);
  app.use('/print', authMiddleware, printRouter);
  app.use('/admin', authMiddleware, adminRouter);
  app.use("/", homeRouter)
}

