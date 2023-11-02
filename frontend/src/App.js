import React from "react";
import axios from "axios";
import "./App.css"; // Make sure to create an App.css file for styling

// Custom hook for fetching data
const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false); // Set to false for dummy data
  const [error, setError] = React.useState(null);

  // Commented out for dummy data
  // React.useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(url)
  //     .then((response) => {
  //       setData(response.data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // }, [url]);

  // Dummy data
  React.useEffect(() => {
    setData([
      {
        id: 1,
        title: "First Item",
        description: "This is a description for the first item.",
      },
      {
        id: 2,
        title: "Second Item",
        description: "This is a description for the second item.",
      },
      // ...more items
    ]);
  }, []);

  return { data, loading, error };
};

const App = () => {
  const { data, loading, error } = useFetch("/api/data");

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error fetching data!</p>;

  return (
    <div className="App">
      <h1>React App</h1>
      <div className="data-container">
        {data &&
          data.map((item) => (
            <div key={item.id} className="card">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <button className="btn">Read More</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default App;
