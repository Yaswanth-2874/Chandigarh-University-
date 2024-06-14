import React, { useState } from "react";
import InputBox from "./InputBox";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [askCaptcha, setAskCaptcha] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const { setIsLoggedIn, setResponse } = props;

  const message = !askCaptcha ? "Log in" : "Enter Captcha";
  const submitHandler = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    axios
      .post("http://localhost:4000/submit", {
        userId: username,
        password,
      })
      .then((response) => {
        if (response.data.error) console.log("Error : ", response.data.error);
        else {
          setSessionId(response.data.sessionId);
          setCaptcha(`data:image/png;base64,${response.data.captcha}`);
          setAskCaptcha(true);
          setButtonClicked(false);
        }
      })
      .catch((e) => console.log("Failed due to ", e));
  };
  const submitCaptcha = (e) => {
    setButtonClicked(true);
    e.preventDefault();
    axios
      .post("http://localhost:4000/submit/captcha", {
        sessionId,
        captcha: enteredCaptcha,
      })
      .then((response) => {
        setResponse(response.data.studentMarks);
        setIsLoggedIn(true);
      });
  };
  return (
    <div
      className="transparent"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <img
        src="https://students.cuchd.in/assets/uploads/login-logo.png"
        alt="cuims logo"
        style={{ width: "fit-content", height: "fit-content" }}
      />
      <span style={{ color: "#fff", padding: "0", margin: "0" }}>
        <h2>{message}</h2>
      </span>
      {!askCaptcha && (
        <form
          onSubmit={submitHandler}
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <InputBox
            placeholder="Enter User Id"
            type="text"
            value={username}
            changeHandler={setUsername}
          />
          <InputBox
            placeholder="Enter Password"
            type="password"
            value={password}
            changeHandler={setPassword}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "#ef0000",
              width: "100%",
              height: "36.5px",
            }}
            type="submit"
          >
            {!buttonClicked ? (
              "Generate Captcha"
            ) : (
              <CircularProgress
                style={{ color: "yellow", width: "25px", height: "25px" }}
              />
            )}
          </Button>
        </form>
      )}
      {askCaptcha && (
        <form
          onSubmit={submitCaptcha}
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={captcha} alt="null" width="110px" max-height="49px"></img>
          <InputBox
            placeholder="Enter Captcha"
            type="text"
            value={enteredCaptcha}
            changeHandler={setEnteredCaptcha}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "#ef0000", width: "100%" }}
            type="submit"
          >
            {!buttonClicked ? (
              "Submit Captcha"
            ) : (
              <CircularProgress
                style={{ color: "yellow", width: "25px", height: "25px" }}
              />
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

export default Login;
