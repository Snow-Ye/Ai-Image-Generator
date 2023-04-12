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

  const handleSubmit = () => {

  };
  
  const handleChange = (e) => {

  };

  const handleSurpriseMe = (e) => {

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
            LabelName = "Your name"
            type = "text"
            name = "name"
            placeholder = "John Doe"
            value = {form.name}
            handleChange = {handleChange}
          />
          <FormField 
            LabelName = "Prompt"
            type = "text"
            name = "Prompt"
            placeholder = "A Snowboarder on a mountain"
            value = {form.prompt}
            handleChange = {handleChange}
            isSurpriseMe
            handleSurpriseMe = {handleSurpriseMe}
          />

          
        </div>
      </form>

    </section>
  )
}

export default CreatePost
