import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    UserService.getPublicContent()
      .then((response) => {
        setContent(response.data.message); // Assuming the backend sends the "message" property
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setContent("Error fetching data from the backend.");
        setLoading(false); // Set loading to false in case of an error
      });
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
      <div className="container">
        <header
          className="jumbotron bg-light text-center"
          style={{ color: "purple" }}
        >
          <h3 className="display-4">Welcome to AGEDB</h3>
          {loading ? <p>Loading...</p> : <p className="lead">{content}</p>}
        </header>
      </div>
    </div>
  );
};

export default Home;
