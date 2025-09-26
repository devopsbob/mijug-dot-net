/**
 * Print Helper - Adds current date and version info when printing
 * Automatically injects print date information for MIJUG workshop materials
 * Optimized for better INP (Interaction to Next Paint) performance
 */

(function () {
  "use strict";

  // Cache DOM elements and computed values
  let printDateCache = null;
  let versionCache = null;
  let titleCache = null;

  // // Get cache version from global MIJUG object if available
  // const cacheVersion =
  //   window.MIJUG && window.MIJUG.cacheBust
  //     ? window.MIJUG.cacheBust.version
  //     : document.querySelector('meta[name="cache-version"]')?.content || "";

  // Shared timers for debouncing
  let printTimer = null;
  let keydownTimer = null;

  // Use requestIdleCallback for non-critical work
  function scheduleIdleWork(callback) {
    if (window.requestIdleCallback) {
      requestIdleCallback(callback, { timeout: 1000 });
    } else {
      setTimeout(callback, 16); // ~1 frame at 60fps
    }
  }

  // // For dynamic resource loading, use the cache buster
  // function loadResource(url) {
  //   // Use the global cache buster if available
  //   if (window.MIJUG && window.MIJUG.cacheBust && window.MIJUG.cacheBust.addCacheBuster) {
  //     url = window.MIJUG.cacheBust.addCacheBuster(url);
  //   } else {
  //     // Fallback cache busting
  //     const separator = url.includes("?") ? "&" : "?";
  //     url = `${url}${separator}v=${cacheVersion || Date.now()}`;
  //   }
  //   return url;
  // }

  // Add print date information when page loads
  function addPrintInfo() {
    // Cache expensive date operations
    if (!printDateCache) {
      const now = new Date();
      printDateCache = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Batch DOM reads and writes to avoid layout thrashing
    scheduleIdleWork(() => {
      // Batch DOM reads
      if (!versionCache) {
        const metaVersion = document.querySelector('meta[name="version"]');
        versionCache = metaVersion ? metaVersion.content : printDateCache;
      }

      if (!titleCache) {
        titleCache = document.title.split(" | ")[0] || document.title;
      }

      // Batch DOM writes
      requestAnimationFrame(() => {
        document.body.setAttribute("data-print-date", printDateCache);
        document.body.setAttribute("data-version", versionCache);
        document.body.setAttribute("data-document-title", titleCache);

        // Update CSS in next frame to avoid blocking
        scheduleIdleWork(() => updatePrintCSS(printDateCache, versionCache));
      });
    });
  }

  // Function to update CSS with current dates (optimized)
  function updatePrintCSS(printDate, version) {
    // Use DocumentFragment for better performance
    const existingStyle = document.getElementById("print-date-css");
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create style element with optimized CSS
    const style = document.createElement("style");
    style.id = "print-date-css";
    style.textContent = `
      @media print {
        @page {
          @bottom-center {
            content: "Printed: ${printDate} | Modified: ${version}";
            font-size: 9pt;
            color: #666;
          }
        }
      }
    `;

    // Use DocumentFragment to minimize reflows
    const fragment = document.createDocumentFragment();
    fragment.appendChild(style);
    document.head.appendChild(fragment);
  }

  // Add print date when page is printed (debounced for performance)
  function handlePrint() {
    // Debounce rapid print events
    if (printTimer) {
      clearTimeout(printTimer);
    }

    printTimer = setTimeout(() => {
      const now = new Date();
      const printDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Update print date attributes efficiently
      requestAnimationFrame(() => {
        document.body.setAttribute("data-print-date", printDate);
        const version = versionCache || printDate;
        scheduleIdleWork(() => updatePrintCSS(printDate, version));
      });
    }, 10);
  }

  // Initialize when DOM is ready (optimized)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addPrintInfo, {
      passive: true,
    });
  } else {
    scheduleIdleWork(addPrintInfo);
  }

  // Update date when printing (with passive listeners for better performance)
  window.addEventListener("beforeprint", handlePrint, { passive: true });

  // Also handle Ctrl+P detection (debounced)
  document.addEventListener(
    "keydown",
    function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        if (keydownTimer) {
          clearTimeout(keydownTimer);
        }
        keydownTimer = setTimeout(handlePrint, 10);
      }
    },
    { passive: true },
  );
})();
