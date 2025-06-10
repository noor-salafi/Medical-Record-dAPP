import React, { useState } from 'react';
import { useWeb3 } from "../context/web3Context";
import { toast } from 'react-toastify';

const AddRecordForm = () => {
  const { addRecord, isAddRLoading, isWalletConnected } = useWeb3();
  const [ipfsHash, setIpfsHash] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isWalletConnected) {
      toast.error("Please connect your wallet first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }

    if (!ipfsHash) {
      setSubmitError("⚠ Please enter an IPFS hash.");
      return;
    }

    setSubmitError(""); // clear previous errors

    try {
      await addRecord(ipfsHash);
      toast.success("✅ Record added successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      setIpfsHash(""); // clear input field after success
    } catch (error) {
      console.error("Add record failed:", error);
      toast.error("❌ Failed to add record. Try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className='p-4 bg-white rounded-xl shadow-md'>
      <h2 className='text-xl font-bold mb-3'>📤 Add Medical Record</h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type="text"
          value={ipfsHash}
          onChange={(e) => setIpfsHash(e.target.value)}
          placeholder='Enter IPFS Hash'
          className='w-full p-2 border rounded'
          required
        />
        {submitError && <p className='text-red-500'>{submitError}</p>}

        <button
          type="submit"
          disabled={isAddRLoading}
          className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
        >
          {isAddRLoading ? "Adding..." : "Add Record"}
        </button>
      </form>
    </div>
  );
};

export default AddRecordForm;
