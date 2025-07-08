import { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Prevent multiple script insertions
    if (document.querySelector('#google-translate-script')) return;

    // Inject Google Translate script
    const script = document.createElement('script');
    script.id = 'google-translate-script'; // Important to avoid duplicates
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Define callback once
    window.googleTranslateElementInit = () => {
      // Prevent multiple initializations
      if (window.translateInitialized) return;
      window.translateInitialized = true;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );

      // MutationObserver for custom behavior
      const observer = new MutationObserver(() => {
        const selectElement = document.querySelector('.goog-te-combo');
        if (selectElement) {
          selectElement.addEventListener('change', function () {
            setTimeout(() => {
              window.history.pushState({}, '', window.location.pathname);
            }, 100);
          });
          observer.disconnect();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });
    };
  }, []);

  return null;
};

export default GoogleTranslate;
