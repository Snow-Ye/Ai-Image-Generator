import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from Dall-E");
  // res.status(200).json({ message: "Hello from DALL-E!" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message);
  }
});

export default router;

// 这段代码使用了 Express.js 框架创建了一个路由（router）。使用 express.Router() 方法创建一个新的路由对象，然后在这个路由对象上定义了两个路由。第一个路由使用 router.route('/') 定义，当 GET 请求发送到根路径时，服务器会发送一条 “Hello from DALL-E!” 响应。第二个路由使用 router.route('/').post() 定义，当 POST 请求发送到根路径时，服务器会从请求主体中提取 prompt 字段的值，使用 OpenAI API 生成一个图像，并返回这个图像的 Base64 编码格式。如果路由处理过程中出现错误，catch 语句块会捕获这个错误。
