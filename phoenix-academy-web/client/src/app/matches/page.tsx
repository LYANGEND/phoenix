"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Match {
  _id: string;
  teamA: { name: string };
  teamB: string;
  matchDate: string;
  venue: string;
  starting11: Player[];
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    axios
      .get<Match[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/matches`)
      .then((res) => setMatches(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upcoming Matches</h1>
      <div className="space-y-4">
        {matches.map((m) => (
          <div key={m._id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">
              {m.teamA.name} vs {m.teamB}
            </h2>
            <p>{new Date(m.matchDate).toLocaleDateString()}</p>
            <p>{m.venue}</p>
            {m.starting11.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {m.starting11.map((p) => (
                  <div
                    key={p._id}
                    className="p-2 bg-gray-100 rounded text-center"
                  >
                    {p.firstName} {p.lastName}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
