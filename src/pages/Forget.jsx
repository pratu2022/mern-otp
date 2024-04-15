import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'


const Forget = () => {

   const [email,setEmail] = useState("");
  
    const navigate = useNavigate();
  
    const handleForgot = async (e) => {
      e.preventDefault();
      const res = await axios.post("http://localhost:5000/api/forgot",{
        email,
      });
      const data = await res.data;
      toast.success(data.message);
      navigate("/verify");
    }

    return (
        <div className='w-scren h-screen flex justify-center items-center'>
            <form action="" className='bg-white shadow-md  w-[80vw] md:w-[30vw] rounded-md p-3 flex flex-col gap-2'
             onSubmit={handleForgot}>
                <h3 className='font-bold text-xl text-pink-500'>Login</h3>
                <div>
                    <label>Email</label>
                    <input type="email"
                    name="email"
                    id="email"
                    value= {email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className='w-full border border-gray-300 rounded-md p-1 outline-none' />
                </div>
                <div className='text-xs text-gray-600'>
                    <span className='mr-1'>Or</span>
                    <Link to="/signup" className='cursor-pointer hover:bg-pink-100'>Login with existing account?</Link>
                </div>
                <button className='px-3 py-1 mt-2 font-bold bg-pink-500 text-white rounded-lg hover:bg-pink-400' type="submit">SEND OTP</button>
            </form>
        </div>
    )
}

export default Forget