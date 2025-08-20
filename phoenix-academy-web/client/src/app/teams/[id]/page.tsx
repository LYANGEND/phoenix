"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
}

interface Team {
  _id: string;
  name: string;
  ageGroup: string;
  gender: string;
}

export default function TeamDetailPage() {
  const { id } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    axios
      .get<Team>(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${id}`)
      .then((res) => setTeam(res.data))
      .catch(() => router.push("/teams"));
    axios
      .get<Player[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/players?team=${id}`)
      .then((res) => setPlayers(res.data))
      .catch((err) => console.error(err));
  }, [id, router]);

  if (!team) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{team.name}</h1>
      <p>Age Group: {team.ageGroup}</p>
      <p>Gender: {team.gender}</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Roster</h2>
      <ul className="list-disc list-inside">
        {players.map((p) => (
          <li key={p._id}>
            <Link href={`/players/${p._id}`}>{`${p.firstName} ${p.lastName}`}</Link> - {p.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
