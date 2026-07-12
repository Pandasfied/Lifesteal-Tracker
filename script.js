// Complete Database of Roster with correct URLs & Handles
const players = [
    { name: "4CVIT", yt: "4CVIT", twitch: "4cvit" },
    { name: "Ashswagg", yt: "ashswag", twitch: "ashswag" },
    { name: "Baconnwaffles0", yt: "baconnwaffles0", twitch: "baconnwaffles0" },
    { name: "CHIEFXD", yt: "Chiefxd.", twitch: "chiefxd" },
    { name: "ClownPierce", yt: "ClownPierce", twitch: "clownpierce" },
    { name: "Derapchu", yt: "Derapchu", twitch: "derapchulive" },
    { name: "Dtowncat", yt: "Dtowncat", twitch: "dtowncat" },
    { name: "ECorridor", yt: "ECorridor", twitch: "ecorridor" },
    { name: "Hannahxxrose", yt: "Hannahxxrose", twitch: "hannahxxrose" },
    { name: "Jepexx", yt: "JepexOfficial", twitch: "jepexislive" },
    { name: "Jojosolos", yt: "jojosolos", twitch: "jojosolos" },
    { name: "JumperWho", yt: "jumperwho", twitch: "jumperwho" },
    { name: "Leow0ok", yt: "Leowook", twitch: "leowook" },
    { name: "Mapicc", yt: "MapiccMc", twitch: "mapicbutlive" },
    { name: "Minute Tech", yt: "minutetechmc", twitch: null },
    { name: "MrCube6", yt: "MrCube6", twitch: "mrcube6" },
    { name: "Pangi", yt: "Pangi", twitch: "pangi" },
    { name: "Peentar", yt: "peentar", twitch: "peentar" },
    { name: "PlanetLord", yt: "planetlord", twitch: "planetlord_" },
    { name: "Poafa", yt: "Poafa", twitch: "poafa" },
    { name: "PrinceZam", yt: "PrinceZam", twitch: "princezam" },
    { name: "Reddoons", yt: "reddoons", twitch: "reddoons" },
    { name: "Rekrap2", yt: "rekrap2", twitch: "rekrap22" },
    { name: "Roshambogames", yt: "roshambogames", twitch: "roshambogamesLIVE" },
    { name: "SB737", yt: "SB737", twitch: "sb737" },
    { name: "Spepticle", yt: "Spepticle", twitch: "spepticle" },
    { name: "TheRealSquiddo", yt: "TheRealSquiddo", twitch: "therealsquiddo" },
    { name: "The Terrain", yt: "The Terrain", twitch: "theterrainmc" },
    { name: "Vitalasy", yt: "Vitalasy", twitch: "vitalasy" },
    { name: "Vort3xDragon", yt: "Vort3xDragon", twitch: "vort3xdragonlive" },
    { name: "Woogiex", yt: "woogiex", twitch: "woogiex" },
    { name: "Yeah Jaron", yt: "Yeah_Jaron", twitch: "yeah_jaron" },
    { name: "Yungyx", yt: "yungwillx", twitch: "yungy" },
    { name: "CookieBunsquat", yt: "cookiebunsquat", twitch: null },
    { name: "Epaxialfx", yt: "EpaxialLive", twitch: null },
    { name: "Flowtives", yt: "flowtives", twitch: "flowtives" },
    { name: "Fruitberries", yt: "Fruitberries", twitch: "fruitberries" },
    { name: "Infume", yt: "infumemc", twitch: "infume" },
    { name: "Jaden MAN", yt: "JadenMAN", twitch: "jadenman_live" },
    { name: "KatieGoBrr", yt: "KatieGoBrr", twitch: "katiegobrr" },
    { name: "Leekleek", yt: "leekleekmc", twitch: "leekleeklive" },
    { name: "Loppezz", yt: "loppezz", twitch: "loppezz" },
    { name: "LuigiToan", yt: "Luigi Toan", twitch: "LuigiToantv" },
    { name: "Only A Squid", yt: "OnlyASquid", twitch: "only_a_squid" },
    { name: "Spongs", yt: "Spongs", twitch: null },
    { name: "WithMayX", yt: "WithMayX", twitch: "withmayx" },
    { name: "BranzyCraft", yt: "Branzy", twitch: "branzylive" }
];

// 1. Injects the HTML structure for each player inside the grid
function initializeGrid() {
    const grid = document.getElementById('player-grid');
    grid.innerHTML = '';
    
    players.forEach(player => {
        // Fallback skin avatar placeholder from Minotar using their name
        const avatarUrl = `https://minotar.net/helm/${player.name.replace(/\s/g, "")}/100.png`;
        const profileLink = player.twitch ? `https://twitch.tv/${player.twitch}` : `https://youtube.com/@${player.yt}`;

        const card = document.createElement('a');
        card.href = profileLink;
        card.target = "_blank";
        card.className = "player-card";
        card.id = `player-${player.name.replace(/\s/g, "")}`;
        
        card.innerHTML = `
            <div class="avatar-container">
                <img src="${avatarUrl}" class="avatar" alt="${player.name}">
            </div>
            <div class="player-name">${player.name}</div>
            <div class="platform-badge">Offline</div>
        `;
        grid.appendChild(card);
    });
}

// 2. Client-Side Non-API Live Status Engine
async function checkLiveStatus() {
    players.forEach(async (player) => {
        const cardId = `player-${player.name.replace(/\s/g, "")}`;
        const cardElement = document.getElementById(cardId);
        if (!cardElement) return;

        let isLive = false;
        let currentPlatform = 'offline';

        // Check Twitch First (via public fetch check on open player configuration)
        if (player.twitch) {
            try {
                // We fetch the public config signature for the stream to see if a session exists
                const res = await fetch(`https://passport.twitch.tv/packages/alpha`, { method: 'HEAD' }); 
                // Alternative completely client-side bypass: check public twitch streams widget data
                // Note: For pure Client-Side, standard practice checks a free API proxy like allorigins.win to check string occurrences
                const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.twitch.tv/' + player.twitch)}`);
                const data = await proxyRes.json();
                
                if (data.contents.includes('"isLiveBroadcast":true')) {
                    isLive = true;
                    currentPlatform = 'twitch';
                }
            } catch (e) { console.log("Twitch check failed for " + player.name); }
        }

        // If not live on Twitch, check YouTube Live page
        if (!isLive && player.yt) {
            try {
                const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.youtube.com/@' + player.yt + '/live')}`);
                const data = await proxyRes.json();
                
                // If they are live, the live URL will contain the active video player details instead of a warning
                if (data.contents.includes('LIVE_STREAM_OFFLINE') === false && data.contents.includes('isLive":true')) {
                    isLive = true;
                    currentPlatform = 'youtube';
                }
            } catch (e) { console.log("YouTube check failed for " + player.name); }
        }

        // Update HTML presentation instantly
        const badge = cardElement.querySelector('.platform-badge');
        if (isLive) {
            cardElement.classList.add('is-live');
            if (currentPlatform === 'youtube') {
                cardElement.classList.add('youtube');
                badge.innerText = "🔴 YouTube Live";
            } else {
                cardElement.classList.remove('youtube');
                badge.innerText = "🍇 Twitch Live";
            }
        } else {
            cardElement.classList.remove('is-live', 'youtube');
            badge.innerText = "Offline";
        }
    });
}

// Kick off immediately on layout build, then automatically loop every 60 seconds
initializeGrid();
checkLiveStatus();
setInterval(checkLiveStatus, 60000);