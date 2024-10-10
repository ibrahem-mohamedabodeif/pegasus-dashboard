import { useState } from "react";

const OrderFilters = ({ onFilterChange }) => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onFilterChange(date, selectedStatus);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onFilterChange(selectedDate, status);
  };

  return (
    <div className="flex space-x-4">
      <div className="relative inline-block text-left">
        <button
          onClick={() => {
            setIsDateOpen(!isDateOpen);
            setIsStatusOpen(false);
          }}
          className="inline-flex justify-center rounded-lg border border-transparent p-1 bg-[#2a2d2b] text-sm text-white font-medium"
        >
          Date
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 01.97.073l.083.094L10 10.293l3.73-3.73a.75.75 0 011.133.976l-.094.083-4.25 4.25a.75.75 0 01-.976 0l-4.25-4.25a.75.75 0 01-.073-.97z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isDateOpen && (
          <div className="absolute left-0 z-10 mt-2 rounded-md shadow-lg bg-[#2a2d2b] ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                className="block px-4 py-2 w-full text-sm text-white hover:bg-[#818181]"
                role="menuitem"
                onClick={() => handleDateChange("recent")}
              >
                Recent
              </button>
              <button
                className="block px-4 py-2 w-full text-sm text-white hover:bg-[#818181]"
                role="menuitem"
                onClick={() => handleDateChange("all")}
              >
                All
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative inline-block text-left">
        <button
          onClick={() => {
            setIsStatusOpen(!isStatusOpen);
            setIsDateOpen(false);
          }}
          className="inline-flex justify-center rounded-lg border border-transparent p-1 bg-[#2a2d2b] text-sm text-white font-medium"
        >
          Status
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 01.97.073l.083.094L10 10.293l3.73-3.73a.75.75 0 011.133.976l-.094.083-4.25 4.25a.75.75 0 01-.976 0l-4.25-4.25a.75.75 0 01-.073-.97z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isStatusOpen && (
          <div className="absolute left-0 z-10 mt-2 rounded-md shadow-lg bg-[#2a2d2b] ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <button
                className="block px-4 py-2 w-full text-sm text-white hover:bg-[#818181]"
                role="menuitem"
                onClick={() => handleStatusChange("all")}
              >
                All
              </button>
              <button
                className="block px-4 py-2 text-sm text-white hover:bg-[#818181]"
                role="menuitem"
                onClick={() => handleStatusChange("delivered")}
              >
                Delivered
              </button>
              <button
                className="block px-4 py-2 w-full text-sm text-white hover:bg-[#818181]"
                role="menuitem"
                onClick={() => handleStatusChange("pickup")}
              >
                Pickup
              </button>
              <button
                className="block px-4 py-2 text-sm text-white hover:bg-[#818181]"
                role="menuitem"
                onClick={() => handleStatusChange("shipping")}
              >
                Shipping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderFilters;
