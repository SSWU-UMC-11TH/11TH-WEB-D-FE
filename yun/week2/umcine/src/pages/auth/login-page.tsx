import { useState, type FormEvent } from "react";
import { useLoginMutation } from "@/hooks/use-login-mutation";
import { Link } from "@tanstack/react-router";
import "./auth-pages.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLoginMutation();

  const canSubmit = EMAIL_REGEX.test(email.trim()) && password.length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit || loginMutation.isPending) return;

    loginMutation.mutate({
      email: email.trim(),
      password,
    });
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
            disabled={!canSubmit || loginMutation.isPending}
          >
            {loginMutation.isPending ? "로그인 중" : "로그인"}
          </button>

          <p className="signup-link">
            처음이신가요? <Link to="/signup">회원가입</Link>
          </p>
        </form>
      </main>
    </div>
  );
}
