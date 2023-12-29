import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  console.log("params id", id);

  const [course, setCourse] = useState(null);

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
          console.log("data", data);
          const detail = data.find((detail) => detail._id === id);
          console.log('detail', detail)
          setCourse(detail);
          console.log('course', course)
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [accessToken, id]);

  return (
    <>
      {course && (
        <div key={course._id} className="flex items-center justify-center">
          <div className="card w-96 shadow-xl bg-cyan-300 my-4 transform transition-transform hover:scale-105 hover:translate-y-[-2px]">
            <div className="card-body">
              <h2 className="card-title">{course.name}</h2>
              <p>{course.description}</p>
              <p>{course.level}</p>
              <p>{course.topics.join(', ')}</p>
              <p>{course.price}</p>
              <p>{course.duration}</p>
              <p>{course.schedule.startDate}</p>
              <p>{course.schedule.endDate}</p>
              <p>{course.schedule.classTime}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
