import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

const CourseForm = () => {
    // const [accessToken, setAccessToken] = useState('');
    const accessToken = localStorage.getItem('token')
    console.log("access token from course",accessToken)

  const [course, setCourse] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    level: '',
    topics: [],
    schedule: {
      startDate: '',
      endDate: '',
      classDays: [],
      classTime: '',
    },
  });

  const [topicsDropdownOpen, setTopicsDropdownOpen] = useState(false);
  const [classDaysDropdownOpen, setClassDaysDropdownOpen] = useState(false);

  const topicsRef = useRef(null);
  const classDaysRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      topicsRef.current && !topicsRef.current.contains(event.target) &&
      classDaysRef.current && !classDaysRef.current.contains(event.target)
    ) {
      setTopicsDropdownOpen(false);
      setClassDaysDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleTopicsChange = (selectedTopics) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      topics: selectedTopics,
    }));
  };

  const handleClassDaysChange = (selectedClassDays) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      schedule: {
        ...prevCourse.schedule,
        classDays: selectedClassDays,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Bearer ${accessToken}`)

    try {
      const response = await fetch('http://localhost:8000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        
        body: JSON.stringify(course),
      });

      if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Course created Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        console.log('Course created successfully');
        // Optionally, you can handle success actions here
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData.message);
        // Optionally, you can handle error actions here
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Optionally, you can handle error actions here
    }
  };

  const topicsList = [
    'HTML',
    'CSS',
    'JavaScript',
    'Vue.js',
    'Node.js',
    'Express.js',
    'RESTful APIs',
  ];

  const classDaysOptions = ['Monday', 'Wednesday', 'Friday'];

  

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-8 grid grid-cols-3 gap-8 p-6 bg-white rounded shadow-md">
      <div>
        <label className="block mb-2 text-sm font-bold text-gray-600">Course Name:</label>
        <input
          type="text"
          name="name"
          value={course.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-600">Description:</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-bold text-gray-600">Price:</label>
        <input
          type="text"
          name="price"
          value={course.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Duration:</label>
        <input
          type="text"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Level:</label>
        <input
          type="text"
          name="level"
          value={course.level}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Topics:</label>
        <div ref={topicsRef} className="relative">
          <div
            onClick={() => setTopicsDropdownOpen(!topicsDropdownOpen)}
            className="cursor-pointer w-full p-2 border rounded"
          >
            Select Topics
          </div>
          {topicsDropdownOpen && (
            <select
              multiple
              name="topics"
              value={course.topics}
              onChange={(e) =>
                handleTopicsChange(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className="absolute top-full left-0 w-full p-2 border rounded bg-white"
            >
              {topicsList.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={course.schedule.startDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">End Date:</label>
        <input
          type="date"
          name="endDate"
          value={course.schedule.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Class Days:</label>
        <div ref={classDaysRef} className="relative">
          <div
            onClick={() => setClassDaysDropdownOpen(!classDaysDropdownOpen)}
            className="cursor-pointer w-full p-2 border rounded"
          >
            Select Class Days
          </div>
          {classDaysDropdownOpen && (
            <select
              multiple
              name="classDays"
              value={course.schedule.classDays}
              onChange={(e) =>
                handleClassDaysChange(Array.from(e.target.selectedOptions, (option) => option.value))
              }
              className="absolute top-full left-0 w-full p-2 border rounded bg-white"
            >
              {classDaysOptions.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div>
        <label className="block mt-4 mb-2 text-sm font-bold text-gray-600">Class Time:</label>
        <input
          type="text"
          name="classTime"
          value={course.schedule.classTime}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" className="col-span-3 mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Submit
      </button>
    </form>
  );
};

export default CourseForm;
