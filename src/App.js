import React, { useEffect, useReducer } from "react";
import "./styles.css";
import Paddle from "./components/Paddle";
import Container from "./components/Container";
import Ball from "./components/Ball";

const initialState = {
  p1Paddle: {
    y: 0
  },
  p2Paddle: {
    y: 0
  },
  ball: {
    x: 0,
    y: 0,
    dx: 10,
    dy: 5
  }
};

function reducer(state, action) {
  switch (action.type) {
    case "MOVE_PADDLE_P1":
      return { ...state, p1Paddle: action.payload };
    case "MOVE_PADDLE_P2":
      return { ...state, p2Paddle: action.payload };
    case "MOVE_BALL":
      return { ...state, ball: action.payload };
    default:
      throw new Error("mismatched event: " + action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [p1PaddleY, setP1PaddleY] = useState(0);
  // const [p2PaddleY, setP2PaddleY] = useState(0);

  function handleKey(e) {
    // let boundedY;
    // const offset = (window.innerHeight - 600) / 2;

    const char = e.key.toLowerCase();
    if (char === "a" || char === "z") {
      dispatch({
        type: "MOVE_PADDLE_P1",
        payload: {
          y: state.p1Paddle.y + (char === "a" ? -10 : 10)
        }
      });
    }
    if (char === "'" || char === "/") {
      dispatch({
        type: "MOVE_PADDLE_P2",
        payload: {
          y: state.p2Paddle.y + (char === "'" ? -10 : 10)
        }
      });
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [state.p2Paddle, state.p1Paddle]);

  useEffect(() => {
    const handleBall = setTimeout(() => {
      let dx = state.ball.dx;
      let dy = state.ball.dy;
      if (
        state.ball.x + state.ball.dx > 900 - 20 ||
        state.ball.x + state.ball.dx < 1
      ) {
        dx = -dx;
      }
      if (
        state.ball.y + state.ball.dy > 600 - 20 ||
        state.ball.y + state.ball.dy < 1
      ) {
        dy = -dy;
      }
      dispatch({
        type: "MOVE_BALL",
        payload: {
          dx,
          dy,
          x: state.ball.x + dx,
          y: state.ball.y + dy
        }
      });
    }, 50);
    return () => clearTimeout(handleBall);
  }, [state.ball]);

  return (
    <div className="App">
      <div className="container">
        {/* <Container> */}
        <Paddle paddleY={state.p1Paddle.y} />
        <Paddle isPlayerTwo paddleY={state.p2Paddle.y} />
        <Ball pos={state.ball} />
        {/* </Container> */}
      </div>
    </div>
  );
}