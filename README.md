# ระบบเสนอความต้องการพัสดุ — Frontend

หน้าเว็บ HTML/CSS/JavaScript พร้อม Vercel Function ที่ `/api/gas` สำหรับส่งคำขอไปยัง Google Apps Script ของระบบพัสดุ

## เผยแพร่บน Vercel

1. Import repository นี้ใน Vercel โดยเลือก Framework Preset เป็น **Other**, Root Directory เป็น `/` และไม่ต้องระบุ Build Command
2. ตั้ง Environment Variable ชื่อ `GAS_WEB_APP_URL` เป็น URL เว็บแอป Apps Script ที่ลงท้ายด้วย `/exec` สำหรับ **Production** และ Preview หากต้องการทดสอบ Preview
3. Deploy แล้วเปิด URL ที่ Vercel ให้ ทดสอบ `/api/gas` ด้วย POST JSON `{"action":"ping"}` และทดลองเข้าสู่ระบบ

หน้าเว็บเรียก API ผ่าน `/api/gas` เท่านั้น URL ของ Apps Script อยู่ใน Environment Variable ฝั่งเซิร์ฟเวอร์ ไม่อยู่ในโค้ดหน้าเว็บ

ก่อนเปิดใช้งานจริง ตรวจสิทธิ์ Apps Script และเปลี่ยนรหัสผ่านบัญชีตัวอย่างใน Google Sheet `UserAccounts` ตามนโยบายของหน่วยงาน หน้าเว็บนี้มีข้อมูลภาพรวมแบบไม่เข้าสู่ระบบตามการตั้งค่าปัจจุบัน

## ฟอนต์เอกสาร PDF

`assets/fonts/Sarabun-Regular.ttf` และ `Sarabun-Bold.ttf` มาจากโครงการ [Google Fonts Sarabun](https://github.com/google/fonts/tree/main/ofl/sarabun) ภายใต้ SIL Open Font License 1.1 ดู `assets/fonts/OFL.txt`
