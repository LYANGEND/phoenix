"use client";

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LoginData {
  username: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        data
      );
      localStorage.setItem('token', res.data.token);
      router.push('/admin');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      {errorMsg && <p className="text-red-600 mb-4">{errorMsg}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Username</label>
          <input
            {...register('username', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.username && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Password</label>
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Login
        </button>
      </form>
    </div>
  );
}
