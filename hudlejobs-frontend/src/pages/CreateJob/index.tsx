import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import AppShell from "../../components/AppShell";

const schema = yup.object().shape({
  positionName: yup.string().required("Position Name is required").max(30),
  description: yup.string().required("Description is required"),
  experience: yup.number().required("Experience is required"),
  companyName: yup.string().required("Company Name is required"),
  ctc: yup.number().required("CTC is required"),
  skills: yup.array().required("Skills are required"),
});

const CreateJob: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [skills, setSkills] = useState<string[]>([]);

  const onSubmit = (data: any) => {
    // Submit the job post data to the API
    console.log(data);
  };

  const handleAddSkill = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value.trim() !== "") {
      const newSkill = event.currentTarget.value.trim();
      if (!skills.includes(newSkill)) {
        setSkills((prevSkills) => [...prevSkills, newSkill]);
      }
      event.currentTarget.value = "";
      event.preventDefault();
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  return (
    <AppShell>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
          <h2 className="text-2xl font-semibold mb-6">Create Job Post</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Position Name</label>
              <input
                type="text"
                {...register("positionName")}
                className={`bg-gray-200 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                  errors.positionName ? "border-red-500" : ""
                }`}
              />
              {errors.positionName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.positionName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                {...register("description")}
                className={`bg-gray-200 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                  errors.description ? "border-red-500" : ""
                }`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Experience</label>
              <input
                type="number"
                {...register("experience")}
                className={`bg-gray-200 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                  errors.experience ? "border-red-500" : ""
                }`}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">Company Name</label>
              <input
                type="text"
                {...register("companyName")}
                className={`bg-gray-200 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                  errors.companyName ? "border-red-500" : ""
                }`}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1">CTC</label>
              <input
                type="number"
                {...register("ctc")}
                className={`bg-gray-200 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white ${
                  errors.ctc ? "border-red-500" : ""
                }`}
              />
              {errors.ctc && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ctc.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="skills" className="block mb-1">
                Skills
              </label>
              <div className="bg-gray-200 appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="inline-block bg-gray-300 rounded px-2 py-1 text-sm mr-2 mb-2"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-red-600"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      X
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add a skill"
                  onKeyDown={handleAddSkill}
                  className="bg-transparent focus:outline-none"
                />
              </div>
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.skills.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Job
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
};

export default CreateJob;
