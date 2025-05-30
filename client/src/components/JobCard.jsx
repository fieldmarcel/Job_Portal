import React from 'react';
import { MapPin, ExternalLink, Briefcase, Building2 } from 'lucide-react';

const JobCard = ({ job }) => {
  

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-blue-200 group">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              {job.job_title}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{job.company_name}</span>
            </div>
            {job.job_location && (
              <div className="flex items-center gap-2 mt-1 text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{job.job_location}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {job.source && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {job.source}
              </span>
            )}
          </div>
        </div>

        {job.description && (
          <div className="text-gray-600 text-sm leading-relaxed">
            <p className="line-clamp-3">
              {job.description.length > 200 
                ? `${job.description.substring(0, 200)}...` 
                : job.description
              }
            </p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Briefcase className="h-4 w-4" />
            <span>Full-time</span>
          </div>
          
          {job.apply_link && (
            <button
              
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
            >
              Apply Now
              <ExternalLink className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;