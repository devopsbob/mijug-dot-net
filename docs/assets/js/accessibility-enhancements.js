/**
 * Accessibility Enhancements for WCAG 2.1 AA Compliance
 * Handles keyboard navigation and scrollable regions
 */

(function () {
  "use strict";

  // Make code blocks keyboard accessible
  function makeCodeBlocksAccessible() {
    // Target all scrollable code blocks
    const codeBlocks = document.querySelectorAll(
      [
        ".highlight pre",
        ".language-liquid .highlight pre",
        "pre.highlight",
        ".language-javascript .highlight pre",
        ".language-yaml .highlight pre",
        ".language-markdown .highlight pre",
        ".language-html .highlight pre",
        ".language-css .highlight pre",
        ".language-scss .highlight pre",
      ].join(", "),
    );

    codeBlocks.forEach(function (block) {
      // Only make scrollable blocks focusable
      if (block.scrollWidth > block.clientWidth || block.scrollHeight > block.clientHeight) {
        block.setAttribute("tabindex", "0");
        block.setAttribute("role", "group");
        block.setAttribute("aria-label", "Scrollable code block");

        // Add keyboard navigation
        block.addEventListener("keydown", function (e) {
          switch (e.key) {
            case "ArrowLeft":
              if (e.ctrlKey) {
                block.scrollLeft -= 50;
                e.preventDefault();
              }
              break;
            case "ArrowRight":
              if (e.ctrlKey) {
                block.scrollLeft += 50;
                e.preventDefault();
              }
              break;
            case "ArrowUp":
              if (e.ctrlKey) {
                block.scrollTop -= 20;
                e.preventDefault();
              }
              break;
            case "ArrowDown":
              if (e.ctrlKey) {
                block.scrollTop += 20;
                e.preventDefault();
              }
              break;
            case "Home":
              if (e.ctrlKey) {
                block.scrollLeft = 0;
                e.preventDefault();
              }
              break;
            case "End":
              if (e.ctrlKey) {
                block.scrollLeft = block.scrollWidth;
                e.preventDefault();
              }
              break;
          }
        });
      }
    });
  }

  // Ensure minimum touch target sizes (44x44px WCAG 2.1 AA)
  function ensureTouchTargets() {
    const interactiveElements = document.querySelectorAll(
      'a, button, input, select, textarea, [role="button"], [role="link"]',
    );

    interactiveElements.forEach(function (element) {
      const rect = element.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) {
        element.style.minWidth = "44px";
        element.style.minHeight = "44px";
        element.style.padding = element.style.padding || "8px";
      }
    });
  }

  // Initialize when DOM is ready
  function initialize() {
    makeCodeBlocksAccessible();
    ensureTouchTargets();
  }

  // Run on DOM content loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }

  // Re-run when content is dynamically loaded
  if (window.MutationObserver) {
    const observer = new MutationObserver(function (mutations) {
      let shouldRun = false;
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          shouldRun = true;
        }
      });
      if (shouldRun) {
        setTimeout(initialize, 100); // Debounce
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
})();
