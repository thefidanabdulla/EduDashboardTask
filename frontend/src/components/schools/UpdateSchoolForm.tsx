import { useForm } from "react-hook-form";
import { useCreateSchoolMutation, useUpdateSchoolMutation } from '../../redux/services/school';
import { toast } from 'react-toastify';


export type UpdateSchoolFormData = {
  _id: string;
  name: string;
  address: string;
  principal: string;
  students: number;
};

interface UpdateSchoolFormProps{
  setIsModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
  initialData:UpdateSchoolFormData
}

const UpdateSchoolForm = ({ setIsModalShowing, initialData }: UpdateSchoolFormProps) => {
  const [updateSchool, { isLoading: updating, error: updateError }] = useUpdateSchoolMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateSchoolFormData>({
    defaultValues: initialData
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateSchool({...data, _id:initialData._id});
      toast.success("School updated successfully!!");
      setIsModalShowing(false);
    } catch (error) {
      // console.error('Failed to create school:', error);
      toast.error("Failed to updating school")
    }
  })

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-4 py-5'>
        <label className="text-gray-400 text-sm font-bold flex-1">
          Name
          <input
            type="text"
            className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && (
            <span className="text-red-400 text-xs">
              {errors.name.message}
            </span>
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
            <span className="text-red-400 text-xs">
              {errors.address.message}
            </span>
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
        <button type='submit' className='p-4 bg-indigo-400 transition-all duration-300 hover:bg-indigo-600 text-white text-xl font-medium rounded-md'>
          Submit
        </button>
    </form>
  )
}

export default UpdateSchoolForm