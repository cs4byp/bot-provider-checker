export function generatePythonScript(siteUrl: string = "https://pokerboya.com", botToken: string = "8473861493:AAHZepaVlf0bGwhyDw5F_RnqAOj3JX8S158"): string {
  // Bersihkan input url jika ada trailing slash
  let cleanUrl = siteUrl.trim();
  if (cleanUrl.endsWith('/')) {
    cleanUrl = cleanUrl.slice(0, -1);
  }
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = `https://${cleanUrl}`;
  }

  const cleanToken = botToken.trim() || "8473861493:AAHZepaVlf0bGwhyDw5F_RnqAOj3JX8S158";

  return `import logging
import os
import re
import asyncio
from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
from playwright.async_api import async_playwright

# ==============================================================================
# ⚙️ PENGATURAN UTAMA (NAMA SITUS & TOKEN BOT TELEGRAM)
# ==============================================================================
# 1. TOKEN Bot Telegram dari @BotFather:
TOKEN = "${cleanToken}"

# 2. URL Website Target:
BASE_URL = "${cleanUrl}"

# 3. (Opsional) Akun untuk auto-login:
PB_USERNAME = os.environ.get("PB_USERNAME", "USER_ID_ANDA")
PB_PASSWORD = os.environ.get("PB_PASSWORD", "PASSWORD_ANDA")
# ==============================================================================

logging.basicConfig(format='%(asctime)s - %(levelname)s - %(message)s', level=logging.INFO)

# --- DAFTAR LENGKAP KATEGORI & PROVIDER ---
ALL_CATEGORIES = {
    "CASINO": {
        "url": f"\${BASE_URL}/livecasino",
        "is_catalog_type": False,
        "providers": [
            {"name": "Pragmatic Play", "selector": 'a[onclick*="PP"]'},
            {"name": "Evolution", "selector": 'a[onclick*="EVO"]'},
            {"name": "Dream Gaming", "selector": 'a[onclick*="DG"]'},
            {"name": "WIN568 Casino", "selector": 'a[onclick*="win568Casino"]'},
            {"name": "OGPS", "selector": 'a[onclick*="OGPS"]'},
            {"name": "PTIM", "selector": 'a[onclick*="PTIM"]'},
            {"name": "SAG", "selector": 'a[onclick*="SAG"]'},
            {"name": "Microgaming", "selector": 'a[onclick*="MG"]'},
            {"name": "PopOk Gaming", "selector": 'a[onclick*="POPOK"]'},
            {"name": "HG", "selector": 'a[onclick*="HG"]'},
            {"name": "VG", "selector": 'a[onclick*="VG"]'},
            {"name": "WMC", "selector": 'a[onclick*="WMC"], a[onclick*="WM"], a[onclick*="wmCasino"]'},
            {"name": "Ezugi", "selector": 'a[onclick*="EZUGI"]'},
            {"name": "PA1", "selector": 'a[onclick*="PA1"]'},
            {"name": "BGM", "selector": 'a[onclick*="BGM"]'},
            {"name": "BPG (Allbet)", "selector": 'a[onclick*="Allbet"]'},
            {"name": "CQ9", "selector": 'a[onclick*="CQ9"]'},
            {"name": "Skywind", "selector": 'a[onclick*="SKW"]'},
            {"name": "GPI", "selector": 'a[onclick*="GPI"]'},
        ]
    },
    "SPORTSBOOK": {
        "url": f"\${BASE_URL}/sportsbook",
        "is_catalog_type": False,
        "providers": [
            {"name": "BPG", "selector": 'a[onclick*="BPG"]'},
            {"name": "WIN568", "selector": 'a[onclick*="win568SportsBook"]'},
            {"name": "CMD", "selector": 'a[onclick*="CMD"]'},
            {"name": "BTI", "selector": 'a[onclick*="BTI"]'},
            {"name": "IMONE SB", "selector": 'a[onclick*="IMSB"], a[onclick*="IMONE"]'},
            {"name": "eSportsBull", "selector": 'a[onclick*="eSportsBull"], a[onclick*="ESB"]'},
            {"name": "TFG", "selector": 'a[onclick*="TFG"]'},
        ]
    },
    "SABUNG": {
        "url": f"\${BASE_URL}/cockfight",
        "is_catalog_type": False,
        "providers": [
            {"name": "GA28", "selector": 'a[onclick*="ga28"]'},
            {"name": "SV388", "selector": 'a[onclick*="SV-LIVE"]'},
            {"name": "WS168", "selector": 'a[onclick*="ws168"]'},
        ]
    },
    "SLOT": {
        "url": f"\${BASE_URL}/egames",
        "is_catalog_type": True,
        "providers": [
            {"name": "PGSOFT", "selector": "a[href='#vendor_PGSOFT']"},
            {"name": "Pragmatic Play", "selector": "a[href='#vendor_PragmaticPlay']"},
            {"name": "CQ9", "selector": "a[href='#vendor_CQ9']"},
            {"name": "5G", "selector": "a[href='#vendor_5G']"},
            {"name": "JILI", "selector": "a[href='#vendor_JILI']"},
            {"name": "Nextspin", "selector": "a[href='#vendor_Nextspin']"},
            {"name": "Playtech", "selector": "a[href='#vendor_Playtech']"},
            {"name": "Fast Spin", "selector": "a[href='#vendor_FastSpin']"},
            {"name": "RTG Slots", "selector": "a[href='#vendor_RTGSlots']"},
            {"name": "Pragmatic Play POP", "selector": "a[href='#vendor_PragmaticPlayPOP']"},
            {"name": "NLC", "selector": "a[href='#vendor_NLC']"},
            {"name": "Spadegaming", "selector": "a[href='#vendor_Spadegaming']"},
            {"name": "Hotdog Gaming", "selector": "a[href='#vendor_HotdogGaming']"},
            {"name": "Microgaming", "selector": "a[href='#vendor_Microgaming']"},
            {"name": "Hacksaw", "selector": "a[href='#vendor_Hacksaw']"},
            {"name": "Habanero", "selector": "a[href='#vendor_Habanero']"},
            {"name": "Playstar", "selector": "a[href='#vendor_Playstar']"},
            {"name": "Booming Games", "selector": "a[href='#vendor_BoomingGames']"},
            {"name": "JDB", "selector": "a[href='#vendor_JDB']"},
            {"name": "BNG", "selector": "a[href='#vendor_BNG']"},
            {"name": "Spinomenal", "selector": "a[href='#vendor_Spinomenal']"},
            {"name": "Joker Gaming", "selector": "a[href='#vendor_JokerGaming']"},
            {"name": "Red Tiger", "selector": "a[href='#vendor_RedTiger']"},
            {"name": "SABA", "selector": "a[href='#vendor_SABA']"},
            {"name": "PopOk Gaming", "selector": "a[href='#vendor_PopOkGaming']"},
            {"name": "YGG", "selector": "a[href='#vendor_YGG']"},
            {"name": "Funky Games", "selector": "a[href='#vendor_FunkyGames']"},
            {"name": "Funta Gaming", "selector": "a[href='#vendor_FuntaGaming']"},
            {"name": "9G", "selector": "a[href='#vendor_9G']"},
            {"name": "Top Trend Gaming", "selector": "a[href='#vendor_TopTrendGaming']"},
            {"name": "GamePlayInt", "selector": "a[href='#vendor_GamePlayInt']"},
            {"name": "NetEnt", "selector": "a[href='#vendor_NetEnt']"},
            {"name": "PNG", "selector": "a[href='#vendor_PNG']"},
            {"name": "Big Time Gaming", "selector": "a[href='#vendor_BigTimeGaming']"},
            {"name": "One Game", "selector": "a[href='#vendor_OneGame']"},
            {"name": "Skywind", "selector": "a[href='#vendor_Skywind']"},
            {"name": "SBO Slot", "selector": "a[href='#vendor_SBOSlot']"},
            {"name": "SimplePlay", "selector": "a[href='#vendor_SimplePlay']"},
            {"name": "Reevo", "selector": "a[href='#vendor_Reevo']"},
            {"name": "OneTouch", "selector": "a[href='#vendor_OneTouch']"},
            {"name": "OGPS Slot Games", "selector": "a[href='#vendor_OGPSSlotGames']"},
        ]
    },
    "ARCADE": {
        "url": f"\${BASE_URL}/arcade",
        "is_catalog_type": True,
        "providers": [
            {"name": "Pragmatic Play", "selector": "a[href='#vendor_PragmaticPlay']"},
            {"name": "PGSOFT", "selector": "a[href='#vendor_PGSOFT']"},
            {"name": "JILI", "selector": "a[href='#vendor_JILI']"},
            {"name": "Canvas Gaming", "selector": "a[href='#vendor_CanvasGaming']"},
            {"name": "JDB", "selector": "a[href='#vendor_JDB']"},
            {"name": "CQ9", "selector": "a[href='#vendor_CQ9']"},
            {"name": "BGM Fishing", "selector": "a[href='#vendor_BGMFishing']"},
            {"name": "SimplePlay", "selector": "a[href='#vendor_SimplePlay']"},
            {"name": "RTG Slots", "selector": "a[href='#vendor_RTGSlots']"},
            {"name": "SABA", "selector": "a[href='#vendor_SABA']"},
            {"name": "MG Arcade", "selector": "a[href='#vendor_MGArcade']"},
            {"name": "PopOk Gaming", "selector": "a[href='#vendor_PopOkGaming']"},
            {"name": "Spadegaming", "selector": "a[href='#vendor_Spadegaming']"},
            {"name": "Funky Games", "selector": "a[href='#vendor_FunkyGames']"},
            {"name": "YGG", "selector": "a[href='#vendor_YGG']"},
            {"name": "Joker Gaming", "selector": "a[href='#vendor_JokerGaming']"},
            {"name": "Joker Fishing", "selector": "a[href='#vendor_JokerFishing']"},
            {"name": "Skywind", "selector": "a[href='#vendor_Skywind']"},
            {"name": "Hotdog Gaming", "selector": "a[href='#vendor_HotdogGaming']"},
            {"name": "Aviatrix", "selector": "a[href='#vendor_Aviatrix']"},
            {"name": "Fast Spin", "selector": "a[href='#vendor_FastSpin']"},
            {"name": "Evolution", "selector": "a[href='#vendor_Evolution']"},
            {"name": "Red Tiger", "selector": "a[href='#vendor_RedTiger']"},
            {"name": "Habanero", "selector": "a[href='#vendor_Habanero']"},
            {"name": "GamePlayInt", "selector": "a[href='#vendor_GamePlayInt']"},
            {"name": "Funta Gaming", "selector": "a[href='#vendor_FuntaGaming']"},
            {"name": "OneTouch", "selector": "a[href='#vendor_OneTouch']"},
            {"name": "NetEnt", "selector": "a[href='#vendor_NetEnt']"},
            {"name": "Nextspin", "selector": "a[href='#vendor_Nextspin']"},
            {"name": "9G", "selector": "a[href='#vendor_9G']"},
            {"name": "Playtech", "selector": "a[href='#vendor_Playtech']"},
            {"name": "Reevo", "selector": "a[href='#vendor_Reevo']"},
            {"name": "PNG", "selector": "a[href='#vendor_PNG']"},
        ]
    }
}

async def close_extra_tabs(context_browser, main_page):
    try:
        pages = context_browser.pages
        for p in pages:
            if p != main_page and not p.is_closed():
                await p.close()
    except Exception as e:
        logging.warning(f"Error tutup tab: {e}")

def parse_error_reason(content: str, url: str) -> str:
    lower = content.lower()
    lower_url = url.lower()

    err_match = re.search(r'error\s*code\s*[:=]\s*(\d+)', content, re.IGNORECASE)
    if err_match:
        return f"Provider Error (Kode: {err_match.group(1)})"

    if any(k in lower for k in ["login in fail", "login failed", "login fail"]):
        return "Login Gagal (Token/Kredensial)"

    if any(k in lower for k in ["maintenance", "pemeliharaan", "under maintenance", "system under upgrade", "sedang perbaikan"]):
        return "Sedang Maintenance"

    if any(k in lower for k in ["restricted area", "geo-blocked", "country not allowed", "ip blocked", "wilayah tidak didukung"]):
        return "Blokir Wilayah / IP"

    if "403 forbidden" in lower or "access denied" in lower or "403" in lower_url:
        return "Akses Ditolak (403)"

    if any(k in lower for k in ["session expired", "token expired", "sesi habis", "sesi berakhir"]):
        return "Sesi Login Kadaluarsa"

    return "Gagal Membuka Lobby"

async def run_check(p_data, page, context_browser, is_catalog=False):
    last_failure_reason = "Tidak merespon"
    
    for attempt in range(1, 4):
        target_page = None
        try:
            if page.is_closed():
                return "❌ FAILED (Browser Tertutup)"

            await close_extra_tabs(context_browser, page)

            # Tutup pop-up promosi jika ada
            try:
                popup_close = await page.query_selector("button[aria-label='Close'], .modal-close, .close, .btn-close")
                if popup_close and await popup_close.is_visible():
                    await popup_close.click()
                    await page.wait_for_timeout(400)
            except Exception:
                pass

            # Cari tombol selector
            selectors = [s.strip() for s in p_data['selector'].split(',')]
            element = None
            for sel in selectors:
                try:
                    element = await page.query_selector(sel)
                    if element and await element.is_visible():
                        break
                except Exception:
                    continue

            if not element:
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight/2)")
                await page.wait_for_timeout(1000)
                for sel in selectors:
                    try:
                        element = await page.query_selector(sel)
                        if element:
                            break
                    except Exception:
                        continue

            if not element:
                last_failure_reason = "Tombol vendor tidak ditemukan"
                raise Exception(last_failure_reason)

            if is_catalog:
                # KATEGORI SLOT / ARCADE
                await element.click(timeout=8000)
                await page.wait_for_timeout(1500)

                game_button = await page.query_selector(
                    ".game-list a, .game-item a, .item-game a, a[onclick*='play'], a[href*='play'], .btn-play, .game a"
                )
                
                if not game_button:
                    await page.evaluate("window.scrollBy(0, 300)")
                    await page.wait_for_timeout(800)
                    game_button = await page.query_selector(".game-list a, .game-item a, .item-game a, a[onclick*='play'], .game a")

                if game_button:
                    try:
                        async with context_browser.expect_page(timeout=9000) as new_page_info:
                            await game_button.click(timeout=8000)
                        target_page = await new_page_info.value
                    except Exception:
                        target_page = page
                else:
                    logging.info(f"[{p_data['name']}] Vendor aktif di katalog.")
                    return "✅ SUKSES"

            else:
                # KATEGORI CASINO / SPORTSBOOK / SABUNG
                try:
                    async with context_browser.expect_page(timeout=9000) as new_page_info:
                        await element.click(timeout=8000)
                    target_page = await new_page_info.value
                except Exception:
                    pages = [p for p in context_browser.pages if p != page]
                    if pages:
                        target_page = pages[-1]
                    else:
                        raise Exception("Tidak ada tab game terbuka")

            # Tunggu redirect dari about:blank agar token tercatat ke admin
            if target_page and target_page != page:
                for _ in range(30):
                    if target_page.is_closed():
                        break
                    if target_page.url and target_page.url != "about:blank":
                        break
                    await asyncio.sleep(0.5)

                if target_page.is_closed():
                    # Menangani tab self-closing seperti WIN568
                    logging.info(f"[{p_data['name']}] SUKSES - Redirected & Handshake selesai!")
                    return "✅ SUKSES"

                logging.info(f"[{p_data['name']}] URL Terbuka: {target_page.url}")

                if target_page.url == "about:blank":
                    last_failure_reason = "Game tidak merespon (about:blank)"
                    raise Exception(last_failure_reason)

                if not target_page.is_closed():
                    await target_page.wait_for_timeout(4000)
                    content = await target_page.content()
                    target_url = target_page.url

                    is_error = any(e in target_url.lower() for e in ["error", "loginflash", "fail", "403"]) or any(
                        e in content.lower() for e in [
                            "login in fail", "login failed", "provider error", "error code",
                            "403 forbidden", "access denied", "maintenance", "pemeliharaan",
                            "restricted area", "geo-blocked", "session expired"
                        ]
                    )

                    if is_error:
                        last_failure_reason = parse_error_reason(content, target_url)
                        logging.warning(f"[{p_data['name']}] Terdeteksi error: {last_failure_reason}")
                        raise Exception(last_failure_reason)

            logging.info(f"[{p_data['name']}] SUKSES - Log Pergerakan Tercatat!")
            return "✅ SUKSES"

        except Exception as err:
            logging.warning(f"[{p_data['name']}] Percobaan {attempt} gagal: {err}")
            if attempt < 3:
                try:
                    await page.reload(wait_until="domcontentloaded")
                    await page.wait_for_timeout(3000)
                except Exception:
                    pass
        finally:
            if target_page and target_page != page and not target_page.is_closed():
                try:
                    await target_page.close()
                except Exception:
                    pass
            await close_extra_tabs(context_browser, page)

    return f"❌ FAILED ({last_failure_reason})"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    welcome_text = f"""🤖 *Bot Provider Checker Aktif!*
🌐 Website: \`\${BASE_URL}\`

Gunakan perintah:
👉 /test - Cek Akun sudah terlogin atau belum
👉 /login - Buka browser untuk login akun
👉 /check All - Cek status semua provider sekaligus
👉 /check [KATEGORI] - Cek status per provider

📌 *Daftar Kategori:*
• SLOT
• CASINO (Termasuk Evolution & WIN568 Casino)
• SPORTSBOOK (Termasuk WIN568 SBOBET & CMD)
• ARCADE
• SABUNG"""
    await update.message.reply_text(welcome_text, parse_mode='Markdown')

async def test_session(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🔍 *Mengecek status akun...*", parse_mode='Markdown')
    
    if not os.path.exists("session.json"):
        return await update.message.reply_text(
            f"❌ *Status: BELUM TERLOGIN!*\n"
            f"File session.json tidak ada.\n"
            f"Gunakan perintah 👉 /login untuk login ke \`\${BASE_URL}\`.",
            parse_mode='Markdown'
        )

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context_browser = await browser.new_context(storage_state="session.json")
        page = await context_browser.new_page()

        try:
            await page.goto(f"\${BASE_URL}/", wait_until="domcontentloaded", timeout=25000)
            await page.wait_for_timeout(3000)

            logout_elem = await page.query_selector("a[href*='logout'], button:has-text('Logout'), a:has-text('Logout')")
            balance_elem = await page.query_selector(".balance, .user-balance, #balance, #user_balance, .main-balance")
            username_elem = await page.query_selector(".username, .user-name, #user_id, .profile-name")

            if logout_elem:
                bal = (await balance_elem.inner_text()).strip() if balance_elem else "-"
                user = (await username_elem.inner_text()).strip() if username_elem else "Aktif"
                await update.message.reply_text(
                    f"✅ *Status: SUDAH TERLOGIN!*\n"
                    f"👤 User: *{user}*\n"
                    f"💰 Saldo: *{bal}*\n"
                    f"🌐 Web: \`\${BASE_URL}\`\n\n"
                    f"Pergerakan User ID Anda akan tercatat di log Admin saat mengecek provider.",
                    parse_mode='Markdown'
                )
            else:
                await update.message.reply_text("❌ *Status: BELUM TERLOGIN!*\nSesi expired. Gunakan /login ulang.", parse_mode='Markdown')
        except Exception as e:
            await update.message.reply_text(f"⚠️ Error verifikasi: {e}")
        finally:
            await browser.close()

async def login_manual(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        f"🌐 Membuka browser ke \`\${BASE_URL}\`...\n"
        f"Silakan Login ke akun Anda. Setelah berhasil masuk dan saldo terlihat, tutup browser secara manual."
    )
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context_browser = await browser.new_context()
        page = await context_browser.new_page()
        await page.goto(f"\${BASE_URL}/", wait_until="networkidle")

        while True:
            try:
                if not browser.is_connected():
                    break
                await page.wait_for_timeout(2000)
            except Exception:
                break
        await context_browser.storage_state(path="session.json")
        await update.message.reply_text(f"✅ Sesi login \`\${BASE_URL}\` berhasil disimpan ke session.json!\nSekarang Anda bisa menjalankan /check.")

async def check_category(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not context.args:
        return await update.message.reply_text("⚠️ Format: /check [KATEGORI] atau /check All")
    
    arg_input = context.args[0].strip()
    is_check_all = arg_input.lower() == "all"
    
    categories_to_check = list(ALL_CATEGORIES.keys()) if is_check_all else [arg_input.upper()]
    
    if not is_check_all and categories_to_check[0] not in ALL_CATEGORIES:
        return await update.message.reply_text(f"⚠️ Kategori *{arg_input}* tidak valid.", parse_mode='Markdown')

    header_title = "SEMUA KATEGORI" if is_check_all else categories_to_check[0]
    msg = await update.message.reply_text(f"🔍 *Mulai Cek {header_title}...*\n🌐 Website: \`\${BASE_URL}\`", parse_mode='Markdown')
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(
            headless=False,
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"]
        )
        
        if os.path.exists("session.json"):
            context_browser = await browser.new_context(
                storage_state="session.json",
                viewport={'width': 1280, 'height': 720}
            )
        else:
            context_browser = await browser.new_context(viewport={'width': 1280, 'height': 720})

        page = await context_browser.new_page()

        grand_results = []
        grand_success = 0
        grand_failed = 0

        for current_cat in categories_to_check:
            try:
                await page.goto(ALL_CATEGORIES[current_cat]['url'], wait_until="domcontentloaded", timeout=30000)
                await page.wait_for_timeout(3000)
            except Exception as e:
                await update.message.reply_text(f"❌ Gagal memuat {current_cat}: {e}")
                continue

            results = []
            total_providers = len(ALL_CATEGORIES[current_cat]['providers'])
            is_cat_type = ALL_CATEGORIES[current_cat].get('is_catalog_type', False)
            
            for index, p_data in enumerate(ALL_CATEGORIES[current_cat]['providers'], start=1):
                logging.info(f"[{current_cat}] Checking [{index}/{total_providers}] {p_data['name']}...")
                status = await run_check(p_data, page, context_browser, is_catalog=is_cat_type)
                results.append(f"{status} - *{p_data['name']}*")
                
                if len(results) % 4 == 0 or len(results) == total_providers:
                    cat_progress_text = (
                        f"🔍 *Pengecekan Kategori: {current_cat} ({len(results)}/{total_providers})*\n\n"
                        + "\n".join(results[-6:])
                    )
                    try:
                        await context.bot.edit_message_text(
                            chat_id=update.effective_chat.id,
                            message_id=msg.message_id,
                            text=cat_progress_text,
                            parse_mode='Markdown'
                        )
                    except Exception:
                        pass

            cat_success = sum(1 for r in results if "✅" in r)
            cat_fail = sum(1 for r in results if "❌" in r)
            grand_success += cat_success
            grand_failed += cat_fail

            summary_cat = (
                f"📂 *KATEGORI {current_cat}*\n"
                f"✅ Sukses: *{cat_success}* | ❌ Failed: *{cat_fail}*\n"
                f"────────────────────\n"
                + "\n".join(results)
                + "\n\n"
            )
            grand_results.append(summary_cat)

            if is_check_all:
                for i in range(0, len(summary_cat), 4000):
                    await update.message.reply_text(summary_cat[i:i+4000], parse_mode='Markdown')

        if is_check_all:
            final_grand_header = (
                f"🏆 *Hasil Selesai!*\n"
                f"✅ Total Sukses: *{grand_success}*\n"
                f"❌ Total Failed: *{grand_failed}*"
            )
            await update.message.reply_text(final_grand_header, parse_mode='Markdown')
        else:
            final_text = grand_results[0] if grand_results else "Tidak ada data."
            for i in range(0, len(final_text), 4000):
                await update.message.reply_text(final_text[i:i+4000], parse_mode='Markdown')
            
        await context_browser.storage_state(path="session.json")
        await browser.close()

if __name__ == '__main__':
    app = ApplicationBuilder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("test", test_session))
    app.add_handler(CommandHandler("login", login_manual))
    app.add_handler(CommandHandler("check", check_category))
    print(f"Bot siap dijalankan (Target Web: \${BASE_URL})...")
    app.run_polling()
`;
}

export const PYTHON_SCRIPT_CODE = generatePythonScript("https://pokerboya.com", "8473861493:AAHZepaVlf0bGwhyDw5F_RnqAOj3JX8S158");
