import axios from "axios";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";

export const Pop = ({ onclick,setIsAuthenticated, getPayload }) => {
   const [create, setCreate] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [error, setError] = useState(null);
   const [formData, setFormData] = useState({
      fullname: "",
      username: "",
      email: "",
      password: "",
      rememberme: false,
   });

   

   const handleSignUp = async (e)=>{
      e.preventDefault();
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const {fullname, username, email, password} = formData;
      try{
         const response = await axios.post(`${backendUrl}/user/register/`,{fullname, username, email, password}, {
            withCredentials:true,
            headers: {
               'content-type':'application/json',
            },
         });
         setError(null);
         setCreate(false);
      }catch (err) {
         console.error("Error during registration:", err);
         if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error.message || "Registration failed.");
         } else {
            setError("An unexpected error occurred. Please try again.");
         }
      }
   };
   
   const handleSignIn = async (e)=>{
      e.preventDefault();
      const {username, password,rememberme} = formData;
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      try{
         const response = await axios.post(`${backendUrl}/user/login/`,{username, password,rememberme}, {
            withCredentials: true,
            headers:{
               'content-type':'application/json',
            },
         });
         getPayload();
         setError(null);
         setIsAuthenticated(true);
         onclick();
      } catch(err){
         console.error("Error during registration:", err);
         if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error.message || "Registration failed.");
         } else {
            setError("An unexpected error occurred. Please try again.");
         }
      }
   };

   return (
      <div className="w-full flex items-center backdrop-blur-xs justify-center h-full text-10xl fixed z-100 bg-black/50">
         <div className="relative">
            <button onClick={onclick} className="absolute top-0 right-0 text-white w-8 h-8 flex items-center justify-center cursor-pointer">✕</button>
            {create ? (
               <div className="border-white/20 border rounded-2xl w-90 md:w-120 px-4 py-15 flex flex-col items-center justify-center text-white bg-black">
                
                <h1 className="font-bold text-3xl mb-2">Create Account</h1>
                  <h2 className="text-gray-400 text-lg mb-6">
                     Sign Up to Continue
                  </h2>
                  {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
                  <form className="space-y-4">
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                           type="text"
                           placeholder="Username"
                           value={formData.username}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 username: e.target.value,
                              })
                           }
                           className="w-full md:w-90 h-12 bg-black/20 border border-white/20 text-white placeholder:text-gray-400 rounded-xl pl-10 pr-4 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           required
                        />
                     </div>
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                           type="text"
                           placeholder="Full Name"
                           value={formData.fullname}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 fullname: e.target.value,
                              })
                           }
                           className="w-full md:w-90 h-12 bg-black/20 border border-white/20 text-white placeholder:text-gray-400 rounded-xl pl-10 pr-4 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           required
                        />
                     </div>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                           type="text"
                           placeholder="Email"
                           value={formData.email}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 email: e.target.value,
                              })
                           }
                           className="w-full md:w-90 h-12 bg-black/20 border border-white/20 text-white placeholder:text-gray-400 rounded-xl pl-10 pr-4 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           required
                        />
                     </div>
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                           type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           value={formData.password}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 password: e.target.value,
                              })
                           }
                           className="w-full md:w-90 h-12 bg-black/20 border border-white/20 text-white placeholder:text-gray-400 rounded-xl pl-10 pr-12 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           required
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                           {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                           ) : (
                              <Eye className="w-5 h-5" />
                           )}
                        </button>
                     </div>
                     <button type="button" onClick={handleSignUp} className="text-white text-2xl rounded-xl font-semibold py-1 w-full bg-gradient-to-r from-cyan-400 to-purple-500">Sign Up</button>
                  </form>
                  <div className="mt-5 text-lg">Already have an account? <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer" onClick={()=>setCreate(prev=>!prev)}>Sign In</button></div>
               </div>
            ) : (
               <div className="border-white/20 border rounded-2xl w-90 md:w-120 px-4 py-15 flex flex-col items-center justify-center text-white bg-black ">
                  <h1 className="font-bold text-3xl mb-2">Welcome Back!</h1>
                  <h2 className="text-gray-400 text-lg mb-6">
                     Sign In to Continue
                  </h2>
                  {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
                  <form className="space-y-4">
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                           type="text"
                           placeholder="Username"
                           value={formData.username}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 username: e.target.value,
                              })
                           }
                           className="w-full md:w-90 h-12 bg-black/20 border border-white/20 text-white placeholder:text-gray-400 rounded-xl pl-10 pr-4 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           required
                        />
                     </div>
                     
                     <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                           type={showPassword ? "text" : "password"}
                           placeholder="Password"
                           value={formData.password}
                           onChange={(e) =>
                              setFormData({
                                 ...formData,
                                 password: e.target.value,
                              })
                           }
                           className="w-full md:w-90 h-12 bg-black/20 border border-white/20 text-white placeholder:text-gray-400 rounded-xl pl-10 pr-12 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           required
                        />
                        <button
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                           {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                           ) : (
                              <Eye className="w-5 h-5" />
                           )}
                        </button>
                     </div>
                     <div className="relative w-full flex justify-between items-center px-2 text-xl">
                        Remember Me?
                        <input checked={formData.rememberme} 
                        onChange={(e)=>{
                           setFormData({...formData,rememberme: e.target.checked,});                                     
                        }} 
                        className="size-5 accent-purple-600" type="checkbox" name="remember_me" id="remember_me" />
                     </div>
                    <button type="button" className="text-white text-2xl rounded-xl font-semibold py-1 w-full bg-gradient-to-r from-cyan-400 to-purple-500" onClick={handleSignIn}>Sign In</button>
                  </form>
                  <div className="mt-5 text-lg">Don't have an account? <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer" onClick={()=>setCreate(prev=>!prev)}>Sign Up</button></div>
               </div>
            )}
         </div>
      </div>
   );
};
