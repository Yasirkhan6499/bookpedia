import React from "react";

// Add this new DateInput component
export const DateInput = ({ label, value, setValue, maxDigits }) => {
    const handleChange = (e) => {
      // Allow only numbers and limit the number of digits
      const newValue = e.target.value.replace(/\D/g, '').slice(0, maxDigits);
      setValue(newValue);
    };
  
    return (
      <React.Fragment>
    
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={value}
        onChange={handleChange}
        className={"m-0 mb-5 max-w-[10rem]"}
        placeholder={label}
      />
      </React.Fragment>
    );
  };