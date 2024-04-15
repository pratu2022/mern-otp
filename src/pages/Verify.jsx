import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Verify = () => {

    const [otp,setOtp] = useState("");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleVerify = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:5000/api/verify",{otp,password});
        const data = await res.data;
        toast.success(data.message);
        navigate("/login")
    };

    return (
        <>
        <div className='w-scren h-screen flex justify-center items-center'>
            <form action="" className='bg-white shadow-md  w-[80vw] md:w-[30vw] rounded-md p-3 flex flex-col gap-2' onSubmit= {handleVerify}>
                <h3 className='font-bold text-xl text-pink-500'>Verify Otp</h3>
                <div>
                    <label>Otp</label>
                    <input
                        type="text"
                        name="otp"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className='w-full border border-gray-300 rounded-md p-1 outline-none' />
                </div>
                <div>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border border-gray-300 rounded-md p-1 outline-none' />
                </div>
                <button className='px-3 py-1 mt-2 font-bold bg-pink-500 text-white rounded-lg hover:bg-pink-400' type="submit">Verify Otp</button>
            </form>
        </div>
        </>
    )
}

export default Verify