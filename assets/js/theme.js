(function() {
  'use strict';

  const STORAGE_KEY = 'theme-preference';

  /**
   * Get the user's theme preference
   * Priority: localStorage > system preference > light (default)
   */
  function getThemePreference() {
    var storedPreference = localStorage.getItem(STORAGE_KEY);
    if (storedPreference) {
      return storedPreference;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  /**
   * Apply the theme to the document element only (works before DOM is ready)
   */
  function applyThemeToDocument(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Update the toggle button's accessible label
   */
  function updateToggleButton(theme) {
    var button = document.getElementById('theme-toggle');
    if (button) {
      var label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyThemeToDocument(newTheme);
    updateToggleButton(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
  }

  /**
   * Set up event listeners after DOM is ready
   */
  function setupEventListeners() {
    // Set up toggle button click handler
    var toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleTheme);
    }

    // Update button label to match current theme
    var currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateToggleButton(currentTheme);

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem(STORAGE_KEY)) {
          var newTheme = e.matches ? 'dark' : 'light';
          applyThemeToDocument(newTheme);
          updateToggleButton(newTheme);
        }
      });
    }
  }

  // Apply theme immediately to prevent flash of unstyled content
  var theme = getThemePreference();
  applyThemeToDocument(theme);

  // Set up event listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEventListeners);
  } else {
    // DOM is already ready
    setupEventListeners();
  }
})();
