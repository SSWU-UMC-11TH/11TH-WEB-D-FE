
 // src/pages/my/my-edit-page.tsx

import { useEffect, useState, type FormEvent } from "react";

import { checkNicknameDuplicate } from "../../api/members/check-nickname-duplicate";
import { useMyInfoQuery } from "../../hooks/use-my-info-query";
import { useUpdateMeMutation } from "../../hooks/use-update-me-mutation";

const DEFAULT_DUPLICATE_CHECK = {
  isChecking: false,
  isAvailable: false,
  checkedNickname: "",
};

export function MyEditPage() {
  const [nicknameInput, setNicknameInput] = useState("");
  const [isNicknameEdited, setIsNicknameEdited] = useState(false);
  const [duplicateCheck, setDuplicateCheck] = useState(
    DEFAULT_DUPLICATE_CHECK
  );

  // 회원 정보 조회 및 수정
  const meQuery = useMyInfoQuery();
  const updateMeMutation = useUpdateMeMutation();

  const nickname = nicknameInput.trim();
  const originalNickname = meQuery.data?.nickname ?? "";

  const isNicknameValid =
    nickname.length >= 2 && nickname.length <= 12;

  const isNicknameChanged = nickname !== originalNickname;

  const isNicknameAvailable =
    duplicateCheck.isAvailable &&
    duplicateCheck.checkedNickname === nickname;

  // 닉네임이 변경되었고 중복 확인을 통과해야 저장 가능
  const canSubmit =
    isNicknameValid &&
    isNicknameChanged &&
    isNicknameAvailable &&
    !duplicateCheck.isChecking &&
    !updateMeMutation.isPending;

  // 서버에서 조회한 닉네임을 입력창에 반영
  useEffect(() => {
    if (meQuery.data?.nickname && !isNicknameEdited) {
      setNicknameInput(meQuery.data.nickname);
    }
  }, [meQuery.data?.nickname, isNicknameEdited]);

  // 닉네임 입력값 변경
  const handleNicknameChange = (value: string) => {
    if (duplicateCheck.isChecking) return;

    setNicknameInput(value);
    setIsNicknameEdited(true);

    // 확인한 닉네임을 변경하면 중복 확인 상태 초기화
    setDuplicateCheck(DEFAULT_DUPLICATE_CHECK);
  };

  // 회원가입 페이지의 닉네임 중복 확인 API 재사용
  const handleCheckNicknameDuplicate = async () => {
    if (!isNicknameValid || duplicateCheck.isChecking) return;

    setDuplicateCheck({
      isChecking: true,
      isAvailable: false,
      checkedNickname: "",
    });

    try {
      const response = await checkNicknameDuplicate(nickname);
      const isAvailable = response.available;

      setDuplicateCheck({
        isChecking: false,
        isAvailable,
        checkedNickname: nickname,
      });

      alert(
        isAvailable
          ? "사용할 수 있는 닉네임이에요."
          : "이미 사용 중인 닉네임이에요."
      );
    } catch {
      setDuplicateCheck(DEFAULT_DUPLICATE_CHECK);
      alert("중복 확인에 실패했어요. 다시 시도해 주세요.");
    }
  };

  // 회원 정보 수정
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) return;

    updateMeMutation.mutate(
      { nickname },
      {
        onSuccess: (response) => {
          if (response.isSuccess) {
            setNicknameInput(response.result.nickname);
            setIsNicknameEdited(false);
            setDuplicateCheck(DEFAULT_DUPLICATE_CHECK);
          }
        },
      }
    );
  };

  return (
    <main className="min-h-full bg-[#F7F8FA] px-4 py-6 font-[Pretendard,sans-serif] sm:pl-[80px] sm:pr-4">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* 내 정보 수정 */}
        <section>
          {/* 제목, 설명, 저장 버튼 */}
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="m-0 text-left text-[31px] font-bold leading-[37px] text-[#17191E]">
                내 정보 수정
              </h1>

              <p className="m-0 text-left text-[14px] font-normal leading-[22px] text-[#606774]">
                닉네임과 프로필 이미지만 변경할 수 있어요.
              </p>
            </div>

            <button
              type="submit"
              form="profile-form"
              disabled={!canSubmit}
              className="flex h-[42px] w-[112px] shrink-0 items-center justify-center rounded-[8px] border border-white bg-[#2563EB] px-4 text-[14px] font-extrabold leading-none text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateMeMutation.isPending
                ? "저장 중"
                : "변경사항 저장"}
            </button>
          </div>

          {/* 프로필 수정 폼 */}
          <form
            id="profile-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-8 lg:grid-cols-2"
          >
            {/* 프로필 이미지 영역 */}
            <div className="flex flex-col items-center justify-start pt-4">
              <div className="relative h-[82px] w-[82px]">
                {/* 프로필 이미지 */}
                <span className="flex h-[82px] w-[82px] items-center justify-center rounded-full bg-[#E3E6EB]">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="16"
                      cy="10"
                      r="6"
                      fill="#17191E"
                    />
                    <path
                      d="M4 28C4 21.4 9.4 18 16 18C22.6 18 28 21.4 28 28"
                      fill="#17191E"
                    />
                  </svg>
                </span>

                {/* 프로필 이미지 수정 아이콘 */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 right-0 flex h-[24px] w-[24px] items-center justify-center rounded-full border-2 border-[#17191E] bg-[#F7F8FA]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 10.5L10.5 3L13 5.5L5.5 13H3V10.5Z"
                      fill="#17191E"
                    />
                    <path
                      d="M9.5 4L12 6.5"
                      stroke="#F7F8FA"
                      strokeWidth="1"
                    />
                  </svg>
                </span>
              </div>

              <strong className="mt-2 text-[15px] font-bold leading-none text-[#17191E]">
                프로필 이미지
              </strong>

              <span className="mt-2 text-[11px] font-normal leading-none text-[#969DA8]">
                선택 사항 · 최대 5MB
              </span>
            </div>

            {/* 닉네임, 이메일 입력 영역 */}
            <div className="flex min-w-0 flex-col gap-2">
              {/* 닉네임 */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="profile-nickname"
                  className="text-left text-[13px] font-extrabold leading-none text-[#17191E]"
                >
                  닉네임
                </label>

                <div className="flex min-h-[49px] items-center gap-2 rounded-[8px] border border-[#E3E6EB] bg-white px-[13px]">
                  <input
                    id="profile-nickname"
                    type="text"
                    value={nicknameInput}
                    onChange={(event) =>
                      handleNicknameChange(event.target.value)
                    }
                    minLength={2}
                    maxLength={12}
                    disabled={
                      meQuery.isPending ||
                      meQuery.isError ||
                      duplicateCheck.isChecking ||
                      updateMeMutation.isPending
                    }
                    className="h-[47px] min-w-0 flex-1 border-0 bg-transparent text-[14px] font-normal text-[#17191E] outline-none disabled:cursor-not-allowed"
                  />

                  <button
                    type="button"
                    onClick={handleCheckNicknameDuplicate}
                    disabled={
                      !isNicknameValid ||
                      duplicateCheck.isChecking
                    }
                    className="shrink-0 border-0 bg-transparent p-0 text-[12px] font-extrabold leading-none text-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {duplicateCheck.isChecking
                      ? "확인 중..."
                      : "중복 확인"}
                  </button>
                </div>

                {/* 닉네임 형식 오류 */}
                {nicknameInput.length > 0 &&
                  !isNicknameValid && (
                    <p className="m-0 text-left text-[12px] text-red-600">
                      닉네임은 2~12자로 입력해 주세요.
                    </p>
                  )}
              </div>

              {/* 이메일 */}
              <div className="mt-2 flex flex-col gap-2">
                <label
                  htmlFor="profile-email"
                  className="text-left text-[13px] font-extrabold leading-none text-[#17191E]"
                >
                  이메일
                </label>

                <input
                  id="profile-email"
                  type="email"
                  value={meQuery.data?.email ?? ""}
                  readOnly
                  className="box-border h-[49px] w-full rounded-[8px] border border-[#E3E6EB] bg-white px-[13px] text-[14px] font-normal text-[#17191E] outline-none"
                />
              </div>

              {meQuery.isError && (
                <p
                  role="alert"
                  className="m-0 text-left text-[13px] text-red-600"
                >
                  회원 정보를 불러오지 못했어요.
                </p>
              )}

              {updateMeMutation.isError && (
                <p
                  role="alert"
                  className="m-0 text-left text-[13px] text-red-600"
                >
                  닉네임 변경에 실패했어요. 다시 시도해 주세요.
                </p>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
