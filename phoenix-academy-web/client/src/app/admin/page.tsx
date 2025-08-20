"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Application {
  _id: string;
  firstName: string;
  lastName: string;
  status: string;
}

export default function AdminPage() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    axios
      .get<Application[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/applications`)
      .then((res) => setApps(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (id: string, status: string) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applications/${id}/status`,
        { status }
      )
      .then((res) => {
        setApps((prev) => prev.map((a) => (a._id === id ? res.data : a)));
      });
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Link href="/admin/players">
          <div className="bg-blue-600 text-white p-6 rounded-lg text-center hover:bg-blue-500 cursor-pointer">
            <h2 className="text-xl font-semibold">Player Management</h2>
            <p>Add, edit, and manage players</p>
          </div>
        </Link>
        <Link href="/admin/teams">
          <div className="bg-green-600 text-white p-6 rounded-lg text-center hover:bg-green-500 cursor-pointer">
            <h2 className="text-xl font-semibold">Team Management</h2>
            <p>Create and manage teams</p>
          </div>
        </Link>
        <Link href="/admin/matches">
          <div className="bg-purple-600 text-white p-6 rounded-lg text-center hover:bg-purple-500 cursor-pointer">
            <h2 className="text-xl font-semibold">Match Management</h2>
            <p>Schedule matches & select squads</p>
          </div>
        </Link>
      </div>

      <div className="bg-white rounded shadow">
        <h2 className="text-xl font-bold p-4 border-b">Recent Applications</h2>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="p-3">{a.firstName} {a.lastName}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    a.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    a.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {a.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => updateStatus(a._id, 'Approved')}
                    className="px-2 py-1 bg-green-600 text-white rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, 'Rejected')}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
