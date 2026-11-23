import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import "./auth-pages.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) return;

    setMessage("로그인 API 연동은 8주차에서 진행해요.");
  };

  return (
    <div className="auth-page">

      <main className="login-main">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>로그인</h1>

          <div className="login-field">
            <label htmlFor="login-email">이메일</label>

            <div className="login-input">
              <span className="login-input-icon">✉</span>

              <input
                id="login-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="login-password">비밀번호</label>

            <div className="login-input">
              <span className="login-input-icon">♙</span>

              <input
                id="login-password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="auth-primary login-submit"
            disabled={!email.trim() || !password}
          >
            로그인
          </button>

          <p className="signup-link">
            처음이신가요? <Link to="/signup">회원가입</Link>
          </p>

          {message && <p className="auth-notice">{message}</p>}
        </form>
      </main>
    </div>
  );
}