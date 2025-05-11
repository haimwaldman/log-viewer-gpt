# Log Viewer App (Angular 17+ Standalone)

אפליקציית צפייה בלוגים עם תפריט צד, טבלת תצוגה, סינון לפי רמות והעלאת קבצים בפורמטים IIS ו־Apache.

---

## 🎯 תכונות

- תפריט צד צף מימין (RTL) עם 3 אקורדיונים:
  - טעינת קובץ (select של סוג, העלאה ו־drag & drop)
  - סינון לפי רמות (`info`, `warn`, `error`)
  - ניהול processors (כפתורי ייצוא וניהול)
- טבלת לוגים עם:
  - מספור רץ
  - תאריך
  - רמת לוג בצבע שונה
  - הודעה עם טולטיפ ו־copy אם ארוכה
- פאגינציה אם מעל 10 רשומות

---

## 🚀 הרצה

```bash
npm install
ng serve
```

---

## 📁 מבנה קבצים

```bash
src/app/
  components/
    log-sidebar/             # תפריט צד
    log-summary/             # הצגת שם קובץ ומונה לפי רמות
    log-table/               # טבלת הלוגים
    file-upload/             # טעינה ו־drag & drop
    log-filters/             # סינון לפי רמות
    processor-management/    # ייצוא וניהול
  shared/
    log.service.ts           # Parser לפי סוג קובץ
  app.component.ts/html/css  # layout ראשי
```

---

## 🧠 פורמטים נתמכים

### IIS Format
```
#Fields: date time cs-method cs-uri-stem sc-status
2024-05-09 10:00:00 GET /index.html 200
```

### Apache Format
```
127.0.0.1 - - [09/May/2024:10:00:00 +0000] "GET /index.html HTTP/1.1" 500 512
```

---

## 🛠️ הוספת פורמט custom

1. הוסף `case` חדש ל־`parse()` בתוך `log.service.ts`
2. צור `parseMyFormat(content: string)` חדש שיחזיר מערך של רשומות עם:
```ts
{
  id: number,
  timestamp: Date,
  level: 'error' | 'warn' | 'info',
  message: string
}
```

---

## 📜 רישיון
קוד פתוח, חופשי לשימוש.
