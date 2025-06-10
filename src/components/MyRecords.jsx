import React, { useEffect, useState } from "react";
import { useWeb3 } from "../context/web3Context";

const MyRecords = () => {
  const { getMyRecords, isRecordLoading, recordError } = useWeb3();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      if (typeof getMyRecords !== "function") {
        console.error("❌ get My Records is not a function.");
        return;
      }

      try {
        const data = await getMyRecords();
        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          setRecords([]);
        }
      } catch (err) {
        console.error("Error fetching records:", err);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-3">📁 My Medical Records</h2>

      {isRecordLoading && <p>Loading your records...</p>}
      {recordError && <p className="text-red-500">{recordError}</p>}

      {!isRecordLoading && !recordError && records.length === 0 && (
        <p>No records found.</p>
      )}

   {records.length > 0 && (
  <ul className="space-y-2">
    {records.map((record, i) => {
      const ipfsHash = record.ipfsHash;
      const uploadedBy = record.uploadedBy;

      // যদি record.timestamp BigNumber হয় (ethers.js)
      const timestampNumber = record.timestamp.toNumber 
        ? record.timestamp.toNumber() 
        : Number(record.timestamp);

      const formattedDate = new Date(timestampNumber * 1000).toLocaleString();

      return (
        <li key={i} className="p-3 border rounded-lg bg-gray-50">
          <span className="text-sm text-gray-600">
            Record #{i} by {uploadedBy} at {formattedDate}
          </span>
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

export default MyRecords;
