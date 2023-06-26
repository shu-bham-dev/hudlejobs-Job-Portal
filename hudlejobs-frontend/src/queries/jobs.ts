import { useQuery } from "@tanstack/react-query";
import apiService from "../utils/apiService";

export const useAllJobs = (q: Record<string, any>, enable = true) => {
  return useQuery(["allJobs", q], () => getAllJobs(q), {
    staleTime: 60 * 60 * 100,
    enabled: enable,
  });
};

const getAllJobs = async (q: Record<string, any>) => {
  const { data } = await apiService.get("/api/jobs/all", q);
  return data;
};

export const useAdminPostedJob = (q: Record<string, any>, enable = true) => {
  return useQuery(["allAdminJobs", q], () => getAdminPostedJob(q), {
    staleTime: 60 * 60 * 100,
    enabled: enable,
  });
};

const getAdminPostedJob = async (q: Record<string, any>) => {
  const { data } = await apiService.get("/api/jobs");
  return data;
};

export const useAppliedJobs = (q: Record<string, any>, enable = true) => {
  return useQuery(["allAppliedJobs", q], () => getAppliedJobs(q), {
    staleTime: 60 * 60 * 1000,
    enabled: enable,
  });
};

export const getAppliedJobs = async (q: Record<string, any>) => {
  const { data } = await apiService.get("/api/auth/me/applied-jobs");
  return data;
};

export const applyJobById = async (jobId: number) => {
  const { data } = await apiService.post(`/api/jobs/${jobId}/apply`);
  return data;
};

export const useJobById = (jobid: any, enable = true) => {
  return useQuery(["jobById", jobid], () => getJobById(jobid), {
    staleTime: 60 * 60 * 1000,
    enabled: enable,
  });
};

export const getJobById = async (jobId: any) => {
  const { data } = await apiService.post(`/api/jobs/${jobId}`);
  return data;
};

export const deleteJobById = async (jobId: number) => {
  const data = await apiService.delete(`api/jobs/${jobId}`);
  return data;
};
