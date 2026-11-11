
import { useState, type FormEvent } from "react";
import { checkEmailDuplicate } from "../../api/members/check-email-duplicate";
import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { signup } from "../../api/members/signup";

// 이메일 형식 검사
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 영문 대소문자, 숫자, 특수문자를 모두 포함해 8자 이상
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const DEFAULT_FORM = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirm: "",
};

type DefaultFormKey = keyof typeof DEFAULT_FORM;
type DefaultFormValue = (typeof DEFAULT_FORM)[DefaultFormKey];

// 중복 확인 상태
const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
};

type DuplicateCheckKey = "email" | "nickname";

const inputClass =
  "min-w-0 w-full bg-transparent text-[14px] text-[#17191E] outline-none placeholder:text-[#969DA8]";

const fieldClass =
  "flex h-[49px] w-full items-center gap-[9px] rounded-lg border border-[#E3E6EB] bg-white px-[13px]";

const labelClass =
  "block w-full text-left text-[13px] font-extrabold leading-none text-[#17191E]";

export function SignupPage() {
  const [form, setForm] = useState(DEFAULT_FORM);

  // 이메일, 닉네임 중복 확인 상태
  const [duplicateCheck, setDuplicateCheck] = useState({
    email: { ...DEFAULT_DUPLICATE_CHECK },
    nickname: { ...DEFAULT_DUPLICATE_CHECK },
  });

  // 회원가입 요청 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값 유효성 검사
  const isEmailValid = EMAIL_REGEX.test(form.email.trim());

  const isNicknameValid =
    form.nickname.trim().length >= 2 &&
    form.nickname.trim().length <= 12;

  const isPasswordValid = PASSWORD_REGEX.test(form.password);

  const isPasswordConfirmValid =
    form.passwordConfirm.length > 0 &&
    form.password === form.passwordConfirm;

  // 입력한 필드에만 오류 표시
  const showEmailError =
    form.email.length > 0 && !isEmailValid;

  const showNicknameError =
    form.nickname.length > 0 && !isNicknameValid;

  const showPasswordError =
    form.password.length > 0 && !isPasswordValid;

  const showPasswordConfirmError =
    form.passwordConfirm.length > 0 &&
    !isPasswordConfirmValid;

  // 모든 입력값의 형식이 올바른지 확인
  const isFormValid =
    isEmailValid &&
    isNicknameValid &&
    isPasswordValid &&
    isPasswordConfirmValid;

  // 입력 조건과 두 중복 확인을 모두 통과해야 제출 가능
  const canSubmit =
    isFormValid &&
    duplicateCheck.email.isAvailable &&
    duplicateCheck.nickname.isAvailable;

  const handleChangeField = (
    key: DefaultFormKey,
    value: DefaultFormValue
  ) => {
    if (key === "email" || key === "nickname") {
      if (duplicateCheck[key].isChecking) return;

      // 확인한 값을 바꾸면 다시 중복 확인해야 함
      setDuplicateCheck((prev) => ({
        ...prev,
        [key]: { ...DEFAULT_DUPLICATE_CHECK },
      }));
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 이메일, 닉네임 중복 확인 API 요청
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
          : `이미 사용 중인 ${label}이에요.`
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

  // 회원가입 API 요청
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

      // 로그인 페이지 연결 후 주석 해제
      // navigate({ to: "/login" });
    } catch {
      alert("회원가입에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-160px)] w-full items-center justify-center bg-[#F7F8FA] px-5 py-12">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[430px] flex-col gap-4"
      >
        {/* 회원가입 제목 */}
        <h1 className="m-0 w-full text-left text-[34px] font-bold leading-none text-[#17191E]">
          회원가입
        </h1>

        {/* 이메일 */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            이메일
          </label>

          <div className={fieldClass}>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={form.email}
              disabled={duplicateCheck.email.isChecking}
              onChange={(e) =>
                handleChangeField("email", e.target.value)
              }
              className={inputClass + " flex-1"}
            />

            <button
              type="button"
              disabled={!isEmailValid || duplicateCheck.email.isChecking}
              onClick={() => handleCheckDuplicate("email")}
              className="shrink-0 text-[12px] font-extrabold text-[#2563EB] disabled:cursor-not-allowed"
            >
              {duplicateCheck.email.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>

          {showEmailError && (
            <p className="w-full text-left text-[11px] font-normal leading-none text-red-500">
              이메일 형식을 확인해 주세요.
            </p>
          )}
        </div>

        {/* 닉네임 */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="nickname" className={labelClass}>
            닉네임
          </label>

          <div className={fieldClass}>
            <input
              id="nickname"
              type="text"
              placeholder="2-12자"
              value={form.nickname}
              disabled={duplicateCheck.nickname.isChecking}
              onChange={(e) =>
                handleChangeField("nickname", e.target.value)
              }
              className={inputClass + " flex-1"}
            />

            <button
              type="button"
              disabled={!isNicknameValid || duplicateCheck.nickname.isChecking}
              onClick={() => handleCheckDuplicate("nickname")}
              className="shrink-0 text-[12px] font-extrabold text-[#2563EB] disabled:cursor-not-allowed"
            >
              {duplicateCheck.nickname.isChecking ? "확인 중" : "중복 확인"}
            </button>
          </div>

          {showNicknameError && (
            <p className="w-full text-left text-[11px] font-normal leading-none text-red-500">
              닉네임은 2~12자로 입력해 주세요.
            </p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="password" className={labelClass}>
            비밀번호
          </label>

          <div className={fieldClass}>
            <input
              id="password"
              type="password"
              placeholder="8자 이상"
              value={form.password}
              onChange={(e) =>
                handleChangeField("password", e.target.value)
              }
              className={inputClass}
            />
          </div>

          <p className="text-left text-[11px] font-normal leading-none text-[#969DA8]">
            영문 대·소문자, 숫자, 특수문자를 모두 포함해
            8자 이상 입력해 주세요
          </p>

          {showPasswordError && (
            <p className="w-full text-left text-[11px] font-normal leading-none text-red-500">
              비밀번호를 다시 한번 확인해주세요.
            </p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex w-full flex-col gap-2">
          <label
            htmlFor="passwordConfirm"
            className={labelClass}
          >
            비밀번호 확인
          </label>

          <div className={fieldClass}>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="다시 입력"
              value={form.passwordConfirm}
              onChange={(e) =>
                handleChangeField(
                  "passwordConfirm",
                  e.target.value
                )
              }
              className={inputClass}
            />
          </div>

          {showPasswordConfirmError && (
            <p className="w-full text-left text-[11px] font-normal leading-none text-red-500">
              비밀번호가 일치하지 않아요.
            </p>
          )}
        </div>

        {/* 가입하기 버튼 */}
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-[#2563EB] text-[14px] font-extrabold text-white disabled:cursor-not-allowed"
        >
          {isSubmitting ? "가입 중" : "가입하기"}
        </button>

        {/* 로그인 이동 */}
        <div className="flex w-full items-center justify-center gap-1">
          <span className="text-[13px] font-normal leading-none text-[#606774]">
            이미 계정이 있나요?
          </span>

          <a
            href="/login"
            className="text-[12px] font-extrabold leading-none text-[#2563EB]"
          >
            로그인
          </a>
        </div>
      </form>
    </main>
  );
}
