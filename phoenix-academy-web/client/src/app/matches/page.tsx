'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

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

interface Match {
  _id: string;
  teamA: Team;
  teamB: string;
  scoreA?: number;
  scoreB?: number;
  matchDate: string;
  venue: string;
  starting11: Player[];
  substitutes: Player[];
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
        const response = await axios.get(`${apiUrl}/api/matches`);
        setMatches(response.data.data);
      } catch (error) {
        setError('Failed to load matches');
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStarting11 = (players: Player[]) => {
    if (!players || players.length === 0) return null;

    return (
      <div className="mt-4">
        <h4 className="font-semibold text-green-700 mb-2">Starting XI</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {players.map((player, index) => (
            <div key={player._id} className="bg-green-50 px-3 py-2 rounded text-sm">
              <span className="font-medium">{index + 1}. {player.firstName} {player.lastName}</span>
              {player.position && (
                <span className="text-green-600 ml-2">({player.position})</span>
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
        <h4 className="font-semibold text-blue-700 mb-2">Substitutes</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {players.map((player) => (
            <div key={player._id} className="bg-blue-50 px-3 py-2 rounded text-sm">
              <span className="font-medium">{player.firstName} {player.lastName}</span>
              {player.position && (
                <span className="text-blue-600 ml-2">({player.position})</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading matches...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 max-w-md mx-auto">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Matches</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out our upcoming fixtures and team lineups
          </p>
        </div>

        {/* Matches List */}
        {matches.length === 0 ? (
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming matches</h3>
              <p className="mt-1 text-sm text-gray-500">Check back soon for fixture updates.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {matches.map((match) => (
              <div key={match._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  {/* Match Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {match.teamA.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {match.teamA.ageGroup} {match.teamA.gender}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-400">vs</span>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {match.teamB}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">
                        {formatDate(match.matchDate)}
                      </div>
                      <div className="text-sm text-gray-600">
                        📍 {match.venue}
                      </div>
                    </div>
                  </div>

                  {/* Score (if available) */}
                  {(match.scoreA !== null && match.scoreA !== undefined) && (
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center space-x-4 bg-gray-100 px-6 py-2 rounded-lg">
                        <span className="text-2xl font-bold text-gray-900">{match.scoreA}</span>
                        <span className="text-gray-500">-</span>
                        <span className="text-2xl font-bold text-gray-900">{match.scoreB}</span>
                      </div>
                    </div>
                  )}

                  {/* Team Lineup */}
                  {(match.starting11.length > 0 || match.substitutes.length > 0) && (
                    <div className="border-t pt-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {match.teamA.name} Squad
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          {renderStarting11(match.starting11)}
                        </div>
                        <div>
                          {renderSubstitutes(match.substitutes)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}