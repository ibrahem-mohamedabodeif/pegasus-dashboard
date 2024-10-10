import { useQuery } from "@tanstack/react-query";
import { format, isToday } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck, faShirt } from "@fortawesome/free-solid-svg-icons";
import { getOrders } from "../services/apiOrders";
import { getCustomers } from "../services/apiProductes";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  const { data: customers } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const topProducts = orders
    ?.reduce((acc, order) => {
      const product = acc.find((item) => item.productId === order.productId);
      if (product) {
        product.count += order.productQuantity;
      } else {
        acc.push({
          productId: order.productId,
          productName: order.productName,
          productImage: order.productImage,
          count: order.productQuantity,
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const totalSales = orders?.reduce((acc, cur) => acc + cur.productPrice, 0);
  const totalOrders = orders?.length;
  const totalCustomers = customers?.length;
  const completeOrders = orders?.filter(
    (order) => order.status === "delivered"
  ).length;
  const pickupOrders = orders?.filter(
    (order) => order.status === "pickup"
  ).length;
  const shippingOrders = orders?.filter(
    (order) => order.status === "shipping"
  ).length;

  const recentOrders = orders?.filter((order) =>
    isToday(new Date(order.created_at))
  );

  return (
    <>
      <div className="border-b-2 border-[#2a2d2b] px-5 sm:px-10 pb-5 mt-10 mb-7">
        <h1 className="capitalize text-2xl sm:text-3xl font-medium text-white">
          dashboard
        </h1>
      </div>

      {/* Grid layout updated for two stats per row */}
      <div className="px-5 sm:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10 text-white">
        <div className="space-y-3">
          <div className="border border-transparent rounded-2xl p-3 bg-[#2a2d2b]">
            <h1 className="text-lg tracking-wider pb-2">Total Sales</h1>
            <span className="text-xl font-medium">$ {totalSales}</span>
          </div>
          <div className="border border-transparent rounded-2xl p-3 bg-[#2a2d2b]">
            <h1 className="text-lg tracking-wider pb-2">Customers Volume</h1>
            <span className="text-xl font-medium">
              {totalCustomers} customer
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="border border-transparent rounded-2xl p-3 bg-[#2a2d2b]">
            <h1 className="text-lg tracking-wider pb-2">Total Orders</h1>
            <span className="text-xl font-medium">{totalOrders} orders</span>
          </div>
          <div className="border border-transparent rounded-2xl bg-[#65c51a] p-3">
            <h1 className="text-lg tracking-wider pb-2">Completed Orders</h1>
            <span className="text-xl font-medium">
              {completeOrders} / {totalOrders} orders
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="border border-transparent rounded-2xl p-3 bg-orange-600">
            <h1 className="text-lg tracking-wider pb-2">Pickup Orders</h1>
            <span className="text-xl font-medium">
              {pickupOrders} / {totalOrders} order
            </span>
          </div>
          <div className="border border-transparent rounded-2xl p-3 bg-blue-400">
            <h1 className="text-lg tracking-wider pb-2">Shipping Orders</h1>
            <span className="text-xl font-medium">
              {shippingOrders} / {totalOrders} order
            </span>
          </div>
        </div>
      </div>

      {/* Responsive Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-10 px-5 sm:px-10 pt-10 pb-5">
        <div className="relative border rounded-2xl p-2">
          <div className="flex justify-between border-b border-[#2a2d2b] text-white text-lg tracking-wider font-medium py-2 px-4">
            <h1 className="flex items-center gap-2">
              <FontAwesomeIcon icon={faListCheck} />
              Recent Orders
            </h1>
            <span className="text-white">{recentOrders?.length} orders</span>
          </div>

          {/* Ensure table can scroll horizontally on smaller screens */}
          <div className="overflow-x-auto">
            <table className="table-auto min-w-full rounded-xl">
              {recentOrders?.length === 0 ? (
                <div className="text-white text-lg lg:text-2xl text-center my-40">
                  No orders today
                </div>
              ) : (
                <>
                  <thead>
                    <tr>
                      <th className="p-3 sm:p-5 text-left text-white text-sm tracking-wider">
                        Order No
                      </th>
                      <th className="p-3 sm:p-5 text-white text-sm tracking-wider">
                        Customer
                      </th>
                      <th className="p-3 sm:p-5 text-white text-sm tracking-wider capitalize min-w-[100px] sm:min-w-[150px]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders?.slice(0, 3).map((order) => (
                      <tr key={order.id}>
                        <td className="p-3 sm:p-5 text-sm font-medium text-white">
                          <div>
                            <span className="text-[#818181]">#</span>
                            {order.id}
                            {/* Hide date on smaller screens and show on larger screens */}
                            <div className="text-[#818181] hidden lg:block md:block">
                              {format(order.created_at, "MMM, dd, yyyy")}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-5 py-3 text-wrap text-white max-w-60 text-center">
                          <div className="flex flex-col">
                            {order.name}
                            <div className="text-[#818181]">{order.email}</div>
                          </div>
                        </td>
                        <td className="p-3 sm:p-5 text-sm font-medium text-white text-center">
                          {order.productPrice}$
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
              )}
            </table>
          </div>

          {/* Adjust positioning and sizing for "Show All" link on smaller screens */}
          <Link
            to={"/dashboard/orders"}
            className="absolute bottom-2 right-5 text-stone-600 hover:text-white cursor-pointer text-sm sm:text-lg"
          >
            Show All ...
          </Link>
        </div>

        <div className="border rounded-2xl p-2">
          <h1 className="border-b border-[#2a2d2b] text-white text-lg tracking-wider font-medium py-2 px-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faShirt} />
            Top Products
          </h1>
          <table className="table-auto min-w-full rounded-xl">
            <thead>
              <tr>
                <th className="p-3 sm:p-5 text-left text-white text-sm tracking-wider">
                  ID
                </th>
                <th className="p-3 sm:p-5 text-left text-white text-sm tracking-wider">
                  Product Info
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2d2b]">
              {topProducts?.map((product) => (
                <tr
                  key={product.productId}
                  className="transition-all duration-500 hover:bg-[#2a2d2b]"
                >
                  <td className="p-3 sm:p-5 text-sm font-medium text-white">
                    {product.productId}
                  </td>
                  <td className="p-3 sm:p-5 text-sm font-medium text-white">
                    <div className="flex items-center gap-4">
                      <div className="border border-transparent bg-[#2a2d2b] p-1 rounded-lg">
                        <img
                          src={product.productImage}
                          className="w-10 sm:w-14"
                          alt={product.productName}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="capitalize text-base">
                          {product.productName}
                        </h1>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
