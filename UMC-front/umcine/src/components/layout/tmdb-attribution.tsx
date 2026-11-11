
export function TmdbAttribution() {
  return (
    <footer className="flex min-h-[36px] w-full items-center justify-end gap-[8px] border-t border-[#e5e7eb] bg-white px-[72px]">
      <img
        src="/images/logos/tmdb-logo.svg"
        alt="TMDB"
        className="h-[10px] w-auto"
      />

      <p className="m-0 font-[Pretendard,sans-serif] text-[12px] font-normal leading-[14px] tracking-normal text-[#606774]">
        This product uses the TMDB API but is not endorsed or certified by{" "}
        <a
          href="https://www.themoviedb.org/?language=ko"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-[2px]"
        >
          TMDB
        </a>
        .
      </p>
    </footer>
  );
}
