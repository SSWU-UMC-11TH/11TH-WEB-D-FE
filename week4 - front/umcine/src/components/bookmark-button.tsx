import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  variant?: "card" | "detail";
}

export function BookmarkButton({
  movieId,
  variant = "card",
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );

  const toggleBookmark = useBookmarkStore(
    (state) => state.toggleBookmark,
  );

  if (variant === "detail") {
    return (
      <button
        type="button"
        onClick={() => toggleBookmark(movieId)}
        className="flex h-[42px] w-[107px] items-center justify-center gap-[8px] rounded-[8px] border-0 bg-[#2563eb] font-[Pretendard,sans-serif] text-[14px] font-semibold text-white"
        aria-pressed={isBookmarked}
      >
        <img
          src={
            isBookmarked
              ? "/icons/bookmark.svg"
              : "/icons/bookmark-outline.svg"
          }
          alt=""
          className="h-[20px] w-[20px] brightness-0 invert"
        />

        즐겨찾기
      </button>
    );
  }

  return (
      <button
            type="button"
            onClick={() => toggleBookmark(movieId)}
            className={cn(
            "absolute right-[8px] top-[8px] flex size-[34px] cursor-pointer items-center justify-center rounded-[8px] p-0",
            isBookmarked
                ? "border-0 bg-[#2563eb]"
                : "border border-white bg-[rgba(17,24,39,0.8)]",
            )}
            aria-pressed={isBookmarked}
        >
      <img
        src={
          isBookmarked
            ? "/icons/bookmark.svg"
            : "/icons/bookmark-outline.svg"
        }
        alt=""
        className="size-6 brightness-0 invert"
      />
    </button>
  );
}