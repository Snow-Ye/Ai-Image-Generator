import mongoose from 'mongoose';

const connectDB = (url) => {
  mongoose.set('strictQuery', true);
  mongoose.connect(url)
    .then(() => console.log('connected to mongo'))
    .catch((err) => {
      console.error('failed to connect with mongo');
      console.error(err);
    });
};


// 这是一个用于连接 MongoDB 数据库的函数，它使用了 Mongoose 库提供的 connect 方法来建立数据库连接。url 参数是 MongoDB 数据库的连接字符串，它描述了要连接的 MongoDB 实例的位置、端口以及其他选项。在函数内部，我们首先调用 mongoose.set 方法设置了 strictQuery 选项为 true，这个选项的作用是开启 MongoDB 严格查询模式，防止出现一些不合法的查询语句。然后，我们调用 mongoose.connect 方法来连接 MongoDB 数据库，如果连接成功，就会输出 MongoDB Connected 的信息，否则会输出错误信息。注意，这里使用了 Promise 的语法，通过 .then 和 .catch 方法来处理异步操作的结果。

export default connectDB;
// 这样，我们就可以在其它模块中使用 connectDB 函数了 import connectDB from './connectDB.js';