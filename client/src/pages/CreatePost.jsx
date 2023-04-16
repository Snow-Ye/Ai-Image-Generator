import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
// 在这里先定义三个useState， 分别是form, generatingImg,和loading.generatingImg 和 loading 是boolean，分别表示当前是否正在生成图片和分享图片。
const CreatePost = () => {
  const navigate = useNavigate();
  // Back to Homepage once the post is created
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // 这里定义了一个异步函数async function,当点击Submit时会调用这个函数，用于生成一张照片。generateImage会发送一个Post到服务器，请求生成一张图片，如果请求成功 会将返回的图片信息解码为 base64 编码的字符串，然后将该字符串保存到 form 的 photo 属性中。如果请求失败，则会弹出一个警告框。
  const generateImage = async () => {
    // 函数首先会检查用户是否输入了一个提示（form.prompt 是否有值），如果没有，会弹出一个警告框提示用户输入提示。
    if (form.prompt) {
      try {
        // 在发送请求之前 函数会先把'setGeneratingImg的状态设置为true。这个状态用于控制页面的加载状态，当请求发送出去时，页面上会显示一个加载动画，以提示用户正在进行生成操作。
        setGeneratingImg(true);
        // 如果用户输入了提示，函数会通过fetch方法发送一个Post请求到服务器的/api/v1/dalle路径。 在请求头中设置了请求类型和请求头部信息，包括了 'Content-Type': 'application/json'，该信息指定了请求内容的类型为 JSON 格式。请求体中包含了一个 JSON 对象，该对象的 prompt 属性的值为表单中填写的 Prompt。
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            prompt: form.prompt 
          }),
        });
        const data = await response.json();
        // 当调用response.json()方法时，它会返回一个Promise对象，该对象代表了一个尚未完成的异步操作。因此，使用await关键字将该操作包装在异步函数中，可以等待Promise对象解析为实际的响应数据，然后将其作为data变量的值。在等待期间，JavaScript 运行时可以暂停异步函数的执行并处理其他任务。当异步操作完成时，JavaScript 运行时会继续执行异步函数，并使用返回的数据继续执行函数中的代码。
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please provide proper prompt");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent the brower to automatically reload the page
    if (form.prompt && form.photo) {
      setLoading(true);

      try{
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
      });
      await response.json();
      alert("Success")
      navigate('/');
     } catch(err) {
        alert(err)
      } finally {
        setLoading(false);
      }
    }else{
      alert("Please enter a prompt and generate a image");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    //最大宽度为 7/10，水平居中对齐。
    <section className='max-w-7x1 mx-auto'>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px] " >Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w[500px]">Create imaginative and visually stunning images through DALL-E AI</p>
      </div>

      {/* 顶部间距为 16px，最大宽度为 3/4*/}
      <form className="mt-16 max-w-3x1" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          {/* 这里会fill进form的prompt */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A Snowboarder on a mountain"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 ext-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center" >
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                {/* absolute：将元素设置为绝对定位，相对于其最近的已定位祖先元素或文档窗口进行定位。
inset-0：设置元素的 top、right、bottom、left 四个方向的内边距均为 0，使它填满其定位父元素。
z-0：设置元素的层叠顺序为 0，使它在同级元素中位于最下层。
flex：将元素设置为弹性布局容器。
justify-center：将元素的子元素水平居中对齐。
items-center：将元素的子元素垂直居中对齐。
bg-[rgba(0,0,0,0.5)]：设置元素的背景色为黑色，带有 50% 的不透明度，从而创建一个半透明的遮罩层。
rounded-lg：设置元素的边框圆角为大圆角。 */}
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          // text-white：将按钮文本的颜色设置为白色。
          // bg-green-700：将按钮的背景色设置为绿色，使用了颜色规则中的 700 级别的绿色色值。
          // font-medium：将按钮文本的字体权重设置为中等粗细。
          // rounded-md：将按钮的边框圆角设置为中等圆角。
          // text-sm：将按钮文本的字体大小设置为小号。
          // w-full：将按钮的宽度设置为 100%（在响应式布局中会被覆盖）。
          // sm:w-auto：在响应式布局的小屏幕（如手机屏幕）上，将按钮的宽度设置为自适应宽度。
          // px-5：设置按钮的水平内边距为 5 个间距单位。
          // py-2.5：设置按钮的垂直内边距为 2.5 个间距单位。
          // text-center：将按钮文本居中对齐。
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community.</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? 'sharing...' : 'Share with the community'}
          </button>

        </div>


      </form>

    </section>
  );
};

export default CreatePost;
