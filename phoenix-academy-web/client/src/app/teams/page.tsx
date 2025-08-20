"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Team {
  _id: string;
  name: string;
  ageGroup: string;
  gender: string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios
      .get<Team[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`)
      .then((res) => setTeams(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Teams</h1>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((t) => (
          <Link href={`/teams/${t._id}`} key={t._id}>
            <div className="border p-4 rounded hover:shadow-lg cursor-pointer">
              <h2 className="text-xl font-semibold">{t.name}</h2>
              <p>Age Group: {t.ageGroup}</p>
              <p>Gender: {t.gender}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
