import { useState } from "react";
import Login from "./components/Login";
import SubjectMarks from "./components/SubjectMarks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [response, setResponse] = useState();

  const displayMarks = response
    ? response.map((element) => {
        console.log(element);
        return (
          <SubjectMarks
            subjectName={element.subjectName}
            SubjectMarks={element.totalMarks}
          />
        );
      })
    : "Error";

  return isLoggedIn ? (
    <>
      <h2
        style={{
          margin: "0",
          padding: "0",
          position: "absolute",
          color: "#fff",
          left: "48%",
          top: "20%",
          zIndex: "1",
        }}
      >
        Your Marks
      </h2>
      <div className="marks">{displayMarks}</div>
    </>
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} setResponse={setResponse} />
  );
}

export default App;
