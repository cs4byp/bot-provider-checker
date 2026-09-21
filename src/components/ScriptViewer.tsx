import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Globe, Key, Sparkles, RefreshCw } from 'lucide-react';
import { generatePythonScript } from '../pythonCode';

interface ScriptViewerProps {
  siteUrl: string;
  setSiteUrl: (val: string) => void;
  botToken: string;
  setBotToken: (val: string) => void;
}

export const ScriptViewer: React.FC<ScriptViewerProps> = ({
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
    <div className="space-y-4">
      {/* Box Generator Nama Situs */}
      <div className="rounded-xl border border-indigo-200 bg-white p-5 shadow-xs dark:border-indigo-900/60 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Sesuaikan Nama Situs & Token Bot Sebelum Salin / Download
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Ketik nama domain situs Anda dan token bot di bawah. Kode script di bawah akan otomatis terisi dengan nama situs tersebut secara instan!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
              <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              Nama Situs / URL Website:
            </label>
            <input 
              type="text"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://pokerboya.com"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Contoh: <code>https://pokerboya.com</code> atau situs white-label Anda lainnya
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1.5">
              <Key className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              Token Bot Telegram:
            </label>
            <input 
              type="text"
              value={botToken}
              onChange={(e) => setBotToken(e.target.value)}
              placeholder="8473861493:AAHZepaVlf0bGwhyDw5F_RnqAOj3JX8S158"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
              Didapatkan dari <strong>@BotFather</strong> di Telegram
            </span>
          </div>
        </div>
      </div>

      {/* Code Viewer Panel */}
      <div className="rounded-xl border border-slate-200 bg-slate-950 shadow-sm dark:border-slate-800 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-indigo-400" />
            <span className="font-mono text-xs font-bold text-slate-200">bot.py</span>
            <span className="rounded bg-emerald-950/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-800/60">
              Target: {siteUrl || 'https://pokerboya.com'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition active:scale-95"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Tersalin!' : 'Salin Kode'}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition active:scale-95 shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Download bot.py
            </button>
          </div>
        </div>

        <div className="relative max-h-[580px] overflow-auto p-4 font-mono text-xs text-slate-300">
          <pre className="leading-relaxed">
            <code>{activeScript}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
