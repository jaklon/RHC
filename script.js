// ==========================================
// 1. DATA MEMBER RHC
// ==========================================
const members = [
    {
        name: "Syla",
        role: "Founder",
        image: "https://tr.rbxcdn.com/30c98b672728493121528cb9389531c3/420/420/Image/Png",
        quote: "King of Blox Fruits",
        color: "text-red-500 border-red-500/50 bg-red-500/10"
    },
    {
        name: "Mbonn",
        role: "Co-Leader",
        image: "https://tr.rbxcdn.com/5f7776512684803d5204481308332185/420/420/Image/Png",
        quote: "Admin paling galak",
        color: "text-blue-500 border-blue-500/50 bg-blue-500/10"
    },
    {
        name: "Micaa",
        role: "Moderator",
        image: "https://tr.rbxcdn.com/d5a9c020583f769747981503c14c53c4/420/420/Image/Png",
        quote: "Pantau chat 24 jam",
        color: "text-green-500 border-green-500/50 bg-green-500/10"
    },
    {
        name: "Kiw",
        role: "Elite Member",
        image: "https://tr.rbxcdn.com/15b57f202450cd5e1352e82500c526d1/420/420/Image/Png",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10"
    },
    {
        name: "Klon",
        role: "Elite Member",
        image: "https://tr.rbxcdn.com/15b57f202450cd5e1352e82500c526d1/420/420/Image/Png",
        quote: "Jago Parkour",
        color: "text-yellow-500 border-yellow-500/50 bg-yellow-500/10"
    }
];

// ==========================================
// 2. CONFIG DISCORD (Opsional)
// ==========================================
// Masukkan Server ID Discord kamu di sini jika ingin fitur Online Member jalan
const DISCORD_SERVER_ID = 'MASUKKAN_ID_DISCORD_DISINI'; 

// ==========================================
// 3. FUNGSI UTAMA (Main Functions)
// ==========================================

// A. Render Member Card
function renderMembers() {
    const memberContainer = document.getElementById('member-container');
    if (!memberContainer) return; // Stop jika elemen tidak ada di HTML

    memberContainer.innerHTML = ''; // Bersihkan container
    
    members.forEach(member => {
        const card = document.createElement('div');
        card.className = "bg-rhc-accent rounded-2xl p-6 text-center border border-gray-700 hover:border-rhc-main transition duration-300 transform hover:-translate-y-2 fade-in group shadow-lg";
        
        card.innerHTML = `
            <div class="relative w-24 h-24 mx-auto mb-4">
                <img src="${member.image}" alt="${member.name}" class="w-full h-full rounded-full object-cover border-4 border-gray-800 group-hover:border-rhc-main transition duration-300">
                <div class="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1 border border-gray-600">
                    <i class="fa-solid fa-circle-check text-blue-400 text-sm"></i>
                </div>
            </div>
            <h3 class="text-xl font-bold text-white mb-1">${member.name}</h3>
            <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${member.color}">
                ${member.role}
            </span>
            <p class="text-gray-400 text-sm italic">"${member.quote}"</p>
            <div class="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
                <a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands fa-discord"></i></a>
                <a href="#" class="text-gray-400 hover:text-white transition"><i class="fa-brands fa-instagram"></i></a>
            </div>
        `;
        memberContainer.appendChild(card);
    });
}

// B. Toggle Mobile Menu (Dibuat global dengan window)
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
};

// C. Fetch Discord Online Members
async function fetchDiscordMembers() {
    const listContainer = document.getElementById('discord-list');
    const countElement = document.getElementById('total-online-count');
    
    // Cek apakah elemen ada di HTML sebelum lanjut
    if (!listContainer || !countElement || DISCORD_SERVER_ID === 'MASUKKAN_ID_DISCORD_DISINI') return;

    try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (!response.ok) throw new Error("Gagal mengambil data");
        
        const data = await response.json();
        countElement.innerText = `${data.presence_count || 0} Player Online`;
        listContainer.innerHTML = '';

        data.members.forEach(member => {
            let statusColor = 'bg-green-500';
            if(member.status === 'idle') statusColor = 'bg-yellow-500';
            if(member.status === 'dnd') statusColor = 'bg-red-500';

            const memberCard = document.createElement('div');
            memberCard.className = 'bg-rhc-dark rounded-xl p-3 flex items-center space-x-3 border border-gray-700 fade-in';
            memberCard.innerHTML = `
                <div class="relative flex-shrink-0">
                    <img src="${member.avatar_url}" alt="${member.username}" class="w-10 h-10 rounded-full bg-gray-600">
                    <span class="absolute bottom-0 right-0 w-3 h-3 ${statusColor} border-2 border-rhc-dark rounded-full"></span>
                </div>
                <div class="overflow-hidden">
                    <p class="text-white text-sm font-bold truncate">${member.username}</p>
                    <p class="text-gray-500 text-xs truncate capitalize">${member.game ? 'Main: ' + member.game.name : member.status}</p>
                </div>
            `;
            listContainer.appendChild(memberCard);
        });
    } catch (error) {
        console.log("Discord widget error:", error);
        countElement.innerText = "Offline";
    }
}

// ==========================================
// 4. INITIALIZATION (Saat Web Selesai Loading)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Member
    renderMembers();
    
    // 2. Fetch Discord (Setiap 60 detik)
    fetchDiscordMembers();
    setInterval(fetchDiscordMembers, 60000);

    // 3. Scroll Animation Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe semua elemen dengan class 'fade-in' (termasuk yang baru di-render JS)
    // Menggunakan setTimeout 100ms untuk memastikan elemen JS sudah ter-render di DOM
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
    }, 100);
});