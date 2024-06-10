import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    <div>
      <div>
        <h1 className="text-2xl font-semibold mb-10">Edit Product</h1>
      </div>
      <form
        className="flex mb-5 max-sm:flex-col max-sm:gap-5 max-sm:divide-y-2 max-sm:items-center max-sm:justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label className="font-medium text-center text-lg">Image</label>
          <input
            disabled={isLoading}
            type="file"
            name="image"
            className="w-40 mt-4 bg-inherit mr-6"
            {...register("image")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-center text-lg">Title</label>
          <input
            disabled={isLoading}
            type="text"
            className="w-40 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black max-sm:w-56 text-center "
            {...register("title")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-center text-lg">Sub-Title</label>
          <input
            disabled={isLoading}
            type="text"
            className="w-40 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black max-sm:w-56 text-center "
            {...register("subTitle")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Description</label>
          <textarea
            disabled={isLoading}
            type="text"
            className="w-60 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black text-center"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-center text-lg">Category</label>
          <input
            disabled={isLoading}
            type="text"
            className="w-36 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black max-sm:w-56 text-center"
            {...register("category")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-lg text-center">Price</label>
          <input
            disabled={isLoading}
            type="number"
            className="w-24 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black text-center"
            {...register("price")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-lg text-center">Sale</label>
          <input
            disabled={isLoading}
            type="number"
            className="w-24 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black text-center"
            {...register("sale")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-lg text-center">New Arrival</label>
          <input
            disabled={isLoading}
            type="text"
            className="w-24 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black text-center"
            {...register("newArrival")}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-lg text-center">Quantity</label>
          <input
            disabled={isLoading}
            type="number"
            className="w-24 mt-4 mr-6 p-1 bg-inherit rounded-lg border border-black text-center"
            {...register("quantity")}
          />
        </div>

        <div className="flex gap-6 mt-8 pr-4">
          <button type="submit" disabled={isLoading}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            type="button"
            onClick={() => open(false)}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </form>
    </div>
  );
}
