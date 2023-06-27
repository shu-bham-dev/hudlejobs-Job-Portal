import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./component/JobCard";
import { useAdminPostedJob, useAllJobs } from "../../queries/jobs";
import AppShell from "../../components/AppShell";

const PostedJob: React.FC = () => {
  const { data } = useAdminPostedJob({});

  return (
    <AppShell>
      <div className="bg-gray-700 text-white p-8">
        <div className="flex flex-col lg:w-1/2 lg:m-auto sm:w-full sm:m-0">
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

export default PostedJob;
