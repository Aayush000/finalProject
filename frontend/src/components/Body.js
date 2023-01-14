import React, { useState } from "react";
import { useEffect } from "react";
import ListOfItems from "./ListOfItems.js";
import Title from "./Title.js";

function Body() {
  // Feedback from Text Area
  const [feedbacks, setFeedbacks] = useState("");
  // Refresh state
  const [refresh, setRefresh] = useState(false);
  // Data from the backend
  const [data, setData] = useState([]);

  // Text area change handler
  const onChangeHandler = (e) => {
    const { value } = e.target;
    setFeedbacks(value);
  };

  // Button click handler
  const clickHandler = async () => {
    // Send a POST request to the backend
    const response = await fetch("http://localhost:3005/api/v1/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: feedbacks }),
    });

    if (response.status === 200) {
      // If the feedback was created successfully, refresh the page
      setRefresh(!refresh);
    }

    // Clear the text area
    setFeedbacks("");
  };

  // Delete feedback handler
  const handleDelete = async (e) => {
    // Get the id of the feedback to be deleted
    const feedbackId = e.target.parentElement.parentElement.id;

    // Send a DELETE request to the backend
    const response = await fetch(
      `http://localhost:3005/api/v1/feedbacks/${feedbackId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      // If the feedback was deleted successfully, refresh the page
      setRefresh(!refresh);
    }
  };

  // Get all feedbacks from the backend
  const getFeedbacks = async () => {
    const response = await fetch("http://localhost:3005/api/v1/feedbacks");
    const data = await response.json();
    setData(data.data);
  };

  useEffect(() => {
    getFeedbacks();
  }, [refresh]);

  return (
    <div className="react-app-component text-center">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <Title title={"Provide your feedback!"} />

                  <textarea
                    className="form-control"
                    id="post-content"
                    rows="3"
                    onChange={onChangeHandler}
                    value={feedbacks}
                  ></textarea>

                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary mt-2"
                      onClick={clickHandler}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <ListOfItems data={data} name={"feedbacks"} />

            <hr />

            {data.map((feedback) => (
              <div
                className="card text-white my-3 text-start"
                style={{ backgroundColor: "#332FD0" }}
                id={feedback._id}
              >
                <div className="card-body">
                  <h6
                    className="card-subtitle mb-2 text-muted"
                    // style={{ color: "#FB2576" }}
                  >
                    {new Date(feedback.createdAt.split("R")[0]).toLocaleString(
                      "en-US"
                    )}
                  </h6>
                  <p className="card-text">{feedback.content}</p>
                  <a
                    href="#"
                    className="card-link text-danger"
                    onClick={handleDelete}
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
