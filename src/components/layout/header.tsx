import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="mx-auto flex h-22.75 w-full max-w-325.25 items-center gap-3 px-7.5 py-4">
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg border-[2.5px] border-black">
          <img src="/icons/movie.svg" alt="" className="size-5" />
        </div>
        <h1 className="text-2xl font-extrabold tracking-[-0.5px]">UMCine</h1>
      </div>

      <Link to="/">영화</Link>
      <Link to="/search">검색</Link>
      <p className="ml-4">내 정보</p>
      <button
        aria-label="검색"
        className="ml-auto flex size-10.75 items-center justify-center rounded-lg"
      >
        <img src="/icons/search.svg" alt="" />
      </button>
      <button className="h-10.75 w-18 rounded-lg bg-[#2563eb] font-medium text-white">
        로그인
      </button>
    </header>
  );
}
