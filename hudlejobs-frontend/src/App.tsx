import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AllJobs from "./pages/Jobs/allJobs";
import AuthProvider from "./context/AuthContext";
import PostedJob from "./pages/Jobs/postedjobs";
import CreateJob from "./pages/CreateJob";
import AppliedJobs from "./pages/Jobs/appliedJobs";
import JobDetail from "./pages/JobDetail";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/all-job" element={<AllJobs />} />
            <Route path="/posted-job" element={<PostedJob />} />
            <Route path="/create-job" element={<CreateJob />} />
            <Route path="/applied-job" element={<AppliedJobs />} />
            <Route path="/job-detail/:jobId" element={<JobDetail />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
