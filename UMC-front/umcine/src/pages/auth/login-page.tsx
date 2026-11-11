import { useState, type FormEvent } from "react";
import { Mail, LockKeyhole } from "lucide-react";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "min-w-0 flex-1 bg-transparent text-[14px] text-[#17191E] outline-none placeholder:text-[#969DA8]";

const fieldClass =
  "flex h-[49px] w-full items-center gap-[9px] rounded-lg border border-[#E3E6EB] bg-white px-[13px]";

const labelClass =
  "block w-full text-left text-[13px] font-extrabold leading-none text-[#17191E]";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일과 비밀번호가 입력되었는지 확인
  const canSubmit =
    EMAIL_REGEX.test(email.trim()) && password.length > 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;

    // 현재는 퍼블리싱 단계이므로 로그인 API는 연결하지 않음
    console.log("로그인 폼 입력 확인 완료");
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center bg-[#F7F8FA] px-5 py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-4"
      >
        {/* 로그인 제목 */}
        <h1 className="m-0 w-full text-left text-[34px] font-bold leading-none text-[#17191E]">
          로그인
        </h1>

        {/* 이메일 */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            이메일
          </label>

          <div className={fieldClass}>
            <Mail
              size={16}
              className="shrink-0 text-[#606774]"
              aria-hidden="true"
            />

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="password" className={labelClass}>
            비밀번호
          </label>

          <div className={fieldClass}>
            <LockKeyhole
              size={16}
              className="shrink-0 text-[#606774]"
              aria-hidden="true"
            />

            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <button
          type="submit"
          disabled={!canSubmit}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] text-[14px] font-extrabold text-white disabled:cursor-not-allowed disabled:bg-[#A9BFEF]"
        >
          로그인
        </button>

        {/* 회원가입 이동 */}
        <div className="flex w-full items-center justify-center gap-1">
          <span className="text-[13px] font-normal leading-none text-[#606774]">
            처음이신가요?
          </span>

          <a
            href="/signup"
            className="text-[12px] font-extrabold leading-none text-[#2563EB]"
          >
            회원가입
          </a>
        </div>
      </form>
    </main>
  );
}