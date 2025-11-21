import React from 'react';
import { BrewResult } from '../types';

interface CupDisplayProps {
  data: BrewResult | null;
  loading: boolean;
}

const CupDisplay: React.FC<CupDisplayProps> = ({ data, loading }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] flex flex-col items-center justify-center p-6">
      
      {/* The Cup Container */}
      <div className={`relative transition-all duration-700 transform ${loading ? 'scale-95 opacity-80 animate-pulse' : 'scale-100 opacity-100'}`}>
        
        {/* Steam Animation */}
        {data && !loading && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-2 opacity-60">
            <div className="w-2 h-12 bg-white blur-md rounded-full animate-[bounce_3s_infinite] delay-0"></div>
            <div className="w-2 h-16 bg-white blur-md rounded-full animate-[bounce_4s_infinite] delay-75"></div>
            <div className="w-2 h-10 bg-white blur-md rounded-full animate-[bounce_3.5s_infinite] delay-150"></div>
          </div>
        )}

        {/* Cup Lid */}
        <div className="h-12 w-64 bg-white rounded-t-lg border-b-4 border-gray-100 shadow-sm relative z-20 mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-50 rounded-b-md shadow-inner"></div>
        </div>

        {/* Cup Body */}
        <div className="w-60 h-80 bg-[#f9f9f9] mx-auto rounded-b-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex flex-col items-center relative overflow-hidden z-10 border-x border-b border-gray-200">
           
           {/* Sleeve */}
           <div className="absolute top-16 w-full h-32 bg-[#cba258] shadow-md flex items-center justify-center opacity-90">
             <div className="w-20 h-20 rounded-full bg-sb-green border-2 border-white flex items-center justify-center text-white font-serif font-bold text-2xl shadow-inner">
                谦
             </div>
           </div>

           {/* Handwritten Text Area on Cup */}
           <div className="mt-52 px-6 text-center w-full">
              <div className="font-handwriting text-sb-dark font-bold text-lg -rotate-6 transform font-serif-sc">
                {loading ? "Brewing..." : (data ? data.drinkName : "For Qian Laoshi")}
              </div>
              <div className="mt-2 text-xs text-gray-500 font-mono">
                {loading ? "" : (data ? new Date().toLocaleDateString() : "")}
              </div>
           </div>
        </div>

      </div>

      {/* The "Paper Slip" Message Card below the cup */}
      {!loading && data && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg border border-gray-100 max-w-md w-full animate-[slideUp_0.5s_ease-out]">
          <h3 className="text-sb-green font-bold text-xl mb-3 font-serif-sc border-b border-sb-light pb-2">
            致: 谦老师
          </h3>
          <p className="text-gray-700 leading-relaxed font-serif-sc text-sm md:text-base italic">
            "{data.message}"
          </p>
          <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
            <span className="text-xs font-bold text-sb-dark uppercase tracking-widest block mb-2">Recipe Notes:</span>
            <div className="flex flex-wrap gap-2">
              {data.ingredients.map((ing, idx) => (
                <span key={idx} className="inline-block px-3 py-1 bg-sb-light text-sb-dark text-xs rounded-full font-medium">
                  {ing}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CupDisplay;