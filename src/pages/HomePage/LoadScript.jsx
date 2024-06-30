import { useEffect } from "react";

const LoadScripts = () => {
    useEffect(() => {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };
  
      const loadScripts = async () => {
        try {
          await loadScript('/public/assets/js/vendor.js');
          await loadScript('/public/assets/js/main.js');
        } catch (error) {
          console.error('Failed to load scripts:', error);
        }
      };
  
      loadScripts();
    }, []);
  
    return null;
  };
  
  export default LoadScripts;