import React from "react";

export const Container: React.FC<LayoutProps> = (props) => {
  return <div className="onfleekq_container">{props.children}</div>;
};


export const TwoColor:React.FC<TextColorProps> = (props) => {
  return (
    <div className={`block lg:flex justify-center items-center lg:items-start text-30 lg:text-60 font-outfit font-bold text-primary space-x-2 ${props.className}`}>
      <span className="text-blackHeader">{props.secondary}</span>  
      <span>{props.primary}</span>
    </div>
  );
};
