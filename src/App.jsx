import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./form-fields/Input";

function PhoneInput({ value, onChange, phoneCode, setPhoneCode, errorMessage, onBlur, onFocus, showError }) {
  const countryCodes = [
    { code: "+91", label: "India" },
    { code: "+1", label: "USA" },
    { code: "+44", label: "UK" },
    { code: "+49", label: "Germany" },
    { code: "+33", label: "France" },
  ];

  const handleInputChange = (e) => {
    const onlyDigits = e.target.value.replace(/\D/g, "");
    onChange({ target: { value: onlyDigits, name: "phone" } });
  };

  return (
    <div style={{ marginBottom: "0 rem" }}>
      <label
        htmlFor="phone"
        style={{ display: "block", marginBottom: "4px", color: "black" }}
      >
        Phone Number
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <select
          value={phoneCode}
          onChange={(e) => setPhoneCode(e.target.value)}
          style={{ width: "110px", padding: "6px" }}
        >
          {countryCodes.map(({ code, label }) => (
            <option key={code} value={code}>
              {code} ({label})
            </option>
          ))}
        </select>
        <input
          id="phone"
          type="tel"
          placeholder="Phone Number"
          value={value}
          onChange={handleInputChange}
          onBlur={onBlur}
          onFocus={onFocus}
          pattern="^[0-9]{10}$"
          style={{
            flex: 1,
            padding: "6px",
            color: "white",
            backgroundColor: "transparent",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          maxLength={10}
          inputMode="numeric"
        />
      </div>
      <span style={{ color: "red", fontSize: "12px" }}>
        {showError ? errorMessage : ""}
      </span>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [phoneCode, setPhoneCode] = useState("+91");

  // New state to track if phone input was focused once (touched)
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [phoneBlurred, setPhoneBlurred] = useState(false);

  const formFields = [
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      label: "First Name",
      errorMessage: "First name is required!",
      required: true,
      pattern: "^[A-Za-z]{1,32}$",
      autocomplete: "off",
    },
    {
      id: 2,
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      label: "Last Name",
      errorMessage: "Last name is required!",
      required: true,
      pattern: "^[A-Za-z]{1,32}$",
      autocomplete: "off",
    },
    {
      id: 3,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
      autocomplete: "off",
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "It should be a valid email address!",
      required: true,
      autocomplete: "off",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number, and 1 special character!",
      required: true,
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
      autocomplete: "off",
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      label: "Confirm Password",
      errorMessage: "Passwords don't match!",
      required: true,
      pattern: values.password,
      autocomplete: "off",
    },
    {
      id: 7,
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      label: "Phone Number",
      errorMessage: "Phone number should be 10 digits!",
      required: true,
      pattern: "^[0-9]{10}$",
      autocomplete: "off",
    },
    {
      id: 8,
      name: "country",
      type: "select",
      placeholder: "Select Country",
      label: "Country",
      errorMessage: "Please select a country!",
      required: true,
      options: ["India", "USA", "UK", "Germany", "France"],
    },
    {
      id: 9,
      name: "city",
      type: "select",
      placeholder: "Select City",
      label: "City",
      errorMessage: "Please select a city!",
      required: true,
      options: ["Delhi", "Mumbai", "New York", "London", "Berlin", "Paris"],
    },
    {
      id: 10,
      name: "pan",
      type: "text",
      placeholder: "PAN Number",
      label: "PAN Number",
      errorMessage: "PAN should be 10 digits!",
      required: true,
      pattern: "^[0-9]{10}$",
      autocomplete: "off",
      inputMode: "numeric",
    },
    {
      id: 11,
      name: "aadhar",
      type: "text",
      placeholder: "Aadhar Number",
      label: "Aadhar Number",
      errorMessage: "Aadhar should be 12 digits!",
      required: true,
      pattern: "^[0-9]{12}$",
      autocomplete: "off",
      inputMode: "numeric",
    },
  ];

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid =
    formFields.every(({ name, required, pattern, type }) => {
      const val = values[name];

      if (required) {
        if (!val || val.trim() === "") return false;

        if (type === "select" && val === "") return false;

        if (pattern) {
          const regex = new RegExp(pattern);
          if (!regex.test(val)) return false;
        }

        if (type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) return false;
        }
      }
      return true;
    }) &&
    values.password === values.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success", { state: values });
  };

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  return (
    <div className="form-page">
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => {
          if (field.name === "password" || field.name === "confirmPassword") {
            return (
              <div key={field.id} style={{ position: "relative" }}>
                <InputField
                  {...field}
                  type={showPassword[field.name] ? "text" : "password"}
                  value={values[field.name]}
                  onChange={onChange}
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      [field.name]: !prev[field.name],
                    }))
                  }
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  aria-label={showPassword[field.name] ? "Hide password" : "Show password"}
                >
                  {showPassword[field.name] ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
            );
          }

          if (field.name === "phone") {
            return (
              <PhoneInput
                key={field.id}
                value={values.phone}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, phone: e.target.value }))
                }
                phoneCode={phoneCode}
                setPhoneCode={setPhoneCode}
                errorMessage="Phone number should be 10 digits!"
                onBlur={() => setPhoneBlurred(true)}
                onFocus={() => setPhoneFocused(true)}
                showError={phoneFocused && phoneBlurred && !/^[0-9]{10}$/.test(values.phone)}
              />
            );
          }

          return (
            <InputField
              key={field.id}
              {...field}
              value={values[field.name]}
              onChange={onChange}
            />
          );
        })}

        <button className="button" type="submit" disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
