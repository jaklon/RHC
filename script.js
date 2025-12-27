// ==========================================
// 1. DATA MEMBER RHC (LENGKAP)
// ==========================================
// NOTE: Karena keterbatasan akses data Roblox (CORS), 
// Data Username, About, dan Stats harus diisi manual di sini.
const members = [
    {
        name: "Klon",
        username: "@Jaklon03",
        id: "6140465204", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-F89C22B77C6EC7A9E35655C2BFB2968C-Png/720/720/Avatar/Webp/noFilter",
        role: "Elite Member",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
        about: "Member yang parkournya jago banget. Sedang grinding summit di Arunika.",
        stats: { friends: "0", followers: "0", following: "0" }
    },
    {
        name: "Kiw",
        username: "@pinkkiwu",
        id: "8815577289", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-ECAEC390859BEF8123640D5CD3AF48D8-Png/720/720/Avatar/Webp/noFilter",
        role: "Elite Member",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
        about: "Speedrunner Tower of Hell. Rekor tamat tower 3 menit. Tantang aku kalau berani!",
        stats: { friends: "0", followers: "0", following: "0" }
    },
    {
        name: "Tequilla",
        username: "@Labubu_ikirek",
        id: "8873225564", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-EFC49127318A4F6DF60F3F28BB81D824-Png/720/720/Avatar/Webp/noFilter",
        role: "Moderator",
        quote: "Pantau chat 24 jam",
        color: "text-green-500 border-green-500/50 bg-green-500/10",
        about: "Suka main Brookhaven dan Adopt Me. Jangan lupa baca rules sebelum chat ya guys!",
        stats: { friends: "0", followers: "0", following: "0" }
    },
    {
        name: "Syla",
        username: "@SylaKing_01",
        id: "148289855",
        image: "https://tr.rbxcdn.com/30c98b672728493121528cb9389531c3/420/420/Image/Png", 
        role: "Founder",
        quote: "King of Blox Fruits",
        color: "text-red-500 border-red-500/50 bg-red-500/10",
        about: "Founder RHC sejak 2020. Fokus main Blox Fruits dan membesarkan komunitas. Sering live streaming tiap malam minggu.",
        stats: { friends: "0", followers: "0", following: "0" }
    },
    {
        name: "Mbonn",
        username: "@kookyeonso0o",
        id: "8815371704", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-D8DAB6965C82BADBD57FA8C29DBDF48D-Png/720/720/Avatar/Webp/noFilter",
        role: "Co-Leader",
        quote: "Admin paling galak",
        color: "text-blue-500 border-blue-500/50 bg-blue-500/10",
        about: "Tangan kanan Founder. Mengurus event turnamen dan ketertiban Discord. Hati-hati kalau kena warn!",
        stats: { friends: "198", followers: "5.2K", following: "100" }
    },
    {
        name: "Micaa",
        username: "@Micaa_Cute",
        id: "87654321", 
        image: "https://tr.rbxcdn.com/d5a9c020583f769747981503c14c53c4/420/420/Image/Png",
        role: "Moderator",
        quote: "Pantau chat 24 jam",
        color: "text-green-500 border-green-500/50 bg-green-500/10",
        about: "Suka main Brookhaven dan Adopt Me. Jangan lupa baca rules sebelum chat ya guys!",
        stats: { friends: "50", followers: "1.1K", following: "20" }
    },
    {
        name: "Mott",
        username: "@Ellevatia",
        id: "87654321", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-6D36128F7DBCD8BA7AC47AE4839D191F-Png/720/720/Avatar/Webp/noFilter",
        role: "Moderator",
        quote: "Pantau chat 24 jam",
        color: "text-green-500 border-green-500/50 bg-green-500/10",
        about: "Suka main Brookhaven dan Adopt Me. Jangan lupa baca rules sebelum chat ya guys!",
        stats: { friends: "0", followers: "0", following: "0" }
    },
];

// ==========================================
// 1.B DATA COUPLE (Baru)
// ==========================================
const couples = [
    {
        shipName: "Kiw & Mott",
        title: "Best Friend Forever",
        date: "Est. 2024",
        // Masukkan ID Roblox (Angka) Pria & Wanita
        maleId: "3187189414",
        maleImage: "https://tr.rbxcdn.com/30DAY-Avatar-6D36128F7DBCD8BA7AC47AE4839D191F-Png/720/720/Avatar/Webp/noFilter", 
        femaleId: "8815577289",
        femaleImage: "https://tr.rbxcdn.com/30DAY-Avatar-ECAEC390859BEF8123640D5CD3AF48D8-Png/720/720/Avatar/Webp/noFilter",
        color: "from-pink-500 to-purple-600" // Warna gradasi border
    },
    {
        shipName: "Mbonn & Montee",
        title: "King & Queen of AFK",
        date: "Est. 2023",
        maleId: "12345678",
        femaleId: "87654321",
        color: "from-red-500 to-orange-500"
    },
    {
        shipName: "Tequilla & Nchippp",
        title: "Prince & Princess of RHC",
        date: "Est. 2023",
        maleId: "12345678",
        femaleId: "87654321",
        color: "from-red-500 to-orange-500"
    },
];

// ==========================================
// 2. CONFIG & HELPERS
// ==========================================
const DISCORD_SERVER_ID = '1400102592436113448'; 
const DEFAULT_AVATAR = 'https://tr.rbxcdn.com/53eb9b17fe1432a809c73a13889b5006/420/420/Image/Png';

// ==========================================
// 3. MAIN FUNCTIONS
// ==========================================

// A. Render Member Card
function renderMembers() {
    const memberContainer = document.getElementById('member-container');
    if (!memberContainer) return;

    memberContainer.innerHTML = '';
    
    members.forEach((member, index) => {
        const card = document.createElement('div');
        card.className = "bg-rhc-accent rounded-2xl p-6 text-center border border-gray-700 hover:border-rhc-main transition duration-300 transform hover:-translate-y-2 fade-in group shadow-lg cursor-pointer h-full flex flex-col items-center justify-between";
        
        // Perubahan: Menambahkan onclick="openModal(index)"
        card.onclick = () => openModal(index);
        
        card.innerHTML = `
            <div>
                <div class="relative w-24 h-24 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                    <img 
                        src="${member.image}" 
                        onerror="this.src='${DEFAULT_AVATAR}'" 
                        alt="${member.name}" 
                        class="w-full h-full rounded-full object-cover border-4 border-gray-800 group-hover:border-rhc-main transition duration-300"
                    >
                    <div class="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1 border border-gray-600">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" class="w-4 h-4 invert">
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-rhc-main transition">${member.name}</h3>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${member.color}">
                    ${member.role}
                </span>
                <p class="text-gray-400 text-sm italic line-clamp-2">"${member.quote}"</p>
            </div>
            
            <div class="mt-4 w-full">
                <button class="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-300 transition">
                    Lihat Profil Lengkap
                </button>
            </div>
        `;
        memberContainer.appendChild(card);
    });
}

// B. MODAL LOGIC (Updated)
function openModal(index) {
    const member = members[index];
    const modal = document.getElementById('member-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');

    // 1. Isi Data Statis (Nama, Gambar, Role, About)
    document.getElementById('modal-image').src = member.image;
    document.getElementById('modal-name').innerText = member.name;
    document.getElementById('modal-username').innerText = member.username || "Loading...";
    
    // Role styling
    const roleEl = document.getElementById('modal-role');
    roleEl.innerText = member.role;
    roleEl.className = `inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold border ${member.color}`;

    // About & Link
    document.getElementById('modal-about').innerText = member.about;
    document.getElementById('modal-link').href = `https://www.roblox.com/users/${member.id}/profile`;

    // 2. ISI STATS (Pakai Data Manual dulu biar gak kosong)
    document.getElementById('modal-friends').innerText = member.stats.friends;
    document.getElementById('modal-followers').innerText = member.stats.followers;
    document.getElementById('modal-following').innerText = member.stats.following;

    // 3. FETCH REAL-TIME DATA (Timpah data manual dengan data asli dari Roblox)
    // Script akan mengambil data terbaru via internet
    fetchRobloxStats(member.id);

    // 4. Tampilkan Modal (Animation)
    modal.classList.remove('hidden');
    setTimeout(() => {
        backdrop.classList.remove('opacity-0');
        panel.classList.remove('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
        panel.classList.add('opacity-100', 'translate-y-0', 'sm:scale-100');
    }, 10);
}

window.closeModal = function() {
    const modal = document.getElementById('member-modal');
    const backdrop = document.getElementById('modal-backdrop');
    const panel = document.getElementById('modal-panel');

    // 1. Animasi Keluar
    backdrop.classList.add('opacity-0');
    panel.classList.remove('opacity-100', 'translate-y-0', 'sm:scale-100');
    panel.classList.add('opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');

    // 2. Sembunyikan setelah animasi selesai (300ms)
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// Close modal jika klik di luar area (backdrop)
document.getElementById('modal-backdrop')?.addEventListener('click', window.closeModal);

// C. Toggle Mobile Menu
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
};

// D. Fetch Discord & Init
async function fetchDiscordMembers() {
    const listContainer = document.getElementById('discord-list');
    const countElement = document.getElementById('total-online-count');
    
    if (!listContainer || !countElement || DISCORD_SERVER_ID.includes('MASUKKAN')) return;

    try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (!response.ok) throw new Error("Gagal");
        
        const data = await response.json();
        countElement.innerText = `${data.presence_count || 0} Player Online`;

        if (data.members.length === 0) {
            listContainer.innerHTML = '<div class="px-10 text-gray-500">Member Invisible / Data Kosong</div>';
            listContainer.classList.remove('animate-infinite-scroll');
            listContainer.classList.add('justify-center', 'w-full');
            return;
        }

        let allCardsHTML = '';
        data.members.forEach(member => {
            let statusColor = 'bg-green-500';
            if(member.status === 'idle') statusColor = 'bg-yellow-500';
            if(member.status === 'dnd') statusColor = 'bg-red-500';

            allCardsHTML += `
                <div class="flex-shrink-0 w-64 bg-rhc-dark rounded-xl p-3 flex items-center space-x-3 border border-gray-700 hover:border-rhc-main transition group cursor-default">
                    <div class="relative flex-shrink-0">
                        <img src="${member.avatar_url}" alt="${member.username}" class="w-10 h-10 rounded-full bg-gray-600 object-cover">
                        <span class="absolute bottom-0 right-0 w-3 h-3 ${statusColor} border-2 border-rhc-dark rounded-full"></span>
                    </div>
                    <div class="overflow-hidden text-left">
                        <p class="text-white text-sm font-bold truncate group-hover:text-rhc-main transition">${member.username}</p>
                        <p class="text-gray-500 text-xs truncate capitalize">${member.game ? 'Main: ' + member.game.name : member.status}</p>
                    </div>
                </div>
            `;
        });
        listContainer.innerHTML = allCardsHTML + allCardsHTML;

    } catch (error) {
        console.log("Discord error:", error);
        countElement.innerText = "Offline";
    }
}

// E. FETCH ROBLOX STATS (VERSI UPDATE: DUAL PROXY)
async function fetchRobloxStats(userId) {
    const elFriends = document.getElementById('modal-friends');
    const elFollowers = document.getElementById('modal-followers');
    const elFollowing = document.getElementById('modal-following');

    // Loading State
    elFriends.innerText = "...";
    elFollowers.innerText = "...";
    elFollowing.innerText = "...";

    // Fungsi kecil untuk mencoba fetch
    const tryFetch = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        return res.json();
    };

    try {
        // --- DATA FRIENDS (CONNECTIONS) ---
        // Jalur 1: Pakai corsproxy.io
        let countFriends = 0;
        try {
            const data = await tryFetch(`https://corsproxy.io/?https://friends.roblox.com/v1/users/${userId}/friends/count`);
            countFriends = data.count;
        } catch (e) {
            // Jalur 2 (Cadangan): Pakai allorigins.win
            console.warn("Jalur 1 Friends gagal, coba jalur 2...");
            const data = await tryFetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/friends/count`)}`);
            const parsed = JSON.parse(data.contents);
            countFriends = parsed.count;
        }

        // --- DATA FOLLOWERS ---
        let countFollowers = 0;
        try {
            const data = await tryFetch(`https://corsproxy.io/?https://friends.roblox.com/v1/users/${userId}/followers/count`);
            countFollowers = data.count;
        } catch (e) {
            const data = await tryFetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/followers/count`)}`);
            const parsed = JSON.parse(data.contents);
            countFollowers = parsed.count;
        }

        // --- DATA FOLLOWING ---
        let countFollowing = 0;
        try {
            const data = await tryFetch(`https://corsproxy.io/?https://friends.roblox.com/v1/users/${userId}/followings/count`);
            countFollowing = data.count;
        } catch (e) {
            const data = await tryFetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/followings/count`)}`);
            const parsed = JSON.parse(data.contents);
            countFollowing = parsed.count;
        }

        // Update UI
        elFriends.innerText = formatNumber(countFriends);
        elFollowers.innerText = formatNumber(countFollowers);
        elFollowing.innerText = formatNumber(countFollowing);

    } catch (error) {
        console.error("Gagal total ambil stats Roblox:", error);
        elFriends.innerText = "-";
        elFollowers.innerText = "-";
        elFollowing.innerText = "-";
    }
}

// F. RENDER COUPLE SECTION (Updated)
function renderCouples() {
    const container = document.getElementById('couple-container');
    if (!container) return;

    container.innerHTML = '';

    couples.forEach(couple => {
        const card = document.createElement('div');
        // Layout Kartu
        card.className = "relative group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-pink-500 transition duration-500 fade-in overflow-hidden";
        
        card.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r ${couple.color} opacity-0 group-hover:opacity-10 transition duration-500"></div>
            
            <div class="flex justify-center items-center mb-6 relative">
                
                <div class="relative z-10 w-20 h-20 -mr-4 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-rotate-6 cursor-pointer" onclick="window.open('https://www.roblox.com/users/${couple.maleId}/profile', '_blank')">
                    <img 
                        src="${couple.maleImage}" 
                        onerror="this.src='${DEFAULT_AVATAR}'" 
                        class="w-full h-full rounded-full border-4 border-gray-900 object-cover shadow-lg"
                        title="Klik untuk profil cowok"
                    >
                </div>
                
                <div class="z-20 bg-gray-900 rounded-full p-1.5 border-2 border-pink-500 animate-pulse">
                    <i class="fa-solid fa-heart text-pink-500 text-lg"></i>
                </div>

                <div class="relative z-0 w-20 h-20 -ml-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-6 cursor-pointer" onclick="window.open('https://www.roblox.com/users/${couple.femaleId}/profile', '_blank')">
                    <img 
                        src="${couple.femaleImage}" 
                        onerror="this.src='${DEFAULT_AVATAR}'" 
                        class="w-full h-full rounded-full border-4 border-gray-900 object-cover shadow-lg"
                        title="Klik untuk profil cewek"
                    >
                </div>

            </div>

            <div class="text-center relative z-10">
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition">${couple.shipName}</h3>
                <span class="inline-block px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${couple.color} rounded-full mb-2 shadow-lg">
                    ${couple.title}
                </span>
                <p class="text-gray-500 text-xs italic"><i class="fa-regular fa-calendar mr-1"></i> ${couple.date}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// Helper: Format Angka (1500 -> 1.5K)
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
    renderCouples();
    fetchDiscordMembers();
    setInterval(fetchDiscordMembers, 60000);

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }, 100);
});