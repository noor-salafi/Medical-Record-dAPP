import React, { useState } from "react";
import { useWeb3 } from "../context/web3Context";
import { toast } from "react-toastify";

const RevokeAccess = () => {
  const { revokeAccess, isRvLoading, setRvLoading,isWalletConnected } = useWeb3();
  const [doctorAddress, setDoctorAddress] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleRevoke = async (e) => {
    e.preventDefault();
     if (!isWalletConnected) {
      toast.error("Please connect your wallet first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      return;
    }
     if (!doctorAddress || !/^0x[a-fA-F0-9]{40}$/.test(doctorAddress)) {
      setSubmitError("⚠ Please enter a valid Ethereum address.");
      return;
    }

    

    try {
      
      if (setRvLoading) setRvLoading(true);
      await revokeAccess(doctorAddress);
      setDoctorAddress(""); // ✅ Clear input after success
    } catch (error) {
      console.error("Revoke access error:", error);

      let errorMessage = "Failed to revoke access.";

      if (error.message?.includes("Access not granted to this doctor")) {
        errorMessage = "Access not granted to this doctor.";
      } else if (error.message?.includes("Doctor not registered")) {
        errorMessage = "Doctor not registered.";
      } else if (error.reason) {
        errorMessage = error.reason;
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }

      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        hideProgressBar: false,
      });
    } finally {
      if (setRvLoading) setRvLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 w-100 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">🔒 Revoke Doctor Access</h2>

      <form onSubmit={handleRevoke} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Enter doctor's address"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
          className="flex flex-col w-80 p-2 border rounded"
        />
                {submitError && <p className="text-red-500">{submitError}</p>}

        <button
          type="submit"
          className="bg-red-600 text-white ml-20 mt-5 px-4 py-2 rounded hover:bg-red-700"
        >
          {isRvLoading ? "Access revoking..." : "Revoke Access"}
        </button>
      </form>
    </div>
  );
};

export default RevokeAccess;
