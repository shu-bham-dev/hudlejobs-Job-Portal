import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../../utils/localStorage";
import useRole from "../../hooks/useRole";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeItem("token");
    navigate("/");
  };
  const { isAdmin } = useRole();

  return (
    <nav className="flex items-center justify-between bg-gray-900 p-4">
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-bold">
          HUDLEJOBS
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to={isAdmin ? "/create-job" : "/all-job"}
          className={`text-white hover:text-gray-300`}
        >
          {isAdmin ? "Create a Job" : "All Jobs"}
        </Link>
        <Link
          to={isAdmin ? "/posted-job" : "/applied-job"}
          className="text-white hover:text-gray-300"
        >
          {isAdmin ? "Posted Jobs" : "Applied Jobs"}
        </Link>
      </div>
      <button
        type="button"
        className="text-white hover:text-gray-300"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
