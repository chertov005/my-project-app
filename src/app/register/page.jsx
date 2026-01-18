// app/register/page.jsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "./action"; // ייבוא הפונקציה מהקובץ ליד
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    setError(""); // איפוס שגיאות קודמות
    const result = await registerUser(data);

    if (result.error) {
      setError(result.error);
    } else {
      // אם הצלחנו, נעביר את המשתמש לדף ההתחברות
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">הרשמה למערכת</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input 
              {...register("name", { required: "שדה חובה" })}
              placeholder="שם מלא"
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 text-right"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <input 
              {...register("email", { required: "שדה חובה" })}
              type="email"
              placeholder="אימייל"
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 text-right"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input 
              {...register("password", { required: "שדה חובה" })}
              type="password"
              placeholder="סיסמה"
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500 text-right"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {error && <p className="bg-red-100 text-red-600 p-2 rounded text-sm text-center">{error}</p>}

          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition font-bold">
            צור חשבון
          </button>
        </form>
      </div>
    </div>
  );
}