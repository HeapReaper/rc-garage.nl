"use client";

import { useEffect } from "react";

export default function PlausibleAnalytics() {
  useEffect(() => {
    (window as any).plausible =
      (window as any).plausible || function () {
        ((window as any).plausible.q = (window as any).plausible.q || []).push(arguments);
      };

    const script = document.createElement("script");
    script.defer = true;
    script.setAttribute("data-domain", "rc-garage.nl");
    script.src = "https://analytics.heapreaper.nl/js/script.hash.outbound-links.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
