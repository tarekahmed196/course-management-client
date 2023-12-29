import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  console.log("params id", id);

  const [courses, setCourses] = useState([]);
  // console.log('courses',courses.schedule.startDate)

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
          setCourses(detail);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } 
    };

    fetchData();
  }, [accessToken]);

  

  return (
    <div className="flex items-center justify-center">
      <div className="card w-96  shadow-xl bg-gray-300 my-4 transform transition-transform hover:scale-105 hover:translate-y-[-2px]">
        <div className="card-body">
          <h2 className="card-title">{courses.name}</h2>
          <p>{courses.description}</p>
          <p>{courses.topics}</p>
          <p>{courses.price}</p>
          <p>{courses.duration}</p>
          {/* <p>{courses.schedule.classDays}</p>
              <p>{courses.schedule.classTime}</p> */}
            {/* <p>{courses.schedule.startDate}</p>
            <p>{courses.schedule.endDate}</p> */}
      
    
        </div>
      </div>
    </div>
  );
};

export default Details;
