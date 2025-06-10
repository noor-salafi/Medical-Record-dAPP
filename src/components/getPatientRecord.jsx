import React, { useState } from "react";
import { useWeb3 } from "../context/web3Context";
import { toast } from "react-toastify";

const GetPatientRecords = () => {
  const { getPatientIpfsHashes, isGetPatientLoading, isWalletConnected } = useWeb3();
  const [patientAddress, setPatientAddress] = useState("");
  const [records, setRecords] = useState([]);
  const [submitError, setSubmitError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();

    if (!isWalletConnected) {
      toast.warn("Please connect your wallet first!", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    if (!patientAddress || !/^0x[a-fA-F0-9]{40}$/.test(patientAddress)) {
      setSubmitError("⚠ Please enter a valid Ethereum address.");
      return;
    }

    setSubmitError("");

    try {
      const result = await getPatientIpfsHashes(patientAddress);
      setRecords(result);
    } catch (error) {
      toast.error("Failed to fetch records. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-3">🩺 View Patient Records</h2>

      <form onSubmit={handleFetch} className="space-y-3 mb-4">
        <input
          type="text"
          disabled={isGetPatientLoading}
          placeholder="Enter patient's address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          className="w-80 p-2 border rounded"
        />
        {submitError && <p className="text-red-500">{submitError}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isGetPatientLoading ? "Fetching..." : "Fetch Records"}
        </button>
      </form>

      {records.length > 0 && (
        <ul className="space-y-2">
          {records.map((record, i) => {
            const ipfsHash = record.split(",")[0]; 
            return (
              <li key={i} className="p-3 border rounded-lg bg-gray-50">
                <span className="text-sm text-gray-600">Record #{i + 1}</span>
                <br />
                <a
                  href={`https://ipfs.io/ipfs/${ipfsHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {ipfsHash}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GetPatientRecords;
