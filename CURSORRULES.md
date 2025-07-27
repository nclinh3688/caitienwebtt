# Cursor Coding Rules

Bạn là chuyên gia về TypeScript, Node.js, Next.js App Router, React, Shadcn UI, Radix UI và Tailwind CSS.

## Code Style and Structure
- Viết code TypeScript ngắn gọn, kỹ thuật, có ví dụ chính xác.
- Ưu tiên lập trình hàm (functional) và khai báo (declarative); tránh dùng class.
- Ưu tiên lặp và tách module thay vì lặp lại code.
- Đặt tên biến mô tả, dùng động từ phụ trợ (isLoading, hasError, ...).
- Cấu trúc file: export component chính, subcomponent, helpers, static content, types.

## Naming Conventions
- Thư mục: viết thường, dùng dấu gạch ngang (e.g., components/auth-wizard).
- Ưu tiên named exports cho component.

## TypeScript Usage
- Dùng TypeScript cho toàn bộ code; ưu tiên interface hơn type.
- Tránh dùng enum; dùng map/object thay thế.
- Dùng functional component với interface TypeScript.

## Syntax and Formatting
- Dùng từ khóa `function` cho pure function.
- Tránh ngoặc nhọn không cần thiết trong điều kiện; ưu tiên cú pháp ngắn gọn.
- Dùng JSX khai báo (declarative JSX).

## UI and Styling
- Dùng Shadcn UI, Radix UI, Tailwind CSS cho component và style.
- Thiết kế responsive với Tailwind, ưu tiên mobile-first.
- Ưu tiên UX đơn giản, dễ thao tác cho mọi lứa tuổi học viên.
- Sử dụng màu sắc, icon, font dễ đọc, thân thiện với người học.

## Performance Optimization
- Giảm thiểu 'use client', 'useEffect', 'setState'; ưu tiên React Server Components (RSC).
- Bọc client component trong Suspense với fallback.
- Dynamic import cho component không quan trọng.
- Tối ưu ảnh: dùng WebP, khai báo size, lazy loading.

## Key Conventions
- Dùng 'nuqs' cho state URL search param.
- Tối ưu Web Vitals (LCP, CLS, FID).
- Giới hạn 'use client':
  - Ưu tiên server component, Next.js SSR.
  - Chỉ dùng cho Web API access ở component nhỏ.
  - Tránh dùng cho data fetching hoặc state management.

## i18n (Đa ngôn ngữ)
- Sử dụng thư viện i18n như next-intl hoặc react-i18next.
- Đặt key dịch rõ ràng, dễ bảo trì.
- Tách biệt nội dung dịch khỏi code logic.

## Quản lý dữ liệu học tập
- Đặt tên entity rõ ràng: lesson, test, userProgress, ...
- Tách logic xử lý dữ liệu (helpers/hooks) khỏi component UI.
- Tổ chức dữ liệu theo cấp độ JLPT, lessonId, testId.

## Accessibility (a11y)
- Đảm bảo mọi component, button, form đều có label, aria, hỗ trợ keyboard navigation.
- Ưu tiên accessibility cho nội dung giáo dục.

## Phân quyền & Bảo mật
- Định nghĩa rõ các role: admin, teacher, student, guest.
- Bảo vệ route nhạy cảm, không để lộ thông tin cá nhân.

## Tổ chức nội dung học
- Đặt tên thư mục, file theo cấp độ JLPT, lessonId, testId rõ ràng.
- Tách biệt rõ ràng giữa nội dung học, nội dung test, nội dung cộng đồng.

## Backup & Versioning
- Định kỳ backup dữ liệu học viên, bài test, tiến trình học.
- Sử dụng versioning cho dữ liệu quan trọng.

## Docs & Best Practices
- Luôn tham khảo Next.js docs về Data Fetching, Rendering, Routing.
- Có thể bổ sung quy tắc commit, review code, issue tracking nếu làm việc nhóm.
- Có thể cập nhật thêm ví dụ code mẫu, link tài liệu chính thức. 