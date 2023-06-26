import React from "react";
import { applyJobById } from "../../../queries/jobs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import useRole from "../../../hooks/useRole";

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
  const applyJob = async () => {
    const res = await applyJobById(job.id);
    if (res.message === "Job application successful") {
      toast.success("Applied Successfull");
    } else {
      toast.error("You can not apply more than once");
    }
  };
  const navigate = useNavigate();
  const { isAdmin, isCandidate } = useRole();

  return (
    <div className="bg-gray-800 rounded-lg p-6 mt-4">
      <h2 className="text-xl text-white font-semibold mb-2">
        {job?.positionName}
      </h2>
      <p className="text-gray-300 text-sm mb-4">{job?.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-gray-400 text-sm">{job?.companyName}</p>
        <p className="text-gray-400 text-sm">
          Experience: {job?.experience} years
        </p>
      </div>
      <div className="flex justify-between items-center mt-4">
        {isCandidate && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={applyJob}
          >
            Apply
          </button>
        )}
        {isAdmin && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              navigate(`/all-applicant/${job?.id}`);
            }}
          >
            View Applicant
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(`/job-detail/${job?.id}`)}
        >
          View Detail
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default JobCard;
