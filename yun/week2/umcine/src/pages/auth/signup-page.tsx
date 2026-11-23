import { signup } from "@/api/members/signup";
// import { useNavigate } from "@tanstack/react-router";
import { checkEmailDuplicate } from "@/api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "@/api/members/check-nickname-duplicate";

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

import { useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type FormKey = keyof typeof DEFAULT_FORM;

export function SignupPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: { ...DEFAULT_DUPLICATE_CHECK },
    nickname: { ...DEFAULT_DUPLICATE_CHECK },
  });
  const [form, setForm] = useState(DEFAULT_FORM);

  // 입력값 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const isNicknameValid =
    form.nickname.trim().length >= 2 && form.nickname.trim().length <= 12;

  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;

  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;
  const handleChangeField = (key: FormKey, value: string) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...DEFAULT_DUPLICATE_CHECK },
      }));
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckDuplicate = async (key: DuplicateCheckKey) => {
    const isValid = key === "email" ? isEmailValid : isNicknameValid;

    if (!isValid || duplicateCheck[key].isChecking) return;

    const label = key === "email" ? "이메일" : "닉네임";

    setDuplicateCheck((prev) => ({
      ...prev,
      [key]: { isChecking: true, isAvailable: false },
    }));

    try {
      const response =
        key === "email"
          ? await checkEmailDuplicate(form.email.trim())
          : await checkNicknameDuplicate(form.nickname.trim());

      const isAvailable = response.available;

      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable },
      }));

      alert(
        isAvailable
          ? `사용할 수 있는 ${label}이에요.`
          : `이미 사용 중인 ${label}이에요.`,
      );
    } catch {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isAvailable: false },
      }));

      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...prev[key], isChecking: false },
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await signup({
        email: form.email.trim(),
        nickname: form.nickname.trim(),
        password: form.password,
      });

      alert(response.message);

      // 로그인 페이지 연결 후 사용
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>회원가입</h1>

      <div>
        <label>이메일</label>
        <input
          type="email"
          disabled={duplicateCheck.email.isChecking}
          value={form.email}
          onChange={(e) => handleChangeField("email", e.target.value)}
        />
        <button
          type="button"
          disabled={!isEmailValid || duplicateCheck.email.isChecking}
          onClick={() => handleCheckDuplicate("email")}
        >
          {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
        </button>
        {form.email && !isEmailValid && (
          <p>올바른 이메일 형식을 입력해 주세요.</p>
        )}
      </div>

      <div>
        <label>닉네임</label>
        <input
          type="text"
          disabled={duplicateCheck.nickname.isChecking}
          value={form.nickname}
          onChange={(e) => handleChangeField("nickname", e.target.value)}
        />
        <button
          type="button"
          disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
          onClick={() => handleCheckDuplicate("nickname")}
        >
          {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
        </button>
        {form.nickname && !isNicknameValid && (
          <p>닉네임은 2~12자로 입력해 주세요.</p>
        )}
      </div>

      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => handleChangeField("password", e.target.value)}
        />
        {form.password && !isPasswordValid && (
          <p>대소문자, 숫자, 특수문자를 포함해 8자 이상 입력해 주세요.</p>
        )}
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input
          type="password"
          value={form.passwordConfirm}
          onChange={(e) => handleChangeField("passwordConfirm", e.target.value)}
        />
        {form.passwordConfirm && !isPasswordConfirmValid && (
          <p>비밀번호가 일치하지 않습니다.</p>
        )}
      </div>

      <button type="submit" disabled={!canSubmit || isSubmitting}>
        {isSubmitting ? "가입 중" : "가입하기"}
      </button>
    </form>
  );
}
