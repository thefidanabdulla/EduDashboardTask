import { useForm, useFieldArray } from "react-hook-form";
import { useUpdateUniversityMutation } from "../../redux/services/university";
import { toast } from "react-toastify";

export type UpdateUniversityFormData = {
  _id?: string;
  name: string;
  address: string;
  president: string;
  students: number;
  email: string;
  corpus: {
    department: string;
    head: string;
    numberOfCourses: number;
  }[];
};

interface UpdateUniversityFormProps {
  setIsModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
  initialData: UpdateUniversityFormData;
}

const UpdateUniversityForm = ({
  setIsModalShowing,
  initialData,
}: UpdateUniversityFormProps) => {
  const [updateUniversity] = useUpdateUniversityMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUniversityFormData>({
    defaultValues: initialData
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "corpus",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateUniversity(data);
      toast.success("University updated successfully!!");
      setIsModalShowing(false);
    } catch (error) {
      // console.error('Failed to create university:', error);
      toast.error("Failed to update university");
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
        President
        <input
          type="text"
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("president", { required: "This field is required" })}
        />
        {errors.president && (
          <span className="text-red-400 text-xs">
            {errors.president.message}
          </span>
        )}
      </label>
      <label className="text-gray-400 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-400 text-xs">{errors.email.message}</span>
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
      <div>
        <h3 className="text-gray-400 text-sm font-bold">Corpus</h3>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-4 mb-4 border p-4 rounded-md"
          >
            <label className="text-gray-400 text-sm font-bold">
              Department
              <input
                type="text"
                className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
                {...register(`corpus.${index}.department`, {
                  required: "This field is required",
                })}
              />
              {errors.corpus?.[index]?.department && (
                <span className="text-red-400 text-xs">
                  {errors.corpus[index].department?.message}
                </span>
              )}
            </label>
            <label className="text-gray-400 text-sm font-bold">
              Head
              <input
                type="text"
                className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
                {...register(`corpus.${index}.head`, {
                  required: "This field is required",
                })}
              />
              {errors.corpus?.[index]?.head && (
                <span className="text-red-400 text-xs">
                  {errors.corpus[index].head?.message}
                </span>
              )}
            </label>
            <label className="text-gray-400 text-sm font-bold">
              Number of Courses
              <input
                type="number"
                className="border rounded-md w-full py-3 px-4 font-normal outline-none mt-2 border-indigo-50"
                {...register(`corpus.${index}.numberOfCourses`, {
                  required: "This field is required",
                })}
              />
              {errors.corpus?.[index]?.numberOfCourses && (
                <span className="text-red-400 text-xs">
                  {errors.corpus[index].numberOfCourses?.message}
                </span>
              )}
            </label>
            <button
              type="button"
              onClick={() => remove(index)}
              className="mt-2 bg-red-400 text-white rounded-md px-4 py-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            append({ department: "", head: "", numberOfCourses: 0 })
          }
          className="mt-4 bg-blue-400 text-white rounded-md px-4 py-2"
        >
          Add Corpus
        </button>
      </div>
      <button
        type="submit"
        className="p-4 bg-indigo-400 transition-all duration-300 hover:bg-indigo-600 text-white text-xl font-medium rounded-md"
      >
        Submit
      </button>
    </form>
  );
};
export default UpdateUniversityForm;
