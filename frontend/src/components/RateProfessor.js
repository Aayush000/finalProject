import React, { useState } from "react";
import { useEffect } from "react";
import ListOfItems from "./ListOfItems.js";
import Title from "./Title.js";

function Body() {
  // Rating from Text Area
  const [bestProfessor, setBestProfessor] = useState("");
  // Refresh state
  const [refresh, setRefresh] = useState(false);
  // Data from the backend
  const [data, setData] = useState([]);

  // Text area change handler
  const onChangeHandler = (e) => {
    const { value } = e.target;
    setBestProfessor(value);
  };

  // Button click handler
  const clickHandler = async () => {
    // Send a POST request to the backend
    const response = await fetch(
      "http://localhost:3005/api/v1/bestProfessors",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: bestProfessor }),
      }
    );

    if (response.status === 200) {
      // If the rating was created successfully, refresh the page
      setRefresh(!refresh);
    }

    // Clear the text area
    setBestProfessor("");
  };

  // Delete rating handler
  const handleDelete = async (e) => {
    // Get the id of the rating to be deleted
    const bestProfessorId = e.target.parentElement.parentElement.id;

    // Send a DELETE request to the backend to delete the rating
    const response = await fetch(
      `http://localhost:3005/api/v1/bestProfessors/${bestProfessorId}`,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      // If the feedback was deleted successfully, refresh the page
      setRefresh(!refresh);
    }
  };

  // Get all ratings from the backend
  const getRating = async () => {
    const response = await fetch("http://localhost:3005/api/v1/bestProfessors");
    const data = await response.json();
    setData(data.data);
  };

  useEffect(() => {
    getRating();
  }, [refresh]);

  return (
    <div className="react-app-component text-center">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <Title
                    title={"Provide the rating to the professor you want!"}
                  />
                  <h6>
                    Follow this format: Name of Professor, Major, Rating out of
                    5 example: (1/5)
                  </h6>

                  <textarea
                    className="form-control"
                    id="post-content"
                    rows="3"
                    onChange={onChangeHandler}
                    value={bestProfessor}
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

            <ListOfItems data={data} name={"rating"} />

            <hr />

            {data.map((providedRating) => (
              <div
                className="card text-white my-3 text-start"
                style={{ backgroundColor: "#332FD0" }}
                id={providedRating._id}
              >
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">
                    {new Date(
                      providedRating.createdAt.split("R")[0]
                    ).toLocaleString("en-US")}
                  </h6>
                  <p className="card-text">{providedRating.content}</p>
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
