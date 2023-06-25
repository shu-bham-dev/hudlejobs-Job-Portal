import React from "react";

interface Job {
  id: number;
  positionName: string;
  description: string;
  experience: number;
  createdDate: string;
  companyName: string;
  ctc: number;
  skills: string[];
  recruiterId: number;
}

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl text-white font-semibold mb-2">
        {job.positionName}
      </h2>
      <p className="text-gray-300 text-sm mb-4">{job.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">{job.companyName}</p>
        <p className="text-gray-400 text-sm">
          Experience: {job.experience} years
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Apply
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          View Detail
        </button>
      </div>
    </div>
  );
};

export default JobCard;
