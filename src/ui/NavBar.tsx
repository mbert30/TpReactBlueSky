import { useState } from "react";
import { useNavigate } from "react-router";
import { logout } from "../domains/auth/authSlice";
import { useAppDispatch } from '../app/store';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  return (
    <nav className="fixed top-0 right-0 left-0 bg-(--dm-primary-a20) text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => navigate("/")} className="text-xl font-bold">
          BlueSky
        </button>

        {/* Bouton menu mobile */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Liens de navigation */}
        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static bg-(--dm-primary-a20) md:bg-transparent w-full md:w-auto left-0 md:flex-row transition-all duration-300 ease-in-out z-60 
          ${isOpen ? "top-16" : "top-[-200px]"}`}
        >
          <li className="p-2 md:p-0 text-center">
            <button onClick={() => navigate("/")} className="hover:text-gray-300">Home</button>
          </li>
          <li className="p-2 md:p-0 text-center">
            <button onClick={() => navigate("/profile/"+sessionStorage.getItem('id'))} className="hover:text-gray-300">Mon profile</button>
          </li>
          <li className="p-2 md:p-0 text-center">
            <button onClick={() => { dispatch(logout()); navigate("/login")}} className="hover:text-gray-300">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;