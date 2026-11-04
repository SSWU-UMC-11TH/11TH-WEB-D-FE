// week5 백엔드 필수 미션 관련 테스트 파일


import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/api-test')({
  component: ApiTestPage,
})

const BASE_URL = 'http://localhost:8080'

function ApiTestPage() {
  const [nickname, setNickname] = useState('noco')
  const [email, setEmail] = useState('noco@umc.com')
  const [memberId, setMemberId] = useState('1')
  const [result, setResult] = useState<unknown>(null)
  const [error, setError] = useState('')

  async function request(path: string) {
    setError('')
    setResult(null)

    try {
      const response = await fetch(`${BASE_URL}${path}`)

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data: unknown = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '요청 실패')
    }
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>week5 필수 미션</h1>

      <h2>닉네임 중복 확인</h2>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button
        onClick={() =>
          request(`/members/nickname/${encodeURIComponent(nickname)}`)
        }
      >
        중복 확인
      </button>

      <h2>이메일 중복 확인</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={() =>
          request(`/members/email/${encodeURIComponent(email)}`)
        }
      >
        중복 확인
      </button>

      <h2>회원 영화 평점 조회</h2>
      <input
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />
      <button
        onClick={() =>
          request(`/members/${encodeURIComponent(memberId)}/ratings`)
        }
      >
        평점 조회
      </button>

      <h2>API 응답 결과</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </main>
  )
}
