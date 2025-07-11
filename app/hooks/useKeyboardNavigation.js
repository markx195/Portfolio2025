import { useEffect, useCallback } from 'react';

export function useKeyboardNavigation() {
  const handleKeyDown = useCallback((event) => {
    // Skip to main content
    if (event.key === 'Tab' && event.shiftKey && event.altKey) {
      event.preventDefault();
      const mainContent = document.getElementById('main-content');
      if (mainContent) {
        mainContent.focus();
      }
    }

    // Theme toggle with keyboard shortcut
    if (event.key === 't' && event.ctrlKey) {
      event.preventDefault();
      const themeToggle = document.querySelector('[data-theme-toggle]');
      if (themeToggle) {
        themeToggle.click();
      }
    }

    // Navigation with arrow keys
    if (event.key === 'Escape') {
      // Close mobile menu if open
      const mobileNav = document.querySelector('[data-mobile-nav]');
      if (mobileNav && mobileNav.getAttribute('data-visible') === 'true') {
        const navToggle = document.querySelector('[data-nav-toggle]');
        if (navToggle) {
          navToggle.click();
        }
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { handleKeyDown };
} 