import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  Terminal, 
  FileCode2, 
  Globe, 
  Key, 
  Bot,
  Sparkles
} from 'lucide-react';
import { generatePythonScript } from '../pythonCode';

interface SidebarDownloadProps {
  siteUrl: string;
  setSiteUrl: (val: string) => void;
  botToken: string;
  setBotToken: (val: string) => void;
}

export const SidebarDownload: React.FC<SidebarDownloadProps> = ({
  siteUrl,
  setSiteUrl,
  botToken,
  setBotToken
}) => {
  const [copied, setCopied] = useState(false);

  const activeScript = generatePythonScript(siteUrl, botToken);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeScript], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bot.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <aside className="w-full lg:w-84 shrink-0 space-y-4">
      {/* Box Generator & Download Sticky */}
      <div className="rounded-xl border border-indigo-200 bg-white p-5 shadow-sm dark:border-indigo-900/60 dark:bg-slate-900 sticky top-20">
        
        {/* Header Box */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2.5 rounded-lg bg-indigo-600 text-white shadow-xs">
            <FileCode2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Download Script bot.py
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Otomatis terisi sesuai nama situs Anda
            </p>
          </div>
        </div>

        {/* Input Nama Situs & Token Cepat */}
        <div className="space-y-2.5 mb-4 rounded-lg bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200/80 dark:border-slate-800">
          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mb-1">
              <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Nama Situs / URL Website:
            </label>
            <input 
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://pokerboya.com"
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              Ganti ke domain web baru Anda (misal: https://situsbaru.com)
            </span>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1 mb-1">
              <Key className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Token Bot Telegram:
            </label>
            <input 
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="8473861493:AAHZepaVlf..."
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 block">
              Token yang didapat dari @BotFather
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 mb-4">
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm transition active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            Download Script (bot.py)
          </button>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 transition"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Tersalin dengan Nama Situs Baru!' : 'Salin Script Untuk Situs Ini'}
          </button>
        </div>

        {/* Ringkasan Konfigurasi yang Aktif */}
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-2.5 dark:border-slate-800/60 dark:bg-slate-950 text-xs space-y-1.5">
          <div className="font-semibold text-slate-600 dark:text-slate-400 text-[11px] flex items-center gap-1 pb-1 border-b border-slate-200/60 dark:border-slate-800">
            <Sparkles className="h-3 w-3 text-amber-500" />
            Konfigurasi Terpasang Otomatis:
          </div>
          <div className="font-mono text-[10px] space-y-1">
            <div className="truncate">
              <span className="text-slate-400">BASE_URL = </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">"{siteUrl || 'https://pokerboya.com'}"</span>
            </div>
            <div className="truncate">
              <span className="text-slate-400">TOKEN = </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">"{botToken ? botToken.slice(0, 18) + '...' : '8473861493:AAH...'}"</span>
            </div>
          </div>
        </div>

        {/* Perintah Telegram Cepat */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
            <Bot className="h-3.5 w-3.5 text-indigo-500" />
            Perintah Bot di Telegram:
          </div>
          <div className="space-y-1 font-mono text-[11px]">
            <div className="flex justify-between items-center py-0.5">
              <code className="text-indigo-600 dark:text-indigo-400 font-bold">/test</code>
              <span className="text-slate-500 text-[10px] font-sans">Cek login & saldo</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <code className="text-indigo-600 dark:text-indigo-400 font-bold">/login</code>
              <span className="text-slate-500 text-[10px] font-sans">Login akun web baru</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <code className="text-indigo-600 dark:text-indigo-400 font-bold">/check All</code>
              <span className="text-slate-500 text-[10px] font-sans">Cek semua kategori</span>
            </div>
          </div>
        </div>

        {/* Requirements command */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1 flex items-center gap-1">
            <Terminal className="h-3.5 w-3.5 text-slate-500" />
            Install Library di CMD:
          </span>
          <div className="rounded bg-slate-900 p-2 font-mono text-[10px] text-emerald-400 select-all">
            pip install python-telegram-bot playwright<br />
            playwright install chromium
          </div>
        </div>
      </div>
    </aside>
  );
};
