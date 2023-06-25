import { useQuery } from "@tanstack/react-query";
import apiService from "../utils/apiService";

export const useAllJobs = (q: Record<string, any>, enable = true) => {
  return useQuery(["allJobs", q], () => getAllJobs(q), {
    staleTime: 60 * 60 * 100,
    enabled: enable,
  });
};

const getAllJobs = async (q: Record<string, any>) => {
  const { data } = await apiService.get("/api/jobs/all");
  return data;
};

export const useAdminPostedJob = (q: Record<string, any>, enable = true) => {
  return useQuery(["allJobs", q], () => getAdminPostedJob(q), {
    staleTime: 60 * 60 * 100,
    enabled: enable,
  });
};

const getAdminPostedJob = async (q: Record<string, any>) => {
  const { data } = await apiService.get("/api/jobs");
  return data;
};
