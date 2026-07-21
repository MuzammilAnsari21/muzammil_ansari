import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/assets/loader.json"; // yeh file baad mein add karenge

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 2.5 seconds baad hide (adjust kar sakte ho)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f8f7ef] transition-opacity duration-500">
      <div className="text-center">
        <div className="w-80 h-80 mx-auto">
          <Lottie 
            animationData={animationData} 
            loop={true} 
            autoplay={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}