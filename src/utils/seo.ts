import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description?: string;
  keywords?: string;
}

export function useSeo({ title, description, keywords }: SeoOptions) {
  useEffect(() => {
    document.title = title;
    // Set meta description
    if (description) {
      let desc = document.querySelector("meta[name='description']");
      if (!desc) {
        desc = document.createElement("meta");
        desc.setAttribute("name", "description");
        document.head.appendChild(desc);
      }
      desc.setAttribute("content", description);
    }
    // Set meta keywords
    if (keywords) {
      let kw = document.querySelector("meta[name='keywords']");
      if (!kw) {
        kw = document.createElement("meta");
        kw.setAttribute("name", "keywords");
        document.head.appendChild(kw);
      }
      kw.setAttribute("content", keywords);
    }
  }, [title, description, keywords]);
}
