import { Input as InputField } from "antd";


const Input:React.FC<InputProps> = (props) => {
  return (
   <>
        {props.type === "text" || props.type === "email" ? (
             <div className={`flex justify-start items-start flex-col font-outfit ${props.padding}`}>
             <span className="text-blackHeader text-16 font-semibold pb-2">{props.label}</span>
             <InputField
               type={props.type}
               placeholder={props.placeholder}
               value={props.value}
               name={props.name}
               onChange={props.onChange}
               onBlur={props.onBlur}
               className="text-14"
               variant="borderless"
               onError={props.onError}
             />
           </div>
        ): props.type === "password" ? (
            <div className={`flex justify-start items-start flex-col font-outfit ${props.padding}`}>
            <span className="text-blackHeader text-16 font-semibold pb-2">{props.label}</span>
            <InputField.Password
              type={props.type}
              placeholder={props.placeholder}
              value={props.value}
              name={props.name}
              onChange={props.onChange}
              onBlur={props.onBlur}
              className="text-14"
              variant="borderless"
              onError={props.onError}
            />
          </div>
        ) : props.type ===  "otp" ? (
            <div className={`flex justify-start items-start flex-col font-outfit ${props.padding}`}>
            <span className="text-blackHeader text-16 font-semibold pb-2">{props.label}</span>
            <InputField.OTP
              value={props.value}
              onChange={props.handleOTP}
              onBlur={props.onBlur}
              className="text-14"
              variant="borderless"
              onError={props.onError}
              length={props.length}
              autoFocus
              onKeyPress={props.onKeyPress}
            />
          </div>
        ): null }
   </>
  );
};

export { Input };
