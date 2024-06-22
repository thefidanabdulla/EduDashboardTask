import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-gray-600 font-medium uppercase -tracking-tight">
        Welcome to the Home Page
      </h1>
      <h1 className="text-2xl text-center text-gray-600 font-medium uppercase -tracking-tight mt-3">
        go to
      </h1>
      <div className="flex flex-col gap-5 items-center justify-center mt-10">
        <Link
          to={"/schools"}
          className="max-w-[500px] w-full rounded-3xl p-10 bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-center text-3xl font-semibold text-white uppercase"
        >
          Schools
        </Link>
        <Link
          to={"/high-schools"}
          className="max-w-[500px] w-full rounded-3xl p-10 bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-center text-3xl font-semibold text-white uppercase"
        >
          High Schools
        </Link>
        <Link
          to={"/universities"}
          className="max-w-[500px] w-full rounded-3xl p-10 bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-center text-3xl font-semibold text-white uppercase"
        >
          Universities
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
