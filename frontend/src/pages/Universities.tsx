import { useEffect, useState } from "react";

import CustomModal from "../components/CustomModal";

import AddUniversityForm from "../components/universities/AddUniversityForm";
import UpdateUniversityForm from "../components/universities/UpdateUniversityForm";

import {
  useDeleteUniversityMutation,
  useGetUniversitiesQuery,
} from "../redux/services/university";

import { ImSpinner2 } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import FilterComponent from "../components/FilterComponent";

const Universities = () => {
  const [isAddUniversityModalShowing, setIsAddUniversityModalShowing] =
    useState(false);
  const [isUpdateUniversityModalShowing, setIsUpdateUniversityModalShowing] =
    useState(false);
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
  const [deletedUniversityId, setDeletedUniversityId] = useState("");
  const [isCorpusModalShowing, setIsCorpusModalShowing] = useState(false);
  const [selectedCorpusesData, setSelectedCorpusesData] = useState([]);

  interface filterField {
    title: string;
    key: string;
    values: string[];
  }
  const [filterFieldsArray, setFilterFieldsArray] = useState<filterField[]>([]);
  const [selectedFilterFields, setSelectedFilterFields] = useState({
    name: "",
    address: "",
    president: "",
    email: "",
  });

  const [updatedUniversity, setUpdatedUniversity] = useState({
    _id: "",
    name: "",
    address: "",
    president: "",
    students: 0,
    email: "",
    corpus: [
      {
        department: "",
        head: "",
        numberOfCourses: "",
      },
    ],
  });

  const {
    data: universities,
    isLoading,
    refetch: refetchUniversities,
  } = useGetUniversitiesQuery(selectedFilterFields);
  const [deleteUniversity] = useDeleteUniversityMutation();

  const handleDeleteUniversity = async (universityId: string) => {
    try {
      const response = await deleteUniversity(universityId);
      toast.success("University deleted successfully :)", response.data);
      refetchUniversities();
    } catch (error) {
      toast.error("Error deleting university");
    }
  };

  const handleSetFilterFieldsArray = () => {
    if (universities && universities?.length) {
      let namesArr = {
        title: "Name",
        key: "name",
        values: {},
      };
      namesArr.values = universities.map((item) => item.name);

      let addressArr = {
        title: "Address",
        key: "address",
        values: {},
      };
      addressArr.values = universities.map((item) => item.address);

      let presidentArr = {
        title: "President",
        key: "president",
        values: {},
      };
      presidentArr.values = universities.map((item) => item.president);

      let emailArr = {
        title: "Email",
        key: "email",
        values: {},
      };
      emailArr.values = universities.map((item) => item.email);

      setFilterFieldsArray([namesArr, addressArr, presidentArr, emailArr]);
    }
  };

  useEffect(() => {
    refetchUniversities();
    handleSetFilterFieldsArray();
  }, [
    isAddUniversityModalShowing,
    isUpdateUniversityModalShowing,
    isDeleteModalShowing,
    universities,
  ]);

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
      {isAddUniversityModalShowing && (
        <CustomModal
          title="Add University"
          setIsModalShowing={setIsAddUniversityModalShowing}
        >
          <AddUniversityForm
            setIsModalShowing={setIsAddUniversityModalShowing}
          />
        </CustomModal>
      )}
      {isUpdateUniversityModalShowing && (
        <CustomModal
          title="Update University"
          setIsModalShowing={setIsUpdateUniversityModalShowing}
        >
          <UpdateUniversityForm
            initialData={updatedUniversity}
            setIsModalShowing={setIsUpdateUniversityModalShowing}
          />
        </CustomModal>
      )}
      {isDeleteModalShowing && (
        <CustomModal
          title="Delete University"
          setIsModalShowing={setIsDeleteModalShowing}
        >
          <div className="py-10 flex flex-col items-center justify-center gap-8">
            <h3 className="text-2xl text-gray-500 font-medium">
              Are you sure?
            </h3>
            <button
              onClick={() => {
                handleDeleteUniversity(deletedUniversityId);
                setIsDeleteModalShowing(false);
              }}
              className="rounded-xl p-4 text-2xl bg-red-400 transition-all duration-300 hover:bg-red-500 text-white"
            >
              Delete
            </button>
          </div>
        </CustomModal>
      )}
      {isCorpusModalShowing && (
        <CustomModal title="Corpus" setIsModalShowing={setIsCorpusModalShowing}>
          <table className="w-full">
            <thead className="w-full">
              <tr className="w-full flex">
                <th className="flex-1  border p-3 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                  Department
                </th>
                <th className="flex-1  border p-3 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                  Head
                </th>
                <th className="flex-1  border p-3 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                  Number Of Courses
                </th>
              </tr>
            </thead>
            <tbody className="w-full">
              {selectedCorpusesData?.map((corpus) => (
                <tr className="w-full flex">
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    {corpus.department}
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    {corpus.head}
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    {corpus.numberOfCourses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        <h1 className="text-[48px] font-bold text-indigo-400">Universities</h1>
        <button
          onClick={() => setIsAddUniversityModalShowing(true)}
          className="py-4 px-5 rounded-xl text-white text-2xl bg-indigo-400 transition-all duration-300 hover:bg-indigo-600"
        >
          <FaPlus />
        </button>
      </div>
      <div className="py-10">
        {universities && universities.length > 0 ? (
          <div className="w-full">
            <table className="w-full">
              <thead className="flex w-full">
                <tr className="flex w-full">
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Name
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Address
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Presitent
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Students count
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Email
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Corpus
                  </td>
                  <td className="flex-1 border p-4 border-indigo-100 text-center text-gray-500 font-semibold text-lg">
                    Actions
                  </td>
                </tr>
              </thead>
              <tbody>
                {universities.map((university) => (
                  <tr key={university._id} className="flex w-full">
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center text-center text-gray-500 font-medium">
                      {university.name}
                    </td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center text-center text-gray-500 font-medium">
                      {university.address}
                    </td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center text-center text-gray-500 font-medium">
                      {university.president}
                    </td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center text-center text-gray-500 font-medium">
                      {university.students}
                    </td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center text-center text-gray-500 font-medium">
                      {university.email}
                    </td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center text-center text-gray-500 font-medium ">
                      <button
                        onClick={() => {
                          setIsCorpusModalShowing(true);
                          setSelectedCorpusesData(university.corpus);
                        }}
                        className="text-[40px]"
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="flex-1 border p-4 border-indigo-100 flex items-center  justify-center gap-4">
                      <button
                        onClick={() => {
                          setUpdatedUniversity(university);
                          setIsUpdateUniversityModalShowing(true);
                        }}
                        type="button"
                        className="p-2 text-2xl rounded-md bg-indigo-300 transition-all duration-300 hover:bg-indigo-400 text-white"
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() => {
                          setDeletedUniversityId(university._id);
                          setIsDeleteModalShowing(true);
                        }}
                        type="button"
                        className="p-2 text-2xl rounded-md bg-red-400 transition-all duration-300 hover:bg-red-600 text-white"
                      >
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
            No university found...
          </div>
        )}
      </div>
    </div>
  );
};

export default Universities;
