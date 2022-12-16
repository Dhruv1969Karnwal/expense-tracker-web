import React from "react";
// import "boxicons";
import { BsTrash } from "react-icons/bs";
import { default as api } from "../store/apiSlice";

// const obj = [
//   {
//     name: "Savings",
//     color: "#f9c74f",
//   },
//   {
//     name: "Investment",
//     color: "#f9c74f",
//   },
//   {
//     name: "Expense",
//     color: "rgb(54,162,235)",
//   },
// ];

const List = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  const [deleteTransaction] = api.useDeleteTransactionMutation();
  let Transactions;

  const handlerClick = (e) => {
    if (!e.target.dataset.id) return 0;
    deleteTransaction({ _id: e.target.dataset.id });
  };

  // let Transactions;

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = data.map((data, index) => (
      <Transaction
        key={index}
        category={data}
        handler={handlerClick}
      ></Transaction>
    ));
  } else if (isError) {
    Transactions = <div>Error</div>;
  }

  return (
    <div className="flex flex-col py-6 gap-3">
      <h1 className="py-4 font-bold text-xl">History</h1>
      {/* {obj.map((value, index) => (
        <Transaction category={value} key={index} />
      ))} */}
      {Transactions}
    </div>
  );
};

function Transaction({ category, handler }) {
  if (!category) return null;
  return (
    <div
      className="item flex justify-center bg-gray-50 py-2 rounded-r px-4"
      style={{ borderRight: `8px solid ${category.color ?? "#e5e5e5"}` }}
    >
      <button className="px-3" onClick={handler}>
        <BsTrash
          data-id={category._id ?? ""}
          color={category.color ?? "#e5e5e5"}
        />
      </button>
      {/* <span className="block w-full">{category.name ?? ""}</span> */}
      {/* <span className="block">{category.amount ?? ""}</span> */}
      <span className=" w-full flex items-center justify-center gap-2">
        <span className="block">{category.name ?? ""}</span>
        <span className="" style={{ color: category.color ?? "#f9c74f" }}>
          (₹{category.amount ?? ""})
        </span>
      </span>
      {/* <span cl */}
    </div>
  );
}

export default List;
