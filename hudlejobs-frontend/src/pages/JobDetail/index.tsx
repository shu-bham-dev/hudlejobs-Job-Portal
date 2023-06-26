import React, { useEffect, useState } from "react";
import { applyJobById, deleteJobById, useJobById } from "../../queries/jobs";
import { useNavigate, useParams } from "react-router-dom";
import AppShell from "../../components/AppShell";
import useRole from "../../hooks/useRole";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";

const JobDetail = () => {
  const { jobId = "" } = useParams();
  const [skillset, setSkillset] = useState([]);
  const { data: JobById } = useJobById(jobId);
  useEffect(() => {
    setSkillset(JSON.parse(JobById?.skills));
  }, [JobById]);

  const { isCandidate } = useRole();
  const navigate = useNavigate();

  const applyJob = async () => {
    const apply = await applyJobById(+jobId);
    if (apply.message === "Job application successful") {
      toast.success("Job applied");
    }
  };
  const deleteJob = () => {};

  return (
    <AppShell>
      <div className="border-gray-800 p-4 h-screen mb-4 bg-gray-700 text-white">
        <div className="w-1/2 m-auto p-20 bg-gray-900">
          <h2 className="text-xl font-semibold">{JobById?.positionName}</h2>
          <p className="text-gray-400 mb-2">{JobById?.companyName}</p>
          <p className="text-gray-400 mb-2">
            Experience: {JobById?.experience} years
          </p>
          <p className="text-gray-400 mb-2">CTC: ${JobById?.ctc}</p>
          <p className="text-gray-400 mb-2">
            Created Date: {JobById?.createdDate}
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Description:</h3>
          <p>{JobById?.description}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Skills:</h3>
            <ul className="list-disc pl-6">
              {skillset.map((skill: string, index: number) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          {isCandidate ? (
            <div
              className="bg-green-500 mt-4 hover:bg-blue-600 text-white px-4 py-2 rounded w-24 text-center cursor-pointer"
              onClick={applyJob}
            >
              Apply
            </div>
          ) : (
            <div
              className="bg-red-500 mt-4 hover:bg-blue-600 text-white px-4 py-2 rounded w-24 text-center cursor-pointer"
              onClick={deleteJob}
            >
              Delete
            </div>
          )}
        </div>
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
    </AppShell>
  );
};

export default JobDetail;
