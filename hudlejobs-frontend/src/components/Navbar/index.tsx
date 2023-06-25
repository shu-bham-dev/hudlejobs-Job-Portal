import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../../utils/localStorage";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Perform logout logic, such as clearing the token
    removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-black p-4">
      <div className="flex items-center">
        <Link to="/" className="text-white text-lg font-bold">
          HUDLEJOBS
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/home" className="text-white hover:text-gray-300">
          All Jobs
        </Link>
        <Link to="/jobs" className="text-white hover:text-gray-300">
          Applied Jobs
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
