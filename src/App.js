import React from "react";
import "./styles.css";
import Paddle from "./components/Paddle";

export default function App() {

    const [p1PaddleY, setP1PaddleY] = useState(0);
    const [p2PaddleY, setP2PaddleY] = useState(0);

    function handleKey(e) {

      const char = e.key.toLowerCase();
        if (char === "w" || char === "s") {
          setP1PaddleY(p1PaddleY + (char === "w" ? -10 : 10));
          setP2PaddleY(p2PaddleY + (char === "o" ? -10 : 10));
        }

    }

    useEffect(() => {

      window.addEventListener("keydown", handleKey);
      window.addEventListener("keydown", handleKey2);

      return () => {

      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keydown", handleKey2);

      }

    })

  return (
    <div className="container">
      <Paddle paddleY />
      <Paddle isPlayTwo />
    </div>
  );
}

//import React from "react";
// import "./styles.css";
// import Paddle from "./components/Paddle";
// import Ball from "./components/Ball";

// export default function App() {
//   return (
//     <div className="container">
//       <Paddle />
//       <Ball />
//     </div>
//   );
// }

