import { useState, useEffect } from 'react';

export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        setInstallPrompt(e);
        console.log('PWA install prompt is available');
      });

      window.addEventListener('appinstalled', () => {
        console.log('PWA installed successfully - triggering event');
        if (window.gtag) {
          window.gtag('event', 'pwa_install', {
            event_category: 'PWA',
            event_label: 'Install Success'
          });
        }
        setInstalled(true);
        setInstallPrompt(null);
      });
    }
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    console.log('Install button clicked - showing prompt');
    installPrompt.prompt();
    const choiceResult = await installPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted PWA install - triggering event');
      if (window.gtag) {
        window.gtag('event', 'pwa_install_accepted', {
          event_category: 'PWA',
          event_label: 'Install Prompt Accepted'
        });
      }
    } else {
      console.log('User declined PWA install - triggering event');
      if (window.gtag) {
        window.gtag('event', 'pwa_install_declined', {
          event_category: 'PWA',
          event_label: 'Install Prompt Declined'
        });
      }
    }
    setInstallPrompt(null);
  };

  const handleDismiss = () => {
    console.log('User dismissed PWA install - triggering event');
    if (window.gtag) {
      window.gtag('event', 'pwa_install_dismissed', {
        event_category: 'PWA',
        event_label: 'Install Prompt Dismissed'
      });
    }
    setInstallPrompt(null);
  };

  if (!installPrompt || installed) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
      <button 
        onClick={handleDismiss}
        className="text-white hover:text-gray-200"
        aria-label="Dismiss install prompt"
      >
        ×
      </button>
      <button onClick={handleInstallClick}>
        Download App to Home Screen
      </button>
    </div>
  );
} 