'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProtectedLayout from '../../../components/admin/ProtectedLayout';

type Application = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  previousClub: string;
  medicalInfo: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
};

export default function ApplicationsManagementPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [selectedStatus]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      
      const url = selectedStatus === 'all' 
        ? `${apiUrl}/api/applications`
        : `${apiUrl}/api/applications/status/${selectedStatus}`;
      
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setApplications(response.data);
    } catch (error) {
      setError('Failed to load applications');
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: 'Approved' | 'Rejected') => {
    setUpdatingId(applicationId);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      
      await axios.put(
        `${apiUrl}/api/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update the local state
      setApplications(prev => 
        prev.map(app => 
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error('Error updating application status:', error);
      setError('Failed to update application status');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Application Management</h1>
          <p className="mt-2 text-gray-600">Review and manage player applications</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Status Filter */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {['all', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  selectedStatus === status
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {status === 'all' ? 'All Applications' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent/Guardian
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date of Birth
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {application.firstName} {application.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{application.gender}</div>
                        {application.previousClub && (
                          <div className="text-xs text-gray-400">
                            Previous: {application.previousClub}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">{application.parentName}</div>
                        <div className="text-sm text-gray-500">{application.parentPhone}</div>
                        <div className="text-sm text-gray-500">{application.parentEmail}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(application.dateOfBirth)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(application.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(application.status)}`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {application.status === 'Pending' ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateApplicationStatus(application._id, 'Approved')}
                            disabled={updatingId === application._id}
                            className="text-green-600 hover:text-green-900 disabled:text-gray-400"
                          >
                            {updatingId === application._id ? 'Updating...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(application._id, 'Rejected')}
                            disabled={updatingId === application._id}
                            className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                          >
                            {updatingId === application._id ? 'Updating...' : 'Reject'}
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">No actions</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {applications.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-600">
                {selectedStatus === 'all' 
                  ? 'No applications have been submitted yet.' 
                  : `No ${selectedStatus.toLowerCase()} applications found.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedLayout>
  );
}