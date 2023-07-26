import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import userData from "./data.json";



const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      // Check if there is a user with the provided username and password
      const user = userData.users.find((user) => user.email === username && user.password === password);

      if (user) {
        // Simulate a delay to mimic server response time (you can remove this in production)
        setTimeout(() => {
          AuthService.login(user); // Assuming AuthService.login() accepts a user object as an argument for successful login
          navigate("/profile");
          window.location.reload();
        }, 1000); // 1 second delay
      } else {
        setLoading(false);
        setMessage("Invalid username or password.");
      }
    } else {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handleLogin} ref={form}>
          {/* Username input */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          {/* Password input with show/hide feature */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <Input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary btn-sm" // Use btn-sm class for smaller button
                  type="button"
                  onClick={handleShowPassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          {/* Styled "Forgot password" span */}
          <div className="form-group">
  <span
    className="Forgetpassword"
    onClick={handleShowPassword}
    style={{ color: "blue", marginTop: "10px" }}
  >
    Forgot password
  </span>
</div>

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
