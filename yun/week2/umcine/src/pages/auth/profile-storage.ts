export interface Profile {
  nickname: string;
  email: string;
  avatar: string;
}

const STORAGE_KEY = "umcine-profile";

const DEFAULT_PROFILE: Profile = {
  nickname: "umcine_user",
  email: "user@example.com",
  avatar: "",
};

export const getProfile = (): Profile => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...DEFAULT_PROFILE };
    }

    return {
      ...DEFAULT_PROFILE,
      ...JSON.parse(saved),
    };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};

export const saveProfile = (profile: Profile): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};