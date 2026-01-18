import { handlers } from "@/auth" // מייבא את ה-handlers שייצאת מקובץ ה-auth.js שלך

// מייצא את הפונקציות שמטפלות בבקשות מסוג GET ו-POST
// Auth.js v5 דואגת לכל הלוגיקה בפנים אוטומטית
export const { GET, POST } = handlers