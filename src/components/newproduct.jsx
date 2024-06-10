import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    // console.log(data);
  }

  return (
    <div className="">
      <FontAwesomeIcon
        icon={faXmark}
        className=" border p-2 bg-red-700"
        onClick={handleClose}
      />

      <div className="flex justify-between  mr-4 mt-8 mb-12 items-center">
        <h1 className=" capitalize text-xl font-medium  ">new producte</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-7 justify-center">
          <div className="flex justify-between max-sm:space-x-5 ">
            <label className="text-xl ">image</label>
            <input
              type="file"
              className="max-sm:w-28 w-48 "
              required
              name="image"
              {...register("image")}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">title</label>
            <input
              type="text"
              name="title"
              className=" bg-inherit border pl-2 rounded-md max-sm:w-28 border-black"
              {...register("title")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">sub-title</label>
            <input
              type="text"
              name="subTitle"
              className=" bg-inherit border pl-2 rounded-md border-black max-sm:w-28 "
              {...register("subTitle")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">description</label>
            <textarea
              name="description"
              className=" bg-inherit border pl-2 rounded-md w-[180px] max-sm:w-28 border-black "
              {...register("description", {
                required: true,
              })}
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">category</label>
            <input
              type="text"
              name="category"
              className=" bg-inherit border pl-2 rounded-md border-black max-sm:w-28 "
              {...register("category")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">price</label>
            <input
              type="number"
              name="price"
              defaultValue={0}
              className=" bg-inherit border pl-2 rounded-md max-sm:w-28 border-black"
              {...register("price")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">sale</label>
            <input
              type="number"
              name="sale"
              defaultValue={0}
              className=" bg-inherit border pl-2 rounded-md max-sm:w-28 border-black"
              {...register("sale")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">new Arrival</label>
            <input
              type="text"
              name="newArrival"
              defaultValue="false"
              className=" bg-inherit border pl-2 rounded-md max-sm:w-28 border-black"
              {...register("newArrival")}
              required
            />
          </div>
          <div className="flex justify-between max-sm:space-x-5">
            <label className="text-xl ">quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={0}
              className=" bg-inherit border rounded-md pl-2 max-sm:w-28 border-black"
              {...register("quantity")}
              required
            />
          </div>
        </div>
        <button
          disabled={isPending}
          className=" block w-full mt-8 capitalize font-medium text-lg border rounded-lg pt-2 pb-3 pl-4 pr-4 bg-slate-800 text-stone-100 "
        >
          add new
        </button>
      </form>
    </div>
  );
}
