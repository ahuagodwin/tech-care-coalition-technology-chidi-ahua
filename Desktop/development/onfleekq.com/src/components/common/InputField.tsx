import { ImgIcon } from "@/constants";
import { Input, Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import React from "react";

interface InputProps {
  style?: string;
  value?: string;
  name?: string;
  label?: string;
  padding?: string;
  onChange?: () => void;
  options?:  DefaultOptionType[] | undefined
  suffix?: React.ReactNode
  type?: "text" | "textarea" | "email" | "password" | "custom" | "date" | "time" | "week" | "day" | "search" |undefined;
}

const InputField: React.FC<InputProps> = (props) => {
  return (
    <>
      {props.type === "custom" ? (
        <input
          type="text"
          placeholder="Enter your email"
          className={`w-full border border-white rounded-md bg-transparent p-4 placeholder:text-white text-white ${props.style}`}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      ) : props.type === "text" || props.type === "email" || props.type === "date" ? (
       <div className={`${props.padding}`}>
        <label className="text-24 font-outfit text-blackHeader pb-2">{props.label}</label>
         <Input
          size="large"
          placeholder="name"
          className="w-full"
          variant="borderless"
          suffix={props.suffix}
          type={props.type}
        />
       </div>
      ) : props.type === "password" ? (
        <Input.Password
          size="large"
          placeholder="name"
          className="w-full"
          variant="borderless"
          suffix={props.suffix}
          type={props.type}
        />
      ) : props.type === "search" ? (
        <div className={`search_input ${props.padding}`}>
        <label className="text-24 font-outfit text-blackHeader pb-2">{props.label}</label>
         <Input.Search
          size="large"
          placeholder="name"
          className="w-full"
          variant="borderless"
          suffix={props.suffix}
          type={props.type}
        />
       </div>
      ) : (
        <div className={`${props.padding}`}>
          <label className="text-24 font-outfit text-blackHeader pb-2">{props.label}</label>
          <Select
             size="large"
             placeholder="name"
             className="w-full"
             variant="borderless"
             options={props.options}
             suffixIcon={<ImgIcon.DropdownIcon />}
          />
        </div>
      )}
    </>
  );
};

export default InputField;
