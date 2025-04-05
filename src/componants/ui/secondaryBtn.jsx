// Button Component
const Buttons = ({ label,type, disabled, size ,  children,withprop }) => {
    // Define button type styles
    const typeClasses = {
      enabled: "bg-secondaire text-white relative transition-all before:absolute before:right-0 before:top-0 before:h-16 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-100",
      disabled: "bg-gray-100 text-gray-500 cursor-not-allowed",
    };
  
    // Define size classes based on the prop
    const sizeClasses = {
      medium: "py-[14px]  text-[16px] rounded-[128px] hover:rounded-[7px]",
      large: "py-[15px] text-[20px] rounded-[128px] hover:rounded-[9px]",
    };
    const withClasses = {   
        full: "w-full",
        auto: "w-auto",
        min: "w-min",
        max: "w-max",
      };
  
    return (
        <button
          className={`flex items-center justify-center gap-1 font-semibold ${withClasses[withprop]}  ${
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