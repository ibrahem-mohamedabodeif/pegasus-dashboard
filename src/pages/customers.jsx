import { Pagination } from "@mui/material";
import { format } from "date-fns";
import { getCustomers } from "../services/apiProductes";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function Customers() {
  const { isLoading, data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const currentCustomers = useMemo(() => {
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    return customers?.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [customers, currentPage, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) return <div>...Loading</div>;

  return (
    <div className="container max-sm:ml-4 ">
      <div className="border-b-2 border-[#2a2d2b] fixed top-0 max-sm:top-16 px-10 max-sm:px-0 pb-5 w-full flex justify-between mr-4 mt-10 mb-12 items-center">
        <h1 className=" capitalize text-3xl max-sm:text-2xl font-medium text-white">
          customers
        </h1>
      </div>
      <div className="overflow-auto h-[calc(100vh-12rem)] max-sm:pb-10 px-10 my-32 max-sm:px-5 max-sm:pl-0">
        <table className="table-auto min-w-full rounded-xl">
          <thead>
            <tr>
              <th className="p-5 text-left text-white  text-sm tracking-wider">
                Id
              </th>
              <th className="p-5 text-white  text-sm tracking-wider">Name</th>
              <th className="p-5 text-white  text-sm tracking-wider capitalize min-w-[150px]">
                E-mail
              </th>
              <th className="p-5 text-sm tracking-wider  text-white capitalize">
                Phone
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2a2d2b] ">
            {currentCustomers?.map((customer, i) => (
              <tr
                key={customer.id}
                className="transition-all duration-500 hover:bg-[#2a2d2b]"
              >
                <td className="p-5 pb-3 text-sm font-medium text-white ">
                  <div>
                    <div>
                      <span className="text-[#818181]">#</span> {i + 1}
                    </div>
                    <div className="text-[#818181]">
                      {format(customer.created_at, "MMM,dd,yyy")}
                    </div>
                  </div>
                </td>
                <td className=" px-5 py-3 text-wrap text-white text-center">
                  <div className="flex flex-col max-sm:w-40">
                    {customer.name}
                  </div>
                </td>
                <td className="p-5 text-sm font-medium text-white text-center">
                  {customer.email}
                </td>
                <td className="text-sm font-medium text-white text-center capitalize">
                  {customer.phone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex text-white justify-center fixed bottom-0 left-1/2 -translate-x-1/2 max-sm:bottom-0 w-full">
          <Pagination
            count={Math.ceil(customers.length / itemsPerPage)}
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
    </div>
  );
}
