import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../services/apiOrders";
import { Pagination } from "@mui/material";
import { useMemo, useState } from "react";

export default function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, status }) => updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleChange = (id, e) => {
    e.preventDefault();
    const status = e.target.value;
    mutate({ id, status });
  };

  const currentProductes = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return orders?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [orders, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className=" container max-sm:ml-4 ">
      <div className=" fixed top-0 max-sm:top-16 w-9/12 z-10 flex justify-between  mr-4 mt-10 mb-12 items-center">
        <h1 className=" capitalize text-3xl font-medium ">orders</h1>
      </div>
      <div className=" mt-36 overflow-auto h-[calc(100vh-12rem)] ">
        <table className="table-fixed text-center w-full  max-w-[100%px] max-sm:w-fit m-auto  ">
          <thead className=" border-b-2">
            <tr className=" text-center capitalize ">
              <th className=" border-r-2 p-2 w-28 ">product id</th>
              <th className=" border-r-2 pl-2 p-2 w-52 ">product name</th>
              <th className=" border-r-2 p-2 w-24 ">product quantity</th>
              <th className=" border-r-2 p-2 w-24 ">product price</th>
              <th className=" border-r-2  p-2 w-64">cutomer name</th>
              <th className=" border-r-2 p-2 w-56 ">customer phone</th>
              <th className=" border-r-2 p-2 w-80 ">customer e-mail</th>
              <th className=" border-r-2 p-2 w-72 ">customer address</th>
              <th className="w-24">order status</th>
            </tr>
          </thead>
          <tbody>
            {currentProductes.map((order) => (
              <tr key={order.id} className=" border-b-2">
                <td className="border-r-2 p-2">{order.productId}</td>
                <td className="border-r-2">{order.productName} </td>
                <td className="border-r-2">{order.productQuantity} </td>
                <td className="border-r-2">{order.productPrice}</td>
                <td className="border-r-2">{order.name} </td>
                <td className="border-r-2">{order.phone} </td>
                <td className="border-r-2">{order.email}</td>
                <td className="border-r-2">{order.address}</td>
                <td
                  className={
                    order.status === "on deliver"
                      ? "bg-orange-600 "
                      : order.status === "complete"
                      ? "bg-green-600"
                      : ""
                  }
                >
                  <input
                    size={7}
                    type="text"
                    defaultValue={order.status}
                    disabled={isPending}
                    onBlur={(e) => handleChange(order.id, e)}
                    className={
                      order.status === "on deliver"
                        ? "bg-orange-600"
                        : order.status === "complete"
                        ? "bg-green-600"
                        : ""
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" flex justify-center fixed bottom-20  left-1/2 -translate-x-1/2 max-sm:bottom-5  w-full">
          <Pagination
            count={Math.ceil(orders.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            size="large"
          />
        </div>
      </div>
    </div>
  );
}
