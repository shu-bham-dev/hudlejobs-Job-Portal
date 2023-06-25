import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  if (!user) {
    return {
      isCandidate: false,
      isAdmin: false,
    };
  }

  return {
    isCandidate: user.role === "CANDIDATE",
    isAdmin: user.role === "ADMIN",
  };
};

export default useRole;
