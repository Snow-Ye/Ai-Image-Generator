import {React, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {preview} from '../assets';
import {getRandomPrompt} from '../utils';
import {FormField, Loader} from '../components';
 
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

  const generateImage = () => {

  }

  const handleSubmit = () => {

  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  };


  const handleSurpriseMe = (e) => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({...form, prompt:randomPrompt})

  };

  return (
    //最大宽度为 7/10，水平居中对齐。
    <section className = 'max-w-7x1 mx-auto'> 
      <div>
         <h1 className = "font-extrabold text-[#222328] text-[32px] " >Create</h1>
        <p className = "mt-2 text-[#666e75] text-[16px] max-w[500px]">Create imaginative and visually stunning images through DALL-E AI</p>
      </div>

      {/* 顶部间距为 16px，最大宽度为 3/4*/}
      <form className = "mt-16 max-w-3x1" onSubmit = {handleSubmit}>
        <div className = "flex flex-col gap-5">
          <FormField 
            labelName = "Your name"
            type = "text"
            name = "name"
            placeholder = "John Doe"
            value = {form.name}
            handleChange = {handleChange}
          />
          <FormField 
            labelName = "Prompt"
            type = "text"
            name = "Prompt"
            placeholder = "A Snowboarder on a mountain"
            value = {form.prompt}
            handleChange = {handleChange}
            isSurpriseMe
            handleSurpriseMe = {handleSurpriseMe}
          />
          
          <div className = "relative bg-gray-50 border border-gray-300 text-gray-900 ext-sm rounded-lg focus: ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center" >
            {form.photo ?(
              <img
                src = {form.photo}
                alt = {form.prompt}
                className = "w-full h-full object-contain"
              />
            ):(
              <img
                src = {preview}
                alt = "preview"
                className = "w-9/12 h-9/12 object-contain opacity-40"
                />
            )}

            {generatingImg && (
              <div className = "absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
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

          <div className = "mt-5 flex gap-5">
            <button
            type = "button"
            onClick = {generateImage}
            className = "text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
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
              {generatingImg ? 'Generating...' :'Generate'}
            </button>
          </div>  
          <div className = "mt-10">
              <p className = "mt-2 text-[#666e75] text-[14px]">Once you have created the image you want, you can share it with others in the community.</p>
              <button
                type = "submit"
                className = "mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
              >
                {loading ? 'sharing...' : 'Share with the community'}
              </button>

            </div>
        
  
        </form>

      </section>
  );
};

export default CreatePost;
