/**
 * St  // Cache for performance
  let isAPISupported = null;

  // Setup storage access for third-party resourcesHelper - Handles tracking prevention and storage access
 * Requests storage access permission for third-party content like Google Calendar
 * Optimized for better INP performance
 */

(function () {
  'use strict';

  // Cache for performance
  let isAPISupported = null;

  // Check if Storage Access API is supported (cached)
  function isStorageAccessAPISupported() {
    if (isAPISupported === null) {
      isAPISupported =
        'requestStorageAccess' in document && 'hasStorageAccess' in document;
    }
    return isAPISupported;
  }

  // Request storage access for third-party content
  async function requestStorageAccess() {
    if (!isStorageAccessAPISupported()) {
      console.log('Storage Access API not supported in this browser');
      return false;
    }

    try {
      // Check if we already have storage access
      const hasAccess = await document.hasStorageAccess();
      if (hasAccess) {
        console.log('Storage access already granted');
        return true;
      }

      // Request storage access
      await document.requestStorageAccess();
      console.log('Storage access granted');
      return true;
    } catch (error) {
      console.log('Storage access denied or failed:', error);
      return false;
    }
  }

  // Handle Google Calendar and other third-party resources
  function handleThirdPartyResources() {
    // Request storage access when interacting with Google Calendar
    const calendarElements = document.querySelectorAll(
      '[src*="calendar.google.com"], [href*="calendar.google.com"]'
    );

    calendarElements.forEach(element => {
      element.addEventListener('click', async () => {
        console.log('Requesting storage access for Google Calendar...');
        await requestStorageAccess();
      });
    });

    // Also handle iframe loading
    const iframes = document.querySelectorAll(
      'iframe[src*="calendar.google.com"]'
    );
    iframes.forEach(iframe => {
      iframe.addEventListener('load', async () => {
        console.log(
          'Google Calendar iframe loaded, requesting storage access...'
        );
        await requestStorageAccess();
      });
    });
  }

  // Set permissions policy programmatically if needed
  function setStoragePermissions() {
    // Create meta tag for permissions policy if not already set
    if (!document.querySelector('meta[http-equiv="Permissions-Policy"]')) {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Permissions-Policy';
      meta.content =
        'storage-access=(self "https://calendar.google.com" "https://www.google.com")';
      document.head.appendChild(meta);
    }
  }

  // Initialize storage access handling
  function initStorageAccess() {
    // Set permissions
    setStoragePermissions();

    // Handle existing third-party resources
    handleThirdPartyResources();

    // Handle dynamically added content
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const calendarElements = node.querySelectorAll
              ? node.querySelectorAll(
                  '[src*="calendar.google.com"], [href*="calendar.google.com"]'
                )
              : [];

            calendarElements.forEach(element => {
              element.addEventListener('click', async () => {
                console.log(
                  'Requesting storage access for dynamic Google Calendar content...'
                );
                await requestStorageAccess();
              });
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStorageAccess);
  } else {
    initStorageAccess();
  }

  // Expose functions globally for manual use
  window.MIJUG = window.MIJUG || {};
  window.MIJUG.storageAccess = {
    request: requestStorageAccess,
    isSupported: isStorageAccessAPISupported,
  };
})();
