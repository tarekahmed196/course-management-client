import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Details = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/courses", {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
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
    <div className='grid grid-cols-3 gap-3'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        courses.map((course) => (
          <div  key={course.id} className=" card w-96 bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title">{course.name}</h2>
              <p>{course.description}</p>
              {/* Add other details as needed */}
              
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Details;
