import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createContext, useContext, useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { deleteProduct, getProducts } from "../services/apiProductes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EditProduct from "../components/EditProduct";
import { Pagination } from "@mui/material";

const OutletContext = createContext();

export function useOutletContext() {
  return useContext(OutletContext);
}

export default function Products() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    navigate(-1);
  };

  const handleEditOpen = (product) => {
    setProductToEdit(product);
    setEditOpen(true);
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success("Product deleted successfully");
    },
  });

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return products?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [products, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="relative">
      {open && (
        <OutletContext.Provider value={handleClose}>
          <Outlet />
        </OutletContext.Provider>
      )}

      <div className="bg-black border-b-2 border-[#2a2d2b] fixed top-0 max-sm:top-16 max-sm:w-11/12 md:w-8/12 w-10/12 lg:w-10/12 px-10 max-sm:px-0 flex justify-between mt-5 pb-5 items-center max-sm:mt-6 max-sm:ml-6 max-sm:mr-4">
        <h1 className="capitalize text-3xl max-sm:text-xl  font-medium text-white">
          Products
        </h1>
        <Link to="newproduct" onClick={handleOpen}>
          <button className="font-medium border rounded-xl pt-2 pb-3 pl-4 pr-4 max-sm:pl-2 max-sm:pt-1 max-sm:pb-2 max-sm:pr-2 bg-[#2a2d2b] border-transparent text-white max-sm:text-[12px]">
            Add new product
          </button>
        </Link>
      </div>
      <div className="flex flex-col mt-28 max-sm:mt-20">
        <div className="mx-10 max-sm:mx-2">
          <div className="min-w-full inline-block align-middle">
            <div className="pb-10">
              <table className="table-auto min-w-full rounded-xl">
                <thead>
                  <tr>
                    <th className="p-5 text-left text-white  text-sm tracking-wider">
                      ID
                    </th>
                    <th className="p-5 text-white  text-sm tracking-wider">
                      Product info
                    </th>
                    <th className="p-5 text-white  text-sm tracking-wider capitalize min-w-[150px]">
                      description
                    </th>
                    <th className="p-5 text-sm tracking-wider  text-white capitalize">
                      price
                    </th>
                    <th className="p-5 text-sm tracking-wider text-white capitalize">
                      sale
                    </th>
                    <th className="p-5  text-sm tracking-wider text-white capitalize">
                      new arrival
                    </th>
                    <th className="p-5 text-sm text-white capitalize">
                      quantity
                    </th>
                    <th className="p-5  text-sm text-white capitalize">
                      actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2d2b] ">
                  {currentProducts?.map((product) => (
                    <tr
                      key={product.id}
                      className="transition-all duration-500 hover:bg-[#2a2d2b]"
                    >
                      <td className="p-5 text-sm font-medium text-white ">
                        {product.id}
                      </td>
                      <td className="p-5 text-sm font-medium text-white">
                        <div className="flex items-center gap-4 max-sm:w-60 max-sm:h-14 md:w-60">
                          <div className="border border-transparent bg-[#2a2d2b] p-1 rounded-lg">
                            <img
                              src={product.image}
                              className="w-16"
                              alt={product.title}
                            />
                          </div>
                          <div className="flex flex-col">
                            <h1 className="capitalize text-lg">
                              {product.title}
                            </h1>
                            <span className="text-[#6b6b6b]">
                              category : {product.category}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className=" px-5 py-3 text-wrap text-white max-w-60 text-center">
                        {product.description}
                      </td>
                      <td className="p-5 text-sm font-medium text-white text-center">
                        {product.price} $
                      </td>
                      <td className="p-5 text-sm font-medium text-white text-center">
                        <div className="min-w-20">{product.sale || "-"} %</div>
                      </td>
                      <td className="p-5 text-sm font-medium text-white text-center">
                        {product.newArrival}
                      </td>
                      <td className="p-5 text-sm font-medium text-white text-center">
                        {product.quantity}
                      </td>
                      <td className="p-10 flex items-center gap-8 justify-center">
                        <button
                          onClick={() => mutate(product.id)}
                          disabled={isPending}
                          className="text-red-600"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          onClick={() => handleEditOpen(product)}
                          className="text-[#65c51b]"
                        >
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex text-white justify-center fixed bottom-0 left-1/2 md:left-2/3 -translate-x-1/2 max-sm:bottom-0 w-full">
                <Pagination
                  count={Math.ceil(products.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  siblingCount={0}
                  size="large"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: `white`,
                    },
                    "& .Mui-selected": {
                      color: "white",
                      backgroundColor: "#2a2d2b",
                    },
                  }}
                />
              </div>
              {editOpen && productToEdit && (
                <EditProduct open={setEditOpen} productToEdit={productToEdit} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
