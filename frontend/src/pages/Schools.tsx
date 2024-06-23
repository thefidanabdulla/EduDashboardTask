import { useEffect, useState } from "react";

import CustomModal from "../components/CustomModal";
import AddSchoolForm from "../components/schools/AddSchoolForm";

import { useDeleteSchoolMutation, useGetSchoolsQuery } from "../redux/services/school";

import { ImSpinner2 } from "react-icons/im";
import { FaBullseye, FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import UpdateSchoolForm from "../components/schools/UpdateSchoolForm";
import FilterComponent from "../components/FilterComponent";


const Schools = () => {
  const [isAddSchoolModalShowing, setIsAddSchoolModalShowing] = useState(false);
  const [isUpdateSchoolModalShowing, setIsUpdateSchoolModalShowing] = useState(false);
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
  const [deletedSchoolId, setDeletedSchoolId] = useState("");
  interface filterField {
    title: string;
    key: string;
    values: string[];
  }
  const [filterFieldsArray, setFilterFieldsArray] = useState<filterField[]>([]);
  const [selectedFilterFields, setSelectedFilterFields] = useState({
    name: "",
    address: "",
    principal: ""
  });
  const [updatedSchool, setUpdatedSchool] = useState({
    _id:"",
    name: '',
    address: "",
    principal: "",
    students: 0
  });

  const { data: schools, isLoading , refetch: refetchSchools} = useGetSchoolsQuery(selectedFilterFields);
  const [deleteSchool] = useDeleteSchoolMutation();

  const handleDeleteSchool = async (schoolId: string) => {
    try {
      const response = await deleteSchool(schoolId);
      toast.success('School deleted successfully :)', response.data);
      refetchSchools();
    } catch (error) {
      toast.error('Error deleting school');
    }
  };

  const handleSetFilterFieldsArray = () => {
    if (schools && schools?.length) {
      let namesArr = {
        title: "Name",
        key: "name",
        values: {},
      };
      namesArr.values = schools.map((item) => item.name);

      let addressArr = {
        title: "Address",
        key: "address",
        values: {},
      };
      addressArr.values = schools.map((item) => item.address);

      let principalArr = {
        title: "Principal",
        key: "principal",
        values: {},
      };
      principalArr.values = schools.map((item) => item.principal);

      setFilterFieldsArray([namesArr, addressArr, principalArr]);
    }
  };

  useEffect(() => {
    refetchSchools();
    handleSetFilterFieldsArray();
  }, [isAddSchoolModalShowing, isUpdateSchoolModalShowing, isDeleteModalShowing, schools]);

  console.log(filterFieldsArray);
  console.log(selectedFilterFields);
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
      {isUpdateSchoolModalShowing && (
        <CustomModal
          title="Update School"
          setIsModalShowing={setIsUpdateSchoolModalShowing}
        >
          <UpdateSchoolForm initialData={updatedSchool} setIsModalShowing={setIsUpdateSchoolModalShowing} />
        </CustomModal>
      )}
      {isDeleteModalShowing && (
        <CustomModal
          title="Delete School"
          setIsModalShowing={setIsDeleteModalShowing}
        >
          <div className="py-10 flex flex-col items-center justify-center gap-8">
            <h3 className="text-2xl text-gray-500 font-medium">Are you sure?</h3>
            <button onClick={() =>{
               handleDeleteSchool(deletedSchoolId)
               setIsDeleteModalShowing(false)
              }} className="rounded-xl p-4 text-2xl bg-red-400 transition-all duration-300 hover:bg-red-500 text-white">Delete</button>
          </div>
        </CustomModal>
      )}
       {
        filterFieldsArray.length > 0 && (
          <FilterComponent
            filterFields={filterFieldsArray}
            setSelectedFilterFields={setSelectedFilterFields}
          />
        )
      }
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
                <tr className="flex w-full">
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Name</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Address</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Principal</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Students count</td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">Actions</td>
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school._id} className="flex w-full">
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.name}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.address}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.principal}</td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center justify-center text-center text-gray-500 font-medium">{school.students}</td>
                    <td className="flex-1 border py-1 px-4 border-indigo-100 flex items-center justify-center gap-4">
                      <button onClick={() => {
                        setUpdatedSchool(school);
                        setIsUpdateSchoolModalShowing(true)
                      }} type="button" className="p-2 text-2xl rounded-md bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-white">
                        <MdEdit />
                      </button>
                      <button onClick={() => {
                        setDeletedSchoolId(school._id);
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
            No school added yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default Schools;
