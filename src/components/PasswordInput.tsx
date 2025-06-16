import CustomInput, {type CustomInputProps} from "./CustomInput.tsx";
import React from "react";
import {AiFillEyeInvisible, AiOutlineEyeInvisible} from "react-icons/ai";

interface PasswordInputProps extends Omit<CustomInputProps, 'type'> {
}

const PasswordInput = (props: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <CustomInput
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
        className="absolute right-2 top-1/2 transform-color duration-300 -translate-y-1/2 text-xl cursor-pointer
        text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {showPassword ? <AiFillEyeInvisible/> : <AiOutlineEyeInvisible/>}
      </button>
    </div>
  );
};

export default PasswordInput;