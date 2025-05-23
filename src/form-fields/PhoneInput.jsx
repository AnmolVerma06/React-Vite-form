import React from "react";

const countryCodes = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+49", label: "Germany" },
  { code: "+33", label: "France" },
];

function PhoneInput({ value, onChange, phoneCode, setPhoneCode, errorMessage, onBlur }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <select
        value={phoneCode}
        onChange={(e) => setPhoneCode(e.target.value)}
        style={{ width: "100px", padding: "5px" }}
      >
        {countryCodes.map(({ code, label }) => (
          <option key={code} value={code}>
            {code} ({label})
          </option>
        ))}
      </select>
      <input
        type="tel"
        placeholder="Phone Number"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        pattern="^[0-9]{10}$"
        style={{ flex: 1, padding: "5px" }}
      />
      <span style={{ color: "red", fontSize: "12px" }}>{errorMessage}</span>
    </div>
  );
}

export default PhoneInput;
