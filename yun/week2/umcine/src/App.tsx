// import Header from './components/header';

// function App() {
//   return (
//     <>
//       <Header />
//     </>
//   );
// }

// export default App;

import { useState } from 'react'
import Header from './components/header'
import MovieGrid from './components/movie-grid'
import Pagination from './components/pagination'
import { movies as initialMovies } from './data/movies'

const App = () => {
  const [movies, setMovies] = useState(initialMovies)

  const handleToggleBookmark = (movieId: number) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === movieId
          ? { ...movie, isBookmarked: !movie.isBookmarked }
          : movie
      )
    )
  }

  return (
    <>
      <Header />

      <main className="main_wrap">
        <h1 className="main_title">영화 목록</h1>

        <MovieGrid
          movies={movies}
          onToggleBookmark={handleToggleBookmark}
        />

        <Pagination />
      </main>
    </>
  )
}

export default App
