import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Smartphone, 
  Tablet, 
  Copy, 
  Check, 
  X, 
  Radio, 
  Wifi, 
  WifiOff, 
  ArrowRight, 
  Sparkles,
  RefreshCw,
  Share2
} from 'lucide-react';
import { GameState } from '../types/game';

interface SyncModalProps {
  gameState: GameState;
  activeSeason: string;
  isSerbian: boolean;
  onClose: () => void;
  onLoadGameByCode: (seed: number, playerCount: number) => void;
  isConnectedLive?: boolean;
}

export const SyncModal: React.FC<SyncModalProps> = ({
  gameState,
  activeSeason,
  isSerbian,
  onClose,
  onLoadGameByCode,
  isConnectedLive = false,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');

  // Generate shareable URL
  const baseUrl = window.location.origin + window.location.pathname;
  const shareUrl = `${baseUrl}?seed=${gameState.seed}&p=${gameState.playerCount}&s=${activeSeason}`;
  const displayCode = `KF-${gameState.seed}`;

  useEffect(() => {
    QRCode.toDataURL(shareUrl, {
      width: 280,
      margin: 2,
      color: {
        dark: '#1c1917',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR code generation error:', err));
  }, [shareUrl]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyCode = () => {
    setCodeError('');
    const clean = inputCode.replace(/[^0-9]/g, '');
    if (!clean || clean.length < 5) {
      setCodeError(isSerbian ? 'Unesite ispravan 6-cifreni broj koda.' : 'Please enter a valid 6-digit code.');
      return;
    }
    const seed = parseInt(clean, 10);
    onLoadGameByCode(seed, gameState.playerCount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border-2 border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-medieval font-bold text-lg text-white">
                {isSerbian ? 'Sinhronizacija telefona i tableta' : 'Sync Phone & Tablet'}
              </h2>
              <p className="text-xs text-stone-300">
                {isSerbian ? 'Povežite dva uređaja za isti sto' : 'Pair two devices for the table'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Live Sync Status Banner */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  <Tablet className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  {isSerbian ? 'Ista partija na oba uređaja' : 'Same game on both devices'}
                </span>
                <span className="text-[11px] text-stone-600">
                  {isSerbian ? 'Isti tajlovi, domovi i tajni zimski tajlovi' : 'Same tiles, homes, and winter cards'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{isSerbian ? 'Aktivno' : 'Ready'}</span>
            </div>
          </div>

          {/* Option 1: QR Code Scan */}
          <div className="text-center space-y-3">
            <div className="inline-block p-3 rounded-2xl bg-white border-2 border-stone-200 shadow-md">
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt="Game QR Code" 
                  className="w-52 h-52 sm:w-60 sm:h-60 mx-auto object-contain"
                />
              ) : (
                <div className="w-52 h-52 flex items-center justify-center text-stone-400">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                </div>
              )}
            </div>

            <div>
              <p className="font-medieval font-bold text-stone-900 text-sm">
                {isSerbian ? 'Skenirajte kamerom tableta ovaj QR kod' : 'Scan this QR code with tablet camera'}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                {isSerbian
                  ? 'Kamera na tabletu će odmah otvoriti ovu istu partiju u pretraživaču.'
                  : 'Tablet camera will immediately open this exact game session.'}
              </p>
            </div>
          </div>

          {/* Game Code & Copy Link */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-600 uppercase">
                {isSerbian ? 'Kôd ove partije:' : 'Game Code:'}
              </span>
              <span className="font-mono font-black text-amber-700 text-base bg-amber-100 px-3 py-1 rounded-xl border border-amber-300">
                {displayCode}
              </span>
            </div>

            <button
              onClick={copyToClipboard}
              className="w-full py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-98 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-400" />}
              <span>{copied ? (isSerbian ? 'Link je kopiran!' : 'Link Copied!') : (isSerbian ? 'Kopiraj direktan link za tablet' : 'Copy Direct Link for Tablet')}</span>
            </button>
          </div>

          {/* Option 2: Enter code manually */}
          <div className="pt-2 border-t border-stone-200">
            <label className="block text-xs font-bold text-stone-700 mb-2">
              {isSerbian ? 'Ili se pridružite partiji unošenjem koda:' : 'Or join an existing game by code:'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="npr. 582914 ili KF-582914"
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              <button
                onClick={handleApplyCode}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all active:scale-95"
              >
                {isSerbian ? 'Učitaj' : 'Load'}
              </button>
            </div>
            {codeError && <p className="text-[11px] text-rose-600 mt-1">{codeError}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
          >
            {isSerbian ? 'Zatvori' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
