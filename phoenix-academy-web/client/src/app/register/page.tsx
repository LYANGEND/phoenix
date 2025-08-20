"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  previousClub: string;
  medicalInfo: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications`,
        data
      );
      setMessage("Application submitted successfully!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Error submitting application");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Player Registration</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">First Name</label>
          <input
            {...register("firstName", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.firstName && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Last Name</label>
          <input
            {...register("lastName", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.lastName && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Date of Birth</label>
          <input
            type="date"
            {...register("dateOfBirth", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.dateOfBirth && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Gender</label>
          <select
            {...register("gender", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.gender && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Parent Name</label>
          <input
            {...register("parentName", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.parentName && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Parent Phone</label>
          <input
            {...register("parentPhone", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.parentPhone && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Parent Email</label>
          <input
            type="email"
            {...register("parentEmail", { required: true })}
            className="w-full border p-2 rounded"
          />
          {errors.parentEmail && <span>This field is required</span>}
        </div>
        <div>
          <label className="block">Previous Club</label>
          <input
            {...register("previousClub")}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Medical Info</label>
          <textarea
            {...register("medicalInfo")}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
