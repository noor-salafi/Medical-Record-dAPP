import React, { createContext, useContext,useEffect, useState } from "react";
import { ethers } from "ethers";
import {toast} from "react-toastify";
import { contractABI } from "../utils/contractABI";
import { contractAddress } from "../utils/contractAddress";

const Context = createContext();

export const Web3Provider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    const [doctorIsLoading, setDoctorIsLoading] = useState(false);
    const [doctorErroc, setDoctorError] = useState("");
   

    const [patientError,setPatientError] = useState("");
    const [isPatientLoading, setIsPatientLoading] = useState(false);

    const [getPatientError] = useState("");
    const [isGetPatientLoading, setIsGetPatientLoading] = useState(false);

    const [isAddRLoading, setIsAddRLoading] = useState(false);
    const [addRError, setAddRError] = useState(false); 

    const [isRecordLoading, setIsRecordLoading] = useState(false);
    const [recordError,setRecordError] = useState("");

    const [isWalletLoading, setIsWalletLoading] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [errorWallet,setErrorWallet] = useState("");

    const [isGtLoading, setIsGtLoading] = useState(false);

    const [isRvLoading, setIsRvLoading] = useState(false);
    const [rVError, setRvError] = useState("");

    const [isDLoading, setIsDLoading] = useState(false);
    const [dError, setDError] = useState("");

    const [isADLoading, setIsADLoading] = useState(false);
    const [aDError, setADError] = useState("");

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                toast.setErrorWallet("Please install MetaMask!",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
                });
                return;
            }

            setIsWalletLoading(true);

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

            if (accounts.length === 0) {
                toast.setErrorWallet("No accounts found.",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
                });
                return;
            }

            setCurrentAccount(accounts[0]);

            const tempProvider = new ethers.BrowserProvider(window.ethereum);
            const tempSigner = await tempProvider.getSigner();
            const tempContract = new ethers.Contract(contractAddress, contractABI, tempSigner);

            setProvider(tempProvider);
            setSigner(tempSigner);
            setContract(tempContract);
            setIsWalletConnected(true); 
            setErrorWallet("");
        } catch (err) {
            toast.setErrorWallet("Wallet connection failed!",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
            console.error(err);
        } finally {
            setIsWalletLoading(false);
        }
    };

     useEffect(() => {
        const checkIfWalletIsConnected = async () => {
          try {
             if (!window.ethereum) return toast.setErrorWallet("Please install MetaMask!",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
             });

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
            const account = accounts[0];
            setCurrentAccount(account);

        const tempProvider = new ethers.BrowserProvider(window.ethereum);
        const tempSigner = await tempProvider.getSigner();
        const tempContract = new ethers.Contract(contractAddress, contractABI, tempSigner);

        setProvider(tempProvider);
        setSigner(tempSigner);
        setContract(tempContract);
        setIsWalletConnected(true);
        setErrorWallet("");
      }
    } catch (err) {
      console.error(err);
      toast.setErrorWallet("Failed to check wallet connection",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
      });
    }
  };

  checkIfWalletIsConnected();
}, []);

 
    const registerAsDoctor = async (name, info) => {
    try {
        if (!isWalletConnected) {
            return toast.error("Please connect your wallet first!", {
                position: "top-right",
                autoClose: 2000,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                hideProgressBar: false,
            });
        }

        setDoctorIsLoading(true);

        // ✅ Signer যুক্ত করলাম এখানে
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
console.log("🧾 Signer Address trying to register:", signerAddress);

        
        
        const contractWithSigner = contract.connect(signer);

        // ✅ Smart contract call signer দিয়ে
        const tx = await contractWithSigner.registerAsDoctor(name, info);
        await tx.wait();

        setDoctorIsLoading(false);
        setDoctorError("");

        toast.success("✅ 👨‍⚕ Doctor registered successfully!", {
            position: "top-right",
            autoClose: 4000,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            hideProgressBar: false,
        });

    } catch (err) {
        setDoctorIsLoading(false);
        console.error("Registration Error:", err);

        // 🔍 এখানে আমরা error.message কাস্টমাইজ করে দেখাচ্ছি
        if (err.message.includes("Already registered as doctor")) {
            toast.error("You're already registered as doctor with this address.", {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                hideProgressBar: false,
            });
        } else {
            toast.error("Failed to register as a doctor!", {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                hideProgressBar: false,
            });
        }
    }
};



    const registerAsPatient = async (name, age,info,bloodGroup,gender) => {
        try {
            if (!contract) return toast.error("Contract not initialized",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
            setIsPatientLoading(true);
             const signer = await provider.getSigner();
    const contractWithSigner = contract.connect(signer);

            const ageNum = parseInt(age);
            const tx = await contractWithSigner.registerAsPatient(name, ageNum, info,bloodGroup,gender);

            await tx.wait();

            setIsPatientLoading(false);
            setPatientError("");
            toast.success("Patient registered successfully!",{
                position : "top-right",
                autoClose : 4000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
        } catch (err) {
            setIsPatientLoading(false);
           
            console.error(err);
            
            if (err.message.includes("Already registered as patient")) {
                toast.error("You're already registered as patient with this address. ",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
                });
            } else {
                toast.error("Failed to fetch patient's records!",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
                });
            }
        }
    };
    const addRecord = async (ipfsHash) => {
  try {
    if (!currentAccount) throw new Error("Wallet not connected");

    const doctorAddress = currentAccount;
    const timestamp = Math.floor(Date.now() / 1000); // Current unix timestamp (seconds)
    const recordString = `${ipfsHash},${doctorAddress},${timestamp}`;

    setIsAddRLoading(true);

    const tx = await contract.addRecord(recordString, { from: currentAccount });
    await tx.wait();

    toast.success("Record added successfully!");
    
    setIsAddRLoading(false);
    setAddRError("");

  } catch (error) {
    setIsAddRLoading(false);
    console.error("Add record failed:", error);
    toast.error("Failed to add record!");
  }
};

    const getMyRecords = async (showToast = false) => {
  try {
    if (!contract) {
      setRecordError("Contract not initialized");
      toast.error("Contract not initialized", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        hideProgressBar: false,
      });
      return [];
    }

    setIsRecordLoading(true);
    const myRecords = await contract.getMyRecords();
    setIsRecordLoading(false);
    setRecordError("");

    if (showToast) {
      new Audio("/sounds/success.mp3").play();
      toast.success("✅ Fetched your records successfully!", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        hideProgressBar: false,
      });
    }

    return myRecords;
  } catch (err) {
    console.error(err);
    setIsRecordLoading(false);
    setRecordError("❌ Failed to fetch your records!");
    new Audio("/sounds/error.mp3").play();

    toast.error("❌ Failed to fetch your records!", {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      hideProgressBar: false,
    });

    return [];
  }
};

 
    const getPatientRecords = async (patientAddress) => {
  try {
    setIsGetPatientLoading(true);

    const patientRecords = await contract.getPatientRecords(patientAddress); // ✅ ঠিক নাম

    const patientProfile = await contract.patientProfiles(patientAddress);   // ✅ ঠিকভাবে কল করা
    const isRegistered = !!patientProfile.name && patientProfile.name !== "";

    if (!isRegistered) {
      toast.error("Patient address is not registered as a patient!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        hideProgressBar: false,
      });
    }

    setIsGetPatientLoading(false);
    return patientRecords;

  } catch (err) {
    setIsGetPatientLoading(false);
    console.error(err);

    if (err.message.includes("Access not granted")) {
      toast.error("You don't have access to this patient's records.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        hideProgressBar: false,
      });
    }

    return [];
  }
};


const getPatientIpfsHashes = async (patientAddress) => {
  if (!contract) {
    
    console.log("🚨 Contract not initialized");
    throw new Error("Contract not initialized");
  }

  console.log("📤 Fetching records for:", patientAddress);
  setIsGetPatientLoading(true);

  try {
    const records = await contract.getPatientRecords(patientAddress);
    console.log("✅ Raw records:", records);

    const hashes = records.map((rec) => rec.ipfsHash);
    console.log("✅ Extracted hashes:", hashes);

    setIsGetPatientLoading(false);
    return hashes;
  } catch (err) {
    console.error("❌ Error fetching records:", err);
    setIsGetPatientLoading(false);
    throw err;
  }
};




    const grantAccess = async (doctorAddress) => {
        try {
          
            setIsGtLoading(true);

            const tx = await contract.grantAccess(doctorAddress);
            await tx.wait();

            setIsGtLoading(false);
            setIsGtLoading("");
            toast.success("Access granted to doctor successfully!",{
                position : "top-right",
                autoClose : 2000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
        } catch (err) {
            setIsGtLoading(false);
            console.error(err);

         const doctorProfile = await contract.doctorProfiles(doctorAddress);
                const isRegistered = doctorProfile.name && doctorProfile.name !== "";

                if (!isRegistered) {
                toast.error("🚫 This address is not registered as a doctor.", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "colored",
                });
                return;
                }


            if (err.message.includes("Already registered as doctor")) {
                toast.error("You're already access granted as doctor with this address. ",{
                position : "top-right",
                autoClose : 2000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
                });
            } 
        }
    };


    const revokeAccess = async (doctorAddress) => {
  try {


    setIsRvLoading(true);

    // ✅ Check if doctor is registered
    const doctorProfile = await contract.doctorProfiles(doctorAddress);
    const isRegistered = doctorProfile.name && doctorProfile.info !== "";

    if (!isRegistered) {
      toast.error("🚫 This address is not registered as a doctor.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return;
    }

    // ✅ Check if already revoked (i.e., not granted)
    const hasAccess = await contract.hasAccess(currentAccount, doctorAddress);
    if (!hasAccess) {
      toast.error("ℹ️ Access already revoked.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        hideProgressBar: false,
      });
      return;
    }

    // ✅ Call smart contract
    const tx = await contract.revokeAccess(doctorAddress);
    await tx.wait();

    toast.success("✅ Doctor's access revoked successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } catch (err) {
    console.error("❌ Revoke error:", err);
    toast.error("Failed to revoke access!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  } finally {
    setIsRvLoading(false);
  }
};




    const deleteMyRecord = async (index) => {
        try {
            if (!contract) return toast.setDError("Contract not initialized",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
            if (typeof index !== "number") return setDError("Invalid record index",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
            setIsDLoading(true);

            const tx = await contract.deleteMyRecord(index);
            await tx.wait();

            setIsDLoading(false);
            setDError("");
            toast.success("Record deleted successfully!",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
        } catch (err) {
            setIsDLoading(false);
            console.log(err);
            toast.setDError("Failed to delete the record.",{
                position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
        }
    };

    const hasAccess = async (patientAddress, doctorAddress) => {
        try {
            if (!contract) return setError("Contract not initialized",{
                 position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
            if (!patientAddress || !doctorAddress) return setError("Please provide valid addresses.",{
                 position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });

            const access = await contract.hasAccess(patientAddress, doctorAddress);
            return access;
        } catch (err) {
            setIsLoading(false);
            console.error(err);
            setError("Failed to check access status.",{
                 position : "top-right",
                autoClose : 3000,
                pauseOnHover : true,
                draggable : true,
                theme : "colored",
                hideProgressBar : false
            });
            return false;
        }
    };

    // const getActiveDoctors = async () => {
    //     try {
    //         if (!contract) return toast.setADError("Contract not initialized",{
    //              position : "top-right",
    //             autoClose : 3000,
    //             pauseOnHover : true,
    //             draggable : true,
    //             theme : "colored",
    //             hideProgressBar : false
    //         });
    //         setIsADLoading(true);

    //         const [doctorsInfos, doctorAddresses] = await contract.getActiveDoctors();

    //         setIsADLoading(false);
    //         setADError("");

    //         return doctorsInfos.map((info, i) => ({
    //             name: info.name,
    //             info: info.info,
    //             address: doctorAddresses[i],
    //         }));
    //     } catch (err) {
    //         setIsADLoading(false);
    //         console.error(err);
    //         toast.setADError("❌ Failed to fetch active doctors.",{
    //              position : "top-right",
    //             autoClose : 3000,
    //             pauseOnHover : true,
    //             draggable : true,
    //             theme : "colored",
    //             hideProgressBar : false
    //         });
    //         return [];
    //     }
    // };

    const getActiveDoctors = async () => {
    try {
        if (!isWalletConnected) {
            toast.error("Please connect your wallet first.", {
                position: "top-right",
                autoClose: 3000,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                hideProgressBar: false
            });
            return [];
        }

        setIsADLoading(true);
        const [doctorsInfos, doctorAddresses] = await contract.getActiveDoctors();
        setIsADLoading(false);
        setADError("");

        return doctorsInfos.map((info, i) => ({
            name: info.name,
            info: info.info,
            address: doctorAddresses[i],
        }));
    } catch (err) {
        setIsADLoading(false);
        console.error(err);
        toast.error("❌ Failed to fetch active doctors.", {
            position: "top-right",
            autoClose: 3000,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            hideProgressBar: false
        });
        setADError("Failed to fetch active doctors");
        return [];
    }
};



    return (
        <Context.Provider
            value={{
                currentAccount,
                contract,
                provider,
                signer,
                isWalletConnected,
                isLoading,
                error,
                patientError,
                doctorIsLoading,
                doctorErroc,
                connectWallet,
                rVError,
                isRvLoading,
                isWalletLoading,
                errorWallet,
                registerAsDoctor,
                registerAsPatient,
                isGtLoading,
                dError,
                setRvError,
                isDLoading,
                addRecord,
                getMyRecords,
                getPatientRecords,
                grantAccess,
                aDError,
                isADLoading,
                revokeAccess,
                deleteMyRecord,
                isGetPatientLoading,
                getPatientError,
                hasAccess,
                getActiveDoctors,
                isRecordLoading,
                recordError,
                addRError,
                isAddRLoading,
                isPatientLoading,
                getPatientIpfsHashes
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useWeb3 = () => useContext(Context);