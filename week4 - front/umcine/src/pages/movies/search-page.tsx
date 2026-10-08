import {
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";

import { BookmarkButton } from "../../components/bookmark-button";

import { useEffect, useState, type SubmitEvent } from "react";

import { movies } from "../../data/movies";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });

  const navigate = useNavigate({
    from: "/search",
  });

  const [searchText, setSearchText] = useState(query ?? "");

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  const normalizedQuery =
    query?.trim().toLowerCase() ?? "";

  const searchResults = normalizedQuery
    ? movies.filter(
        (movie) =>
          movie.title
            .toLowerCase()
            .includes(normalizedQuery) ||
          movie.originalTitle
            .toLowerCase()
            .includes(normalizedQuery),
      )
    : [];

  function handleSubmit(
    event: SubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const nextQuery = searchText.trim();

    navigate({
      search: nextQuery
        ? { query: nextQuery }
        : {},
    });
  }

  return (
    <main className="w-full">
      {!normalizedQuery ? (
        <section className="box-border flex h-[582px] w-full flex-col items-center bg-[#f7f8fa] px-[72px] pb-[210px] pt-[209px]">
          <h1 className="m-0 mb-[36px] h-[53px] w-[600px] text-center font-[Pretendard,sans-serif] text-[46px] font-bold leading-[53px] text-[#17191e]">
            어떤 영화를 찾고 있나요?
          </h1>

          <form
            onSubmit={handleSubmit}
            className="flex h-[74px] w-[790px] items-center rounded-[12px] border-2 border-[#17191e] bg-white pl-[21px] pr-[17px] shadow-[0_12px_34px_0_rgba(17,19,24,0.08)]"
          >
            <span className="relative h-[24px] w-[24px] shrink-0">
              <img
                src="/icons/search.svg"
                alt=""
                className="absolute left-[3px] top-[3px] h-[17.49px] w-[17.49px]"
              />
            </span>

            <input
              aria-label="검색어"
              placeholder="예: 스파이더맨"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              className="ml-[16px] h-[20px] w-[633px] border-0 bg-transparent p-0 font-[Pretendard,sans-serif] text-[14px] text-[#17191e] outline-none placeholder:text-[#606774]"
            />

            <button
              type="submit"
              className="ml-[20px] h-[42px] w-[59px] rounded-[8px] border border-[#17191e] bg-[#17191e] px-[1px] font-[Pretendard,sans-serif] text-white"
            >
              검색
            </button>
          </form>
        </section>
      ) : (
        <section className="w-full bg-[#f7f8fa] px-[72px] py-[32px] text-left">
          <h1 className="m-0 mb-[28px] font-[Pretendard,sans-serif] text-[38px] font-bold text-[#17191e]">
            영화 검색
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mb-[24px] flex h-[58px] w-full items-center rounded-[10px] border border-[#d1d5db] bg-white px-[18px]"
          >
            <img
              src="/icons/search.svg"
              alt=""
              className="h-[20px] w-[20px]"
            />

            <input
              aria-label="검색어"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              className="ml-[16px] flex-1 border-0 bg-transparent font-[Pretendard,sans-serif] text-[14px] text-[#17191e] outline-none"
            />

            <button
              type="button"
              onClick={() => setSearchText("")}
              className="mr-[20px] border-0 bg-transparent text-[24px] text-[#606774]"
              aria-label="검색어 지우기"
            >
              ×
            </button>

            <button
              type="submit"
              className="h-[42px] rounded-[8px] bg-[#17191e] px-[18px] font-[Pretendard,sans-serif] text-[13px] font-semibold text-white"
            >
              다시 검색
            </button>
          </form>

          <div className="mb-[20px] flex items-center justify-between border-b border-[#e5e7eb] pb-[16px]">
            <h2 className="m-0 font-[Pretendard,sans-serif] text-[18px] font-bold text-[#17191e]">
              '{query}' 검색 결과
            </h2>

            <p className="text-[12px] text-[#9ca3af]">
              영화 {searchResults.length}편 · 1페이지
            </p>
          </div>

          {searchResults.length === 0 ? (
            <p className="text-gray-500">
              검색 결과가 없어요.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-x-[40px]">
              {searchResults.map((movie) => (
                <li key={movie.id}>
                  <article className="flex h-[240px] w-[620px] border-b border-[#e3e6eb] py-[20px]">
                    <div className="relative h-[190px] w-[126px] shrink-0">
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="block h-full w-full"
                      >
                        <img
                          className="h-[190px] w-[126px] rounded-[8px] object-cover"
                          src={movie.posterPath}
                          alt={`${movie.title} 포스터`}
                        />
                      </Link>

                      <BookmarkButton movieId={movie.id} />
                    </div>

                    <div className="ml-[20px] flex flex-1 flex-col items-start">
                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="text-[#17191e] no-underline"
                      >
                        <h3 className="m-0 font-[Pretendard,sans-serif] text-[18px] font-bold">
                          {movie.title}
                        </h3>
                      </Link>

                      <div className="mt-[8px] flex items-center gap-[12px]">
                        <span className="font-[Pretendard,sans-serif] text-[12px] text-[#9ca3af]">
                          {movie.originalTitle}
                        </span>

                        <span className="font-[Pretendard,sans-serif] text-[12px] text-[#9ca3af]">
                          {movie.releaseDate}
                        </span>
                      </div>

                      <p className="mt-[12px] line-clamp-2 font-[Pretendard,sans-serif] text-[13px] leading-[20px] text-[#606774]">
                        {movie.overview}
                      </p>

                      <Link
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                        className="mt-[18px] font-[Pretendard,sans-serif] text-[13px] font-semibold text-[#2563eb] no-underline"
                      >
                        상세 보기 →
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}