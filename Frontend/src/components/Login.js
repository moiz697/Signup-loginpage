import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

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
  const [loginClicked, setLoginClicked] = useState(false); // New state for tracking the login click
  const [showPassword, setShowPassword] = useState(false); // New state for the show password feature

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
      AuthService.login(username, password).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    // Update the loginClicked state to true
    setLoginClicked(true);
    // Redirect the user to the login page after a small delay (optional)
    setTimeout(() => {
      window.location.href = '/forgot-password'; // Replace '/login' with the correct path to your login page
    }, 500); // Delay the navigation to give time for the success message to show (optional)
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    
  
    <div className="col-md-12"
     style={{
        background: "linear-gradient(to bottom, #7b68ee, #9370db)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div className="card card-container">
        {/* Other form elements... */}
     
      

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
            onClick={handleLoginClick}
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
