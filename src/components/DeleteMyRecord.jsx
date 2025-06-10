import React, { useState } from "react";
import { useWeb3 } from "../context/web3Context";
import {toast} from "react-toastify"

const DeleteMyRecord = () => {
  const { deleteMyRecord, isDLoading, dError ,isWalletConnected} = useWeb3();
  const [index, setIndex] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [successRecordMessage, setSuccessRecordMessage] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
     if (!isWalletConnected) {
                 toast.error("Please connect your wallet first!", {
                   position: "top-right",
                   autoClose: 2000,
                   theme: "colored",
                 });
                 return;
               };
    if (index === "" || isNaN(index)) {
      return setSubmitError("⚠ Please enter a valid record index (number).");
    }

    setSubmitError("");
    setSuccessRecordMessage("");

    await deleteMyRecord(Number(index));
    setSuccessRecordMessage("✅ Record deleted successfully!");
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🗑 Delete My Record</h2>

      <form onSubmit={handleDelete} className="space-y-2 mb-4">
        <input
          type="number"
          placeholder="Enter record index (e.g. 0, 1)"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="w-80 p-2 border rounded"
        />
        {submitError && <p className="text-red-500">{submitError}</p>}
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {isDLoading ? "Deleting..." : "Delete Record"}
        </button>
      </form>

      {isDLoading && <p>Deleting record...</p>}
      {dError && <p className="text-red-500">{dError}</p>}
      {successRecordMessage && <p className="text-green-600">{successRecordMessage}</p>}
    </div>
  );
};

export default DeleteMyRecord;