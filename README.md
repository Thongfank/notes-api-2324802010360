# ☁️ Cloud Computing Lab 01 — Hello Cloud API

> **Môn học:** Thực hành Điện toán đám mây  
> **Sinh viên:** Trần Nguyễn Quốc Thông  
> **MSSV:** `2324802010360`  
> **Ngày thực hành:** 05/11/2026

**Đường dẫn:**

- **Báo cáo GitHub Pages:** https://thongfank.github.io/notes-api-2324802010360/
- **Repository:** https://github.com/Thongfank/notes-api-2324802010360
- **API:** endpoint `GET /` trên cổng `3000` của Codespace; URL được lấy từ tab **Ports**, không phải địa chỉ GitHub Pages.

> API Codespaces chỉ truy cập công khai khi Codespace đang chạy và cổng `3000` tạm đặt **Public** để kiểm thử. Sau khi thử trên điện thoại phải chuyển lại **Private** và **Stop codespace** để tiết kiệm hạn mức.

## Chức năng

- `GET /` trả JSON chứa `message`, `host`, `platform`, `cpus`, `memoryGB`, `uptimeSec`, `time`.
- Hiển thị thông tin CPU, RAM, hệ điều hành của môi trường chạy API.
- Kiểm thử API bằng trình duyệt, `curl` hoặc biểu mẫu **Gọi API** trên GitHub Pages.
- So sánh máy cá nhân với Codespace; tổng hợp kết quả Billing và 5 đặc tính NIST.
- Tách `src/app.js` khỏi `src/server.js` để dùng lại phần ứng dụng trong các bài tiếp theo.

## Công nghệ và cấu hình

| Thành phần | Vai trò |
|---|---|
| Node.js 22 | JavaScript runtime |
| Express | HTTP API |
| GitHub Codespaces | Môi trường phát triển trên đám mây |
| Dev Containers | Định nghĩa môi trường nhất quán cho bài 1–6 |
| Docker-in-Docker | Công cụ phục vụ các bài thực hành sau |
| JDK 25 và Maven | Công cụ phục vụ các bài thực hành Java sau |
| GitHub Pages | Xuất bản báo cáo HTML tĩnh từ `docs/` |

Cấu hình `.devcontainer/devcontainer.json` dùng image `mcr.microsoft.com/devcontainers/javascript-node:22` và các Dev Container Features cho Docker, Java và Maven. Docker-in-Docker được đặt `"moby": false` để tương thích với Debian Trixie của image hiện tại.

## Cấu trúc dự án

```text
notes-api-2324802010360/
├── .devcontainer/
│   └── devcontainer.json
├── docs/
│   └── index.html
├── src/
│   ├── app.js
│   └── server.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

> `package.json` và `package-lock.json` được tạo khi khởi tạo và cài Express. Nếu chúng chưa có trên nhánh `main`, làm bước khởi tạo bên dưới và commit chúng. Không commit `node_modules/` hoặc `.env`.

## Hướng dẫn chạy trên GitHub Codespaces

1. Mở repository, chọn **Code → Codespaces → Create codespace on main** (hoặc mở Codespace đã tạo).
2. Mở Terminal tại thư mục `/workspaces/notes-api-2324802010360`.
3. Kiểm tra runtime:

   ```bash
   node -v
   npm -v
   java -version
   mvn -version
   docker --version
   docker info
   ```

4. **Nếu lần đầu repository chưa có `package.json`:**

   ```bash
   npm init -y
   npm install express
   npm pkg set scripts.start="node src/server.js"
   npm pkg set scripts.test="node --test"
   ```

   **Nếu đã có `package.json` và `package-lock.json`:** chạy `npm ci` để cài dependencies đúng lockfile; nếu không có lockfile nhưng có `package.json`, chạy `npm install`.
5. Khởi chạy HTTP server:

   ```bash
   npm start
   ```

6. Mở tab **Ports**, mở địa chỉ được forward cho cổng `3000`, hoặc kiểm tra qua terminal khác:

   ```bash
   curl -i http://localhost:3000/
   ```

Phản hồi mong đợi là `HTTP/1.1 200 OK` và một JSON tương tự (số liệu dưới đây chỉ là minh họa):

```json
{
  "message": "Xin chào từ đám mây!",
  "host": "hostname-codespace",
  "platform": "Linux ...",
  "cpus": 2,
  "memoryGB": 7.8,
  "uptimeSec": 123,
  "time": "2026-11-05T00:00:00.000Z"
}
```

**Lưu ý:** thông số trả về cần được đọc từ API tại thời điểm thực hành; giá trị ví dụ không phải bằng chứng về cấu hình Codespace mới.

## Cách kiểm thử từ điện thoại và từ GitHub Pages

1. Đảm bảo `npm start` đang hoạt động.
2. Trong **Ports → 3000 → Port Visibility**, chuyển tạm sang **Public**.
3. Sao chép chính xác **Forwarded Address** (`https://<codespace-name>-3000.app.github.dev/`). Không tự thay tên Codespace bằng tên repository.
4. Dán URL vào điện thoại hoặc mục **Kiểm thử Hello Cloud API** trên [trang báo cáo](https://thongfank.github.io/notes-api-2324802010360/), nhấn **Gọi API**.
5. Nếu biểu mẫu không kết nối nhưng URL mở trực tiếp được, kiểm tra CORS trong `src/app.js`: phản hồi `GET /` phải có header `Access-Control-Allow-Origin: https://thongfank.github.io`.
6. Chụp minh chứng JSON, chuyển lại cổng sang **Private**, và **Stop codespace** khi kết thúc.

**Không bật Public liên tục để nuôi trang web:** GitHub Pages là website tĩnh; sau khi Codespace Stop hoặc cổng Private, phần báo cáo vẫn đọc được nhưng nút **Gọi API** không thể kết nối công khai.

## Xuất bản GitHub Pages

Trong repository → **Settings → Pages → Build and deployment**:

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/docs**

Sau khi deploy thành công, trang sẽ xuất hiện tại:  
https://thongfank.github.io/notes-api-2324802010360/

Mỗi lần sửa `docs/index.html`, hãy commit và push lại để Pages cập nhật.

## Số liệu và bằng chứng

Bản báo cáo ghi số liệu CPU/RAM máy Windows từ PowerShell; thông số Codespace từ lần ghi nhận API trước; ảnh Billing ngày **05/11/2026** cho thấy **Gross $0.20, Discount $0.20, Billed $0.00** trên phạm vi **tổng Metered usage của tài khoản**. Đây **không phải** con số đã lọc riêng Codespaces.

Các mốc thời gian chuẩn bị được trình bày là **giả định hoặc ước tính**, chưa phải phép đo. Nếu được đo lại, cập nhật báo cáo bằng số liệu thực nghiệm trước khi nộp.

## Đối chiếu NIST SP 800-145

| Đặc tính | Minh chứng thao tác |
|---|---|
| On-demand Self-service | Sinh viên tự tạo Codespace |
| Broad Network Access | Truy cập URL API từ trình duyệt và điện thoại |
| Resource Pooling | Sử dụng hạ tầng dùng chung do GitHub quản lý |
| Rapid Elasticity | Tạo, Stop, Start; có thể thay đổi loại máy nếu được hỗ trợ |
| Measured Service | Quan sát Usage/Billing theo thời gian sử dụng và lưu trữ |

## Quy tắc an toàn

- Không commit `.env`, token, mật khẩu hoặc recovery codes.
- Dùng `.gitignore` để loại trừ `node_modules/` và các tệp môi trường chứa bí mật.
- Chỉ mở Public port trong thời gian kiểm thử, rồi chuyển về Private.
- Stop Codespace khi rời máy; theo dõi Usage để không vượt hạn mức miễn phí.

## Tham khảo

- [GitHub Codespaces documentation](https://docs.github.com/en/codespaces)
- [Forwarding ports in a codespace](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)
- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final)

---

**Trần Nguyễn Quốc Thông** · **2324802010360** · Thực hành Điện toán đám mây · Lab 01
