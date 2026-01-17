---
id: unibook
name: UniBook 유니북
type: project
description: 새로운 대학 교재의 세계
thumbnailImage: items/unibook/thumbnail.png
logoImage: items/unibook/logo.png
tags: []
badges:
  - founded
  - isHot
  - isNew
url: https://unibook.co
urls:
  - https://unibook.co
period: 2021 ~ now
updatedAt: 2024-03-18
curating:
  - primary
role: 기획, UX/UI, 백엔드, 프론트엔드, 출판/편집
order: 2024
---

UniBook은 마크다운을 기반으로 대학 교재 등의 책을 EBook 형태로 판매하는 서비스입니다.

## 기술 및 업무
---

### Frontend
- Vite (React, SWC)를 이용한 프론트엔드
- TailwindCSS와 shadcn/ui를 이용한 스타일링
- @tanstack/query를 이용한 API 캐싱 관리
- Notification API를 이용한 웹 푸시 알림
- Notion을 기반으로 한 자체 마크다운 렌더러 개발

### Renderer
* `react-notion-x` 를 기반으로 만든 UniBook Page 렌더러

<br />

https://github.com/HyunsDev/unibook-renderer

### Backend
- NestJS를 이용한 백엔드 개발
- Mysql과 TypeORM을 이용한 데이터베이스 관리

### Client
- `endpoint-client` 라이브러리를 이용한 API 타입 매핑
- API 타입을 재사용 가능한 라이브러리로 배포

<br>

https://github.com/HyunsDev/unibook-client

https://www.npmjs.com/package/unibook-client


### Desktop
- `Electron` 을 이용한 데스크탑 앱 개발




## 관련 영상
---

* UniBook 시연 - https://youtu.be/zwilJPQy_zA