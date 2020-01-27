import React, { useEffect, useReducer } from "react";
import "./styles.css";
import Paddle from "./components/Paddle/Paddle";
import Container from "./components/Container/Container";
import Ball from "./components/Ball/Ball";
import Brick from "./components/Brick/Brick";

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

function willCollide(rect1, rect2) {
    let x = false;
    let y = false;
    let xCurr = false;
    let yCurr = false;
    let collided = false;
    const rect1XNext = rect1.x + rect1.dx;
    const rect1YNext = rect1.y + rect1.dy;
    if (rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x) {
      xCurr = true;
    }
    if (rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y) {
      yCurr = true;
    }
    if (
      yCurr &&
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x
    ) {
      x = true;
    }
    if (
      xCurr &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      y = true;
    }
    if (
      rect1XNext < rect2.x + rect2.width &&
      rect1XNext + rect1.width > rect2.x &&
      rect1YNext < rect2.y + rect2.height &&
      rect1YNext + rect1.height > rect2.y
    ) {
      collided = true;
    }
    return { x, y, collided };
  }

  useEffect(
    () => {
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
    },
    [state.ball]
  );

  const bricks = [
    {
      top: 0,
      left: 0
    },

    {
      top: 0,
      left: 100
    },
    {
      top: 0,
      left: 200
    },
    {
      top: 50,
      left: 0
    },
    {
      top: 50,
      left: 100
    },
    {
      top: 50,
      left: 200
    },
    {
      top: 100,
      left: 0
    },
    {
      top: 75,
      left: 100
    },
    {
      top: 100,
      left: 200
    }
  ];

  return (
    <div className="container">
      {bricks.map(brick => <Brick style={brick} />)}

      <Brick style={{ top: 0, left: 0 }} />

      <Paddle paddleX={state.paddle.x} />
      <Ball pos={state.ball} />
    </div>
  );
}
