# 🚀 Navbat Boshqarish Tizimi (Queue System Solutions)

Ushbu loyiha mijozlar oqimini samarali boshqarish, real vaqt rejimida kuzatish va ma'muriy nazorat qilish uchun mo'ljallangan kompleks dasturiy ta'minotdir.

---

## 🏗 Tizim Modullari

Loyiha uchta asosiy moduldan iborat:

### 👤 1. Xodimlar Paneli (Staff Panel)
Xodimlar uchun navbatni boshqarish interfeysi:
* **Navbatni chaqirish:** Keyingi mijozni bir tugma orqali chaqirish.
* **Mijozni qabul qilish:** Xizmat ko'rsatishni boshlash, yakunlash yoki bekor qilish.
* **Real-vaqt monitoringi:** Kutish zalidagi barcha mijozlar holatini ko'rish.

### ⚙️ 2. Admin Panel (Dashboard)
Tizim rahbarlari va administratorlar uchun nazorat markazi:
* **Xodimlarni boshqarish:** Yangi xodimlar qo'shish va ularga huquqlar berish.
* **Statistika:** Xizmat ko'rsatish unumdorligi bo'yicha hisobotlar va tahlillar.
* **Sozlamalar:** Xizmat turlarini va navbat algoritmlarini sozlash.

### 🎫 3. Kiosk (Mijoz Paneli)
Mijozlar navbatga turishi va chek chiqarishi uchun terminal:
* **Oson navbat olish:** Intuitiv interfeys orqali xizmat turini tanlash.
* **Chek chiqarish:** Termal printerlar orqali qog'oz chek chiqarish (WebView2 yordamida).

---

## 🛠 Texnologiyalar

| Qatlam | Texnologiya |
| :--- | :--- |
| **Frontend** | React.js / WebView2 |
| **Backend** | Java |
| **Database** | PostgreSQL |
| **Xavfsizlik** | JWT (Token-based Auth) |

---

## ⚙️ O'rnatish va Ishga Tushirish

Loyiha nusxasini olish:
```bash
git clone [https://github.com/Ergashev-Xurshid/queue-system-solutions.git](https://github.com/Ergashev-Xurshid/queue-system-solutions.git)


1. Xodimlar paneli (Staff App):

cd staff-app
npm install
npm run dev


2. Admin paneli (Admin Dashboard):

cd admin-dashboard
npm install
npm run dev


3. Kiosk tizimi (Kiosk App):

cd kiosk-app
npm install
npm run dev
