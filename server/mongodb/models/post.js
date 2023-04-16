import mongoose from "mongoose";

const Post = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostSchema = mongoose.model("Post", Post);

export default PostSchema;

// 这段代码定义了一个名为 Post 的 Mongoose 模式，并将其导出为 PostSchema。模式中定义了三个属性：name、prompt 和 photo，类型均为字符串，且都为必填属性（required: true）。这意味着在创建新的“帖子”文档时，这些属性必须包含在数据中，否则 Mongoose 会抛出错误。最后，通过调用 mongoose.model 方法，将 Post 模式转换为 PostSchema 模型。
