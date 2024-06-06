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
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully");
    },
  });

  const currentProductes = useMemo(() => {
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
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-11/12 max-sm:max-w-sm lg:max-w-lg max-h-full overflow-auto bg-gray-300 shadow-lg rounded-lg p-4 z-20">
          <OutletContext.Provider value={handleClose}>
            <Outlet />
          </OutletContext.Provider>
        </div>
      )}

      <div className="fixed top-0 max-sm:top-16 max-sm:w-11/12  w-10/12 z-10 flex justify-between mr-4 mt-8 mb-12 items-center max-sm:mt-6 max-sm:ml-6 max-sm:mr-4">
        <h1 className="capitalize text-3xl font-medium">Products</h1>
        <Link to="newproduct" onClick={handleOpen}>
          <button className="capitalize font-medium border rounded-lg pt-2 pb-3 pl-4 pr-4 max-sm:pl-2 max-sm:pt-1 max-sm:pb-2 max-sm:pr-2 bg-slate-700 text-white max-sm:text-[12px]">
            <span className="text-xl max-sm:text-sm">+</span> New Product
          </button>
        </Link>
      </div>

      <div className="mt-36 overflow-auto h-[calc(100vh-12rem)] max-sm:ml-4 max-sm:mt-24">
        <table className="table-fixed text-center w-fit max-w-[100%] max-sm:w-fit m-auto">
          <thead className="border-b-2">
            <tr className="text-center capitalize">
              <th className="border-r-2 p-2 w-28">Image</th>
              <th className="border-r-2 pl-2 p-2 w-20">ID</th>
              <th className="border-r-2 p-2 w-48">Title</th>
              <th className="border-r-2 p-2 w-48">Sub-Title</th>
              <th className="border-r-2 w-64 p-2">Description</th>
              <th className="border-r-2 p-2 w-40">Category</th>
              <th className="border-r-2 p-2 w-24">Price</th>
              <th className="border-r-2 p-2 w-24">Sale</th>
              <th className="border-r-2 p-2 w-24">New Arrival</th>
              <th className="border-r-2 p-2 w-24">Quantity</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {currentProductes?.map((product) => (
              <tr key={product.id} className="border-b-2">
                <td className="border-r-2 pl-2">
                  <img src={product.image} className="w-20" alt="Product" />
                </td>
                <td className="border-r-2 pl-2">{product.id}</td>
                <td className="border-r-2 pl-2">{product.title}</td>
                <td className="border-r-2 pl-2">{product.subTitle}</td>
                <td className="border-r-2 pl-2">{product.description}</td>
                <td className="border-r-2 pl-2">{product.category}</td>
                <td className="border-r-2 pl-2">{product.price}</td>
                <td className="border-r-2 pl-2">{product.sale || "-"}</td>
                <td className="border-r-2 pl-2">{product.newArrival}</td>
                <td className="border-r-2 pl-2">{product.quantity}</td>
                <td className="text-center space-x-4">
                  <button
                    onClick={() => mutate(product.id)}
                    disabled={isPending}
                    className="text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button onClick={() => handleEditOpen(product)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" flex justify-center fixed bottom-20  left-1/2 -translate-x-1/2 max-sm:bottom-5  w-full ">
          <Pagination
            count={Math.ceil(products.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            siblingCount={0}
            size="large"
          />
        </div>

        {editOpen && productToEdit && (
          <div className="absolute overflow-auto max-sm:overflow-y-scroll w-11/12 -top-24 left-1/2 transform -translate-x-1/2 max-sm:max-w-sm max-sm:max-h-full bg-gray-300 shadow-md rounded-lg p-4 z-20">
            <EditProduct open={setEditOpen} productToEdit={productToEdit} />
          </div>
        )}
      </div>
    </div>
  );
}
