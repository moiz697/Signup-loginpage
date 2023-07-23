import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
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

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="invalid-feedback d-block">
        This is not a valid email.
      </div>
    );
  }
};

const vfirstName = (value) => {
  if (value.length < 1 || value.length > 50) {
    return (
      <div className="invalid-feedback d-block">
        First Name must be between 1 and 50 characters.
      </div>
    );
  }
};

const vlastName = (value) => {
  if (value.length < 1 || value.length > 50) {
    return (
      <div className="invalid-feedback d-block">
        Last Name must be between 1 and 50 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        The password is required.
      </div>
    );
  }

  if (value.length < 6 || value.length > 40) {
    return (
      <div className="invalid-feedback d-block">
        The password must be between 6 and 40 characters.
      </div>
    );
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,40}/.test(value)) {
    return (
      <div className="invalid-feedback d-block">
        The password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 numeric digit.
      </div>
    );
  }
};

const vverifyPassword = (value, props, components) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required.
      </div>
    );
  }

  const password = components.password[0].value;
  if (value !== password) {
    return (
      <div className="invalid-feedback d-block">
        Passwords do not match.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeVerifyPassword = (e) => {
    setVerifyPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(firstName, lastName, email, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  const handleLoginClick = () => {
    window.location.href = '/login'; // Replace '/login' with the correct path to your login page
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
       
        <Form onSubmit={handleRegister} ref={form}>
          {!successful ? (
            <div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={firstName}
                  onChange={onChangeFirstName}
                  validations={[required, vfirstName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={lastName}
                  onChange={onChangeLastName}
                  validations={[required, vlastName]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="verifyPassword">Confirm Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="verifyPassword"
                  value={verifyPassword}
                  onChange={onChangeVerifyPassword}
                  validations={[required, vverifyPassword]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}

          {/* Conditionally render the "Already have an account?" span */}
          {!successful && (
            <div className="form-group">
              <span
                className="already-have-account"
                onClick={handleLoginClick}
                style={{ color: "blue", marginTop: "10px" }}
              >
                Already have an account? Click here to login.
              </span>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
