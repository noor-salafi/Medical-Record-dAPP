import React from "react";
// import RegisteDoctorForm from "./RegisteDoctorForm";
// import RegisterPatientForm from "./RegisterPatientForm";
import AddRecordForm from "./AddRecordForm";
// import MyRecords from "./MyRecords";
import GetPatientRecords from "./getPatientRecord";
import GrantAccess from "./GrantAccess";
import RevokeAccess from "./RevokeAccess";
import DeleteMyRecord from "./DeleteMyRecord";
import PatientRecords from "./PatientRecords";
// import ActiveDoctorList from "./ActiveDoctorList";


const Home = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6  "
    
    >
      

        {/* <RegisterPatientForm />
        <RegisteDoctorForm /> */}
        <AddRecordForm />
        {/* <MyRecords /> */}
        <GetPatientRecords />
        <GrantAccess />
        <RevokeAccess />
        <DeleteMyRecord />
        <PatientRecords />
        {/* <ActiveDoctorList /> */}

    </div>
  )
}

export default Home;