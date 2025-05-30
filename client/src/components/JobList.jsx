import React from 'react';
import { Search, Brain } from 'lucide-react';
import JobCard from '../components/JobCard.jsx';

const JobList = ({ jobs, loading, error, searchQuery, predictedRoles }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse">
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-red-600 font-medium mb-2">Error Loading Jobs</div>
          <div className="text-red-500 text-sm">{error}</div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 max-w-md mx-auto">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-600 font-medium mb-2">No jobs found</div>
          <div className="text-gray-500 text-sm">
            Try adjusting your search terms or browse all available positions.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {searchQuery && (
        <div className="flex flex-wrap items-center gap-3 pb-4 border-b border-gray-200">
          <span className="text-gray-600 font-medium">Search results for:</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            "{searchQuery}"
          </span>
          <span className="text-gray-500 text-sm">({jobs.length} jobs found)</span>
        </div>
      )}

      {predictedRoles && predictedRoles.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Brain className="h-5 w-5 text-green-600" />
          </div>
          <div className="flex flex-wrap gap-2">
            {predictedRoles.map((role, index) => (
              <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {role}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {jobs.map((job, index) => (
          <JobCard key={job._id || index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;