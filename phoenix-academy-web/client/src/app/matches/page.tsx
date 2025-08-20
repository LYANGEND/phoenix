'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
};

type Team = {
  _id: string;
  name: string;
  ageGroup: string;
  gender: string;
};

type Match = {
  _id: string;
  teamA: Team;
  teamB: string;
  scoreA: number;
  scoreB: number;
  matchDate: string;
  venue: string;
  starting11: Player[];
  substitutes: Player[];
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await axios.get(`${apiUrl}/api/matches/upcoming`);
      setMatches(response.data);
    } catch (error) {
      setError('Failed to load matches. Please try again later.');
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStarting11Grid = (players: Player[]) => {
    if (!players || players.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Starting XI</h4>
        <div className="grid grid-cols-3 gap-2 bg-green-50 p-4 rounded-lg">
          {players.slice(0, 11).map((player) => (
            <div
              key={player._id}
              className="bg-white p-2 rounded-md shadow-sm text-center border border-green-200"
            >
              <div className="text-sm font-semibold text-gray-900">
                {player.firstName} {player.lastName}
              </div>
              {player.position && (
                <div className="text-xs text-gray-600 mt-1">{player.position}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSubstitutes = (players: Player[]) => {
    if (!players || players.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-3">Substitutes</h4>
        <div className="flex flex-wrap gap-2">
          {players.map((player) => (
            <div
              key={player._id}
              className="bg-blue-50 px-3 py-2 rounded-md border border-blue-200"
            >
              <div className="text-sm font-medium text-gray-900">
                {player.firstName} {player.lastName}
              </div>
              {player.position && (
                <div className="text-xs text-gray-600">{player.position}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Matches
          </h1>
          <p className="text-xl text-gray-600">
            Follow our teams and see the Starting XI for each match
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {matches.length === 0 && !error ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Upcoming Matches</h3>
            <p className="text-gray-600">Check back soon for new fixtures!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {matches.map((match) => (
              <div key={match._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  {/* Match Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {match.teamA.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {match.teamA.ageGroup} {match.teamA.gender}
                        </div>
                      </div>
                      
                      <div className="text-center px-4">
                        <div className="text-xl font-semibold text-gray-600">VS</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {match.teamB}
                        </div>
                        <div className="text-sm text-gray-600">Opposition</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        {formatDate(match.matchDate)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatTime(match.matchDate)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        📍 {match.venue}
                      </div>
                    </div>
                  </div>

                  {/* Match Score (if available) */}
                  {(match.scoreA > 0 || match.scoreB > 0) && (
                    <div className="text-center mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900">
                        {match.scoreA} - {match.scoreB}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Final Score</div>
                    </div>
                  )}

                  {/* Starting XI */}
                  {renderStarting11Grid(match.starting11)}

                  {/* Substitutes */}
                  {renderSubstitutes(match.substitutes)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}