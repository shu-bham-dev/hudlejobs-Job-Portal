import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./component/JobCard";
import { useAllJobs } from "../../queries/jobs";
import AppShell from "../../components/AppShell";

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

const AllJobs: React.FC = () => {
  const { data } = useAllJobs({});

  return (
    <AppShell>
      <div className="bg-gray-900 text-white p-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data?.jobs.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to="/alljobs"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View More
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

export default AllJobs;
