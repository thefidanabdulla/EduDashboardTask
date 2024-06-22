import { useForm } from "react-hook-form";
import { useCreateHighSchoolMutation } from "../../redux/services/highschool";
import { toast } from "react-toastify";

export type AddHighSchoolFormData = {
  _id: string;
  name: string;
  address: string;
  principal: string;
  students: number;
  graduationRate: number;
};

interface AddHighSchoolFormProps {
  setIsModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddHighSchoolForm = ({ setIsModalShowing }: AddHighSchoolFormProps) => {
  const [createHighSchool] = useCreateHighSchoolMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddHighSchoolFormData>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createHighSchool(data);
      toast.success("New high school added successfully!!");
      setIsModalShowing(false);
    } catch (error) {
      // console.error('Failed to create school:', error);
      toast.error("Failed to create high school");
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 py-5">
      <label className="text-gray-400 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-400 text-xs">{errors.name.message}</span>
        )}
      </label>
      <label className="text-gray-400 text-sm font-bold flex-1">
        Address
        <input
          type="text"
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("address", { required: "This field is required" })}
        />
        {errors.address && (
          <span className="text-red-400 text-xs">{errors.address.message}</span>
        )}
      </label>
      <label className="text-gray-400 text-sm font-bold flex-1">
        Principal
        <input
          type="text"
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("principal", { required: "This field is required" })}
        />
        {errors.principal && (
          <span className="text-red-400 text-xs">
            {errors.principal.message}
          </span>
        )}
      </label>
      <label className="text-gray-400 text-sm font-bold flex-1">
        Students
        <input
          type="number"
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("students", { required: "This field is required" })}
        />
        {errors.students && (
          <span className="text-red-400 text-xs">
            {errors.students.message}
          </span>
        )}
      </label>
      <label className="text-gray-400 text-sm font-bold flex-1">
        Graduation Rate
        <input
          type="number"
          min={0}
          max={100}
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("graduationRate", {
            required: "This field is required",
          })}
        />
        {errors.graduationRate && (
          <span className="text-red-400 text-xs">
            {errors.graduationRate.message}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="p-4 bg-indigo-400 transition-all duration-300 hover:bg-indigo-600 text-white text-xl font-medium rounded-md"
      >
        Submit
      </button>
    </form>
  );
};
export default AddHighSchoolForm;
