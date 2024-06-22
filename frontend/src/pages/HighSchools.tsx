import { useEffect, useState } from "react";

import CustomModal from "../components/CustomModal";
import AddHighSchoolForm from "../components/highschools/AddHighSchoolForm";
import UpdateHighSchool from "../components/highschools/UpdateHighSchool";

import { useDeleteHighSchoolMutation, useGetHighSchoolsQuery } from "../redux/services/highschool";

import { ImSpinner2 } from "react-icons/im";
import { FaBullseye, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";


const HighSchools = () => {
  const [isAddHighSchoolModalShowing, setIsAddHighSchoolModalShowing] = useState(false);
  const [isUpdateHighSchoolModalShowing, setIsUpdateHighSchoolModalShowing] = useState(false);
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
  const [deletedHighSchoolId, setDeletedHighSchoolId] = useState("");
  const [updatedHighSchool, setUpdatedHighSchool] = useState({
    _id:"",
    name: '',
    address: "",
    principal: "",
    graduationRate: 0,
    students: 0
  });

  const { data: highschools, isLoading , refetch: refetchHighSchools} = useGetHighSchoolsQuery();
  const [deleteHighSchool, { isLoading: deleting, error: deleteError }] = useDeleteHighSchoolMutation();

  const handleDeleteHighSchool = async (highschoolId: string) => {
    try {
      const response = await deleteHighSchool(highschoolId);
      toast.success('High school deleted successfully :)', response.data);
      refetchHighSchools();
    } catch (error) {
      toast.error('Error deleting high school');
    }
  };

  useEffect(() => {
    refetchHighSchools();
  }, [isAddHighSchoolModalShowing, isUpdateHighSchoolModalShowing, isDeleteModalShowing])
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
      {isAddHighSchoolModalShowing && (
        <CustomModal
          title="Add High School"
          setIsModalShowing={setIsAddHighSchoolModalShowing}
        >
          <AddHighSchoolForm setIsModalShowing={setIsAddHighSchoolModalShowing} />
        </CustomModal>
      )}
      {isUpdateHighSchoolModalShowing && (
        <CustomModal
          title="Update High School"
          setIsModalShowing={setIsUpdateHighSchoolModalShowing}
        >
          <UpdateHighSchool initialData={updatedHighSchool} setIsModalShowing={setIsUpdateHighSchoolModalShowing} />
        </CustomModal>
      )}
      {isDeleteModalShowing && (
        <CustomModal
          title="Delete High School"
          setIsModalShowing={setIsDeleteModalShowing}
        >
          <div className="py-10 flex flex-col items-center justify-center gap-8">
            <h3 className="text-2xl text-gray-500 font-medium">Are you sure?</h3>
            <button onClick={() =>{
               handleDeleteHighSchool(deletedHighSchoolId)
               setIsDeleteModalShowing(false)
              }} className="rounded-xl p-4 text-2xl bg-red-400 transition-all duration-300 hover:bg-red-500 text-white">Delete</button>
          </div>
        </CustomModal>
      )}
      <div className="w-full flex items-center justify-between">
        <h1 className="text-[48px] font-bold text-indigo-400">HighSchools</h1>
        <button
          onClick={() => setIsAddHighSchoolModalShowing(true)}
          className="py-4 px-5 rounded-xl text-white text-2xl bg-indigo-400 transition-all duration-300 hover:bg-indigo-600"
        >
          <FaPlus />
        </button>
      </div>
      <div className="py-10">
        {highschools && highschools.length > 0 ? (
          <div className="w-full">
            <table className="w-full">
              <thead className="flex w-full">
                <tr className="flex w-full">
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Name</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Address</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Principal</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Students count</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Graduation Rate</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Actions</td>
                </tr>
              </thead>
              <tbody>
                {highschools.map((highschool) => (
                  <tr key={highschool._id} className="flex w-full">
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{highschool.name}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{highschool.address}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{highschool.principal}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{highschool.students}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{highschool.graduationRate} %</td>
                    <td className="flex-1 border py-1 px-4 border-indigo-100 flex items-center justify-center gap-4">
                      <button onClick={() => {
                        setUpdatedHighSchool(highschool);
                        setIsUpdateHighSchoolModalShowing(true)
                      }} type="button" className="p-2 text-2xl rounded-md bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-white">
                        <MdEdit />
                      </button>
                      <button onClick={() => {
                        setDeletedHighSchoolId(highschool._id);
                        setIsDeleteModalShowing(true)
                      }} type="button" className="p-2 text-2xl rounded-md bg-red-400 transition-all duration-300 hover:bg-red-600 text-white">
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
            No high school added yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default HighSchools