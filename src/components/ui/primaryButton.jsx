
// Button Component
const Buttons = ({ label,type, disabled, size ,  children }) => {
  // Define button type styles
  const typeClasses = {
    enabled: "bg-primary text-white border-[2px] border-primary hover:bg-[#182F6F] ",
    enabled1: "bg-transparent text-primary border-[2px] boreder-primary hover:bg-gray-100",
    disabled: "bg-black30 text-gray-500 cursor-not-allowed",
  };

  // Define size classes based on the prop
  const sizeClasses = {
    small: "px-[14px] py-[5px] text-[14px] rounded-[4px]",
    medium: "px-[17px] py-[7px] text-[16px] rounded-[7px]",
    large: "px-[25px] py-[10px] text-[20px] rounded-[9px]",
  };

  return (
      <button
        className={`flex items-center text-center gap-1 font-semibold  ${
          typeClasses[disabled ? "disabled" : type]
        } ${sizeClasses[size]}`}
        disabled={disabled}
      >
      
        {children}
        {label}
      </button>
    
  );
};
export default Buttons;