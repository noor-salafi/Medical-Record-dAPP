import React, { useEffect, useState } from "react";
import { useWeb3 } from "../context/web3Context";

const MyRecords = () => {
  const { getMyRecords, isRecordLoading, recordError } = useWeb3();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      if (typeof getMyRecords !== "function") {
        console.error("❌ getMyRecords is not a function.");
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

      <ul className="space-y-4 list-disc ml-5">
        {records.map((record, i) => {
          const ipfsHash = record.ipfsHash;
          const uploadedBy = record.uploadedBy;
          const fileName = record.fileName;
          const timestampNumber = record.timestamp.toNumber
            ? record.timestamp.toNumber()
            : Number(record.timestamp);
          const formattedDate = new Date(timestampNumber * 1000).toLocaleString();

          const gatewayURL = "https://ipfs.io/ipfs/";


          return (
            <li key={i}>
              <p className="font-medium">
                🧾 Record #{i + 1} by <span className="text-blue-600">{uploadedBy}</span>
                <br />

                <span className="font-semibold">📁 {fileName}</span>
                
                 <br />
                📅 {formattedDate}
              </p>

                  <a
                    href={`${gatewayURL}${ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline break-all"
                  >
                    🔗 View File
                  </a>

            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MyRecords;
