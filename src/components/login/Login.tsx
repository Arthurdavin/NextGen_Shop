'use client';
import React, { useState } from 'react';


export default function LoginAcc() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-gray-800">
      
      <div className={`hidden md:flex w-1/2 items-center justify-center relative overflow-hidden transition-colors duration-500 ${isLogin ? 'bg-[#CBE4E8]' : 'bg-[#CBE4E9]'}`}>
        
        {/* Dynamic Background Elements */}
        {isLogin ? (
           // Background specifics for Login (Cart image)
           <>
             <div className="absolute top-0 right-0 w-full h-full bg-opacity-20 bg-orange-50 pointer-events-none" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}></div>
           </>
        ) : (
           // Background specifics for Signup (Phone image)
           <>
             <div className="absolute top-10 left-10 w-20 h-20 bg-white/30 rounded-full blur-xl"></div>
             <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200/40 rounded-full blur-xl"></div>
           </>
        )}
        
        {/* Illustration Container */}
        <div className="relative z-10 w-3/4 max-w-md flex flex-col items-center">
           {isLogin ? (
             <img 
              src="https://img.freepik.com/free-vector/shopping-cart-concept-illustration_114360-1644.jpg" 
              alt="Shopping Illustration"
              className="w-full h-auto mix-blend-multiply opacity-90 object-contain drop-shadow-xl"
             
             />
           ) : (
             <img 
              src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg" 
              alt="Signup Illustration"
              className="w-full h-auto mix-blend-multiply opacity-90 object-contain"
              
             />
           )}
        </div>
      </div>

      {/* RIGHT SIDE - Form Area */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-medium tracking-wide text-black mb-2">
              {isLogin ? 'Log in to Exclusive' : 'Create an account'}
            </h1>
            <p className="text-gray-500 text-sm">Enter your details below</p>
          </div>

          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            
            {/* Name Input - Only for Signup */}
            {!isLogin && (
              <div className="group relative">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full border-b border-gray-300 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-800 transition-colors bg-transparent"
                />
              </div>
            )}

            {/* Email/Phone Input - Common to both */}
            <div className="group relative">
              <input 
                type="text" 
                placeholder="Email or Phone Number" 
                className="w-full border-b border-gray-300 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-800 transition-colors bg-transparent"
              />
            </div>

            {/* Password Input - Common to both */}
            <div className="group relative">
              <input 
                type="password" 
                placeholder="Password" 
                className="w-full border-b border-gray-300 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-gray-800 transition-colors bg-transparent"
              />
            </div>


            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between">
                <button 
                  type="submit"
                  className="bg-[#DB4444] text-white font-medium py-3 px-12 rounded hover:bg-[#c93e3e] transition-colors shadow-sm min-w-[140px]"
                >
                  {isLogin ? 'Log In' : 'Create Account'}
                </button>
                
                {isLogin && (
                  <button type="button" className="text-[#DB4444] text-sm hover:underline">
                    Forget Password?
                  </button>
                )}
              </div>

              {/* Google Sign Up - Only for Signup (per image 19) */}
              {!isLogin && (
                <button 
                  type="button"
                  className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded bg-white text-gray-700 hover:bg-gray-50 transition-colors mt-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign up with Google</span>
                </button>
              )}
            </div>

            {/* Toggle Link Footer */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500">
              <span>{isLogin ? "Don't have an account?" : "Already have account?"}</span>
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-700 font-medium underline decoration-gray-400 underline-offset-4 hover:text-black ml-1"
              >
                {isLogin ? 'Sign Up' : 'Log in'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
