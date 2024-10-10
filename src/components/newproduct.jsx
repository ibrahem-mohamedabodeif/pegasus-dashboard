import { useOutletContext } from "../pages/productes";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newProducte } from "../services/apiProductes";
import toast from "react-hot-toast";

export default function NewProduct() {
  const handleClose = useOutletContext();

  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: newProducte,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productes"],
      });
      reset();
      toast.success("product is added successfully");
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }

  return (
    <div className="absolute -top-16 left-1/4 w-[500px] px-5 py-3 z-10 rounded-lg bg-[#2a2d2b]">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-[#818181]">
        <h1 className="text-white  text-xl capitalize font-semibold">
          New Product
        </h1>
        <button
          onClick={() => handleClose()}
          className="text-2xl text-white border border-[#818181] pl-3 pr-3 pb-1 rounded-lg"
        >
          x
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7 justify-center">
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">image</label>
            <input
              type="file"
              className="max-sm:w-28 w-48 "
              required
              name="image"
              {...register("image")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">title</label>
            <input
              type="text"
              name="title"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("title")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">description</label>
            <textarea
              name="description"
              className="text-white bg-inherit border pl-2 rounded-md w-48 max-sm:w-28 outline-none border-[#818181]"
              {...register("description", {
                required: true,
              })}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">category</label>
            <input
              type="text"
              name="category"
              className="text-white bg-inherit border pl-2 rounded-md border-[#818181] outline-none max-sm:w-28 "
              {...register("category")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">price</label>
            <input
              type="number"
              name="price"
              defaultValue={0}
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("price")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">sale %</label>
            <input
              type="number"
              name="sale"
              defaultValue={0}
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("sale")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">new Arrival</label>
            <input
              type="text"
              name="newArrival"
              defaultValue="false"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("newArrival")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl text-[#818181]">quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={0}
              className="text-white bg-inherit border rounded-md pl-2 max-sm:w-28 border-[#818181] outline-none"
              {...register("quantity")}
              required
            />
          </div>
        </div>
        <button
          disabled={isPending}
          className="block w-full mt-8 capitalize font-medium text-lg border rounded-lg pt-2 pb-3 pl-4 pr-4 bg-[#65c51a] text-white"
        >
          add new
        </button>
      </form>
    </div>
  );
}
