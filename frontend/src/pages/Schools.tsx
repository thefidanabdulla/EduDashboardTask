import { useState } from "react";

import CustomModal from "../components/CustomModal";
import AddSchoolForm from "../components/schools/AddSchoolForm";

import { useGetSchoolsQuery } from "../redux/services/school";

import { ImSpinner2 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";


const Schools = () => {
  const [isAddSchoolModalShowing, setIsAddSchoolModalShowing] = useState(false);
  const [isUpdateSchoolModalShowing, setIsUpdateSchoolModalShowing] = useState(true)
  const { data: schools, isLoading, error } = useGetSchoolsQuery();
  console.log(schools);
  if (isLoading) {
    return (
      <div className="w-full flex justify-center pt-10">
        <button className="text-[64px] text-indigo-400 animate-spin">
          <ImSpinner2 />
        </button>
      </div>
    );
  }
  return (
    <div>
      {isAddSchoolModalShowing && (
        <CustomModal
          title="Add School"
          setIsModalShowing={setIsAddSchoolModalShowing}
        >
          <AddSchoolForm setIsModalShowing={setIsAddSchoolModalShowing} />
        </CustomModal>
      )}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[48px] font-bold text-indigo-400">Schools</h1>
        <button
          onClick={() => setIsAddSchoolModalShowing(true)}
          className="py-4 px-5 rounded-xl text-white text-2xl bg-indigo-400 transition-all duration-300 hover:bg-indigo-600"
        >
          <FaPlus />
        </button>
      </div>
      <div className="py-10">
        {schools && schools.length > 0 ? (
          <div className="w-full">
            <table className="w-full">
              <thead className="flex w-full">
                <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Name</td>
                <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Address</td>
                <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Principal</td>
                <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Students count</td>
                <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Actions</td>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school._id} className="flex w-full">
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.name}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.address}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.principal}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.students}</td>
                    <td className="flex-1 border py-1 px-4 border-indigo-100 flex items-center justify-center gap-4">
                      <button type="button" className="p-2 text-2xl rounded-md bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-white">
                        <MdEdit />
                      </button>
                      <button type="button" className="p-2 text-2xl rounded-md bg-red-400 transition-all duration-300 hover:bg-red-600 text-white">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full text-center text-gray-500 font-semibold text-lg">
            No school added yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools;
