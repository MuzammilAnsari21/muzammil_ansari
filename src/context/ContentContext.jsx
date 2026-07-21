import { createContext, useContext, useEffect, useState, useCallback } from "react";
import defaultContent from "../data/defaultContent";

const OWNER_ACCESS_KEY = "portfolio_owner_access_v1";
const API_URL = "/api/content";

const ContentContext = createContext(null);

function loadOwnerAccess() {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  const adminFlag = params.get("admin");
  if (adminFlag === "true" || adminFlag === "1" || adminFlag === "owner") {
    try {
      localStorage.setItem(OWNER_ACCESS_KEY, "true");
    } catch (e) {}
    return true;
  }

  try {
    return localStorage.getItem(OWNER_ACCESS_KEY) === "true";
  } catch (e) {
    return false;
  }
}

// export function ContentProvider({ children }) {
//   const [content, setContent] = useState(defaultContent);
//   const [isAdminOpen, setIsAdminOpen] = useState(false);
//   const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(loadOwnerAccess);
//   const [isLoading, setIsLoading] = useState(true);

 
//   useEffect(() => {
//     fetch(API_URL)
//       .then((r) => r.json())
//       .then((saved) => {
//         if (saved && Object.keys(saved).length > 0) {
//           setContent((prev) => ({ ...prev, ...saved }));
//         }
//       })
//       .catch(() => {
//         try {
//           const raw = localStorage.getItem("portfolio_content_v1");
//           if (raw) {
//             const parsed = JSON.parse(raw);
//             setContent((prev) => ({ ...prev, ...parsed }));
//           }
//         } catch (e) {}
//       })
//       .finally(() => setIsLoading(false));
//   }, []);
// ... imports same

export function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState(loadOwnerAccess);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Try API first
        const res = await fetch(API_URL);
        if (res.ok) {
          const saved = await res.json();
          if (saved && Object.keys(saved).length > 0) {
            setContent((prev) => ({ ...prev, ...saved }));
          }
        }
      } catch (e) {
        try {
          const raw = localStorage.getItem("portfolio_content_v1");
          if (raw) {
            const parsed = JSON.parse(raw);
            setContent((prev) => ({ ...prev, ...parsed }));
          }
        } catch (err) {}
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);


  useEffect(() => {
    try {
      if (isOwnerUnlocked) {
        localStorage.setItem(OWNER_ACCESS_KEY, "true");
      } else {
        localStorage.removeItem(OWNER_ACCESS_KEY);
      }
    } catch (e) {}
  }, [isOwnerUnlocked]);

  const updateContent = useCallback((updater) => {
    setContent((prev) =>
      typeof updater === "function" ? updater(prev) : { ...prev, ...updater }
    );
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    // Also clear the saved file
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(defaultContent),
    }).catch(() => {});
    localStorage.removeItem("portfolio_content_v1");
  }, []);

  /**
   * saveContent — writes current content to the server-side file.
   * Returns a Promise so the caller can show success/error feedback.
   */
  const saveContent = useCallback(
    (currentContent) => {
      const data = currentContent ?? content;
      // Also mirror to localStorage as fallback
      try {
        localStorage.setItem("portfolio_content_v1", JSON.stringify(data));
      } catch (e) {}
      return fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then((r) => {
        if (!r.ok) throw new Error("Server error " + r.status);
        return r.json();
      });
    },
    [content]
  );

  const exportContent = useCallback(() => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-content.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [content]);

  const importContent = useCallback((json) => {
    setContent({ ...defaultContent, ...json });
  }, []);

  const unlockAdminPortal = useCallback(() => {
    setIsOwnerUnlocked(true);
    setIsAdminOpen(true);
  }, []);

  const lockAdminPortal = useCallback(() => {
    // Only close the panel — keep owner access so "Edit Portal" stays visible
    setIsAdminOpen(false);
  }, []);

  const revokeOwnerAccess = useCallback(() => {
    setIsOwnerUnlocked(false);
    setIsAdminOpen(false);
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        setContent,
        updateContent,
        resetContent,
        saveContent,
        exportContent,
        importContent,
        isAdminOpen,
        setIsAdminOpen,
        isOwnerUnlocked,
        isLoading,
        unlockAdminPortal,
        lockAdminPortal,
        revokeOwnerAccess,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within a ContentProvider");
  return ctx;
}
