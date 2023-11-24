import React from "react";

// Add this new DateInput component
export const DateInput = ({ label, value, setValue, maxDigits, validate,error }) => {
    const handleChange = (e) => {
      // Allow only numbers and limit the number of digits
      const newValue = e.target.value.replace(/\D/g, '').slice(0, maxDigits);
      setValue(newValue);

      validate(label, newValue);
    };
  
    return (
      <React.Fragment >
    
    <div className="flex flex-col">
      <input
        type="text"
        inputMode="numeric"
        pattern="\d*"
        value={value}
        onChange={handleChange}
        className={"m-0 mb-5"}
        placeholder={label}
      />
           {/* Display the error if there is one */}
        {error && <p className="text-red-500 text-sm italic -mt-5 mb-2">{error}</p>}
      </div>  
      </React.Fragment>
    );
  };