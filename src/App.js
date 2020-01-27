import React, { useEffect, useReducer } from "react";
import "./styles.css";
import Paddle from "./components/Paddle/Paddle";
import Container from "./components/Container/Container";
import Ball from "./components/Ball/Ball";

const initialState = {
  paddle: {
    x: 0
  },
  ball: {
    x: 0,
    y: 0,
    dx: 5,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE":
      return { ...state, paddle: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function handleMouse(e) {
    let boundedX;
    const offset = (window.innerWidth - 300) / 2;
    if (e.x - offset < 0) {
      boundedX = 0;
    } else if (e.x - offset > 200) {
      boundedX = 200;
    } else {
      boundedX = e.x - offset;
    }
    dispatch({
      type: "MOVE_PADDLE",
      payload: {
        x: boundedX
      }
    });
  }
  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const handle = setTimeout(() => {
      let x = state.ball.x;
      let y = state.ball.y;
      let dx = state.ball.dx;
      let dy = state.ball.dy;

      let paddleX = state.paddle.x;

      if (y > 370) {
        return dispatch({
          type: "MOVE_BALL",
          payload: {
            dx: 5,
            dy: 5,
            x: 0,
            y: 0
          }
        });
      }

      if (x + dx > 300 - 20 || x + dx < 0) {
        dx = -dx;
      }

      if (y + dy > 400 - 20 || y + dy < 0) {
        dy = -dy;
      }

      if (y > 340 && paddleX < x + dx && paddleX + 100 > x + dx) {
        dy = -dy;
      }

      return dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: x + dx,
          y: y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handle);
  }, [state.ball]);

  return (
    <div className="container">

      <Brick style={{top: 0, left:0}}/>
      <Paddle paddleX={state.paddle.x} />
      <Ball pos={state.ball} />
    </div>
  );
}