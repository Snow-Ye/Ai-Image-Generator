import React from "react";

const FormField = ({
  LabelName,
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
      <div className="flex items-center gap-2 mb-2"></div>
        <label
        htmlFor = {name}
        className = "block text-sm font-medium text-gray-900"
        // block表示该元素以块级元素的形式显示，text-sm表示该元素的文本应该使用小号字体，font-medium表示该元素的文本应该使用中等字体权重，text-gray-900表示该元素的文本颜色应该为深灰色。
        >

        </label>
    </div>
  );
};

export default FormField;
