import { Facebook, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="md:h-20 bg-sky-950 md:w-full flex flex-col items-center">
      <div className="text-2xl">Contact Us! If you want real food.</div>
      <div className="flex gap-7">
        <a
          href="https://www.facebook.com/baasan.naranhorol/"
          className="text-xl items-center flex gap-1"
        >
          <Facebook className="w-7 h-7 " />
          Facebook
        </a>
        <a
          href="https://www.youtube.com/watch?v=G3lSONLLx70&list=RDG3lSONLLx70&start_radio=1"
          className="flex items-center text-xl gap-1"
        >
          <Youtube className="w-10 h-8" />
          Youtube
        </a>
      </div>
    </div>
  );
};

export default Footer;
