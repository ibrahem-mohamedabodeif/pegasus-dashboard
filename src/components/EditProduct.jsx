import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { editeProduct } from "../services/apiProductes";
import toast from "react-hot-toast";

export default function EditProduct({ productToEdite = {}, open }) {
  const { id: editeId, ...editeValues } = productToEdite;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editeValues,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ editedData, id }) => editeProduct(editedData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["productes"],
      });
      toast.success("product is edited successfully");
      reset();
      open(false);
    },
    onError: (error) => toast.error(error),
  });

  const OnSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    mutate({ editedData: { ...data, image: image }, id: editeId });
  };

  return (
    <div>
      <div>
        <h1 className="text-xl mb-10">Edite Product</h1>
      </div>
      <form
        className="flex mb-5 max-sm:flex-col max-sm:gap-5 max-sm:divide-y-2 max-sm:items-center max-sm:justify-center"
        onSubmit={handleSubmit(OnSubmit)}
      >
        <div className="flex flex-col">
          <label>Image</label>
          <input
            disabled={isPending}
            type="file"
            name="image"
            className="w-40 mt-4 bg-inherit border border-black "
            {...register("image")}
          />
        </div>
        <div className="flex flex-col">
          <label>Title</label>
          <input
            disabled={isPending}
            type="text"
            className="w-40 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("title")}
          />
        </div>
        <div className="flex flex-col">
          <label>Sub-Title</label>
          <input
            disabled={isPending}
            type="text"
            className="w-40 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("subTitle")}
          />
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <input
            disabled={isPending}
            type="text"
            className="w-60 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("description")}
          />
        </div>
        <div className="flex flex-col">
          <label>Category</label>
          <input
            disabled={isPending}
            type="text"
            className="w-36 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("category")}
          />
        </div>
        <div className="flex flex-col">
          <label>Price</label>
          <input
            disabled={isPending}
            type="number"
            className="w-24 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("price")}
          />
        </div>
        <div className="flex flex-col">
          <label>Sale</label>
          <input
            disabled={isPending}
            type="number"
            className="w-24 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("sale")}
          />
        </div>
        <div className="flex flex-col">
          <label>New Arrival</label>
          <input
            disabled={isPending}
            type="text"
            className="w-24 mt-4 mr-6 p-1 bg-inherit border border-black "
            {...register("newArrival")}
          />
        </div>
        <div className="flex flex-col">
          <label>Quantity</label>
          <input
            disabled={isPending}
            type="number"
            className="w-24 mt-4 mr-6 p-1 bg-inherit border border-black"
            {...register("quantity")}
          />
        </div>

        <div className="flex gap-6 mt-8 pr-4 ">
          <button type="submit" disabled={isPending}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={() => open(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      </form>
    </div>
  );
}
