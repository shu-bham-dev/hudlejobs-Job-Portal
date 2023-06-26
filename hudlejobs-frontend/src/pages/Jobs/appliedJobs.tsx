import React from "react";
import { Link } from "react-router-dom";
import JobCard from "./component/JobCard";
import { useAllJobs, useAppliedJobs } from "../../queries/jobs";
import AppShell from "../../components/AppShell";

const AppliedJobs: React.FC = () => {
  const { data } = useAppliedJobs({});

  return (
    <AppShell>
      <div className="bg-gray-700 text-white p-8">
        <div className="flex flex-col w-1/2 m-auto">
          {data?.jobs.map((job: any) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            to="/all-job"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            View More
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

export default AppliedJobs;
