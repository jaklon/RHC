// ==========================================
// 1. DATA MEMBER RHC
// ==========================================
// Tips: Ambil "image" dengan cara Klik Kanan di Avatar Roblox -> Copy Image Address
const members = [
    {
        name: "Syla",
        role: "Founder",
        // Masukkan User ID (Angka) untuk keperluan link profil
        id: "148289855", 
        // Masukkan Link Gambar Panjang (CDN) agar gambar 100% muncul
        image: "https://tr.rbxcdn.com/30c98b672728493121528cb9389531c3/420/420/Image/Png", 
        quote: "King of Blox Fruits",
        color: "text-red-500 border-red-500/50 bg-red-500/10"
    },
    {
        name: "Mbonn",
        role: "Co-Leader",
        id: "12345678", // Ganti ID Asli
        image: "https://tr.rbxcdn.com/5f7776512684803d5204481308332185/420/420/Image/Png", // Ganti Link Gambar
        quote: "Admin paling galak",
        color: "text-blue-500 border-blue-500/50 bg-blue-500/10"
    },
    {
        name: "Micaa",
        role: "Moderator",
        id: "87654321", 
        image: "https://tr.rbxcdn.com/d5a9c020583f769747981503c14c53c4/420/420/Image/Png",
        quote: "Pantau chat 24 jam",
        color: "text-green-500 border-green-500/50 bg-green-500/10"
    },
    {
        name: "Kiw",
        role: "Elite Member",
        id: "11223344", 
        image: "https://tr.rbxcdn.com/15b57f202450cd5e1352e82500c526d1/420/420/Image/Png",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10"
    },
    {
        name: "Klon",
        role: "Elite Member",
        id: "6140465204", 
        image: "https://tr.rbxcdn.com/30DAY-Avatar-F89C22B77C6EC7A9E35655C2BFB2968C-Png/720/720/Avatar/Webp/noFilter",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10"
    }
];

// ==========================================
// 2. CONFIG & HELPERS
// ==========================================
const DISCORD_SERVER_ID = '1400102592436113448'; 
const DEFAULT_AVATAR = 'https://tr.rbxcdn.com/53eb9b17fe1432a809c73a13889b5006/420/420/Image/Png'; // Gambar Noob Default

// ==========================================
// 3. MAIN FUNCTIONS
// ==========================================

function renderMembers() {
    const memberContainer = document.getElementById('member-container');
    if (!memberContainer) return;

    memberContainer.innerHTML = '';
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = "bg-rhc-accent rounded-2xl p-6 text-center border border-gray-700 hover:border-rhc-main transition duration-300 transform hover:-translate-y-2 fade-in group shadow-lg";
        
        // Disini kita gunakan onerror untuk menangani jika gambar rusak
        card.innerHTML = `
            <div class="relative w-24 h-24 mx-auto mb-4 cursor-pointer" onclick="window.open('https://www.roblox.com/users/${member.id}/profile', '_blank')">
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
            <h3 class="text-xl font-bold text-white mb-1 hover:text-rhc-main cursor-pointer" onclick="window.open('https://www.roblox.com/users/${member.id}/profile', '_blank')">${member.name}</h3>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${member.color}">
                ${member.role}
            </span>
            <p class="text-gray-400 text-sm italic">"${member.quote}"</p>
            
            <div class="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
                <a href="https://www.roblox.com/users/${member.id}/profile" target="_blank" class="text-gray-400 hover:text-white transition" title="Lihat Profil Roblox">
                    <i class="fa-solid fa-user"></i>
                </a>
            </div>
        `;
        memberContainer.appendChild(card);
    });
}

// Toggle Menu Global
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
};

// C. Fetch Discord Online Members (VERSI INFINITE SCROLL)
async function fetchDiscordMembers() {
    const listContainer = document.getElementById('discord-list');
    const countElement = document.getElementById('total-online-count');
    
    if (!listContainer || !countElement || DISCORD_SERVER_ID.includes('MASUKKAN')) return;

    try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        const data = await response.json();
        countElement.innerText = `${data.presence_count || 0} Player Online`;

        // Jika kosong
        if (data.members.length === 0) {
            listContainer.innerHTML = '<div class="px-10 text-gray-500">Member Invisible / Data Kosong</div>';
            listContainer.classList.remove('animate-infinite-scroll'); // Matikan animasi jika kosong
            listContainer.classList.add('justify-center', 'w-full'); // Tengahkan teks
            return;
        }

        // --- GENERATE HTML MEMBER ---
        let allCardsHTML = '';

        data.members.forEach(member => {
            let statusColor = 'bg-green-500';
            if(member.status === 'idle') statusColor = 'bg-yellow-500';
            if(member.status === 'dnd') statusColor = 'bg-red-500';

            // Card Layout (Lebar Fixed w-64 agar rapi saat berjalan)
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

        // --- DUPLIKASI DATA AGAR LOOPING MULUS ---
        // Kita masukkan allCardsHTML DUA KALI
        listContainer.innerHTML = allCardsHTML + allCardsHTML;

    } catch (error) {
        console.log("Discord widget error:", error);
        countElement.innerText = "Offline";
    }
}

// INITIALIZATION
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