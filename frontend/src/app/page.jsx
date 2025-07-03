"use client";
import React, { useState } from "react";
import { Meteors } from "./components/ui/meteor";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { ShortenButton } from "./components/ui/ShortenButton";
import { CheckCircle, Copy } from "lucide-react";
import axios from "axios";


export default function Home() {
   const [longURL, setLongURL] = useState("");
   const [shortURL, setShortURL] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [copied, setCopied] = useState(false);

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

   return (
      <div className="min-h-screen bg-black relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
         <Meteors number={100} />
         {/* grid patterns */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
         
                  
         {/* Main Content */}
         <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
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

               {/* url-input */}
               <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl shadow-purple-500/10">
                  {/* input-section */}
                  <div className="space-y-6">
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
               </div>
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
