import json
import requests
import re

players = [
    {"name": "4CVIT", "twitch": "4cvit", "yt": "4CVIT"},
    {"name": "Ashswagg", "twitch": "ashswag", "yt": "ashswag"},
    {"name": "Baconnwaffles0", "twitch": "baconnwaffles0", "yt": "baconnwaffleso"},
    {"name": "CHIEFXD", "twitch": "chiefxd", "yt": "Chiefxd."},
    {"name": "ClownPierce", "twitch": "clownpierce", "yt": "ClownPierce"},
    {"name": "Derapchu", "twitch": "derapchulive", "yt": "Derapchu"},
    {"name": "Dtowncat", "twitch": "dtowncat", "yt": "Dtowncat"},
    {"name": "ECorridor", "twitch": "ecorridor", "yt": "ECorridor"},
    {"name": "Hannahxxrose", "twitch": "hannahxxrose", "yt": "Hannahxxrose"},
    {"name": "Jepexx", "twitch": "jepexislive", "yt": "JepexOfficial"},
    {"name": "Jojosolos", "twitch": "jojosolos", "yt": "jojosolos"},
    {"name": "JumperWho", "twitch": "jumperwho", "yt": "jumperwho"},
    {"name": "Leow0ok", "twitch": "leowook", "yt": "Leowook"},
    {"name": "Mapicc", "twitch": "mapicbutlive", "yt": "MapiccMc"},
    {"name": "Minute Tech", "twitch": None, "yt": "minutetechmc"},
    {"name": "MrCube6", "twitch": "mrcube6", "yt": "MrCube6"},
    {"name": "Pangi", "twitch": "pangi", "yt": "Pangi"},
    {"name": "Peentar", "twitch": "peentar", "yt": "peentar"},
    {"name": "PlanetLord", "twitch": "planetlord_", "yt": "planetlord"},
    {"name": "Poafa", "twitch": "poafa", "yt": "Poafa"},
    {"name": "PrinceZam", "twitch": "princezam", "yt": "PrinceZam"},
    {"name": "Reddoons", "twitch": "reddoons", "yt": "reddoons"},
    {"name": "Rekrap2", "twitch": "rekrap22", "yt": "rekrap2"},
    {"name": "Roshambogames", "twitch": "roshambogamesLIVE", "yt": "roshambogames"},
    {"name": "SB737", "twitch": "sb737", "yt": "SB737"},
    {"name": "Spepticle", "twitch": "spepticle", "yt": "Spepticle"},
    {"name": "TheRealSquiddo", "twitch": "therealsquiddo", "yt": "TheRealSquiddo"},
    {"name": "The Terrain", "twitch": "theterrainmc", "yt": "The Terrain"},
    {"name": "Vitalasy", "twitch": "vitalasy", "yt": "Vitalasy"},
    {"name": "Vort3xDragon", "twitch": "vort3xdragonlive", "yt": "Vort3xDragon"},
    {"name": "Woogiex", "twitch": "woogiex", "yt": "woogiex"},
    {"name": "Yeah Jaron", "twitch": "yeah_jaron", "yt": "Yeah_Jaron"},
    {"name": "Yungyx", "twitch": "yungy", "yt": "yungwillx"},
    {"name": "CookieBunsquat", "twitch": None, "yt": "cookiebunsquat"},
    {"name": "Epaxialfx", "twitch": None, "yt": "EpaxialLive"},
    {"name": "Flowtives", "twitch": "flowtives", "yt": "flowtives"},
    {"name": "Fruitberries", "twitch": "fruitberries", "yt": "Fruitberries"},
    {"name": "Infume", "twitch": "infume", "yt": "infumemc"},
    {"name": "Jaden MAN", "twitch": "jadenman_live", "yt": "JadenMAN"},
    {"name": "KatieGoBrr", "twitch": "katiegobrr", "yt": "KatieGoBrr"},
    {"name": "Leekleek", "twitch": "leekleeklive", "yt": "leekleekmc"},
    {"name": "Loppezz", "twitch": "loppezz", "yt": "loppezz"},
    {"name": "LuigiToan", "twitch": "LuigiToantv", "yt": "Luigi Toan"},
    {"name": "Only A Squid", "twitch": "only_a_squid", "yt": "OnlyASquid"},
    {"name": "Spongs", "twitch": None, "yt": "Spongs"},
    {"name": "WithMayX", "twitch": "withmayx", "yt": "WithMayX"},
    {"name": "BranzyCraft", "twitch": "branzylive", "yt": "Branzy"}
]

status_results = {}
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for p in players:
    name = p["name"]
    is_live = False
    platform = "offline"
    
    # 1. Check Twitch via official public badge asset (Fast & Allowed)
    if p["twitch"]:
        try:
            r = requests.get(f'https://img.shields.io/twitch/status/{p["twitch"]}', timeout=5)
            if "live" in r.text.lower() and "offline" not in r.text.lower():
                is_live = True
                platform = "twitch"
        except Exception:
            pass

    # 2. Check YouTube if not live on Twitch
    if not is_live and p["yt"]:
        try:
            url = f'https://www.youtube.com/@{p["yt"]}/live'
            r = requests.get(url, headers=headers, timeout=5)
            if 'isLive":true' in r.text and 'LIVE_STREAM_OFFLINE' not in r.text:
                is_live = True
                platform = "youtube"
        except Exception:
            pass

    status_results[name] = {
        "isLive": is_live,
        "platform": platform
    }

# Write out the final tiny state file
with open('status.json', 'w') as f:
    json.dump(status_results, f, indent=2)
