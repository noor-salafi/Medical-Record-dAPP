import React,{useState} from 'react';
import {useWeb3} from "../context/web3Context";
import {toast} from 'react-toastify';


const GrantAccess = () => {
    const{grantAccess,isGtLoading, isWalletConnected} = useWeb3();
    const[doctorAddress, setDoctorAddress] = useState("");
    const[submitError, setSubmitError] = useState("");
    const[successGrantMessage, setSuccessGrantMessage] = useState("");


    const handleGrant = async(e) => {
        e.preventDefault();

       if (!isWalletConnected) {
             toast.error("Please connect your wallet first!", {
               position: "top-right",
               autoClose: 2000,
               theme: "colored",
             });
             return;
           };
            if (!doctorAddress || !/^0x[a-fA-F0-9]{40}$/.test(doctorAddress)) {
             setSubmitError("⚠ Please enter a valid Ethereum address.");
             return;
           }
        
        setSubmitError("");
        setSuccessGrantMessage("")

        await grantAccess(doctorAddress);
        
    }

  return (
    <div className='flex flex-col items-center p-4 w-100 bg-white rounded-xl shadow-md mt-6'>
        <h2 className='text-xl  font-bold mb-4'>🔓 Grant Access to Doctor</h2>

        <form onSubmit={handleGrant}
        className='mb-4 space-y-2'>
            <input 
            type="text"
            placeholder="Enter doctor's addesss"
            value={doctorAddress}
            onChange={(e) => setDoctorAddress(e.target.value)}
            className='w-80 flex mt-5  p-2 border rounded'
             />
             {submitError && <p className='text-red-500'>{submitError}</p>}

             <button type='submit'
             onClick={handleGrant}
             className='bg-green-600 text-white mt-5 ml-20  px-8 py-2 rounded hover:bg-green-700'>{isGtLoading ? "Access Granting..." : "Grant Access"}</button>
        </form>
        {successGrantMessage && <p className='text-green-600'>{successGrantMessage}</p>}
    </div>
  );
};

export default GrantAccess;