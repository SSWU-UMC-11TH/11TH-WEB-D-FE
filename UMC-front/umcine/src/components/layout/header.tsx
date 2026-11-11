
import { Link } from "@tanstack/react-router";

function Header() {
    return (
        <header className="flex flex-col gap-3 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-5 sm:pl-16">
            <div className="flex items-center gap-5 sm:gap-10">
                {/* UMCine 로고 및 텍스트 클릭 시 메인 페이지 이동 */}
                <Link
                    to="/"
                    className="flex items-center gap-2.5 no-underline"
                    aria-label="UMCine 홈으로 이동"
                >
                    <span className="box-border flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#17191e]">
                        <img src="/icons/movie.svg" alt="" />
                    </span>

                    <strong className="font-[Pretendard,sans-serif] text-[20px] font-black leading-none tracking-[-0.7px] text-[#17191e]">
                        UMCine
                    </strong>
                </Link>

                <nav className="flex items-center gap-4 sm:gap-8">
                    <Link
                        to="/"
                        className="font-[Pretendard,sans-serif] text-[14px] leading-none text-[#17191e] [&.active]:font-bold [&.active]:underline"
                    >
                        영화
                    </Link>

                    <Link
                        to="/search"
                        className="font-[Pretendard,sans-serif] text-[14px] leading-none text-[#17191e] [&.active]:font-bold [&.active]:underline"
                    >
                        검색
                    </Link>

                    <span className="font-[Pretendard,sans-serif] text-[14px] leading-none text-[#17191e]">
                        내 정보
                    </span>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <Link
                    to="/search"
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[#e5e7eb] bg-white p-0"
                    aria-label="검색"
                >
                    <img
                        className="h-[17.49px] w-[17.49px]"
                        src="/icons/search.svg"
                        alt=""
                    />
                </Link>

                <Link
                    to="/login"
                    className="rounded-[6px] border-0 bg-[#2563eb] px-4 py-2.5 font-semibold text-white"
                >
                    로그인
                </Link>
            </div>
        </header>
    );
}

export default Header;
