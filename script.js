// ==========================================
// 1. DATA MEMBER RHC (LENGKAP)
// ==========================================
// NOTE: Karena keterbatasan akses data Roblox (CORS), 
// Data Username, About, dan Stats harus diisi manual di sini.
const members = [
    {
        name: "Syla",
        username: "@SylaKing_01",
        id: "148289855",
        image: "https://tr.rbxcdn.com/30c98b672728493121528cb9389531c3/420/420/Image/Png", 
        role: "Founder",
        quote: "King of Blox Fruits",
        color: "text-red-500 border-red-500/50 bg-red-500/10",
        about: "Founder RHC sejak 2020. Fokus main Blox Fruits dan membesarkan komunitas. Sering live streaming tiap malam minggu.",
        stats: { friends: "200", followers: "12.5K", following: "15" }
    },
    {
        name: "Mbonn",
        username: "@Mbonn_Jago",
        id: "12345678", 
        image: "https://tr.rbxcdn.com/5f7776512684803d5204481308332185/420/420/Image/Png",
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
        name: "Kiw",
        username: "@Kiw_Parkour",
        id: "11223344", 
        image: "https://tr.rbxcdn.com/15b57f202450cd5e1352e82500c526d1/420/420/Image/Png",
        role: "Elite Member",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
        about: "Speedrunner Tower of Hell. Rekor tamat tower 3 menit. Tantang aku kalau berani!",
        stats: { friends: "150", followers: "800", following: "300" }
    },
    {
        name: "Klon",
        username: "@Klon_Clone",
        id: "6140465204", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-F89C22B77C6EC7A9E35655C2BFB2968C-Png/720/720/Avatar/Webp/noFilter",
        role: "Elite Member",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10",
        about: "Member aktif yang selalu ikut event. Sedang grinding level di Blox Fruits.",
        stats: { friends: "45", followers: "200", following: "10" }
    }
];

// ==========================================
// 2. CONFIG & HELPERS
// ==========================================
const DISCORD_SERVER_ID = 'MASUKKAN_ID_DISCORD_DISINI'; 
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

// E. FETCH ROBLOX STATS (REAL-TIME VIA PROXY)
async function fetchRobloxStats(userId) {
    // Element ID di Modal
    const elFriends = document.getElementById('modal-friends');
    const elFollowers = document.getElementById('modal-followers');
    const elFollowing = document.getElementById('modal-following');

    // Set Loading state
    elFriends.innerText = "...";
    elFollowers.innerText = "...";
    elFollowing.innerText = "...";

    try {
        // Kita gunakan Proxy 'corsproxy.io' untuk menembus keamanan Roblox
        // Endpoint API Roblox yang digunakan:
        const proxyBase = "https://corsproxy.io/?";
        const urlFriends = `${proxyBase}https://friends.roblox.com/v1/users/${userId}/friends/count`;
        const urlFollowers = `${proxyBase}https://friends.roblox.com/v1/users/${userId}/followers/count`;
        const urlFollowing = `${proxyBase}https://friends.roblox.com/v1/users/${userId}/followings/count`;

        // Jalankan 3 request sekaligus (Parallel) agar lebih cepat
        const [resFriends, resFollowers, resFollowing] = await Promise.all([
            fetch(urlFriends),
            fetch(urlFollowers),
            fetch(urlFollowing)
        ]);

        // Ambil JSON
        const dataFriends = await resFriends.json();
        const dataFollowers = await resFollowers.json();
        const dataFollowing = await resFollowing.json();

        // Update Tampilan Modal (Format angka ribuan, misal 1200 jadi 1.2K)
        elFriends.innerText = formatNumber(dataFriends.count);
        elFollowers.innerText = formatNumber(dataFollowers.count);
        elFollowing.innerText = formatNumber(dataFollowing.count);

    } catch (error) {
        console.error("Gagal ambil stats Roblox:", error);
        // Jika gagal, biarkan angka manual atau tampilkan "-"
        elFriends.innerText = "-";
        elFollowers.innerText = "-";
        elFollowing.innerText = "-";
    }
}

// Helper: Format Angka (1500 -> 1.5K)
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

document.addEventListener('DOMContentLoaded', () => {
    renderMembers();
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