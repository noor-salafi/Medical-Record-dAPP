import React,{useState} from 'react';
import {useWeb3} from"../context/web3Context";
import {toast} from "react-toastify";
const RegisteDoctorForm = () => {
    const {registerAsDoctor, doctorIsLoading,isWalletConnected} = useWeb3();
    const [name, setName] = useState("");
    const [info,setInfo] = useState("");
    const [submitError, setSubmitError] = useState("");


    const handleSubmit = async(e) => {
        e.preventDefault();
        

        if (!isWalletConnected) {
              toast.error("Please connect your wallet first!", {
                position: "top-right",
                autoClose: 2000,
                theme: "colored",
              });
              return;
            }
             if (!name || !info ) {
              setSubmitError("⚠ Please fill in all the input fields.");
              return;
            }

        await registerAsDoctor(name,info);
        setSubmitError("");
        setName("");
        setInfo("");
    };

  return (
    <div className='p-6 bg-white rounded-xl shadow-md max-w-md mx-auto'>
        <h2 className='text-2xl font-bold text-center mb-4'>👨‍⚕️ Register as Doctor</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <label className='block font-medium mb-1'>Name</label>
                <input 
                type="text"
                className='w-full border p-2 rounded'
                placeholder='e.g. Dr. Nasim'
                value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label className='block font-medium mb-1'>Info</label>
                <textarea 
                className='w-full border p-2 rounded'
                placeholder='e.g. Cardiologist, 10 years experience'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                ></textarea>
            {submitError || <p className='text-red-500'>{submitError}</p>}

            </div>
            
            <button 
            type= "submit"
            disabled={doctorIsLoading} 
            className='bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700'>
                {doctorIsLoading ? "Registering doctor..." : "Register as Doctor"}
            </button>
           
        </form>
    </div>
  );
}

export default RegisteDoctorForm;