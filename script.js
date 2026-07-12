const players = [
    { name: "4CVIT", twitch: "4cvit", yt: "4CVIT" },
    { name: "Ashswagg", twitch: "ashswag", yt: "ashswag" },
    { name: "Baconnwaffles0", twitch: "baconnwaffles0", yt: "baconnwaffleso" },
    { name: "CHIEFXD", twitch: "chiefxd", yt: "Chiefxd." },
    { name: "ClownPierce", twitch: "clownpierce", yt: "ClownPierce" },
    { name: "Derapchu", twitch: "Derapchu", yt: "Derapchu" },
    { name: "Dtowncat", twitch: "dtowncat", yt: "Dtowncat" },
    { name: "ECorridor", twitch: "ecorridor", yt: "ECorridor" },
    { name: "Hannahxxrose", twitch: "hannahxxrose", yt: "Hannahxxrose" },
    { name: "Jepexx", twitch: "jepexislive", yt: "JepexOfficial" },
    { name: "Jojosolos", twitch: "jojosolos", yt: "jojosolos" },
    { name: "JumperWho", twitch: "jumperwho", yt: "jumperwho" },
    { name: "Leow0ok", twitch: "leowook", yt: "Leowook" },
    { name: "Mapicc", twitch: "mapicc", yt: "MapiccMc" }, // Updated Twitch handle
    { name: "Minute Tech", twitch: null, yt: "minutetechmc" },
    { name: "MrCube6", twitch: "mrcube6", yt: "MrCube6" },
    { name: "Pangi", twitch: "pangi", yt: "Pangi" },
    { name: "Peentar", twitch: "peentar", yt: "peentar" },
    { name: "PlanetLord", twitch: "planetlord_", yt: "planetlord" },
    { name: "Poafa", twitch: "poafa", yt: "Poafa" },
    { name: "PrinceZam", twitch: "princezam", yt: "PrinceZam" },
    { name: "Reddoons", twitch: "reddoons", yt: "reddoons" },
    { name: "Rekrap2", twitch: "rekrap2", yt: "rekrap2" },
    { name: "Roshambogames", twitch: "roshambogamesLIVE", yt: "roshambogames" },
    { name: "SB737", twitch: "sb737", yt: "SB737" },
    { name: "Spepticle", twitch: "spepticle", yt: "Spepticle" },
    { name: "TheRealSquiddo", twitch: "therealsquiddo", yt: "TheRealSquiddo" },
    { name: "The Terrain", twitch: "theterrainmc", yt: "The Terrain" },
    { name: "Vitalasy", twitch: "vitalasy", yt: "Vitalasy" },
    { name: "Vort3xDragon", twitch: "vort3xdragonlive", yt: "Vort3xDragon" },
    { name: "Woogiex", twitch: "woogiex", yt: "woogiex" },
    { name: "Yeah Jaron", twitch: "yeah_jaron", yt: "Yeah_Jaron", ign: "Yeah_Jaron" },
    { name: "Yungyx", twitch: "yungy", yt: "yungwillx" },
    { name: "CookieBunsquat", twitch: "CookieBunsquat", yt: "cookiebunsquat" }, // Added Twitch
    { name: "Epaxialfx", twitch: "epaxial_", yt: "EpaxialYT" }, // Updated Twitch and YouTube handles
    { name: "Flowtives", twitch: "flowtives", yt: "flowtives" },
    { name: "Fruitberries", twitch: "fruitberries", yt: "Fruitberries" },
    { name: "Infume", twitch: "infume", yt: "infumemc" },
    { name: "Jaden MAN", twitch: "jadenman_live", yt: "JadenMAN", ign: "Jaden_MAN" },
    { name: "KatieGoBrr", twitch: "katiegobrr", yt: "KatieGoBrr" },
    { name: "Leekleek", twitch: "leekleeklive", yt: "leekleekmc" },
    { name: "Loppezz", twitch: "loppezz", yt: "loppezz" },
    { name: "LuigiToan", twitch: "Toan", yt: "Luigi Toan" },
    { name: "Only A Squid", twitch: "only_a_squid", yt: "OnlyASquid", ign: "only_a_squid" },
    { name: "Spongs", twitch: "Spongs_", yt: "Spongs" },
    { name: "WithMayX", twitch: "withmayx", yt: "WithMayX" },
    { name: "BranzyCraft", twitch: "branzylive", yt: "Branzy" }
];

function initializeGrid() {
    const grid = document.getElementById('player-grid');
    grid.innerHTML = '';
    
    players.forEach(player => {
        const cleanID = player.name.replace(/\s/g, "");
        const mcUsername = player.ign ? player.ign : cleanID;
        const avatarUrl = `https://minotar.net/helm/${mcUsername}/100.png`;
        
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

async function updateGridWithLiveStatus() {
    try {
        const response = await fetch(`./status.json?t=${new Date().getTime()}`);
        const statusData = await response.json();
        const grid = document.getElementById('player-grid');

        players.forEach(player => {
            const cleanID = player.name.replace(/\s/g, "");
            const cardElement = document.getElementById(`card-${cleanID}`);
            if (!cardElement || !statusData[player.name]) return;

            const playerData = statusData[player.name];
            const statusText = cardElement.querySelector('.status-text');

            if (playerData.isLive) {
                cardElement.classList.add('is-live');
                cardElement.setAttribute('data-live', 'true');
                if (playerData.platform === 'youtube') {
                    cardElement.classList.add('live-youtube');
                    statusText.innerText = "🔴 Live on YouTube";
                } else {
                    cardElement.classList.remove('live-youtube');
                    statusText.innerText = "🍇 Live on Twitch";
                }
            } else {
                cardElement.classList.remove('is-live', 'live-youtube');
                cardElement.setAttribute('data-live', 'false');
                statusText.innerText = "Offline";
            }
        });

        const cardsArray = Array.from(grid.children);
        cardsArray.sort((a, b) => {
            const aLive = a.getAttribute('data-live') === 'true' ? 1 : 0;
            const bLive = b.getAttribute('data-live') === 'true' ? 1 : 0;
            return bLive - aLive;
        });

        cardsArray.forEach(card => grid.appendChild(card));

        const totalLive = players.filter(p => statusData[p.name]?.isLive).length;
        const totalOffline = players.length - totalLive;
        document.getElementById('live-count').innerText = totalLive;
        document.getElementById('offline-count').innerText = totalOffline;

    } catch (e) {
        console.log("Failed to load global status configuration map file.");
    }
}

initializeGrid();
updateGridWithLiveStatus();
setInterval(updateGridWithLiveStatus, 60000);
