import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Layers, Clock, ShieldAlert, MonitorPlay, ExternalLink } from 'lucide-react';

export const AnalysisOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5 dark:border-amber-900/60 dark:bg-amber-950/20">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-amber-900 dark:text-amber-200">
              Hasil Investigasi: Mengapa Evolution & WIN568 Terdeteksi FAILED?
            </h3>
            <p className="text-sm leading-relaxed text-amber-800/90 dark:text-amber-300/80">
              Berdasarkan 3 screenshot yang Anda lampirkan dan kode Playwright sebelumnya, kegagalan terjadi bukan karena lobi rusak secara permanen, melainkan karena <strong className="font-semibold text-amber-950 dark:text-amber-100">kebocoran tab popup (Tab Leaks)</strong>, <strong className="font-semibold text-amber-950 dark:text-amber-100">waktu tunggu render yang kurang</strong>, serta <strong className="font-semibold text-amber-950 dark:text-amber-100">evaluasi halaman error yang salah sasaran</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Major Causes Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Cause 1 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">Faktor Utama 1</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tab Baru Tidak Ditutup</h4>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Evolution dan WIN568 membuka link game di <em>window/tab baru</em> (<code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">target="_blank"</code>). Di script lama, tab baru <strong>tidak pernah ditutup</strong> (<code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">page.close()</code>).
          </p>
          <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <strong>Dampaknya:</strong> Jika ada 1 provider sebelumnya yang gagal (seperti <span className="text-red-500">Error Code 48</span> di screenshot 2), tab error itu tetap terbuka di urutan paling belakang (<code className="text-xs">context_browser.pages[-1]</code>), sehingga provider berikutnya otomatis terbaca error itu!
          </div>
        </div>

        {/* Cause 2 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Faktor Utama 2</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Loading Redirect Bertahap</h4>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Perhatikan URL di screenshot 3: WIN568 (SBOBET) melakukan redirect dari <code className="text-xs bg-slate-100 dark:bg-slate-800 p-0.5 rounded">sportsbook-auth...</code> ke <code className="text-xs bg-slate-100 dark:bg-slate-800 p-0.5 rounded">sports-sbomaind-play...</code>. Evolution juga melakukan handshake token websocket.
          </p>
          <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <strong>Dampaknya:</strong> Waktu tunggu 6 detik di halaman induk tidak menunggu tab anak. Playwright memeriksa DOM saat URL masih dalam proses redirect / layar putih, sehingga dianggap <em>"Lobby tidak valid"</em>.
          </div>
        </div>

        {/* Cause 3 */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Faktor Utama 3</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Popup Internal & Error Code 48</h4>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Di screenshot 3, SBOBET menampilkan dialog modal <em>"One-match parlay is here!"</em>. Sementara di screenshot 2 muncul error aggregator: <code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">Login in fail, provider error. Error Code = 48</code>.
          </p>
          <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
            <strong>Dampaknya:</strong> Script lama tidak bisa membedakan apakah gagal karena token kedaluwarsa, sedang maintenance, IP diblokir, atau hanya popup overlay yang menutupi klik.
          </div>
        </div>
      </div>

      {/* Visual Evidence Section with Screenshots explanation */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-4 text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MonitorPlay className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Korelasi 3 Screenshot Anda Terhadap Status Pengecekan
        </h3>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Item 1: Evolution */}
          <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-white text-sm">Screenshot 1: Evolution Baccarat</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" /> Berhasil Dimuat
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex-1 leading-relaxed">
              Lobi Evolution sebenarnya terbuka penuh (meja Baccarat Keberuntungan, Sic Bo Super, saldo IDR 0). Dianggap FAILED oleh script lama karena script tidak mengarahkan pembacaan DOM ke tab baru yang dibuka, atau tab Evolution video streaming membebani resource sehingga timeout.
            </p>
            <div className="mt-3 border-t border-slate-200 pt-2.5 text-xs font-mono text-slate-500 dark:border-slate-700">
              Solusi: Gunakan <code className="text-indigo-600 dark:text-indigo-400">expect_page()</code> lalu tutup tab setelah terverifikasi.
            </div>
          </div>

          {/* Item 2: Error Code 48 */}
          <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-white text-sm">Screenshot 2: LoginFlash Error 48</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-semibold text-rose-800 dark:bg-rose-950/60 dark:text-rose-300">
                <XCircle className="h-3.5 w-3.5" /> Provider Error
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex-1 leading-relaxed">
              Pesan: <em>"Login in fail, provider error. Please contact Support. Error Code = 48, undefined"</em> pada URL <code>labangzu.com</code>. Ini adalah kegagalan otentikasi token API provider (bisa karena maintenance server provider, token expire, atau akun game belum terdaftar di vendor).
            </p>
            <div className="mt-3 border-t border-slate-200 pt-2.5 text-xs font-mono text-slate-500 dark:border-slate-700">
              Solusi: Tangkap regex <code>Error Code = (\d+)</code>, coba 3x, jika tetap gagal langsung tutup tab & lapor keterangan lengkap.
            </div>
          </div>

          {/* Item 3: SBOBET WIN568 */}
          <div className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-white text-sm">Screenshot 3: SBOBET by 568Win</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" /> Berhasil Dimuat
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 flex-1 leading-relaxed">
              Lobi Sportsbook SBOBET berhasil terbuka (pasaran bola, odds, Bet Builder). Namun terdapat modal <em>"One-match parlay is here! [Next]"</em>. Di script lama, tab ini dibiarkan terbuka dan memicu tab leaking ke pengecekan berikutnya.
            </p>
            <div className="mt-3 border-t border-slate-200 pt-2.5 text-xs font-mono text-slate-500 dark:border-slate-700">
              Solusi: Otomatis klik tombol close/next pada dialog modal, verifikasi odds/header, lalu <code className="text-indigo-600 dark:text-indigo-400">target_page.close()</code>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
