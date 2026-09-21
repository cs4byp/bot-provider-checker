import React, { useState, useEffect } from 'react';
import { Send, Play, RotateCcw, CheckCircle2, XCircle, AlertCircle, Sparkles, Terminal, Smartphone, Laptop } from 'lucide-react';

interface SimulatedLog {
  timestamp: string;
  type: 'info' | 'warn' | 'success' | 'fail';
  message: string;
}

interface ProviderSim {
  name: string;
  category: 'CASINO' | 'SPORTSBOOK' | 'SLOT';
  status: 'pending' | 'checking' | 'success' | 'failed';
  reason?: string;
  attempts: number;
}

export const TelegramSimulator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'CASINO' | 'SPORTSBOOK' | 'SLOT'>('CASINO');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<SimulatedLog[]>([]);
  const [providers, setProviders] = useState<ProviderSim[]>([
    { name: 'Pragmatic Play', category: 'CASINO', status: 'pending', attempts: 0 },
    { name: 'Evolution', category: 'CASINO', status: 'pending', attempts: 0 },
    { name: 'Dream Gaming', category: 'CASINO', status: 'pending', attempts: 0 },
    { name: 'WIN568 Casino', category: 'CASINO', status: 'pending', attempts: 0 },
    { name: 'Microgaming', category: 'CASINO', status: 'pending', attempts: 0 },
    { name: 'Ezugi', category: 'CASINO', status: 'pending', attempts: 0 },
  ]);

  const [deviceView, setDeviceView] = useState<'mobile' | 'desktop'>('mobile');

  const addLog = (type: 'info' | 'warn' | 'success' | 'fail', message: string) => {
    const time = new Date().toLocaleTimeString('id-ID', { hour12: false });
    setLogs((prev) => [...prev.slice(-30), { timestamp: time, type, message }]);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    let initialList: ProviderSim[] = [];
    if (activeCategory === 'CASINO') {
      initialList = [
        { name: 'Pragmatic Play', category: 'CASINO', status: 'pending', attempts: 0 },
        { name: 'Evolution', category: 'CASINO', status: 'pending', attempts: 0 },
        { name: 'Dream Gaming', category: 'CASINO', status: 'pending', attempts: 0 },
        { name: 'WIN568 Casino', category: 'CASINO', status: 'pending', attempts: 0 },
        { name: 'Microgaming', category: 'CASINO', status: 'pending', attempts: 0 },
        { name: 'Ezugi', category: 'CASINO', status: 'pending', attempts: 0 },
      ];
    } else if (activeCategory === 'SPORTSBOOK') {
      initialList = [
        { name: 'BPG Sports', category: 'SPORTSBOOK', status: 'pending', attempts: 0 },
        { name: 'WIN568 (SBOBET)', category: 'SPORTSBOOK', status: 'pending', attempts: 0 },
        { name: 'CMD Sports', category: 'SPORTSBOOK', status: 'pending', attempts: 0 },
        { name: 'BTI Sports', category: 'SPORTSBOOK', status: 'pending', attempts: 0 },
        { name: 'IMONE SB', category: 'SPORTSBOOK', status: 'pending', attempts: 0 },
      ];
    } else {
      initialList = [
        { name: 'PGSOFT', category: 'SLOT', status: 'pending', attempts: 0 },
        { name: 'Pragmatic Play', category: 'SLOT', status: 'pending', attempts: 0 },
        { name: 'Habanero', category: 'SLOT', status: 'pending', attempts: 0 },
        { name: 'Joker Gaming', category: 'SLOT', status: 'pending', attempts: 0 },
      ];
    }
    setProviders(initialList);
    setLogs([]);
  };

  const handleCategoryChange = (cat: 'CASINO' | 'SPORTSBOOK' | 'SLOT') => {
    setActiveCategory(cat);
  };

  useEffect(() => {
    resetSimulation();
  }, [activeCategory]);

  const runSimulation = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setLogs([]);
    addLog('info', `Memulai pengecekan kategori ${activeCategory}...`);
    addLog('info', `Membuka context browser dan login session.json...`);

    const updated = [...providers];

    for (let i = 0; i < updated.length; i++) {
      const p = updated[i];
      p.status = 'checking';
      setProviders([...updated]);
      addLog('info', `Mengecek [${i + 1}/${updated.length}] ${p.name}...`);

      // Simulate attempt cycle
      if (p.name === 'Evolution') {
        // Evolution Simulation: Opens new tab, waits for domcontentloaded, closes extra tab, success!
        addLog('info', `[Evolution] Menangkap popup window baru dengan expect_page()...`);
        await new Promise((r) => setTimeout(r, 900));
        addLog('info', `[Evolution] Tab live lobby dimuat (URL: baccarat & sicbo)...`);
        await new Promise((r) => setTimeout(r, 800));
        addLog('info', `[Evolution] Verifikasi sukses! Menutup tab live stream (RAM freed)...`);
        p.status = 'success';
        p.attempts = 1;
        setProviders([...updated]);
        addLog('success', `[Evolution] Status: ✅ SUKSES`);
      } else if (p.name === 'WIN568 Casino') {
        // Simulating Error Code 48 (screenshot 2)
        addLog('warn', `[WIN568 Casino] Attempt 1/3: Membuka URL labangzu.com...`);
        await new Promise((r) => setTimeout(r, 800));
        addLog('warn', `[WIN568 Casino] Terdeteksi 'Login in fail, provider error. Error Code = 48'`);
        addLog('info', `[WIN568 Casino] Menutup tab error, retry attempt 2/3...`);
        await new Promise((r) => setTimeout(r, 700));
        addLog('warn', `[WIN568 Casino] Attempt 2/3: Masih terdeteksi Error Code 48. Menutup tab...`);
        await new Promise((r) => setTimeout(r, 700));
        addLog('warn', `[WIN568 Casino] Attempt 3/3: Error Code 48 menetap.`);
        addLog('fail', `[WIN568 Casino] Mencapai batas 3x percobaan. Langsung menutup tab dan tandai FAILED.`);
        p.status = 'failed';
        p.attempts = 3;
        p.reason = 'Provider Error (Kode: 48)';
        setProviders([...updated]);
        addLog('fail', `[WIN568 Casino] Status: ❌ FAILED (Provider Error (Kode: 48))`);
      } else if (p.name === 'WIN568 (SBOBET)') {
        // Simulating screenshot 3: Opens SBOBET, handles tutorial parlay modal, verifies odds table, closes tab!
        addLog('info', `[WIN568] Menangkap popup redirect sports-sbomaind-play...`);
        await new Promise((r) => setTimeout(r, 900));
        addLog('info', `[WIN568] Terdeteksi modal 'One-match parlay is here', klik tombol tutup otomatis...`);
        await new Promise((r) => setTimeout(r, 800));
        addLog('info', `[WIN568] Pasaran odds & menu sports terverifikasi. Menutup tab...`);
        p.status = 'success';
        p.attempts = 1;
        setProviders([...updated]);
        addLog('success', `[WIN568] Status: ✅ SUKSES`);
      } else if (p.name === 'Microgaming') {
        // Simulating a Maintenance error
        addLog('warn', `[Microgaming] Attempt 1/3: Halaman memuat pesan 'System Under Scheduled Maintenance'...`);
        await new Promise((r) => setTimeout(r, 700));
        addLog('info', `[Microgaming] Menutup tab, retry attempt 2/3...`);
        await new Promise((r) => setTimeout(r, 600));
        addLog('warn', `[Microgaming] Attempt 2/3: Sedang maintenance.`);
        addLog('fail', `[Microgaming] Coba 3x gagal, langsung tutup tab.`);
        p.status = 'failed';
        p.attempts = 3;
        p.reason = 'Sedang Maintenance / Pemeliharaan Sistem';
        setProviders([...updated]);
        addLog('fail', `[Microgaming] Status: ❌ FAILED (Sedang Maintenance / Pemeliharaan Sistem)`);
      } else {
        // Normal success
        await new Promise((r) => setTimeout(r, 600));
        addLog('info', `[${p.name}] Tab terbuka, tidak ada pesan error. Menutup tab...`);
        p.status = 'success';
        p.attempts = 1;
        setProviders([...updated]);
        addLog('success', `[${p.name}] Status: ✅ SUKSES`);
      }

      await new Promise((r) => setTimeout(r, 400));
    }

    addLog('success', `Pengecekan kategori ${activeCategory} selesai.`);
    setIsRunning(false);
  };

  const successCount = providers.filter((p) => p.status === 'success').length;
  const failCount = providers.filter((p) => p.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pilih Kategori:</span>
          {(['CASINO', 'SPORTSBOOK', 'SLOT'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => !isRunning && handleCategoryChange(cat)}
              disabled={isRunning}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 dark:border-slate-800 dark:bg-slate-800">
            <button
              onClick={() => setDeviceView('mobile')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                deviceView === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Mobile
            </button>
            <button
              onClick={() => setDeviceView('desktop')}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                deviceView === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Laptop className="h-3.5 w-3.5" /> Desktop
            </button>
          </div>

          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50 transition"
          >
            <Play className={`h-4 w-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Sedang Mengecek...' : 'Jalankan Simulasi Bot'}
          </button>
          <button
            onClick={resetSimulation}
            disabled={isRunning}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Simulator Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Live Terminal Logs */}
        <div className="lg:col-span-6 flex flex-col rounded-xl border border-slate-800 bg-slate-950 shadow-md overflow-hidden min-h-[460px]">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-mono font-semibold text-slate-300">
                Playwright Execution Log (Terminal)
              </span>
            </div>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
              <span className={`h-2 w-2 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              {isRunning ? 'LIVE RUNNING' : 'IDLE'}
            </span>
          </div>

          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1.5 text-slate-300 select-text">
            {logs.length === 0 ? (
              <div className="text-slate-500 italic">
                Klik tombol "Jalankan Simulasi Bot" di atas untuk melihat alur penanganan tab baru, retry 3x, auto-close, dan deteksi error...
              </div>
            ) : (
              logs.map((l, idx) => (
                <div key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-slate-500 select-none">[{l.timestamp}]</span>
                  <span
                    className={
                      l.type === 'success'
                        ? 'text-emerald-400 font-semibold'
                        : l.type === 'fail'
                        ? 'text-rose-400 font-semibold'
                        : l.type === 'warn'
                        ? 'text-amber-300'
                        : 'text-slate-300'
                    }
                  >
                    {l.message}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-slate-800 bg-slate-900/70 px-4 py-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Attempt Rule: Max 3x</span>
            <span>Tab Auto-Close: Enabled (Active)</span>
          </div>
        </div>

        {/* Right Col: Telegram Interface Mockup */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            className={`w-full transition-all duration-300 rounded-2xl border border-slate-300 bg-slate-100 dark:border-slate-800 dark:bg-slate-950 p-3 shadow-md flex flex-col ${
              deviceView === 'mobile' ? 'max-w-md' : 'max-w-full'
            }`}
          >
            {/* Telegram Header */}
            <div className="flex items-center gap-3 rounded-t-xl bg-[#2AABEE] px-4 py-3 text-white">
              <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                🤖
              </div>
              <div className="flex-1 leading-tight">
                <div className="font-bold text-sm">Pokerboya Provider Bot</div>
                <div className="text-[11px] opacity-80">bot • online</div>
              </div>
            </div>

            {/* Telegram Chat Area */}
            <div className="flex-1 bg-[#0e1621] p-4 text-white overflow-y-auto space-y-3 min-h-[380px]">
              {/* User Command bubble */}
              <div className="flex justify-end">
                <div className="rounded-xl rounded-tr-none bg-[#2b5278] px-3 py-1.5 text-xs text-white max-w-[85%]">
                  /check {activeCategory}
                  <div className="text-[9px] text-slate-300 text-right mt-0.5">19:05</div>
                </div>
              </div>

              {/* Bot Response Bubble */}
              <div className="flex justify-start">
                <div className="rounded-xl rounded-tl-none bg-[#182533] px-3.5 py-2.5 text-xs text-white max-w-[95%] border border-slate-800/80 shadow-xs space-y-2">
                  <div className="font-semibold text-slate-200 border-b border-slate-700/60 pb-1.5 flex items-center justify-between">
                    <span>Hasil Pengecekan {activeCategory}:</span>
                    {isRunning && (
                      <span className="text-[10px] text-amber-400 animate-pulse">Sedang Berjalan...</span>
                    )}
                  </div>

                  <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
                    {providers.map((p, idx) => {
                      if (p.status === 'pending') {
                        return (
                          <div key={idx} className="text-slate-500">
                            ⏳ {p.name}: Menunggu antrean...
                          </div>
                        );
                      }
                      if (p.status === 'checking') {
                        return (
                          <div key={idx} className="text-amber-400 flex items-center gap-1.5">
                            <span className="animate-spin inline-block">🔄</span>
                            <span>Mengecek {p.name}...</span>
                          </div>
                        );
                      }
                      if (p.status === 'success') {
                        return (
                          <div key={idx} className="text-emerald-400">
                            ✅ SUKSES - <strong className="text-slate-100 font-sans">{p.name}</strong>
                          </div>
                        );
                      }
                      return (
                        <div key={idx} className="text-rose-400">
                          ❌ FAILED ({p.reason}) - <strong className="text-slate-100 font-sans">{p.name}</strong>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary Footer */}
                  {!isRunning && (successCount > 0 || failCount > 0) && (
                    <div className="mt-2.5 pt-2 border-t border-slate-700/70 text-[11px] text-slate-300">
                      <div>📊 <strong>Rekap Hasil:</strong></div>
                      <div className="text-emerald-400">✅ Sukses: {successCount} provider</div>
                      <div className="text-rose-400">❌ Failed: {failCount} provider</div>
                    </div>
                  )}

                  <div className="text-[9px] text-slate-400 text-right mt-1">19:05 ✓✓</div>
                </div>
              </div>
            </div>

            {/* Telegram Input Bar Mockup */}
            <div className="mt-2 flex items-center gap-2 rounded-b-xl bg-[#17212b] px-3 py-2 text-slate-400 text-xs">
              <span className="text-slate-500">Tulis pesan...</span>
              <div className="ml-auto flex items-center gap-2">
                <Send className="h-4 w-4 text-[#2AABEE]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
