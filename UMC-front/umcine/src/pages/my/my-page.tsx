// src > pages > my > my-page.tsx

import { Link } from "@tanstack/react-router";
import { useMyInfoQuery } from "../../hooks/use-my-info-query";

export function MyPage() {
  const meQuery = useMyInfoQuery();

  return (
    <main className="min-h-full bg-[#F7F8FA] px-4 py-6 font-[Pretendard,sans-serif] sm:pl-[80px] sm:pr-4">
      <div className="mx-auto w-full max-w-[1280px]">
        {/* 제목 및 정보 수정 버튼 */}
        <div className="mb-7 flex items-center justify-between">
          <h1 className="m-0 text-left text-[31px] font-bold leading-[37px] text-[#17191E]">
            내 정보
          </h1>

          <Link
            to="/my/edit"
            className="flex h-[42px] shrink-0 items-center justify-center rounded-[8px] bg-[#2563EB] px-4 text-[14px] font-extrabold text-white no-underline"
          >
            정보 수정
          </Link>
        </div>

        {/* 기본 정보 */}
        <section className="border-y border-[#E3E6EB] py-3">
          <h2 className="mb-4 mt-0 text-left text-[17px] font-bold leading-[20px] text-[#17191E]">
            기본 정보
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            {/* 프로필 아이콘 */}
            <div className="flex h-[82px] w-[82px] shrink-0 items-center justify-center rounded-full bg-[#E3E6EB]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="24" cy="17" r="8" fill="#17191E" />
                <path
                  d="M8 40C8 31.2 15.2 26 24 26C32.8 26 40 31.2 40 40"
                  fill="#17191E"
                />
              </svg>
            </div>

            {/* 닉네임 및 이메일 */}
            <div className="grid w-full grid-cols-1 gap-6 sm:w-auto sm:grid-cols-2 sm:gap-x-6">
              <div className="flex min-w-0 flex-col gap-[6px] sm:w-[366px]">
                <span className="text-left text-[11px] text-[#969DA8]">
                  닉네임
                </span>

                <strong className="text-left text-[14px] font-bold text-[#17191E]">
                  {meQuery.isPending
                    ? "불러오는 중..."
                    : meQuery.isError
                      ? "정보를 불러오지 못했어요."
                      : meQuery.data?.nickname}
                </strong>
              </div>

              <div className="flex min-w-0 flex-col gap-[6px] sm:w-[366px]">
                <span className="text-left text-[11px] text-[#969DA8]">
                  이메일
                </span>

                <strong className="break-all text-left text-[14px] font-bold text-[#17191E]">
                  {meQuery.isPending
                    ? "불러오는 중..."
                    : meQuery.isError
                      ? "정보를 불러오지 못했어요."
                      : meQuery.data?.email}
                </strong>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
