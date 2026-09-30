import "./header.css";
import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">
          <img src="/icons/movie.svg" alt="" />
        </div>
        <h1>UMCine</h1>
      </div>

      <Link to="/">영화</Link>
      <Link to="/search">검색</Link>
      <p>내 정보</p>
      <button className="search-btn" aria-label="검색">
        <img src="/icons/search.svg" alt="" />
      </button>
      <button className="login">로그인</button>
    </header>
  );
}
