import React from 'react';
import { BackgroundGradientAnimation } from '../../componentsAceternityUi/background-gradient-animation.jsx';
import { Link } from 'react-router-dom';
function Landing() {
  return (
    <>
      <BackgroundGradientAnimation 
        gradientBackgroundStart="rgb(255, 249, 229)" // light warm background
        gradientBackgroundEnd="rgb(240, 255, 244)"   // light minty green
        firstColor="34, 139, 34"    // light green
        secondColor="255, 204, 0"     // citrus yellow
        thirdColor="255, 105, 97"     // strawberry red
        fourthColor="72, 209, 204"    // teal
        fifthColor="255, 160, 122"    // light salmon/peach
        pointerColor="255, 140, 0"    // warm orange pointer
        blendingValue="soft-light"
      >
        <div className="absolute z-50 inset-0 flex flex-col items-center justify-center text-white font-bold px-4 text-center space-y-6">
          <p className="text-3xl md:text-4xl lg:text-7xl bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/50">
            Welcome To Food Explorer...
          </p>

          <span className="text-black text-sm font-medium bg-transparent border-none rounded-full px-5 py-3 pointer-events-auto">
            Explore information about different types of food products available in the world!!!😋
          </span>

          <div className="flex flex-col justify-center items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black rounded-lg hover:bg-black focus:ring-4 focus:ring-black dark:focus:ring-white"
              >
                  Get Started
                  <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
              </Link>
          </div>
        </div>
      </BackgroundGradientAnimation>
    </>
  );
}

export default Landing;
