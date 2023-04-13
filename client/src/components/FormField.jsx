import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      {/* Flexbox布局,内部的子元素垂直居中对齐，该元素内部子元素之间的间距和下边距。 */}
      <div className="flex items-center gap-2 mb-2">
        <label
        htmlFor = {name}
        className = "block text-sm font-medium text-gray-900"
        // block表示该元素以块级元素的形式显示，text-sm表示该元素的文本应该使用小号字体，font-medium表示该元素的文本应该使用中等字体权重，text-gray-900表示该元素的文本颜色应该为深灰色。
        >
          {labelName}
        </label>
        {/* 写一个Surprise Me的按键 给它输入handleSurprise的函数 */}
        {isSurpriseMe && (
          <button
            type = "button"
            onClick = {handleSurpriseMe}
            className = "font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
            >
              Surprise Me
            </button>
        )}
        </div>
        <input 
          type = {type}
          id = {name}
          name = {name}
          placeholder = {placeholder}
          value = {value}
          onChange = {handleChange}
          required
          className = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
// bg-gray-50：设置元素的背景色为灰色（亮度值为 50）。
// border-gray-300：设置元素的边框颜色为灰色（亮度值为 300）。
// text-gray-900：设置元素的文本颜色为黑色（亮度值为 900）。
// text-sm：设置元素的文本大小为小号（即 14 像素）。
// rounded-lg：设置元素的边框圆角为大圆角。
// focus:ring-[#4649ff]：设置元素在获得焦点时的聚焦边框颜色为蓝色。
// focus:border-[#4649ff]：设置元素在获得焦点时的边框颜色为蓝色。
// outline-none：设置元素在获得焦点时不显示外边框。
// block：设置元素为块级元素。
// w-full：设置元素的宽度为父容器的宽度。
// p-3：设置元素的内边距为 3 个间隔单位。
            
        />
    </div>
  );
};

export default FormField;
