import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ViewCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/courses", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessToken]);

  return (
    <div className="grid grid-cols-3 gap-3 mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            className=" card w-96 bg-cyan-100 shadow-xl mb-4 transform transition-transform hover:scale-105 hover:translate-y-[-2px]"
          >
            <div className="card-body">
              <h2 className="card-title">{course.name}</h2>
              <p>{course.description}</p>

              <div className="card-actions justify-end">
                <Link to={`/details/${course._id}`}>
                  <button className="btn   text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewCourses;
