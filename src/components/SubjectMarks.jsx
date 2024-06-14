import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

function SubjectMarks(props) {
  const { subjectName, SubjectMarks } = props;
  let maxMarks;
  if (
    subjectName === "Probability and  Statistics (22SMT-257)" ||
    subjectName === "Operating System (22CST-253)"
  )
    maxMarks = 40;
  else if (
    subjectName ===
      "Numerical Methods and Optimization using Python (22CSH-259)" ||
    subjectName === "Database Management System (22CSH-254)"
  )
    maxMarks = 70;
  else maxMarks = 100;
  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        color: "white",
      }}
    >
      <Gauge
        value={SubjectMarks}
        valueMax={maxMarks}
        className="white"
        startAngle={-90}
        endAngle={90}
        innerRadius="80px"
        outerRadius="100px"
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "palegreen",
          },
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
      <span>{subjectName}</span>
    </div>
  );
}

export default SubjectMarks;
