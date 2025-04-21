
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";

const HeroButtons = () => (
  <div className="relative flex items-center justify-center gap-3 mt-4">
    {/* Contact Me Button */}
    <Link
      to="/contact"
      className="group relative w-[185px] h-[55px]
        flex items-center justify-center gap-2 mx-auto"
    >
      <div className="absolute inset-0 box-border w-[185px] h-[55px] rounded-[72px]
        blur-[15px]
        shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]
        bg-[radial-gradient(25%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
        overflow-hidden z-0
        border-[2px] border-[#222222]
        transition-all duration-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[167px] h-[55px] rounded-[72px]
        bg-[radial-gradient(20.7%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
        overflow-hidden z-0
        transition-all duration-300
        group-hover:bg-[radial-gradient(60.1%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[166px] h-[55px] rounded-[114px]
        bg-black
        overflow-hidden z-0" />
      <span className="relative z-[3] flex items-center gap-2 text-white">
        Contact Me <ArrowRight size={20} className="transform -rotate-45" />
      </span>
    </Link>
    {/* Resume Button */}
    <a
      href="/Neeraj_Data_Analyst.pdf"
      download
      className="group relative w-[185px] h-[55px]
        flex items-center justify-center gap-2 mx-auto"
      aria-label="Download Resume"
    >
      <div className="absolute inset-0 box-border w-[185px] h-[55px] rounded-[72px]
        blur-[15px]
        shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]
        bg-[radial-gradient(25%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
        overflow-hidden z-0
        border-[2px] border-[#222222]
        transition-all duration-300" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[167px] h-[55px] rounded-[72px]
        bg-[radial-gradient(20.7%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]
        overflow-hidden z-0
        transition-all duration-300
        group-hover:bg-[radial-gradient(60.1%_50%_at_50%_100%,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        w-[166px] h-[55px] rounded-[114px]
        bg-black
        overflow-hidden z-0" />
      <span className="relative z-[3] flex items-center gap-2 text-white">
        Resume <Download size={20} className="transition-all duration-200 group-hover:scale-110" />
      </span>
    </a>
  </div>
);

export default HeroButtons;
