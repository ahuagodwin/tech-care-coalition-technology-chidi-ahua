
import React from "react";



const DownloadButton:React.FC<ButtonProps> = (props) => {
  return (
   <>
   {props.type === "onfleekq" ? <div className={`onfleekq_btn ${props.bgColor} ${props.border}`}>
      {props.storeIcon}
      <div className="flex justify-start items-start flex-col pl-1 pr-2">
        <span className={`text-10 lg:text-16 text-blackHeader font-outfit font-light ${props.labelSize}`}>{props.label}</span>
        <span className={`text-14 lg:text-20 font-semibold font-outfit ${props.color}`}>{props.name}</span>
      </div>
      {props.icon}
    </div>

: props.type === "download" ?

<button className={`app_btn ${props.className}`}>
  {props.storeIcon}
    <section className="flex justify-start items-start flex-col">
            <span>{props.label}</span>
            <span>{props.name}</span>
    </section>
</button> : 

<button className={props.type} onClick={props.onClick}>
    {props.label}
</button> 
}
   </>
  );
};

export default DownloadButton;
