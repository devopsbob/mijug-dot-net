/**
 * Print Helper - Adds current date and version info when printing
 * Automatically injects print date information for MIJUG workshop materials
 */

(function () {
  'use strict';

  // Add print date information when page loads
  function addPrintInfo() {
    const now = new Date();
    const printDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    // Set data attributes on body for CSS to use
    document.body.setAttribute('data-print-date', printDate);

    // Try to get version from page meta or use current date
    const metaVersion = document.querySelector('meta[name="version"]');
    const version = metaVersion ? metaVersion.content : printDate;
    document.body.setAttribute('data-version', version);

    // Get document title and set it as data attribute
    const docTitle = document.title.split(' | ')[0] || document.title;
    document.body.setAttribute('data-document-title', docTitle);

    // Inject CSS with the current dates
    updatePrintCSS(printDate, version);
  }

  // Function to update CSS with current dates
  function updatePrintCSS(printDate, version) {
    // Remove existing print date style if it exists
    const existingStyle = document.getElementById('print-date-css');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element with print date information
    const style = document.createElement('style');
    style.id = 'print-date-css';
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
    document.head.appendChild(style);
  }

  // Add print date when page is printed
  function handlePrint() {
    const now = new Date();
    const printDate = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Update print date attributes
    document.body.setAttribute('data-print-date', printDate);

    // Get version and update CSS with current print time
    const version = document.body.getAttribute('data-version') || printDate;
    updatePrintCSS(printDate, version);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addPrintInfo);
  } else {
    addPrintInfo();
  }

  // Update date when printing
  window.addEventListener('beforeprint', handlePrint);

  // Also handle Ctrl+P detection
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
      handlePrint();
    }
  });
})();
