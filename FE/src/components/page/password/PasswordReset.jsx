import React, { useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import axios from 'axios'
import { SendMail, sendPassword } from "../../../services/loginService";

const PasswordReset = () => {
    const [email,setEmail] = useState('');
    const setVal = (e) => {

        setEmail(e.target.value);
    }
    const sendLink =async(e) => {
        e.preventDefault();
        const rest = await SendMail({
            email
        })
        if(rest && rest.status === 200){
            toast.success('Gửi mail thành công!')
        }else{
            toast.error('Gửi mail thất bại!')
        }
       


    }
    return(
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Enter your Email
                </h1>
                <ToastContainer />

                <form className="mt-6"  onSubmit={sendLink}>
              
                    <div className="mb-2">
                       
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={setVal}
                          
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                       
                    </div>
                    
                    
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Send
                        </button>
                    </div>
                </form>


                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="#"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>

    )
}
export default PasswordReset