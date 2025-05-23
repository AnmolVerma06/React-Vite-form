import React, { useState } from "react";
import "./style.css";

const InputField = ({
  label,
  onChange,
  errorMessage,
  type,
  name,
  value,
  options,
  placeholder,
  ...otherProps
}) => {
  const [focused, setFocused] = useState(false);

  const isNumericField = name === "pan" || name === "aadhar";

  const handleFocus = () => {
    setFocused(true);
  };

  // Only allow digits for numeric fields
  const handleKeyDown = (e) => {
    if (isNumericField) {
      const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
      if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  // Prevent pasting non-digits
  const handlePaste = (e) => {
    if (isNumericField) {
      const paste = (e.clipboardData || window.clipboardData).getData("text");
      if (!/^\d+$/.test(paste)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="inputField">
      <label htmlFor={name}>{label}</label>
      {type === "select" ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={handleFocus}
          {...otherProps}
          className={focused && !value ? "invalid" : ""}
        >
          <option value="">{placeholder || `Select ${label}`}</option>
          {options &&
            options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={handleFocus}
          onFocus={() => name === "confirmPassword" && setFocused(true)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          inputMode={isNumericField ? "numeric" : undefined}
          focused={focused.toString()}
          {...otherProps}
        />
      )}
      <span className="error">{errorMessage}</span>
    </div>
  );
};

export default InputField;
