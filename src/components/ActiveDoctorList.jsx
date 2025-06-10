import React, { useEffect, useState } from 'react';
import { useWeb3 } from "../context/web3Context";

const ActiveDoctorList = () => {
    const { getActiveDoctors, doctorIsLoading, ADerror } = useWeb3(); // ✅ Fixed ()
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const list = await getActiveDoctors();
            setDoctors(list);
        };
        fetchDoctors();
    }, []);

    return (
        <div className='p-4 bg-white rounded-xl shadow-md'>
            <h2 className='text-xl font-bold mb-3'>🩺 Active Doctors</h2>

            {doctorIsLoading && <p>Loading doctors...</p>}
            {ADerror && <p className='text-red-500'>{ADerror}</p>}
            {doctors.length === 0 && !doctorIsLoading && !ADerror && (
                <p>No active doctors found.</p>
            )}

            <ul className='space-y-2'>
                {doctors.map((doc, i) => (
                    <li key={i} className='p-3 border rounded-lg'>
                        <p><strong>Name:</strong> {doc.name}</p>
                        <p><strong>Info:</strong> {doc.info}</p>
                        <p className='text-sm text-gray-500'><strong>Address:</strong> {doc.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveDoctorList;