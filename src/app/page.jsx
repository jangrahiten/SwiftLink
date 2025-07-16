"use client";
import React, { use, useEffect, useState } from "react";
import { Meteors } from "./components/ui/meteor";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { ShortenButton } from "./components/ui/ShortenButton";
import { CheckCircle, Copy, Lock } from "lucide-react";
import axios from "axios";
import { Navbar } from "./components/ui/Navbar";
import { Pop } from "./components/Pop";
import Cookies from "js-cookie";


export default function Home() {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [isAuthReady, setIsAuthReady] = useState(false); // NEW
   const [longURL, setLongURL] = useState("");
   const [shortURL, setShortURL] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [copied, setCopied] = useState(false);
   const [showPopUP, setShowPopUP] = useState(false);
   const [payload, setPayload] = useState({});
   const [userURLS,setUserURLS] = useState([]);
   const getPayload = async () => {
      try {
         const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
            withCredentials: true,
         });
         setPayload(res.data.user); 
      } catch (err) {
         console.error("Failed to fetch payload:", err.response?.data || err.message);
      }
   };


   useEffect(() => {
      const token = Cookies.get("token");
      setIsAuthenticated(!!token);
      setIsAuthReady(true);

      if (token) getPayload();
   }, []);


   useEffect(() => {
      const urlfunction = async ()=>{
     const getUrls = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/url/geturl`,{
      withCredentials: true,
     });
     const data = getUrls.data.urls;
   console.log(data)}
   urlfunction();
   }, [payload])
   


   const shortenURL = async () => {
      if (!longURL.trim()) return;

      setIsLoading(true);
      setTimeout(() => {
      }, 1500);
      //api call
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await axios.post(`${backendUrl}/url/`, {url: longURL,}, {
        headers:{
          'Content-Type': 'application/json',
        },
        withCredentials:true,
      });
      const shortid = response.data.shorturl.shortID 
      setShortURL(`${backendUrl}/${shortid}`);
      
      setIsLoading(false);
   };

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(shortURL);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error("Failed to copy:", err);
      }
   };
   const handleLogout = async ()=>{
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try{
      const response = axios.post(`${backendUrl}/user/logout`,{},{
         withCredentials: true,
      });
      setIsAuthenticated(false);
      setShortURL("");
      setLongURL("");

      // window.location.reload();
    } catch(err){
      console.error("logout failed", err);
    }
  }

   return (
      <div className="min-h-screen bg-black relative overflow-hidden">
         {!isAuthReady && (
             <div className="fixed bg-[#00000091] inset-0 flex items-center justify-center z-50">
               <div className="text-white text-2xl animate-pulse">Loading...</div>
            </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20 " />
         <Meteors number={100} />
         {/* grid patterns */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
         
         {/* Auth Pop UP */}
         {showPopUP && <Pop getPayload={getPayload} setIsAuthenticated={setIsAuthenticated} onclick={()=>setShowPopUP(prev => !prev)} />}
         {/* Navbar */}
         <Navbar onclick={()=>setShowPopUP(prev => !prev)} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
         {/* Main Content */}
         <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden">
            <div className="w-full max-w-2xl mx-auto">
               {/* Headings */}
               <div className="content flex flex-col items-center mb-8">
                  <div className="headers flex gap-3 items-center justify-center mb-5">
                     <div className="logo rounded-full bg-gradient-to-br from-white via-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25">
                        <Image width={70} height={70} src={logo} alt={"logo"} />
                     </div>
                     <h1 className="font-bold text-white text-5xl">
                        SwiftLink
                     </h1>
                  </div>
                  {/* description */}
                  <div className="font-semibold text-lg md:text-xl text-gray-500 text-center">
                     <p>
                        Transform your lengthy URLs into sleek, shareable links
                     </p>
                  </div>
               </div>
               {!isAuthenticated ?(
                  <div className="backdrop-blur-xl flex flex-col items-center bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/10">
                     <div className="bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full w-fit px-4 py-4 flex items-center justify-center mx-auto mb-4"><Lock className="text-white w-12 h-12" /></div>   

                     <h1 className="flex w-full justify-center text-white font-semibold text-3xl md:text-4xl my-2">Sign In Required</h1>
                     <h2 className="flex w-full justify-center text-gray-400  text-[0.9rem] md:text-xl my-4 ">Create an Account or Sign In to shorten URLs</h2>

                     <button className='bg-gradient-to-r text-white from-cyan-500 to-purple-500 shadow-lg shadow-cyan-500/25 px-8 py-2 rounded-2xl text-2xl font-semibold cursor-pointer' onClick={()=>setShowPopUP(prev => !prev)}>Get Started</button>
                     
                  </div>
               ):(
                  <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/10">
                  {/* url-input */}
                  {/* input-section */}
                  <div className="space-y-6">
                     <h1 className="font-bold text-white text-xl w-full text-center">{payload.email && `Welcome ${payload.fullname}...`}</h1>
                     <div>
                        <input
                           type="url"
                           placeholder="Past your Long URL here..."
                           value={longURL}
                           onChange={(e) => setLongURL(e.target.value)}
                           className="text-lg h-16 w-full bg-black/20 border-white/20 text-white placeholder:text-gray-400 rounded-2xl px-6 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                           onKeyDown={(e) => e.key == "Enter" && shortenURL()}
                        />
                     </div>
                     <ShortenButton
                        longUrl={longURL}
                        shortenUrl={shortenURL}
                        isLoading={isLoading}
                     />
                  </div>
                  {/* Result Section */}
                  {shortURL && (
                     <div className="mt-8 p-6 bg-black/20 border border-white/10 rounded-2xl animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3 mb-4">
                           <CheckCircle className="w-5 h-5 text-green-400" />
                           <span className="text-green-400 font-medium">
                              URL shortened successfully!
                           </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                           <div className="flex-1 p-4 bg-black/30 rounded-xl border border-white/10">
                              <p className="text-gray-400 text-sm mb-1">
                                 Your shortened URL:
                              </p>
                              <p className="text-cyan-400 font-mono text-lg break-all">
                                 {shortURL}
                              </p>
                           </div>

                           <button
                              onClick={copyToClipboard}
                              className={`h-auto px-6 py-4 border border-white/20 hover:border-cyan-400/50 
                                        bg-black/20 hover:bg-cyan-400/10 transition-all duration-300
                                        ${
                                           copied
                                              ? "border-green-400/50 bg-green-400/10"
                                              : ""
                                        }`}
                           >
                              <div className="flex items-center gap-2">
                                 {copied ? (
                                    <>
                                       <CheckCircle className="w-4 h-4 text-green-400" />
                                       <span className="text-green-400">
                                          Copied!
                                       </span>
                                    </>
                                 ) : (
                                    <>
                                       <Copy className="w-4 h-4 text-white" />
                                       <span className="text-white">Copy</span>
                                    </>
                                 )}
                              </div>
                           </button>
                        </div>
                     </div>
                  )}
                  {}
               </div>
               )}
                  {/* Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                  {[
                    { icon: "⚡", title: "Lightning Fast", desc: "Instant URL shortening" },
                    { icon: "🔒", title: "Secure", desc: "Enterprise-grade security" },
                    { icon: "📊", title: "Analytics", desc: "Track your link performance" },
                  ].map((feature, i) => (
                    <div
                      key={i}
                      className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="text-3xl mb-3">{feature.icon}</div>
                      <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  ))}
                </div>
            </div>
         </div>
      </div>
   );
}
