import React from "react";

export default function Login() {
  return (
    <>
      <div style={{width:"100vw", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div>
        <div>Login</div>
        <div className="input-group mb-3">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="checkbox"
              defaultValue=""
              aria-label="Checkbox for following text input"
            />
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Text input with checkbox"
          />
        </div>
        <div className="input-group">
          <div className="input-group-text">
            <input
              className="form-check-input mt-0"
              type="radio"
              defaultValue=""
              aria-label="Radio button for following text input"
            />
          </div>
          <input
            type="text"
            className="form-control"
            aria-label="Text input with radio button"
          />
        </div>
        </div>
      </div>
    </>
  );
}
