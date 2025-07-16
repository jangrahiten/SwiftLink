import React from "react";
import { Zap } from "lucide-react"; // or any icon library you're using

export const ShortenButton = ({ longUrl, isLoading, shortenUrl }) => {
  const isDisabled = !longUrl.trim() || isLoading;

  return (
    <button
      onClick={shortenUrl}
      disabled={isDisabled}
      className={`w-full h-16 text-lg font-semibold rounded-2xl transition-all duration-300 transform 
        hover:scale-[1.02] active:scale-[0.98]
        bg-gradient-to-r from-cyan-500 to-purple-600 
        hover:from-cyan-400 hover:to-purple-500 
        shadow-lg shadow-cyan-500/25 
        hover:shadow-xl hover:shadow-cyan-500/30
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
    >
      {isLoading ? (
        <div className="flex items-center gap-3 justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Processing...
        </div>
      ) : (
        <div className="flex items-center text-white gap-3 justify-center">
          <Zap className="w-5 h-5" />
          Shorten URL
        </div>
      )}
    </button>
  );
};
