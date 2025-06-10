import React, { useState } from "react";

import { useWeb3 } from "../context/web3Context";

const PatientRecords = () => {
  const { getPatientRecords, isLoading, error } = useWeb3();
  const [patientAddress, setPatientAddress] = useState("");
  const [records, setRecords] = useState([]);
  const [submitError, setSubmitError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();

    if (!patientAddress) {
      return setSubmitError("⚠ Please enter a patient address.");
    }

    setSubmitError("");

    const data = await getPatientRecords(patientAddress);
    setRecords(data);


  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">View Patient Records</h2>

      <form onSubmit={handleFetch} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Enter patient address"
          value={patientAddress}
          onChange={(e) => setPatientAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {submitError && <p className="text-red-500">{submitError}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Records
        </button>
      </form>

    

      {records.length === 0 && !isLoading && !error && (
        <p>No records found or access denied.</p>
      )}

      <ul className="space-y-2">
        {records.map((hash, i) => (
          <li key={i} className="p-3 border rounded-lg bg-gray-50">
            <span className="text-sm text-gray-600">IPFS:</span>
            <a
              href={`https://ipfs.io/ipfs/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-2 break-all"
            >
              {hash}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientRecords;