
'use client';

import { useState, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the API structure exposed by preload.js for type safety
declare global {
  interface Window {
    electronAPI: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}

/**
 * A component that renders window control buttons (minimize, maximize, close)
 * only when the application is running within an Electron environment.
 * It does not render on macOS, as it has native window controls.
 */
export function WindowControls() {
  const [isElectron, setIsElectron] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Detect if the app is running in Electron by checking for the API exposed by the preload script.
    const runningInElectron = typeof window !== 'undefined' && !!window.electronAPI;
    setIsElectron(runningInElectron);
    
    if (runningInElectron) {
      // Also check the user agent to determine if the OS is macOS.
      const runningOnMac = navigator.userAgent.includes('Mac');
      setIsMac(runningOnMac);
    }
  }, []);

  // Do not render anything if not in Electron or if on macOS
  if (!isElectron || isMac) {
    return null;
  }

  const handleMinimize = () => window.electronAPI.minimize();
  const handleMaximize = () => window.electronAPI.maximize();
  const handleClose = () => window.electronAPI.close();

  const controlButtonClasses = "p-2 rounded-md hover:bg-black/10 transition-colors duration-150 flex items-center justify-center h-10 w-11 text-foreground";

  return (
    <div
      className='fixed top-0 right-0 z-[101] h-20 flex items-center px-1'
      // This style ensures the buttons themselves are not draggable, allowing them to be clicked.
      style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
    >
      <div className="flex">
        <button onClick={handleMinimize} className={controlButtonClasses} title="Minimize">
          <Minus size={16} />
        </button>
        <button onClick={handleMaximize} className={controlButtonClasses} title="Maximize">
          <Square size={14} />
        </button>
        <button onClick={handleClose} className={cn(controlButtonClasses, "hover:bg-red-500 hover:text-white")} title="Close">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
