import React, { useState } from "react";
import { useWeb3 } from "../context/web3Context";
import {toast} from "react-toastify";

const RegisterPatientForm = () => {
  const { registerAsPatient, isPatientLoading,isWalletConnected} = useWeb3();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [info, setInfo] = useState("");
  const [gender,setGender] = useState("male");
  const [bloodGroup, setBloodGroup] = useState("");
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
     if (!name || !info ) {
      setSubmitError("⚠ Please fill in all the input fields");
      return;
    }

    await registerAsPatient(name, age, info,bloodGroup,gender);
    setSubmitError("");
    setName("");
    setAge("");
    setInfo("");
    setBloodGroup("");
    setGender("");
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl text-center font-bold mb-4">Register as Patient</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Write your Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            placeholder="Ex. Noor Salafi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium">Type your Age</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Ex. 21"
            value= {age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>


        <div>
          <label className="block font-medium">Write your Info</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Ex. write your health conditions and problems."
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
          {submitError && <p className="text-red-500 mt-2">{submitError}</p>}

          
         </div>
        <div className="flex">
         <div className="ml-5">
           <p className="text-sm ">Select Blood Group</p>
           <select className="border rounded font-[Poppins]">
           
               <option value="A+">A+</option>
               <option value="A-">A-</option>
               <option value="B+">B+</option>
               <option value="B-">B-</option>
               <option value="AB+">AB+</option>
               <option value="AB-">AB-</option>
               <option value="O+">O+</option>
               <option value="O-">B-</option>
           </select>
         </div>
         <div className="ml-30">
           <p className="text-sm">Select Gender</p>
           <form>
              <input 
             type="radio"
             name="gender"
             value="Male"
             checked={gender === "Male"}
            onChange={handleGenderChange}

              />Male <br />
             <input type="radio"
             name="gender"
             value="Female"
             checked={gender === "Female"}
            onChange={handleGenderChange}
             />Female <br />
          </form>
        </div>

         
        </div>
        <button
          type="submit"
          disabled={isPatientLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-25"
        >
          {isPatientLoading ? "Registering patient..." : "Register Patient"}
        </button>

        
      </form>
    </div>
  );
};

export default RegisterPatientForm;