"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Match {
  _id: string;
  teamA: { _id: string; name: string };
  teamB: string;
  matchDate: string;
  venue: string;
  starting11: Player[];
  substitutes: Player[];
}

interface Team {
  _id: string;
  name: string;
}

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
}

interface MatchFormData {
  teamA: string;
  teamB: string;
  matchDate: string;
  venue: string;
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showSquadSelector, setShowSquadSelector] = useState<string | null>(null);
  const [selectedStarting11, setSelectedStarting11] = useState<string[]>([]);
  const [selectedSubstitutes, setSelectedSubstitutes] = useState<string[]>([]);

  const { register, handleSubmit, reset, setValue } = useForm<MatchFormData>();

  useEffect(() => {
    fetchMatches();
    fetchTeams();
    fetchPlayers();
  }, []);

  const fetchMatches = () => {
    axios
      .get<Match[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/matches`)
      .then((res) => setMatches(res.data));
  };

  const fetchTeams = () => {
    axios
      .get<Team[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`)
      .then((res) => setTeams(res.data));
  };

  const fetchPlayers = () => {
    axios
      .get<Player[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/players`)
      .then((res) => setPlayers(res.data));
  };

  const onSubmit = async (data: MatchFormData) => {
    try {
      if (editingMatch) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${editingMatch._id}`,
          data
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/matches`, data);
      }
      fetchMatches();
      setShowForm(false);
      setEditingMatch(null);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMatch = async (id: string) => {
    if (confirm("Are you sure?")) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}`);
      fetchMatches();
    }
  };

  const editMatch = (match: Match) => {
    setEditingMatch(match);
    setValue("teamA", match.teamA._id);
    setValue("teamB", match.teamB);
    setValue("matchDate", match.matchDate.split("T")[0]);
    setValue("venue", match.venue);
    setShowForm(true);
  };

  const selectSquad = (matchId: string) => {
    const match = matches.find((m) => m._id === matchId);
    if (match) {
      setSelectedStarting11(match.starting11.map((p) => p._id));
      setSelectedSubstitutes(match.substitutes.map((p) => p._id));
    }
    setShowSquadSelector(matchId);
  };

  const saveSquad = async () => {
    if (!showSquadSelector) return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${showSquadSelector}`,
        {
          starting11: selectedStarting11,
          substitutes: selectedSubstitutes,
        }
      );
      fetchMatches();
      setShowSquadSelector(null);
    } catch (err) {
      console.error(err);
    }
  };

  const togglePlayerInStarting11 = (playerId: string) => {
    setSelectedStarting11((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : prev.length < 11
        ? [...prev, playerId]
        : prev
    );
  };

  const togglePlayerInSubstitutes = (playerId: string) => {
    setSelectedSubstitutes((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Match Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Schedule Match
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingMatch ? "Edit Match" : "Schedule New Match"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <select
              {...register("teamA", { required: true })}
              className="border p-2 rounded"
            >
              <option value="">Select Home Team</option>
              {teams.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
            <input
              {...register("teamB", { required: true })}
              placeholder="Opponent Team"
              className="border p-2 rounded"
            />
            <input
              type="datetime-local"
              {...register("matchDate", { required: true })}
              className="border p-2 rounded"
            />
            <input
              {...register("venue", { required: true })}
              placeholder="Venue"
              className="border p-2 rounded"
            />
            <div className="col-span-2 space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                {editingMatch ? "Update" : "Schedule"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMatch(null);
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

      {showSquadSelector && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Starting 11 & Substitutes</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">
                Starting 11 ({selectedStarting11.length}/11)
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {players.map((player) => (
                  <label key={player._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedStarting11.includes(player._id)}
                      onChange={() => togglePlayerInStarting11(player._id)}
                      disabled={
                        !selectedStarting11.includes(player._id) &&
                        selectedStarting11.length >= 11
                      }
                    />
                    <span>
                      {player.firstName} {player.lastName}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Substitutes</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {players.map((player) => (
                  <label key={player._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedSubstitutes.includes(player._id)}
                      onChange={() => togglePlayerInSubstitutes(player._id)}
                      disabled={selectedStarting11.includes(player._id)}
                    />
                    <span>
                      {player.firstName} {player.lastName}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 space-x-2">
            <button
              onClick={saveSquad}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
            >
              Save Squad
            </button>
            <button
              onClick={() => setShowSquadSelector(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Match</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Venue</th>
              <th className="p-3 text-left">Squad</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match._id} className="border-t">
                <td className="p-3">
                  {match.teamA.name} vs {match.teamB}
                </td>
                <td className="p-3">
                  {new Date(match.matchDate).toLocaleDateString()}
                </td>
                <td className="p-3">{match.venue}</td>
                <td className="p-3">
                  <span className="text-sm">
                    Starting 11: {match.starting11.length}/11
                    <br />
                    Subs: {match.substitutes.length}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => selectSquad(match._id)}
                    className="px-2 py-1 bg-purple-600 text-white rounded text-sm"
                  >
                    Squad
                  </button>
                  <button
                    onClick={() => editMatch(match)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMatch(match._id)}
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
