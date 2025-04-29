import React from 'react';
import { ArrowUpToLine } from "lucide-react";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button
        onClick={scrollToTop}
        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
      >
        <ArrowUpToLine className="w-6 h-6" />
      </button>
    </div>
  );
};

export default BackToTopButton;