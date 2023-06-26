import React, { useEffect, useState } from "react";
import {
  changeStatusofApplicant,
  getApplicantByID,
  useApplicantById,
} from "../../queries/jobs";
import { useParams } from "react-router-dom";
import AppShell from "../../components/AppShell";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";

const AllApplicant: React.FC = () => {
  const { jobId = "" } = useParams();
  const { data } = useApplicantById(jobId);
  const queryClient = useQueryClient();

  const changeStatus = useMutation(
    (formData: any) => changeStatusofApplicant(formData),
    {
      onError: (err: any) => {
        console.log(err.message);
      },
      onSuccess: (res: any) => {
        queryClient.invalidateQueries(["applicantById"]);
        toast.success("Changed succesfully");
      },
    }
  );

  const handleStatusChange = (
    index: number,
    status: string,
    userId: string
  ) => {
    let formData = {
      status,
      jobId,
      userId,
    };
    changeStatus.mutate(formData);
  };

  return (
    <AppShell>
      <div className="bg-gray-700">
        <div className="container p-10 mx-auto text-white">
          <table className="min-w-full bg-gray-800 border border-gray-700">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Skills</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((applicant: any, index: number) => (
                <tr key={index}>
                  <td className="py-3 px-4 border-b">{applicant?.name}</td>
                  <td className="py-3 px-4 border-b">{applicant?.skills}</td>
                  <td className="py-3 px-4 border-b">{applicant?.email}</td>
                  <td className="py-3 px-4 border-b">{applicant?.status}</td>
                  <td className="py-3 px-4 border-b">
                    <select
                      value={applicant?.status}
                      onChange={(e) =>
                        handleStatusChange(index, e.target.value, applicant?.id)
                      }
                      className="bg-gray-600 rounded py-1 px-2"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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

export default AllApplicant;
