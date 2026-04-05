# CLAUDE.md

## 프로젝트 개요

기능의학과 대사 건강 연구를 정리한 Astro 기반 정적 사이트. GitHub Pages(`https://photoholic.github.io/functional-medicine-metabolic-note`)에 배포됨.

## 빠른 참고

```bash
npm run dev       # 개발 서버 실행
npm run build     # 프로덕션 빌드 → /dist
npm run preview   # 프로덕션 빌드 미리보기
```

**Node.js >= 22.12.0 필요**

## 기술 스택

- **프레임워크:** Astro 6.x + MDX 통합
- **스타일링:** Tailwind CSS 4.x (Vite 플러그인)
- **다이어그램:** Mermaid 11.x (클라이언트 사이드 렌더링)
- **언어:** TypeScript (strict 모드, `astro/tsconfigs/strict` 확장)
- **배포:** GitHub Actions → GitHub Pages (`main` 브랜치 push 시 자동 배포)

## 디렉토리 구조

```
src/
├── components/          # 재사용 가능한 Astro 컴포넌트
│   ├── EvidenceBadge.astro   # 근거 신뢰도 배지 (high/medium/low/note)
│   ├── MechanismBox.astro    # 기전 설명 강조 박스
│   ├── Mermaid.astro         # Mermaid 다이어그램 래퍼
│   ├── Header.astro          # 상단 고정 네비게이션
│   └── Footer.astro          # 하단 푸터
├── content/
│   └── notes/           # MDX 콘텐츠 컬렉션 (glob 로더)
├── layouts/
│   └── Layout.astro     # 마스터 레이아웃 (한글 폰트, 메타, Header/Footer)
├── pages/
│   ├── index.astro      # 홈페이지 (히어로 + 기능 카드)
│   ├── archive.astro    # 카테고리별 전체 노트 목록
│   ├── about.astro      # 철학 및 참고 자료
│   └── notes/
│       └── [...slug].astro  # 노트 상세 페이지 (동적 라우팅)
├── styles/
│   └── global.css       # Tailwind 테마 설정 + 기본 스타일
└── content.config.ts    # 콘텐츠 컬렉션 스키마 (Zod)
```

## 콘텐츠 컬렉션 스키마

노트 파일 위치: `src/content/notes/*.mdx`. 필수 프론트매터:

```yaml
title: "문자열"
description: "문자열"
date: "YYYY-MM-DD"        # Date 타입으로 자동 변환
category: "대사 로직"      # 허용값: 대사 로직 | 영양소 함수 | 팩트 체크 | 식단 가이드
tags: ["선택", "배열"]     # 선택 사항
```

스키마는 `src/content.config.ts`에서 Zod + `glob` 로더로 정의됨.

## 핵심 규칙

### 라우팅 & 링크

모든 내부 링크는 GitHub Pages 하위 경로 호환을 위해 **반드시** `${import.meta.env.BASE_URL}` 접두사를 사용해야 함:

```astro
<a href={`${import.meta.env.BASE_URL}/archive`}>아카이브</a>
```

동적 노트 라우트는 콘텐츠 항목의 `id`(`.mdx` 확장자 제외한 파일명)를 slug로 사용.

### 스타일링

- **디자인 토큰:** `--color-deep-navy: #1A2A6C` (제목, CTA), `--color-forest-green: #2D5A27` (링크, 호버)
- **폰트:** Pretendard (본문, sans), Noto Serif KR (제목, serif) — Layout.astro에서 CDN 로드
- **방식:** Tailwind 유틸리티 클래스 사용; 커스텀 토큰은 `global.css`에서 정의

### MDX 내 컴포넌트 사용법

콘텐츠 파일에서 3가지 커스텀 컴포넌트를 인라인으로 사용:

```mdx
<MechanismBox title="제목">
  생물학적 기전을 설명하는 마크다운 내용.
</MechanismBox>

<EvidenceBadge source="임상 데이터" reliability="high" href="https://..." />

<Mermaid code={`graph TD
    A[원인] --> B[결과]
`} />
```

### 언어

- 모든 UI 텍스트는 한국어로 작성하며, 필요시 영어 부제를 병기 (예: "대사 로직 / Metabolic Logic")
- 콘텐츠는 한국어로 작성

### 네이밍 규칙

- 컴포넌트: `PascalCase.astro`
- 콘텐츠 파일: `kebab-case.mdx`
- 페이지: `kebab-case.astro`

## CI/CD

`.github/workflows/deploy.yml`이 `main` 브랜치 push 시 GitHub Pages에 자동 배포:
1. 코드 체크아웃 → Node 22 설정 → `npm install` → `npm run build`
2. `/dist` 아티팩트 업로드 → Pages 배포

## 테스트 및 린트 미설정

현재 테스트 프레임워크, 린터, 포맷터가 설정되어 있지 않음. 변경사항 검증은 `npm run build`로 빌드 오류 여부를 확인.
