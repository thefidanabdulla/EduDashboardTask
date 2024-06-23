import { RiLogoutBoxLine } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";



interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <div className="w-[300px] bg-indigo-300 flex-shrink-0  px-4 flex flex-col py-2 gap-3">
        <Link to={'/'}  className="font-bold text-[36px] rounded-lg text-white bg-black bg-opacity-5 flex items-center justify-center gap-2 py-3"><PiStudentBold/> EduDash</Link>
        <Link to={'/schools'} className="px-10 text-xl font-bold text-white uppercase -tracking-tight text-center py-5 transition-all duration-300 hover:bg-white hover:bg-opacity-20 rounded-md">
          Schools
        </Link>
        <Link to={'/high-schools'} className="px-10 text-xl font-bold text-white uppercase -tracking-tight text-center py-5 transition-all duration-300 hover:bg-white hover:bg-opacity-20 rounded-md">
          High Schools
        </Link>
        <Link to={'/universities'} className="px-10 text-xl font-bold text-white uppercase -tracking-tight text-center py-5 transition-all duration-300 hover:bg-white hover:bg-opacity-20 rounded-md">
          Universities
        </Link>
      </div>
      <div className="flex-1 w-full h-full">
        <div title="Logout" className="w-full p-5 bg-indigo-300 border-l border-white border-opacity-10 flex items-center justify-end">
          <button className="text-2xl transition-all duration-300 hover:bg-white hover:bg-opacity-10 text-white p-3 border border-opacity-30 border-white rounded-full" onClick={handleLogout}><RiLogoutBoxLine /></button>
        </div>
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
