import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JobCard from "./component/JobCard";
import { getAppliedJobs, useAllJobs, useAppliedJobs } from "../../queries/jobs";
import AppShell from "../../components/AppShell";

const AllJobs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const handleExperienceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedExperience(event.target.value);
  };
  const { data } = useAllJobs({ search: searchQuery, exp: selectedExperience });

  return (
    <AppShell>
      <div className="bg-gray-700 text-white p-8">
        <div className="flex">
          <div className="text-xl mr-8">Filters: </div>
          <input
            name="search"
            placeholder=" Search by position"
            onChange={(e) => {
              if (e.target.value.length > 2) {
                setSearchQuery(e.target.value);
              } else {
                setSearchQuery("");
              }
            }}
            className="border text-black font-normal rounded"
          />
          <div className="ml-8">Exp: </div>
          <select
            value={selectedExperience}
            onChange={handleExperienceChange}
            className="px-2 py-1 border border-gray-300 rounded ml-8 text-black"
          >
            <option value="">All</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="7">7 Years</option>
            <option value="8">8 Years</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2 m-auto">
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
