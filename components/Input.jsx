import React, { forwardRef } from 'react';

const Input = forwardRef(({ type, id, placeholder, onChange, value, className,maxLength, maxDigits }, ref) => {
  return (
    <React.Fragment>
      <input
        type={type}
        name={id}
        id={id}
        required
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        ref={ref} // Use the ref here
        maxLength={maxLength}
        max={maxDigits}
      />
    </React.Fragment>
  );
});

export default Input;
