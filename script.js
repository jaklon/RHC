// ==========================================
// 1. FIREBASE CONFIGURATION & IMPORTS
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// --- [PENTING] GANTI INI DENGAN CONFIG DARI FIREBASE CONSOLE KAMU ---
const firebaseConfig = {
  apiKey: "AIzaSyBcYhR_HGf4fRbjYPXz2HuGzZLLjArhKIo",
  authDomain: "rhc-web-e89e4.firebaseapp.com",
  projectId: "rhc-web-e89e4",
  storageBucket: "rhc-web-e89e4.firebasestorage.app",
  messagingSenderId: "262345137112",
  appId: "1:262345137112:web:cc29edcab940c2589f30ad",
  measurementId: "G-RSK7CYGPDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const membersCollection = collection(db, "members");

// ==========================================
// 2. GLOBAL VARIABLES & STATIC DATA
// ==========================================
const DISCORD_SERVER_ID = '1400102592436113448'; 
const DEFAULT_AVATAR = 'https://tr.rbxcdn.com/53eb9b17fe1432a809c73a13889b5006/420/420/Image/Png';

let membersData = []; // Wadah data dari Database

// Data Couple tetap Statis (Kecuali mau dibuat database juga nanti)
const couples = [
    {
        shipName: "Kiw & Mott",
        title: "Best Friend Forever",
        date: "Est. 2024",
        maleId: "3187189414",
        maleImage: "https://tr.rbxcdn.com/30DAY-Avatar-6D36128F7DBCD8BA7AC47AE4839D191F-Png/720/720/Avatar/Webp/noFilter", 
        femaleId: "8815577289",
        femaleImage: "https://tr.rbxcdn.com/30DAY-Avatar-ECAEC390859BEF8123640D5CD3AF48D8-Png/720/720/Avatar/Webp/noFilter",
        color: "from-pink-500 to-purple-600"
    },
    {
        shipName: "Mbonn & Montee",
        title: "King & Queen of AFK",
        date: "Est. 2023",
        maleId: "3187189414",
        maleImage: "https://tr.rbxcdn.com/30DAY-Avatar-6D36128F7DBCD8BA7AC47AE4839D191F-Png/720/720/Avatar/Webp/noFilter", 
        femaleId: "8815371704",
        femaleImage: "https://tr.rbxcdn.com/30DAY-Avatar-D8DAB6965C82BADBD57FA8C29DBDF48D-Png/720/720/Avatar/Webp/noFilter",
        color: "from-red-500 to-orange-500"
    },
    {
        shipName: "Tequilla & Nchippp",
        title: "Prince & Princess of RHC",
        date: "Est. 2023",
        maleId: "12345678",
        maleImage: "https://tr.rbxcdn.com/30DAY-Avatar-EFC49127318A4F6DF60F3F28BB81D824-Png/720/720/Avatar/Webp/noFilter", 
        femaleId: "87654321", 
        femaleImage: "https://tr.rbxcdn.com/5f7776512684803d5204481308332185/420/420/Image/Png",
        color: "from-blue-500 to-cyan-500"
    },
];

// ==========================================
// 3. DATABASE FUNCTIONS (CRUD)
// ==========================================

// READ: Ambil data dari Firebase
async function fetchMembers() {
    const container = document.getElementById('member-container');
    if (!container) return;
    
    container.innerHTML = '<p class="text-white text-center col-span-full animate-pulse mt-10">Loading Database...</p>';
    
    try {
        const querySnapshot = await getDocs(membersCollection);
        membersData = []; // Reset data lokal
        
        querySnapshot.forEach((doc) => {
            // Gabungkan ID dokumen dengan data isinya
            membersData.push({ id: doc.id, ...doc.data() });
        });
        
        renderMembersUI(); // Tampilkan ke layar
    } catch (error) {
        console.error("Error fetching members: ", error);
        container.innerHTML = '<p class="text-red-500 text-center col-span-full mt-10 bg-red-900/20 p-4 rounded-lg">Gagal memuat database. Cek Console & Config Firebase.</p>';
    }
}

// CREATE / UPDATE: Handle Form Submit
window.handleFormSubmit = async function(e) {
    e.preventDefault();
    const docId = document.getElementById('inp-doc-id').value;
    const btnSubmit = document.querySelector('button[type="submit"]');
    const originalText = btnSubmit.innerHTML;
    
    btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    btnSubmit.disabled = true;

    // Ambil data dari input form
    const newData = {
        name: document.getElementById('inp-name').value,
        username: document.getElementById('inp-username').value,
        role: document.getElementById('inp-role').value,
        about: document.getElementById('inp-about').value,
        quote: document.getElementById('inp-quote').value,
        robloxId: document.getElementById('inp-userid').value, // ID Angka Roblox
        image: document.getElementById('inp-image').value      // Link Gambar
    };

    try {
        if (docId) {
            // UPDATE EXISTING
            await updateDoc(doc(db, "members", docId), newData);
            alert("✅ Member berhasil diperbarui!");
        } else {
            // CREATE NEW
            await addDoc(membersCollection, newData);
            alert("✅ Member baru berhasil ditambahkan!");
        }
        closeModal();
        fetchMembers(); // Refresh tampilan
    } catch (error) {
        console.error("Error saving document: ", error);
        alert("❌ Gagal menyimpan data: " + error.message);
    } finally {
        btnSubmit.innerHTML = originalText;
        btnSubmit.disabled = false;
    }
}

// DELETE: Hapus Member
window.deleteMember = async function() {
    const docId = document.getElementById('inp-doc-id').value;
    if (!docId) return;

    if (confirm("⚠️ Yakin ingin menghapus member ini? Data akan hilang permanen.")) {
        try {
            await deleteDoc(doc(db, "members", docId));
            alert("🗑️ Member dihapus.");
            closeModal();
            fetchMembers();
        } catch (error) {
            console.error("Error removing document: ", error);
            alert("Gagal menghapus.");
        }
    }
}

// ==========================================
// 4. UI RENDER FUNCTIONS
// ==========================================

function renderMembersUI() {
    const container = document.getElementById('member-container');
    container.innerHTML = '';

    if (membersData.length === 0) {
        container.innerHTML = '<p class="text-gray-500 text-center col-span-full py-10">Belum ada member di database. Klik tombol "Tambah Member" di atas.</p>';
        return;
    }

    membersData.forEach((member) => {
        // Tentukan warna berdasarkan role
        let colorClass = "text-gray-500 border-gray-500/50 bg-gray-500/10";
        if(member.role === 'Founder') colorClass = "text-red-500 border-red-500/50 bg-red-500/10";
        if(member.role === 'Co-Leader') colorClass = "text-blue-500 border-blue-500/50 bg-blue-500/10";
        if(member.role === 'Moderator') colorClass = "text-green-500 border-green-500/50 bg-green-500/10";
        if(member.role === 'Elite Member') colorClass = "text-yellow-500 border-yellow-500/50 bg-yellow-500/10";

        const card = document.createElement('div');
        card.className = "bg-rhc-accent rounded-2xl p-6 text-center border border-gray-700 hover:border-rhc-main transition duration-300 transform hover:-translate-y-2 fade-in group shadow-lg cursor-pointer flex flex-col items-center justify-between h-full";
        
        // Klik card membuka modal berdasarkan ID Database
        card.onclick = () => openModal(member.id);

        card.innerHTML = `
            <div class="w-full">
                <div class="relative w-24 h-24 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                    <img 
                        src="${member.image || DEFAULT_AVATAR}" 
                        onerror="this.src='${DEFAULT_AVATAR}'" 
                        class="w-full h-full rounded-full object-cover border-4 border-gray-800 group-hover:border-rhc-main transition duration-300"
                    >
                    <div class="absolute bottom-0 right-0 bg-gray-900 rounded-full p-1 border border-gray-600">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Roblox_player_icon_black.svg" class="w-4 h-4 invert">
                    </div>
                </div>
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-rhc-main transition">${member.name}</h3>
                <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 border ${colorClass}">${member.role}</span>
                <p class="text-gray-400 text-sm italic line-clamp-2">"${member.quote}"</p>
            </div>
            <div class="mt-4 w-full">
                <button class="w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-300 transition">Detail</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function renderCouples() {
    const container = document.getElementById('couple-container');
    if (!container) return;
    container.innerHTML = '';

    couples.forEach(couple => {
        const card = document.createElement('div');
        card.className = "relative group bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-pink-500 transition duration-500 fade-in overflow-hidden";
        
        card.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r ${couple.color} opacity-0 group-hover:opacity-10 transition duration-500"></div>
            <div class="flex justify-center items-center mb-6 relative">
                <div class="relative z-10 w-20 h-20 -mr-4 transition-transform duration-300 group-hover:-translate-x-2 group-hover:-rotate-6 cursor-pointer" onclick="window.open('https://www.roblox.com/users/${couple.maleId}/profile', '_blank')">
                    <img src="${couple.maleImage}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full rounded-full border-4 border-gray-900 object-cover shadow-lg">
                </div>
                <div class="z-20 bg-gray-900 rounded-full p-1.5 border-2 border-pink-500 animate-pulse">
                    <i class="fa-solid fa-heart text-pink-500 text-lg"></i>
                </div>
                <div class="relative z-0 w-20 h-20 -ml-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-6 cursor-pointer" onclick="window.open('https://www.roblox.com/users/${couple.femaleId}/profile', '_blank')">
                    <img src="${couple.femaleImage}" onerror="this.src='${DEFAULT_AVATAR}'" class="w-full h-full rounded-full border-4 border-gray-900 object-cover shadow-lg">
                </div>
            </div>
            <div class="text-center relative z-10">
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-pink-400 transition">${couple.shipName}</h3>
                <span class="inline-block px-3 py-1 text-xs font-bold text-white bg-gradient-to-r ${couple.color} rounded-full mb-2 shadow-lg">${couple.title}</span>
                <p class="text-gray-500 text-xs italic"><i class="fa-regular fa-calendar mr-1"></i> ${couple.date}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// ==========================================
// 5. MODAL LOGIC (VIEW & EDIT)
// ==========================================

// Buka Modal (Read/Edit)
window.openModal = function(docId) {
    // Cari data member dari array lokal berdasarkan ID Database
    const member = membersData.find(m => m.id === docId);
    if (!member) return;

    // Reset UI ke Mode View
    setModalMode('view');

    // Isi Data ke Form/View
    document.getElementById('inp-doc-id').value = member.id;
    document.getElementById('modal-image').src = member.image || DEFAULT_AVATAR;
    document.getElementById('inp-image').value = member.image || "";
    document.getElementById('inp-userid').value = member.robloxId || "";
    document.getElementById('modal-link').href = `https://www.roblox.com/users/${member.robloxId}/profile`;

    document.getElementById('modal-name').innerText = member.name;
    document.getElementById('inp-name').value = member.name;
    document.getElementById('modal-username').innerText = member.username;
    document.getElementById('inp-username').value = member.username;
    document.getElementById('modal-role').innerText = member.role;
    document.getElementById('inp-role').value = member.role;
    document.getElementById('modal-about').innerText = member.about;
    document.getElementById('inp-about').value = member.about;
    document.getElementById('modal-quote').innerText = `"${member.quote}"`;
    document.getElementById('inp-quote').value = member.quote;

    // Fetch Stats Realtime dari Roblox Proxy
    fetchRobloxStats(member.robloxId);

    showModalAnimation();
}

// Buka Modal Tambah Member (Create)
window.openAddModal = function() {
    document.getElementById('crud-form').reset();
    document.getElementById('inp-doc-id').value = ""; 
    document.getElementById('modal-image').src = DEFAULT_AVATAR;
    
    // Reset Stats text
    document.getElementById('modal-friends').innerText = "-";
    document.getElementById('modal-followers').innerText = "-";
    document.getElementById('modal-following').innerText = "-";

    // Paksa masuk Edit Mode
    setModalMode('edit');
    // Ubah tombol Edit jadi "Batal"
    const btnEdit = document.getElementById('btn-edit-mode');
    btnEdit.innerText = 'Batal';
    btnEdit.onclick = closeModal;

    showModalAnimation();
}

// Helper: Toggle Tampilan Modal
function setModalMode(mode) {
    const btnEdit = document.getElementById('btn-edit-mode');
    
    if (mode === 'edit') {
        document.querySelectorAll('.view-field').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.edit-field').forEach(el => el.classList.remove('hidden'));
        document.getElementById('action-buttons').classList.remove('hidden');
        document.getElementById('normal-buttons').classList.add('hidden');
        btnEdit.innerText = 'Batal';
        btnEdit.onclick = toggleEditMode; // Toggle balik
    } else {
        document.querySelectorAll('.view-field').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.edit-field').forEach(el => el.classList.add('hidden'));
        document.getElementById('action-buttons').classList.add('hidden');
        document.getElementById('normal-buttons').classList.remove('hidden');
        btnEdit.innerText = 'Edit';
        btnEdit.onclick = toggleEditMode;
    }
}

window.toggleEditMode = function() {
    const isEdit = document.getElementById('action-buttons').classList.contains('hidden');
    setModalMode(isEdit ? 'edit' : 'view');
}

function showModalAnimation() {
    const modal = document.getElementById('member-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        document.getElementById('modal-backdrop').classList.remove('opacity-0');
        document.getElementById('modal-panel').classList.remove('opacity-0', 'translate-y-4');
        document.getElementById('modal-panel').classList.add('opacity-100', 'translate-y-0');
    }, 10);
}

window.closeModal = function() {
    const modal = document.getElementById('member-modal');
    document.getElementById('modal-backdrop').classList.add('opacity-0');
    document.getElementById('modal-panel').classList.remove('opacity-100', 'translate-y-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        // Reset Edit Button logic
        const btnEdit = document.getElementById('btn-edit-mode');
        if(btnEdit) {
             btnEdit.innerText = 'Edit';
             btnEdit.onclick = toggleEditMode;
        }
    }, 300);
}
document.getElementById('modal-backdrop')?.addEventListener('click', window.closeModal);


// ==========================================
// 6. HELPER FUNCTIONS (API Discord & Roblox)
// ==========================================

// Toggle Mobile Menu
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.classList.toggle('hidden');
};

// Discord Widget
async function fetchDiscordMembers() {
    const listContainer = document.getElementById('discord-list');
    const countElement = document.getElementById('total-online-count');
    
    if (!listContainer || !countElement) return;

    try {
        const response = await fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`);
        if (!response.ok) throw new Error("Gagal");
        
        const data = await response.json();
        countElement.innerText = `${data.presence_count || 0} Player Online`;

        if (!data.members || data.members.length === 0) {
            listContainer.innerHTML = '<div class="px-10 text-gray-500 py-4 italic">Member list hidden by Discord privacy or no one online.</div>';
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
                        <p class="text-gray-500 text-xs truncate capitalize text-gray-400">${member.game ? 'Main: ' + member.game.name : member.status}</p>
                    </div>
                </div>
            `;
        });
        listContainer.innerHTML = allCardsHTML + allCardsHTML;
    } catch (error) {
        console.log("Discord widget error:", error);
        countElement.innerText = "Offline";
    }
}

// Roblox Stats (Dual Proxy)
async function fetchRobloxStats(userId) {
    if(!userId) return;
    const elFriends = document.getElementById('modal-friends');
    const elFollowers = document.getElementById('modal-followers');
    const elFollowing = document.getElementById('modal-following');

    elFriends.innerText = "...";
    elFollowers.innerText = "...";
    elFollowing.innerText = "...";

    const tryFetch = async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        return res.json();
    };

    try {
        let countFriends = 0;
        try {
            const data = await tryFetch(`https://corsproxy.io/?https://friends.roblox.com/v1/users/${userId}/friends/count`);
            countFriends = data.count;
        } catch (e) {
            const data = await tryFetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/friends/count`)}`);
            const parsed = JSON.parse(data.contents);
            countFriends = parsed.count;
        }

        let countFollowers = 0;
        try {
            const data = await tryFetch(`https://corsproxy.io/?https://friends.roblox.com/v1/users/${userId}/followers/count`);
            countFollowers = data.count;
        } catch (e) {
            const data = await tryFetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/followers/count`)}`);
            const parsed = JSON.parse(data.contents);
            countFollowers = parsed.count;
        }

        let countFollowing = 0;
        try {
            const data = await tryFetch(`https://corsproxy.io/?https://friends.roblox.com/v1/users/${userId}/followings/count`);
            countFollowing = data.count;
        } catch (e) {
            const data = await tryFetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://friends.roblox.com/v1/users/${userId}/followings/count`)}`);
            const parsed = JSON.parse(data.contents);
            countFollowing = parsed.count;
        }

        elFriends.innerText = formatNumber(countFriends);
        elFollowers.innerText = formatNumber(countFollowers);
        elFollowing.innerText = formatNumber(countFollowing);

    } catch (error) {
        console.error("Gagal ambil stats:", error);
        elFriends.innerText = "-"; elFollowers.innerText = "-"; elFollowing.innerText = "-";
    }
}

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

// ==========================================
// 7. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    fetchMembers(); // Load data dari Firebase
    renderCouples(); // Load data statis Couple
    fetchDiscordMembers(); // Load Discord Widget
    setInterval(fetchDiscordMembers, 60000);

    // Scroll Animation
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