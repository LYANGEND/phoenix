"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  team?: { name: string };
}

interface Team {
  _id: string;
  name: string;
}

interface PlayerFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  position: string;
  team: string;
  bio: string;
  imageUrl: string;
}

export default function AdminPlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<PlayerFormData>();

  useEffect(() => {
    fetchPlayers();
    fetchTeams();
  }, []);

  const fetchPlayers = () => {
    axios
      .get<Player[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/players`)
      .then((res) => setPlayers(res.data));
  };

  const fetchTeams = () => {
    axios
      .get<Team[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`)
      .then((res) => setTeams(res.data));
  };

  const onSubmit = async (data: PlayerFormData) => {
    try {
      if (editingPlayer) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/players/${editingPlayer._id}`,
          data
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/players`, data);
      }
      fetchPlayers();
      setShowForm(false);
      setEditingPlayer(null);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePlayer = async (id: string) => {
    if (confirm("Are you sure?")) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/players/${id}`);
      fetchPlayers();
    }
  };

  const editPlayer = (player: Player) => {
    setEditingPlayer(player);
    setValue("firstName", player.firstName);
    setValue("lastName", player.lastName);
    setValue("position", player.position);
    setShowForm(true);
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Player Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add Player
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingPlayer ? "Edit Player" : "Add New Player"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <input
              {...register("firstName", { required: true })}
              placeholder="First Name"
              className="border p-2 rounded"
            />
            <input
              {...register("lastName", { required: true })}
              placeholder="Last Name"
              className="border p-2 rounded"
            />
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="border p-2 rounded"
            />
            <select
              {...register("gender", { required: true })}
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              {...register("position")}
              placeholder="Position"
              className="border p-2 rounded"
            />
            <select {...register("team")} className="border p-2 rounded">
              <option value="">Select Team</option>
              {teams.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            <input
              {...register("imageUrl")}
              placeholder="Image URL"
              className="border p-2 rounded"
            />
            <textarea
              {...register("bio")}
              placeholder="Biography"
              className="border p-2 rounded col-span-2"
              rows={3}
            />
            <div className="col-span-2 space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                {editingPlayer ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPlayer(null);
                  reset();
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Position</th>
              <th className="p-3 text-left">Team</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id} className="border-t">
                <td className="p-3">
                  {player.firstName} {player.lastName}
                </td>
                <td className="p-3">{player.position}</td>
                <td className="p-3">{player.team?.name || "No Team"}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => editPlayer(player)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePlayer(player._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                  >
                    Delete
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
