//import { createContext, useContext, useState } from "react";
import Header from "./layout/header.tsx";
import "../App.css";
import MovieGrid from "./movies/movie-grid.tsx";
//import MovieGrid from "./movie-grid.tsx"

/* type StudyMode = "focus" | "break";

const StudyModeContext = createContext<StudyMode>("focus");

function StudyModeStatus() {  // 자식
  const studyMode = useContext(StudyModeContext);

  return <p>스터디 모드: {studyMode}</p>;
}

export default function App() {  // 부모
  const [mode, setTheme] = useState<StudyMode>("focus");

  function handleToggleTheme() {
    setTheme((currentMode) =>
      currentMode === "focus" ? "break" : "focus",
    );
  }

  return (
    <main>
     <StudyModeContext value={mode}>
      <StudyModeStatus />
      <button onClick={handleToggleTheme}>
        테마 바꾸기
      </button>
    </StudyModeContext> 
    </main>
  );
}

*/
export default function App() {
  // 부모
  return (
    <main>
      <Header />
      <section className="content">
        <div className="container">
          <h1>영화 목록</h1>
          <MovieGrid />
        </div>
      </section>
    </main>
  );
}
