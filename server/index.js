import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
// 用于注册中间件函数，这些函数可以对请求和响应对象进行处理，例如实现身份认证、请求日志记录等功能。

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});
// 用于注册 GET 请求的处理函数，当客户端发送一个 GET 请求到指定的 URL 时，Express.js 就会调用注册的处理函数来处理该请求，并返回相应的结果。

const startServer = async () => {
  try {
        // process.env 是一个全局对象，用于访问当前进程的环境变量。process.env.MONGODB_URL 是一个环境变量，用于存储 MongoDB 数据库的连接字符串。
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};
  // 用于启动 Express.js 应用程序，开始监听指定的端口号并等待客户端的连接。当客户端连接到该端口时，Express.js 就会将请求转发给对应的处理函数进行处理，并将处理结果返回给客户端。

startServer();
