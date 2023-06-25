import React, { useCallback, useEffect, useState } from "react";
import { data } from "./data.js";
const Transition = ({ children }) => {
  const [showingUp, setShowingUp] = useState(data);

  // control show elements when scrolling to it
  const showingUpFunc = useCallback((e, step = 150, offset = 0) => {
    const change = [false];
    const data = new Array(...showingUp);
    data.forEach((eleData, i) => {
      const ele = document.getElementById(eleData.id);
      const eleHeight = ele?.offsetHeight;
      const windowHeight = window.innerHeight;
      const eleDistanceFromVP = ele?.getBoundingClientRect()?.y;
      if (
        eleDistanceFromVP - windowHeight <= 0 &&
        -eleDistanceFromVP <= eleHeight - offset
      ) {
        // showing up element
        if (eleData.opacity === "0") {
          data[i].opacity = "1";
          if (eleData.direction === "x") data[i].trX = "0px";
          else data[i].trY = "0px";
          data[i].transition = "transform 1s linear,opacity 2s ease-out";
          change[0] = true;
        }
      } else {
        // hidding element
        if (eleData?.opacity === "1") {
          data[i].opacity = "0";
          if (eleData.direction === "x") data[i].trX = `${-step}px`;
          else data[i].trY = `${step}px`;
          data[i].transition = "none";
          change[0] = true;
        }
      }
    });
    if (change[0] === true) {
      setShowingUp(data);
    }
  }, []);
  useEffect(() => {
    showingUpFunc();
    window.addEventListener("scroll", showingUpFunc);
    return () => window.removeEventListener("scroll", showingUpFunc);
  }, []);
  return (
    <>
      <div
        id={showingUp[0].id}
        style={{
          // width: "100px",
          // height: "200px",
          // margin: "50px auto",
          opacity: showingUp[0].opacity,
          transform: `translateX(${showingUp[0].trX})`,
          transition: showingUp[0].transition,
          // backgroundColor: "red",
        }}
      >
        {children}
      </div>
      {/* <div
        id={showingUp[1].id}
        style={{
          width: "100px",
          height: "200px",
          margin: "50px auto",
          opacity: showingUp[1].opacity,
          transform: `translateY(${showingUp[1].trY})`,
          transition: showingUp[1].transition,
          backgroundColor: "yellow",
        }}
      >
        hello
      </div>
      <div
        id={showingUp[2].id}
        style={{
          width: "100px",
          height: "200px",
          margin: "50px auto",
          opacity: showingUp[2].opacity,
          transform: `translateX(${showingUp[2].trX})`,
          transition: showingUp[2].transition,
          backgroundColor: "black",
        }}
      >
        hello
      </div>
      <div
        id={showingUp[3].id}
        style={{
          width: "100px",
          height: "200px",
          margin: "50px auto",
          opacity: showingUp[3].opacity,
          transform: `translateY(${showingUp[3].trY})`,
          transition: showingUp[3].transition,
          backgroundColor: "blue",
        }}
      >
        hello
      </div> */}
    </>
  );
};

export default Transition;
