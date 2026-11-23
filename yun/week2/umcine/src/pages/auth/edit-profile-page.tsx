import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getProfile, saveProfile } from "./profile-storage";
import "./auth-pages.css";

export function EditProfilePage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(getProfile);
  const [message, setMessage] = useState("");

  const handleChangeAvatar = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("이미지 파일을 선택해 주세요.");
      return;
    }

    if (file.size > 700_000) {
      setMessage("700KB 이하의 이미지를 선택해 주세요.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        const image = reader.result;

        setProfile((prev) => ({
          ...prev,
          avatar: image,
        }));

        setMessage("");
      }
    };

    reader.onerror = () => {
      setMessage("이미지를 불러오지 못했어요.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nickname = profile.nickname.trim();

    if (nickname.length < 2 || nickname.length > 12) {
      setMessage("닉네임은 2~12자로 입력해 주세요.");
      return;
    }

    try {
      saveProfile({
        ...profile,
        nickname,
      });

      navigate({ to: "/my-info" });
    } catch {
      setMessage("변경사항 저장에 실패했어요.");
    }
  };

  return (
    <div className="auth-page">

      <main className="auth-main edit-main">
        <form className="edit-form" onSubmit={handleSubmit}>
          <div className="auth-title-row edit-title-row">
            <div>
              <h1>내 정보 수정</h1>
              <p>닉네임과 프로필 이미지만 변경할 수 있어요.</p>
            </div>

            <button
              type="submit"
              className="auth-primary auth-top-button"
            >
              변경사항 저장
            </button>
          </div>

          <div className="edit-content">
            <div className="avatar-editor">
              <label
                htmlFor="profile-image"
                className="avatar-upload"
              >
                <span className="profile-avatar edit-avatar">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="프로필 미리보기"
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </span>

                <span className="avatar-edit-icon">✎</span>
              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleChangeAvatar}
                hidden
              />

              <strong>프로필 이미지</strong>
              <small>선택 사항 · 최대 700KB</small>
            </div>

            <div className="edit-fields">
              <label htmlFor="edit-nickname">닉네임</label>

              <div className="nickname-input">
                <input
                  id="edit-nickname"
                  type="text"
                  value={profile.nickname}
                  maxLength={12}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      nickname: e.target.value,
                    }))
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setMessage(
                      "닉네임 중복 확인은 API 연동 후 구현해요.",
                    )
                  }
                >
                  중복 확인
                </button>
              </div>

              <label htmlFor="edit-email">이메일</label>

              <input
                id="edit-email"
                type="email"
                value={profile.email}
                readOnly
              />

              {message && (
                <p className="auth-notice">{message}</p>
              )}
            </div>
          </div>

          <div className="withdraw-box">
            <div>
              <strong>회원 탈퇴</strong>

              <p>
                탈퇴하면 작성한 평점, 후기와 즐겨찾기가
                모두 삭제되어 복구할 수 없습니다.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "회원 탈퇴는 아직 구현되지 않았어요.",
                )
              }
            >
              회원 탈퇴
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}