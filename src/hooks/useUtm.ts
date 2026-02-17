"use client";

import { useEffect, useState } from "react";
import {
  getUtmFromSearch,
  saveUtmToStorage,
  loadUtmFromStorage,
  getUtmQueryString,
  type UtmParams,
} from "@/lib/utm";

export function useUtm(): { utmParams: UtmParams; utmQueryString: string } {
  const [utmParams, setUtmParams] = useState<UtmParams>({});

  useEffect(() => {
    const fromUrl = getUtmFromSearch(
      typeof window !== "undefined" ? window.location.search : ""
    );
    if (Object.keys(fromUrl).length > 0) {
      saveUtmToStorage(fromUrl);
    }
    setUtmParams(loadUtmFromStorage());
  }, []);

  return {
    utmParams,
    utmQueryString: getUtmQueryString(utmParams),
  };
}
