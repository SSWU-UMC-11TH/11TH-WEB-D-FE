// src/api/auth/login.ts


import { apiClient } from "../api-client";

// 로그인 요청 데이터
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 데이터
export interface LoginResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    nickname: string;
    accessToken: string;
  };
}

// 로그인 API 요청
export function login(body: LoginRequest) {
  return apiClient
    .post("auth/login", { json: body })
    .json<LoginResponse>();
}
