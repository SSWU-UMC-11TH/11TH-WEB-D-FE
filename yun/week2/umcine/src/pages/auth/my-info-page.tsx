import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { getProfile } from "./profile-storage";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";
import "./auth-pages.css";

const favoriteMovies = [
  {
    id: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    date: "2026.07.29",
    poster: "spider",
  },
  {
    id: 2,
    title: "오디세이",
    date: "2026.08.05",
    poster: "odyssey",
  },
  {
    id: 3,
    title: "미니언즈 & 몬스터즈",
    date: "2026.07.15",
    poster: "minions",
  },
];

export function MyInfoPage() {
  const [profile] = useState(getProfile);

  const accessToken = useAuthStore((state) => state.accessToken);

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const displayNickname = !accessToken
    ? "로그인 필요"
    : meQuery.isLoading
      ? "불러오는 중..."
      : meQuery.isError
        ? "조회 실패"
        : (meQuery.data?.nickname ?? "-");

  const displayEmail = !accessToken
    ? "로그인 필요"
    : meQuery.isLoading
      ? "불러오는 중..."
      : meQuery.isError
        ? "조회 실패"
        : (meQuery.data?.email ?? "-");

  return (
    <div className="auth-page info-page">
      <main className="auth-main">
        <div className="auth-title-row">
          <h1>내 정보</h1>

          <Link to="/my-info/edit" className="auth-primary auth-top-button">
            정보 수정
          </Link>
        </div>

        <section className="profile-section">
          <h2>기본 정보</h2>

          <div className="profile-row">
            <div className="profile-avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt="프로필" />
              ) : (
                <span>👤</span>
              )}
            </div>

            <div className="profile-detail">
              <span>닉네임</span>
              <strong>{displayNickname}</strong>
            </div>

            <div className="profile-detail">
              <span>이메일</span>
              <strong>{displayEmail}</strong>
            </div>
          </div>
        </section>

        <section className="favorites-section">
          <h2>내 즐겨찾기</h2>

          <div className="favorite-grid">
            {favoriteMovies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <div className={`movie-poster ${movie.poster}`}>
                  <span>{movie.title}</span>
                </div>

                <h3>{movie.title}</h3>
                <p>{movie.date}</p>
              </div>
            ))}
          </div>

          <div className="movie-pagination">
            <button type="button" disabled>
              ‹
            </button>

            <span>1</span>

            <button type="button" disabled>
              ›
            </button>
          </div>
        </section>
      </main>

      <footer className="auth-footer">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </footer>
    </div>
  );
}
