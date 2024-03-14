import { useState, useEffect } from "react";

function useWindowLocation() {
  if (typeof window !== "undefined") {
    const [location, setLocation] = useState(window.location.href);

    useEffect(() => {
      const handleLocationChange = () => setLocation(window.location.href);

      window.addEventListener("popstate", handleLocationChange);

      return () => {
        window.removeEventListener("popstate", handleLocationChange);
      };
    }, []);

    return location;
  }
}

export default useWindowLocation;
