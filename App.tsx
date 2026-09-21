import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  XCircle, 
  Play, 
  FileCode2, 
  BookOpen,
  Globe,
  Key
} from 'lucide-react';
import { TelegramSimulator } from './components/TelegramSimulator';
import { ScriptViewer } from './components/ScriptViewer';
import { SetupGuide } from './components/SetupGuide';
import { SidebarDownload } from './components/SidebarDownload';

export default function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'script' | 'simulator'>('guide');
  
  // State dinamis agar pengguna bisa memasukkan nama situs & token bot apa saja
  const [siteUrl, setSiteUrl] = useState<string>('https://pokerboya.com');
  const [botToken, setBotToken] = useState<string>('8473861493:AAHZepaVlf0bGwhyDw5F_RnqAOj3JX8S158');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 dark:text-white">
                  Telegram Bot Provider Checker
                </h1>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
                  Universal White-Label
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ganti Nama Situs Bebas • Panduan Step-by-Step • Buat Bot Baru @BotFather
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4" /> ✅ SUKSES
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
              <XCircle className="h-4 w-4" /> ❌ FAILED (+Alasan)
            </span>
          </div>
        </div>

        {/* Tab Navigation (Hanya Panduan, Script, & Simulator) */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex space-x-2 sm:space-x-4 border-t border-slate-100 dark:border-slate-800/80 pt-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('guide')}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'guide'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              📖 Panduan Alur, Ganti Web & Bot Baru
            </button>

            <button
              onClick={() => setActiveTab('script')}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'script'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <FileCode2 className="h-4 w-4" />
              💻 Salin & Download Script (bot.py)
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-semibold whitespace-nowrap transition ${
                activeTab === 'simulator'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <Play className="h-4 w-4" />
              Simulasi Bot Telegram
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area: 2 Kolom (Konten Utama + Sidebar Download di Samping) */}
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Main Area */}
          <div className="flex-1 min-w-0 w-full space-y-6">
            {activeTab === 'guide' && <SetupGuide />}
            {activeTab === 'script' && (
              <ScriptViewer 
                siteUrl={siteUrl} 
                setSiteUrl={setSiteUrl} 
                botToken={botToken} 
                setBotToken={setBotToken} 
              />
            )}
            {activeTab === 'simulator' && <TelegramSimulator />}
          </div>

          {/* Sidebar Download di Samping */}
          <SidebarDownload 
            siteUrl={siteUrl} 
            setSiteUrl={setSiteUrl} 
            botToken={botToken} 
            setBotToken={setBotToken} 
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4">
          Telegram Bot Provider Checker • Mudah Ganti Nama Situs & Siap Pakai
        </div>
      </footer>
    </div>
  );
}
