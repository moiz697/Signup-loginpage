import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #7b68ee, #9370db)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container"
      >
        <header
          className="jumbotron bg-light text-center"
          style={{ color: "purple" }}
        >
          <h3 className="display-4">Welcome to AGEDB</h3>
          <p className="lead">{content}</p>
        </header>
      </div>
    </div>
  );
};

export default Home;
