"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  position: string;
  bio: string;
  imageUrl: string;
  team?: {
    _id: string;
    name: string;
  };
}

export default function PlayerProfilePage() {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    axios
      .get<Player>(`${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`)
      .then((res) => setPlayer(res.data))
      .catch(() => router.push("/teams"));
  }, [id, router]);

  if (!player) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white shadow rounded-lg p-6">
        {player.imageUrl && (
          <img
            src={player.imageUrl}
            alt={`${player.firstName} ${player.lastName}`}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold text-center mb-2">
          {player.firstName} {player.lastName}
        </h1>
        {player.position && (
          <p className="text-xl text-gray-600 text-center mb-4">{player.position}</p>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold">Date of Birth</h3>
            <p>{new Date(player.dateOfBirth).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="font-semibold">Gender</h3>
            <p>{player.gender}</p>
          </div>
          {player.team && (
            <div className="col-span-2">
              <h3 className="font-semibold">Team</h3>
              <p>{player.team.name}</p>
            </div>
          )}
        </div>

        {player.bio && (
          <div>
            <h3 className="font-semibold mb-2">Biography</h3>
            <p className="text-gray-700">{player.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
