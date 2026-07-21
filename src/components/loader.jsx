import { useEffect, useState } from "react";
import loader from "@/assets/favicon.png";

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#f8f7ef] transition-opacity duration-500">
      <div className="text-center">
        {/* Logo */}
        <img
          src={loader}
          alt="Loading..."
          className="w-36 h-36 md:w-44 md:h-44 mx-auto animate-pulse"
        />

        {/* Text */}
        <h2 className="mt-6 text-3xl font-bold tracking-wide text-[#111827]">
          MUJJI
        </h2>

        <p className="mt-2 text-gray-500 text-sm md:text-base tracking-[4px] uppercase">
          Web Designer & Developer
        </p>

        {/* Loading dots */}
        <div className="flex justify-center gap-2 mt-6">
          <span className="w-3 h-3 rounded-full bg-black animate-bounce"></span>
          <span
            className="w-3 h-3 rounded-full bg-black animate-bounce"
            style={{ animationDelay: "0.15s" }}
          ></span>
          <span
            className="w-3 h-3 rounded-full bg-black animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}