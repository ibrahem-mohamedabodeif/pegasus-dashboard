import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { editeProduct } from "../services/apiProductes";
import toast from "react-hot-toast";

export default function EditProduct({ productToEdit, open }) {
  productToEdit = productToEdit || {};
  const { id: editeId, ...editeValues } = productToEdit;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editeValues,
  });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ editedData, id }) => editeProduct(editedData, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["productes"]);
      toast.success("Product edited successfully");
      reset();
      open(false);
    },
    onError: (error) => {
      toast.error("Error editing product: " + error.message);
    },
  });

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    mutate({ editedData: { ...data, image }, id: editeId });
  };

  return (
    <div className="absolute -top-20 left-1/4 w-[500px] px-5 py-3 z-10 rounded-lg bg-[#2a2d2b]">
      <div className="flex justify-between items-center mb-8 border-b pb-4 border-[#818181]">
        <h1 className="text-white  text-xl capitalize font-semibold">
          Edit Product
        </h1>
        <button
          onClick={() => open(false)}
          className="text-2xl text-white border border-[#818181] pl-3 pr-3 pb-1 rounded-lg"
        >
          x
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7 justify-center">
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Image</label>
            <input
              disabled={isLoading}
              type="file"
              name="image"
              className="w-40 mt-4 bg-inherit mr-6"
              {...register("image")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Title</label>
            <input
              disabled={isLoading}
              type="text"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("title")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Description</label>
            <textarea
              disabled={isLoading}
              type="text"
              className="text-white bg-inherit border pl-2 rounded-md w-48 max-sm:w-28 outline-none border-[#818181]"
              {...register("description")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Category</label>
            <input
              disabled={isLoading}
              type="text"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("category")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Price</label>
            <input
              disabled={isLoading}
              type="number"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("price")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Sale %</label>
            <input
              disabled={isLoading}
              type="number"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("sale")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">New Arrival</label>
            <input
              disabled={isLoading}
              type="text"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("newArrival")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl text-[#818181]">Quantity</label>
            <input
              disabled={isLoading}
              type="number"
              className="text-white bg-inherit border pl-2 rounded-md max-sm:w-28 border-[#818181] outline-none"
              {...register("quantity")}
            />
          </div>

          <button
            disabled={isLoading}
            className="block w-full capitalize font-medium text-lg border rounded-lg pt-2 pb-3 pl-4 pr-4 bg-[#65c51a] text-white"
          >
            Edite
          </button>
        </div>
      </form>
    </div>
  );
}
