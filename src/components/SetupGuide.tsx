import React from 'react';
import { 
  KeyRound, 
  Terminal, 
  CheckCircle2, 
  AlertCircle, 
  FileJson, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  Smartphone,
  Server,
  FolderGit2,
  Bot,
  Globe,
  Trash2,
  ExternalLink,
  Zap,
  HelpCircle
} from 'lucide-react';

export const SetupGuide: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Banner Ringkasan 3 Fitur Baru */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/50 dark:bg-indigo-950/20 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white shrink-0">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              1. Alur Step-by-Step
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Panduan menjalankan bot dari nol sampai log tercatat di admin.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/20 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              2. Buat Bot Telegram Baru
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Cara mendapatkan token HTTP API lewat @BotFather dalam 1 menit.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-600 text-white shrink-0">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              3. Cara Ganti Website
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Cukup ubah <code>BASE_URL</code> untuk pindah ke situs white-label mana saja.
            </p>
          </div>
        </div>
      </div>

      {/* MODUL 1: CARA BUAT TELEGRAM BOT BARU */}
      <div className="rounded-xl border border-blue-200 bg-white p-6 shadow-xs dark:border-blue-900/60 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
            🤖
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Panduan 1: Cara Membuat Bot Telegram Baru (Dapat Token API)
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          Jika Anda ingin menggunakan akun bot Telegram baru sendiri atau bot terpisah untuk masing-masing website:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600 dark:text-blue-400">Langkah 1</span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded font-bold">Cari Akun</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Buka aplikasi Telegram, lalu cari akun resmi: <br />
              <code className="text-blue-600 dark:text-blue-400 font-bold bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded inline-block mt-1">@BotFather</code>
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600 dark:text-blue-400">Langkah 2</span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded font-bold">Perintah Buat</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Ketik perintah di chat: <br />
              <code className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded inline-block mt-1">/newbot</code>
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600 dark:text-blue-400">Langkah 3</span>
              <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded font-bold">Beri Nama</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              Kirim Nama Bebas (misal: <em>Checker Provider</em>), lalu Username wajib berakhiran <code>_bot</code> (contoh: <code>cek_game_bot</code>).
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-600 dark:text-blue-400">Langkah 4</span>
              <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 px-1.5 py-0.5 rounded font-bold">Salin Token</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300">
              @BotFather akan memberikan pesan berisi: <br />
              <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-[11px]">Use this token to access the HTTP API: ...</strong>
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-900 p-3 text-xs text-slate-200 font-mono">
          <span className="text-slate-400 block mb-1"># Pasang token baru tersebut di baris atas file bot.py:</span>
          <span className="text-indigo-400">TOKEN</span> = <span className="text-emerald-400">"1234567890:AAHxxxxxxxxx_TokenDariBotFatherAnda"</span>
        </div>
      </div>

      {/* MODUL 2: CARA GANTI WEBSITE (WHITE-LABEL) */}
      <div className="rounded-xl border border-emerald-200 bg-white p-6 shadow-xs dark:border-emerald-900/60 dark:bg-slate-900">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
            🌐
          </span>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Panduan 2: Cara Mengganti Website Target (Untuk White-Label HKB / Serupa)
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
          Karena website white-label memiliki struktur HTML dan selector game yang identik, Anda <strong>TIDAK PERLU</strong> mengedit ulang tombol atau provider. Cukup ikuti 3 langkah mudah ini:
        </p>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-[11px]">
              1
            </span>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">
                Ganti <code>BASE_URL</code> di Baris Atas <code>bot.py</code>
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Buka file <code>bot.py</code> di Notepad, lalu ubah URL website target pada baris ke-14:
              </p>
              <div className="rounded bg-slate-900 p-2 font-mono text-emerald-400 text-[11px] mt-1">
                BASE_URL = "https://situs-baru-anda.com"  <span className="text-slate-500"># Ganti dengan alamat web baru</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-600 font-bold text-white text-[11px]">
              2
            </span>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">
                Hapus File Sesi Login Lama (<code>session.json</code>)
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Karena ganti website, cookies sesi dari website lama sudah tidak berlaku. Buka folder bot Anda di komputer, cari file bernama <code className="font-bold text-rose-600 dark:text-rose-400">session.json</code> dan <strong>HAPUS (Delete)</strong> file tersebut.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-[11px]">
              3
            </span>
            <div className="space-y-1">
              <span className="font-bold text-slate-900 dark:text-white">
                Jalankan Bot & Login Ulang di Website Baru
              </span>
              <p className="text-slate-600 dark:text-slate-400">
                Jalankan <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">python bot.py</code> di CMD. Buka Telegram bot Anda dan kirim perintah:
              </p>
              <div className="rounded bg-slate-100 dark:bg-slate-800 p-2 font-mono text-[11px] text-indigo-700 dark:text-indigo-300">
                👉 /login
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                Browser akan otomatis terbuka mengarah ke website baru Anda. Silakan login akun member di sana sampai saldo terlihat, lalu tutup browsernya. Bot akan menyimpan <code>session.json</code> website baru tersebut secara otomatis!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODUL 3: ALUR STEP-BY-STEP LENGKAP PENGOPERASIAN BOT */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
          <Terminal className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Panduan 3: Alur Operasional Step-by-Step Lengkap (A to Z)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Langkah harian menjalankan pengecekan provider dari awal sampai selesai:
        </p>

        <div className="space-y-6">
          {/* STEP 1 */}
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-xs">
              1
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Persiapan File Script di Komputer / VPS
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Download file <code className="font-bold text-indigo-600 dark:text-indigo-400">bot.py</code> melalui tombol <strong>Download di samping</strong> (atau salin kodenya ke Notepad dan simpan dengan nama <code>bot.py</code>).
              </p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-xs">
              2
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Install Library Playwright & Telegram di CMD
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Buka Command Prompt (CMD) di folder tersebut, lalu ketik perintah:
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="rounded-lg bg-slate-900 p-2.5 text-emerald-400">
                  <span className="text-slate-500 block mb-1"># 1. Install library telegram & automation browser:</span>
                  pip install python-telegram-bot playwright
                </div>
                <div className="rounded-lg bg-slate-900 p-2.5 text-cyan-400">
                  <span className="text-slate-500 block mb-1"># 2. Install browser Chromium:</span>
                  playwright install chromium
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-xs">
              3
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Jalankan Bot di Terminal
              </h4>
              <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-xs text-emerald-400">
                python bot.py
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Terminal akan menampilkan status: <code className="text-emerald-600 dark:text-emerald-400">Bot siap dijalankan (Target Web: https://...)...</code>
              </p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-bold text-white text-xs">
              4
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Periksa Sesi Akun di Telegram
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Kirim perintah berikut di Telegram:
              </p>
              <div className="rounded-lg bg-slate-50 dark:bg-slate-800/60 p-3 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono font-bold text-indigo-600 dark:text-indigo-400">/test</code>
                  <span className="text-slate-600 dark:text-slate-300">→ Memastikan bot mengenali user login & saldo Anda.</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded font-mono font-bold text-indigo-600 dark:text-indigo-400">/login</code>
                  <span className="text-slate-600 dark:text-slate-300">→ Buka browser jika statusnya belum terlogin.</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 5 */}
          <div className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 font-bold text-white text-xs">
              5
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Jalankan Pengecekan Provider
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Kirim perintah per kategori atau cek seluruh website:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="rounded bg-slate-100 p-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  <strong className="text-indigo-600 dark:text-indigo-400">/check CASINO</strong>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">Cek Evolution, Pragmatic Live, DG, WIN568, Microgaming, dll</div>
                </div>
                <div className="rounded bg-slate-100 p-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  <strong className="text-indigo-600 dark:text-indigo-400">/check SPORTSBOOK</strong>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">Cek WIN568 SBOBET, CMD, BTI, BPG, dll</div>
                </div>
                <div className="rounded bg-slate-100 p-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  <strong className="text-indigo-600 dark:text-indigo-400">/check SLOT</strong>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">Cek PGSOFT, Pragmatic Slot, Habanero, dll</div>
                </div>
                <div className="rounded bg-slate-100 p-2.5 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                  <strong className="text-indigo-600 dark:text-indigo-400">/check All</strong>
                  <div className="text-[11px] text-slate-500 font-sans mt-0.5">Cek SEMUA kategori sekaligus (Slot, Casino, Bola, Arcade, Sabung)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
