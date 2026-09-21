import React from 'react';
import { ShieldAlert, Wrench, Globe2, KeyRound, ServerCrash, HelpCircle } from 'lucide-react';

export const ErrorMatrix: React.FC = () => {
  const errorRules = [
    {
      icon: <ServerCrash className="h-5 w-5 text-rose-500" />,
      title: 'Provider Error & Error Code 48',
      matchText: '"Login in fail", "provider error", "Error Code = 48"',
      format: '❌ FAILED (Provider Error (Kode: 48))',
      action: 'Coba 3x, jika tetap gagal, catat kode error spesifiknya dan langsung tutup tab.',
      cause: 'Server aggregator/vendor game menolak pembuatan token sesi pemain atau akun belum didaftarkan di vendor.'
    },
    {
      icon: <Wrench className="h-5 w-5 text-amber-500" />,
      title: 'Sedang Maintenance / Perbaikan',
      matchText: '"maintenance", "pemeliharaan", "under maintenance", "system upgrade"',
      format: '❌ FAILED (Sedang Maintenance / Pemeliharaan Sistem)',
      action: 'Tutup tab seketika setelah 3x percobaan tanpa membebani browser.',
      cause: 'Provider game sedang dalam jadwal upgrade berkala mingguan/harian.'
    },
    {
      icon: <Globe2 className="h-5 w-5 text-purple-500" />,
      title: 'Blokir Wilayah & IP Ditolak',
      matchText: '"restricted area", "geo-blocked", "country not allowed", "ip blocked"',
      format: '❌ FAILED (Blokir Wilayah / IP Tidak Diizinkan)',
      action: 'Catat indikasi pembatasan geografis dan segera tutup browser/tab target.',
      cause: 'Provider game memiliki lisensi regional tertentu dan menolak IP hosting/VPN server Anda.'
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-red-500" />,
      title: 'Proteksi 403 Forbidden / WAF',
      matchText: '"403 forbidden", "access denied", URL mengandung 403',
      format: '❌ FAILED (Akses Ditolak (403 Forbidden))',
      action: 'Auto-close tab dan laporkan adanya proteksi firewall/Cloudflare.',
      cause: 'Proteksi bot Cloudflare atau URL redirect diblokir di level reverse proxy.'
    },
    {
      icon: <KeyRound className="h-5 w-5 text-blue-500" />,
      title: 'Sesi Login Kadaluarsa',
      matchText: '"session expired", "token invalid", "sesi berakhir"',
      format: '❌ FAILED (Sesi Login Kadaluarsa (Perlu /login Ulang))',
      action: 'Berikan instruksi kepada operator untuk menjalankan perintah /login ulang.',
      cause: 'File cookie session.json sudah kadaluarsa dari sisi server Pokerboya.'
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-slate-500" />,
      title: 'Timeout / Halaman Blank',
      matchText: 'Halaman tidak merespon dalam batas waktu timeout setelah 3x percobaan',
      format: '❌ FAILED (Timeout / Gagal Membuka Lobby)',
      action: 'Pastikan tab ditutup dan lepaskan koneksi.',
      cause: 'Koneksi jaringan lambat atau lobi game membutuhkan waktu muat lebih lama dari timeout.'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Daftar Aturan Deteksi Error & Klasifikasi Otomatis
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Sesuai permintaan Anda, script mendeteksi isi halaman untuk memberikan alasan spesifik (apakah karena error provider, maintenance, IP, dsb).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {errorRules.map((rule, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                {rule.icon}
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                {rule.title}
              </h4>
            </div>

            <div className="space-y-2 text-xs flex-1">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Pola Teks yang Dikenali:</span>
                <div className="font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-1.5 rounded mt-0.5">
                  {rule.matchText}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Output Telegram:</span>
                <div className="font-mono text-[11px] font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-1.5 rounded mt-0.5">
                  {rule.format}
                </div>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1">
                <strong>Penyebab:</strong> {rule.cause}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
