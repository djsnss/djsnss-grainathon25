import React from 'react';

const Header = () => {
  return (
    <div className="absolute top-2  w-[90%] h-max text-white py-4 px-6 z-10">
      <div className="flex justify-between items-center">
        
        
        <div className="flex items-center space-x-3">
          <img src="./assets/DJSNSSLogo.png" alt="Logo" className="w-14 h-14 p-1 bg-white rounded-full object-contain" />
          <span className="text-4xl font-pixel tracking-wider font-semibold">DJSNSS</span>
        </div>

        
        <div>
          <span className="text-4xl font-pixel tracking-wider font-bold">Grainathon 3.0</span>
        </div>

      </div>
    </div>
  );
};

export default Header;
