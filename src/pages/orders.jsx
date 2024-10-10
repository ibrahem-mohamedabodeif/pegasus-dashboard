import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, updateOrderStatus } from "../services/apiOrders";
import { Pagination } from "@mui/material";
import { useMemo, useState } from "react";
import { format, isToday } from "date-fns";
import OrderFilters from "../components/filter";

export default function Orders() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const handleOrder = (order) => {
    setOrder(order);
    setOpen(true);
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
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

  const filteredOrders = useMemo(() => {
    let filtered = orders;

    // Filter by date
    if (dateFilter === "recent") {
      filtered = filtered.filter((order) => {
        return isToday(new Date(order.created_at));
      });
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    return filtered;
  }, [orders, dateFilter, statusFilter]);

  const handleFilterChange = (date, status) => {
    setDateFilter(date);
    setStatusFilter(status);
  };

  const currentProductes = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return filteredOrders?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="container max-sm:ml-4">
      <div className="border-b-2 border-[#2a2d2b] fixed top-0 max-sm:top-16 px-10 max-sm:px-0 pb-5 w-full flex justify-between mr-4 mt-10 mb-12 items-center">
        <h1 className=" capitalize text-3xl font-medium text-white">orders</h1>
      </div>
      <div className="mt-32 px-10 max-sm:px-5">
        <OrderFilters onFilterChange={handleFilterChange} />
      </div>
      <div className="overflow-auto h-[calc(100vh-12rem)] max-sm:pb-10 px-10 max-sm:pr-5 max-sm:pl-0">
        <table className="table-auto min-w-full rounded-xl">
          <thead>
            <tr>
              <th className="p-5 text-left text-white  text-sm tracking-wider">
                Order No
              </th>
              <th className="p-5 text-white  text-sm tracking-wider">
                Customer
              </th>
              <th className="p-5 text-white  text-sm tracking-wider capitalize min-w-[150px]">
                Total
              </th>
              <th className="p-5 text-sm tracking-wider  text-white capitalize">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2d2b] ">
            {currentProductes?.map((order) => (
              <tr
                key={order.id}
                className="transition-all duration-500 hover:bg-[#2a2d2b]"
                onClick={() => handleOrder(order)}
              >
                <td className="p-5 pb-3 text-sm font-medium text-white ">
                  <div>
                    <div>
                      <span className="text-[#818181]">#</span>
                      {order.id}
                    </div>
                    <div className="text-[#818181]">
                      {format(order.created_at, "MMM,dd,yyy")}
                    </div>
                  </div>
                </td>
                <td className=" px-5 py-3 text-wrap text-white max-w-60 text-center">
                  <div className="flex flex-col">
                    {order.name}
                    <div className="text-[#818181]">{order.email}</div>
                  </div>
                </td>
                <td className="p-5 text-sm font-medium text-white text-center">
                  {order.productPrice}$
                </td>
                <td className="text-sm font-medium text-white text-center capitalize">
                  <div
                    className={
                      order.status === "shipping"
                        ? "bg-blue-400 w-28 p-3 rounded-md mx-auto outline-none"
                        : order.status === "pickup"
                        ? " bg-orange-600 w-28 p-3 rounded-md mx-auto outline-none"
                        : order.status === "cancelled"
                        ? " bg-red-600 w-28 p-3 rounded-md mx-auto outline-none"
                        : "bg-green-700 w-28 p-3 rounded-md mx-auto outline-none"
                    }
                  >
                    {order.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex text-white justify-center fixed bottom-0 left-1/2 -translate-x-1/2 max-sm:bottom-0 w-full">
          <Pagination
            count={Math.ceil(orders.length / itemsPerPage)}
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
      </div>
      {open && order && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 rounded-lg bg-[#2a2d2b]">
          <div className="flex justify-between items-center mx-5 mt-5">
            <h1 className="text-white  text-xl capitalize font-semibold">
              order<span> #{order.id}</span>
            </h1>
            <button
              onClick={() => setOpen(false)}
              className="text-2xl text-white border border-[#818181] pl-3 pr-3 pb-1 rounded-lg"
            >
              x
            </button>
          </div>
          <div className="mx-5 flex items-center gap-3 border-b border-[#3e3f3e] pb-5">
            <select
              value={order.status}
              onChange={(e) => handleChange(order.id, e)}
              className={
                order.status === "shipping"
                  ? "bg-blue-400 w-28 p-2 rounded-md outline-none text-white"
                  : order.status === "pickup"
                  ? " bg-orange-600 w-28 p-2 rounded-md  outline-none text-white"
                  : "bg-green-700 w-28 p-2 rounded-md outline-none text-white"
              }
            >
              <option value="shipping">Shipping</option>
              <option value="pickup">Pickup</option>
              <option value="delivered">Delivered</option>
            </select>

            <span className="text-[#818181]">
              {format(order.created_at, "MMM,dd,yyy")}
            </span>
          </div>
          <div className="mx-5 my-3 border-b pb-5 border-[#3e3f3e]">
            <h1 className="text-[#818181]">Customer</h1>
            <div className="flex flex-col mt-2">
              <span className="text-white capitalize font-semibold">
                {order.name}
              </span>
              <span className="text-[#818181]">{order.email}</span>
              <span className="text-[#818181]">{order.phone}</span>
              <span className="text-[#818181]">{order.address}</span>
            </div>
          </div>
          <div className="mx-5 my-3 border-b pb-5 border-[#3e3f3e]">
            <h1 className="text-[#818181]">Order items</h1>
            <div className="flex items-center gap-5 mt-5">
              <div className="border p-1 bg-white border-transparent rounded-md flex items-center">
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="w-20"
                />
              </div>
              <div>
                <span className="text-white text-sm">{order.productName}</span>
                <div>
                  <span className="text-white text-sm">
                    {order.productPrice} $
                  </span>
                  <span className="text-white text-sm">
                    {" "}
                    <span className="text-[#818181]">x</span>{" "}
                    {order.productQuantity}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm">
                    {" "}
                    <span className="text-[#818181]">Size:</span> {order.size}
                  </span>
                  <span className="text-white text-sm">
                    <span className="text-[#818181]">Color:</span> {order.color}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-5 my-3 flex justify-between">
            <h1 className="text-[#818181]">Total</h1>
            <span className="text-[#818181]">{order.productPrice} $</span>
          </div>
        </div>
      )}
    </div>
  );
}
