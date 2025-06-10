import React from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from "../context/web3Context";

const Header = () => {
  const {connectWallet,currentAccount} = useWeb3();
  
  return (
    <header className="bg-white shadow-md py-4 ">
      <nav className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-blue-600">🩺 MedRecord DApp</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/register-doctor" className="text-gray-700 hover:text-blue-600">Register Doctor</Link>

          <Link to="/register-patient" className="text-gray-700 hover:text-blue-600">Register Patient</Link>

          <Link to ="/active-doctors" className="text-gray-700 hover:text-blue-600 active:text-green-600">My Active Doctors</Link>
          <Link to="/my-records" className="text-gray-700 hover:text-blue-600">My Records</Link>

          <button
        onClick={connectWallet}
        
        className={`text-sm w-35 h-9 rounded text-white font-bold transition-colors 
          ${currentAccount ? "bg-green-500 hover:bg-green-700" : "bg-orange-500 hover:bg-orange-700"}`}
      >
        {currentAccount ? "Wallet Connected" : "Connect Wallet"}
      </button>

        </div>
      </nav>
    </header>
  );
};

export default Header;