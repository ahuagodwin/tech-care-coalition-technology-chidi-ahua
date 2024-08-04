
const ErrorMessage = ({ touched, error }: { touched: any, error: any}) => {
    if (!touched || !error) return null;
    return <span className="text-red-500">{error}</span>;
  };
  
  export default ErrorMessage;