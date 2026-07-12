const players = [
    { name: "4CVIT", twitch: "4cvit", yt: "4CVIT" },
    { name: "Ashswagg", twitch: "ashswag", yt: "ashswag" },
    { name: "Baconnwaffles0", twitch: "baconnwaffles0", yt: "baconnwaffleso" },
    { name: "CHIEFXD", twitch: "chiefxd", yt: "Chiefxd." },
    { name: "ClownPierce", twitch: "clownpierce", yt: "ClownPierce" },
    { name: "Derapchu", twitch: "derapchulive", yt: "Derapchu" },
    { name: "Dtowncat", twitch: "dtowncat", yt: "Dtowncat" },
    { name: "ECorridor", twitch: "ecorridor", yt: "ECorridor" },
    { name: "Hannahxxrose", twitch: "hannahxxrose", yt: "Hannahxxrose" },
    { name: "Jepexx", twitch: "jepexislive", yt: "JepexOfficial" },
    { name: "Jojosolos", twitch: "jojosolos", yt: "jojosolos" },
    { name: "JumperWho", twitch: "jumperwho", yt: "jumperwho" },
    { name: "Leow0ok", twitch: "leowook", yt: "Leowook" },
    { name: "Mapicc", twitch: "mapicbutlive", yt: "MapiccMc" },
    { name: "Minute Tech", twitch: null, yt: "minutetechmc" },
    { name: "MrCube6", twitch: "mrcube6", yt: "MrCube6" },
    { name: "Pangi", twitch: "pangi", yt: "Pangi" },
    { name: "Peentar", twitch: "peentar", yt: "peentar" },
    { name: "PlanetLord", twitch: "planetlord_", yt: "planetlord" },
    { name: "Poafa", twitch: "poafa", yt: "Poafa" },
    { name: "PrinceZam", twitch: "princezam", yt: "PrinceZam" },
    { name: "Reddoons", twitch: "reddoons", yt: "reddoons" },
    { name: "Rekrap2", twitch: "rekrap22", yt: "rekrap2" },
    { name: "Roshambogames", twitch: "roshambogamesLIVE", yt: "roshambogames" },
    { name: "SB737", twitch: "sb737", yt: "SB737" },
    { name: "Spepticle", twitch: "spepticle", yt: "Spepticle" },
    { name: "TheRealSquiddo", twitch: "therealsquiddo", yt: "TheRealSquiddo" },
    { name: "The Terrain", twitch: "theterrainmc", yt: "The Terrain" },
    { name: "Vitalasy", twitch: "vitalasy", yt: "Vitalasy" },
    { name: "Vort3xDragon", twitch: "vort3xdragonlive", yt: "Vort3xDragon" },
    { name: "Woogiex", twitch: "woogiex", yt: "woogiex" },
    { name: "Yeah Jaron", twitch: "yeah_jaron", yt: "Yeah_Jaron" },
    { name: "Yungyx", twitch: "yungy", yt: "yungwillx" },
    { name: "CookieBunsquat", twitch: null, yt: "cookiebunsquat" },
    { name: "Epaxialfx", twitch: null, yt: "EpaxialLive" },
    { name: "Flowtives", twitch: "flowtives", yt: "flowtives" },
    { name: "Fruitberries", twitch: "fruitberries", yt: "Fruitberries" },
    { name: "Infume", twitch: "infume", yt: "infumemc" },
    { name: "Jaden MAN", twitch: "jadenman_live", yt: "JadenMAN" },
    { name: "KatieGoBrr", twitch: "katiegobrr", yt: "KatieGoBrr" },
    { name: "Leekleek", twitch: "leekleeklive", yt: "leekleekmc" },
    { name: "Loppezz", twitch: "loppezz", yt: "loppezz" },
    { name: "LuigiToan", twitch: "LuigiToantv", yt: "Luigi Toan" },
    { name: "Only A Squid", twitch: "only_a_squid", yt: "OnlyASquid" },
    { name: "Spongs", twitch: null, yt: "Spongs" },
    { name: "WithMayX", twitch: "withmayx", yt: "WithMayX" },
    { name: "BranzyCraft", twitch: "branzylive", yt: "Branzy" }
];

function initializeGrid() {
    const grid = document.getElementById('player-grid');
    grid.innerHTML = '';
    
    players.forEach(player => {
        const cleanID = player.name.replace(/\s/g, "");
        const avatarUrl = `https://minotar.net/helm/${cleanID}/100.png`;
        
        const card = document.createElement('div');
        card.className = "player-card";
        card.id = `card-${cleanID}`;
        
        let buttonGroupHTML = `<div class="button-group">`;
        if (player.twitch) {
            buttonGroupHTML += `<a href="https://twitch.tv/${player.twitch}" target="_blank" class="platform-btn twitch-btn">Twitch</a>`;
        }
        if (player.yt) {
            buttonGroupHTML += `<a href="https://youtube.com/@${player.yt}" target="_blank" class="platform-btn youtube-btn">YouTube</a>`;
        }
        buttonGroupHTML += `</div>`;

        card.innerHTML = `
            <img src="${avatarUrl}" class="avatar" alt="${player.name}">
            <div class="player-name">${player.name}</div>
            <div class="status-text">Offline</div>
            ${buttonGroupHTML}
        `;
        
        grid.appendChild(card);
    });
}

async function checkLiveStatus() {
    players.forEach(async (player) => {
        const cleanID = player.name.replace(/\s/g, "");
        const cardElement = document.getElementById(`card-${cleanID}`);
        if (!cardElement) return;

        let isLive = false;
        let currentPlatform = 'offline';

        // Check Twitch
        if (player.twitch) {
            try {
                const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.twitch.tv/' + player.twitch)}`);
                const data = await proxyRes.json();
                if (data.contents && data.contents.includes('"isLiveBroadcast":true')) {
                    isLive = true;
                    currentPlatform = 'twitch';
                }
            } catch (e) { console.log("Twitch check failed for " + player.name); }
        }

        // Check YouTube Live status if Twitch isn't live
        if (!isLive && player.yt) {
            try {
                const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://www.youtube.com/@' + player.yt + '/live')}`);
                const data = await proxyRes.json();
                if (data.contents && !data.contents.includes('LIVE_STREAM_OFFLINE') && data.contents.includes('isLive":true')) {
                    isLive = true;
                    currentPlatform = 'youtube';
                }
            } catch (e) { console.log("YouTube check failed for " + player.name); }
        }

        // Apply UI styling state variations
        const statusText = cardElement.querySelector('.status-text');
        if (isLive) {
            cardElement.classList.add('is-live');
            if (currentPlatform === 'youtube') {
                cardElement.classList.add('live-youtube');
                statusText.innerText = "🔴 Live on YouTube";
            } else {
                cardElement.classList.remove('live-youtube');
                statusText.innerText = "🍇 Live on Twitch";
            }
        } else {
            cardElement.classList.remove('is-live', 'live-youtube');
            statusText.innerText = "Offline";
        }
    });
}

// Start sequence
initializeGrid();
checkLiveStatus();
setInterval(checkLiveStatus, 60000); // Auto-recheck every minute
