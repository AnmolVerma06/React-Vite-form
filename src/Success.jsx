import { useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();
  const formData = location.state || {};

  const textStyle = { color: "black" };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={textStyle}>Form Submitted Successfully!</h2>

      <div style={{ marginTop: "20px" }}>
        {Object.entries(formData).map(([key, value]) => {
          if (key === "confirmPassword") return null;

          const label = key.charAt(0).toUpperCase() + key.slice(1);
          const displayValue = key === "password" ? "*".repeat(value.length) : value;

          return (
            <p key={key} style={textStyle}>
              <strong>{label}:</strong> {displayValue}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Success;
