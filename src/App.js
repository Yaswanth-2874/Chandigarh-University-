import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [response, setResponse] = useState();
  const displayMarks = response
    ? response.map((element) => {
        return (
          <>
            Subject Name : {element.subjectName}
            Subject Marks : {element.totalMarks}
          </>
        );
      })
    : "Error";

  return isLoggedIn ? (
    <>{displayMarks} </>
  ) : (
    <Login setIsLoggedIn={setIsLoggedIn} setResponse={setResponse} />
  );
}

export default App;
