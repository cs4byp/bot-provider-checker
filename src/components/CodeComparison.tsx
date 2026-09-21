import React, { useState } from 'react';
import { Check, Copy, Code2, Sparkles, RefreshCw, XCircle, CheckCircle2 } from 'lucide-react';

export const CodeComparison: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const oldRunCheck = `async def run_check(p_data, page, context_browser):
    for attempt in range(3):
        try:
            if page.is_closed(): return "FAILED (Browser Closed)"
            
            # Anti-Popup: Tutup popup promosi jika muncul
            popup_close = await page.query_selector("button[aria-label='Close'], .modal-close, .close")
            if popup_close: await popup_close.click()

            await page.click(p_data['selector'], timeout=10000)
            await page.wait_for_timeout(6000)
            
            # Membaca isi frame/tab untuk menghindari error 403
            if len(context_browser.pages) > 1:
                content = await context_browser.pages[-1].content()
            elif len(page.frames) > 1:
                content = await page.frames[-1].content()
            else:
                content = await page.content()
                
            if "403" not in content and "Login in fail" not in content:
                return "AMAN"
            raise Exception("Lobby tidak valid")
        except:
            await page.reload(wait_until="networkidle")
            await page.wait_for_timeout(5000)
    return "FAILED"`;

  const newRunCheck = `async def run_check(p_data, page, context_browser):
    """
    Solusi Baru:
    1. Bersihkan tab lama sebelum & sesudah cek (cegah tab leaks)
    2. Tangkap tab baru dengan expect_page()
    3. Coba maksimal 3x jika terjadi kegagalan
    4. Analisis detail error jika gagal (Error Code 48, Maintenance, IP, dll)
    5. Langsung tutup tab target_page.close()
    6. Return format emotikon: ✅ SUKSES atau ❌ FAILED (Keterangan)
    """
    last_failure_reason = "Tidak merespon"
    
    for attempt in range(1, 4):
        target_page = None
        try:
            if page.is_closed():
                return "❌ FAILED (Browser Utama Tertutup)"

            # Tutup tab ekstra dari provider sebelumnya
            await close_extra_tabs(context_browser, page)

            # Tutup popup promosi jika ada
            popup_close = await page.query_selector("button[aria-label='Close'], .modal-close, .close")
            if popup_close and await popup_close.is_visible():
                await popup_close.click()

            element = await page.query_selector(p_data['selector'])
            if not element:
                raise Exception("Tombol provider tidak ditemukan")

            # Dengarkan tab popup baru yang dibuka
            async with context_browser.expect_page(timeout=8000) as new_page_info:
                await element.click(timeout=8000)
            
            target_page = await new_page_info.value

            # Tunggu loading redirect (Evolution & SBOBET butuh waktu)
            await target_page.wait_for_load_state("domcontentloaded", timeout=12000)
            await target_page.wait_for_timeout(4000)

            # Tutup modal internal dalam lobby jika ada (seperti tutorial parlay SBOBET)
            inner_close = await target_page.query_selector(".btn-close, .close, button:has-text('Next')")
            if inner_close and await inner_close.is_visible():
                await inner_close.click()

            content = await target_page.content()
            target_url = target_page.url

            # Cek apakah ada indikasi error
            is_error_url = any(e in target_url.lower() for e in ["error", "loginflash", "fail", "403"])
            is_error_content = any(e in content.lower() for e in [
                "login in fail", "login failed", "provider error", "error code",
                "403 forbidden", "access denied", "maintenance", "pemeliharaan",
                "restricted area", "geo-blocked", "session expired"
            ])

            if is_error_url or is_error_content:
                last_failure_reason = parse_error_reason(content, target_url)
                raise Exception(last_failure_reason)

            # Berhasil masuk!
            return "✅ SUKSES"

        except Exception as err:
            logging.warning(f"[{p_data['name']}] Attempt {attempt}/3 gagal: {err}")
            if attempt < 3:
                try:
                    await page.reload(wait_until="domcontentloaded")
                    await page.wait_for_timeout(3000)
                except Exception:
                    pass
        finally:
            # SANGAT PENTING: Langsung tutup tab provider agar tidak menumpuk!
            if target_page and not target_page.is_closed():
                try:
                    await target_page.close()
                except Exception:
                    pass
            await close_extra_tabs(context_browser, page)

    # Gagal setelah 3x percobaan:
    return f"❌ FAILED ({last_failure_reason})"`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Perbandingan Kode: Fungsi `run_check`
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Lihat perubahan struktural yang menyelesaikan masalah freeze, tab menumpuk, dan error misterius.
          </p>
        </div>
        <button
          onClick={() => copyToClipboard(newRunCheck)}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Tersalin ke Clipboard' : 'Salin Kode Baru'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Old Code Box */}
        <div className="flex flex-col rounded-xl border border-red-200 bg-red-50/20 dark:border-red-900/40 dark:bg-red-950/10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-red-200/80 bg-red-100/50 px-4 py-2.5 dark:border-red-900/40 dark:bg-red-950/30">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-xs font-bold text-red-900 dark:text-red-300">KODE LAMA (Penyebab Masalah)</span>
            </div>
            <span className="text-[11px] text-red-700 dark:text-red-400 font-mono">Bug: Tab Leaks & False Fail</span>
          </div>
          <div className="p-4 bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed flex-1">
            <pre>{oldRunCheck}</pre>
          </div>
          <div className="p-3 bg-red-50 border-t border-red-200/80 text-xs text-red-800 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300 space-y-1">
            <div className="font-semibold">Kelemahan Kode Lama:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
              <li>Tab baru tidak pernah di-close (<code className="text-red-600 dark:text-red-400">target_page.close()</code>).</li>
              <li><code className="text-red-600 dark:text-red-400">context_browser.pages[-1]</code> mengambil tab paling akhir yang bisa jadi tab error lama.</li>
              <li>Hanya mengecek kata "403" dan "Login in fail" tanpa rincian error.</li>
            </ul>
          </div>
        </div>

        {/* New Code Box */}
        <div className="flex flex-col rounded-xl border border-emerald-200 bg-emerald-50/20 dark:border-emerald-900/40 dark:bg-emerald-950/10 overflow-hidden">
          <div className="flex items-center justify-between border-b border-emerald-200/80 bg-emerald-100/50 px-4 py-2.5 dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">KODE BARU (Dioptimasi)</span>
            </div>
            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">Auto-close & Detail Error</span>
          </div>
          <div className="p-4 bg-slate-900 text-emerald-200/95 font-mono text-xs overflow-x-auto leading-relaxed flex-1">
            <pre>{newRunCheck}</pre>
          </div>
          <div className="p-3 bg-emerald-50 border-t border-emerald-200/80 text-xs text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300 space-y-1">
            <div className="font-semibold">Peningkatan Kode Baru:</div>
            <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
              <li>Mendeteksi tab baru secara tepat lewat <code className="text-emerald-700 dark:text-emerald-300">expect_page()</code>.</li>
              <li>Otomatis menutup tab target & ekstra di blok <code className="text-emerald-700 dark:text-emerald-300">finally</code>.</li>
              <li>Menganalisis Error Code 48, Maintenance, Geo-IP, Sesi Expired.</li>
              <li>Menambahkan emotikon ✅ untuk Sukses dan ❌ untuk Failed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
