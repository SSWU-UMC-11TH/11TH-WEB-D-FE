import { Link } from '@tanstack/react-router'

export function Header() {
    return (
        <div className="mx-auto flex h-[91px] w-[1440px] items-center justify-between">
            <div className="ml-[80px] flex items-center">
                <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] border-2 border-black">
                    <img src="/icons/movie-icons/movie.svg" alt="" />
                </div>

                <p className="ml-[10px] text-[20px] font-black tracking-[-0.7px] text-[#17191E]">
                    UMCine
                </p>

                <Link
                    to="/"
                    className="ml-[42px] border-b-2 border-[#17191E] text-[14px] font-bold text-[#17191E]"
                >
                    영화
                </Link>

                <Link
                    to="/search"
                    className="ml-[30px] text-[14px] font-bold text-[#606774]"
                >
                    검색
                </Link>

                <p className="ml-[30px] text-[14px] font-bold text-[#606774]">
                    내 정보
                </p>
            </div>

            <div className="mr-[80px] flex items-center">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[8px] border border-[#E3E6EB]">
                    <img src="/icons/movie-icons/search.svg" alt="" />
                </div>

                <p className="ml-[10px] flex h-[42px] w-[95px] items-center justify-center rounded-[8px] bg-[#2563EB] text-[14px] font-extrabold text-white">
                    마이페이지
                </p>
            </div>
        </div>
    )
}