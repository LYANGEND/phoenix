"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

interface Team {
  _id: string;
  name: string;
  ageGroup: string;
  gender: string;
}

interface TeamFormData {
  name: string;
  ageGroup: string;
  gender: string;
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm<TeamFormData>();

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = () => {
    axios
      .get<Team[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`)
      .then((res) => setTeams(res.data));
  };

  const onSubmit = async (data: TeamFormData) => {
    try {
      if (editingTeam) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teams/${editingTeam._id}`,
          data
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/teams`, data);
      }
      fetchTeams();
      setShowForm(false);
      setEditingTeam(null);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTeam = async (id: string) => {
    if (confirm("Are you sure?")) {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/teams/${id}`);
      fetchTeams();
    }
  };

  const editTeam = (team: Team) => {
    setEditingTeam(team);
    setValue("name", team.name);
    setValue("ageGroup", team.ageGroup);
    setValue("gender", team.gender);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Add Team
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTeam ? "Edit Team" : "Add New Team"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
              {...register("name", { required: true })}
              placeholder="Team Name (e.g., U18 Boys)"
              className="w-full border p-2 rounded"
            />
            <input
              {...register("ageGroup", { required: true })}
              placeholder="Age Group (e.g., U18)"
              className="w-full border p-2 rounded"
            />
            <select
              {...register("gender", { required: true })}
              className="w-full border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                {editingTeam ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingTeam(null);
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
              <th className="p-3 text-left">Team Name</th>
              <th className="p-3 text-left">Age Group</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id} className="border-t">
                <td className="p-3">{team.name}</td>
                <td className="p-3">{team.ageGroup}</td>
                <td className="p-3">{team.gender}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => editTeam(team)}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTeam(team._id)}
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
