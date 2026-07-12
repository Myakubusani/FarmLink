const translations = {

    english: {
        appName: "🌾 FarmLink",
        subtitle: "Connecting Farmers Directly With Buyers",
        welcomeText: "Welcome Back",
        loginSubtitle: "Login with your phone number",
        createAccount: "Create Account",
        login: "Login",
        register: "Register",
        dashboard: "Dashboard",
        sell: "Sell Produce",
        favorites: "My Favorites",
        orders: "Orders",
        logout: "Logout"
    },

    hausa: {
        appName: "🌾 FarmLink",
        subtitle: "Haɗa Manoma Kai Tsaye da Masu Saye",
        welcomeText: "Barka da dawowa",
        loginSubtitle: "Shiga tare da lambar wayarka",
        createAccount: "Ƙirƙiri Asusun",
        login: "Shiga",
        register: "Yi Rijista",
        dashboard: "Allon Gudanarwa",
        sell: "Sayar da Amfanin Gona",
        favorites: "Abubuwan da Na Fi So",
        orders: "Oda",
        logout: "Fita"
    },

    yoruba: {
        appName: "🌾 FarmLink",
        subtitle: "Sisopọ Awọn Agbe Pẹlu Awọn Olura",
        welcomeText: "Ẹ ku ojoo",
        loginSubtitle: "Wọlé pẹlu ọrọ aṣa rẹ",
        createAccount: "Ṣe àṣà àkọsì",
        login: "Wọlé",
        register: "Forukọsilẹ",
        dashboard: "Dasibodu",
        sell: "Ta Ọja",
        favorites: "Ohun Ti Mo Fẹ",
        orders: "Awọn Aṣẹ",
        logout: "Jade"
    },

    igbo: {
        appName: "🌾 FarmLink",
        subtitle: "Ijikọ Ndị Ọrụ Ugbo na Ndị Na-azụ Ahịa",
        welcomeText: "Nnọọ azụ",
        loginSubtitle: "Banye na nọmba ekwentị gị",
        createAccount: "Mepụta Akaụntụ",
        login: "Banye",
        register: "Debanye Aha",
        dashboard: "Dashboard",
        sell: "Ree Ngwaahịa",
        favorites: "Ihe Mmasị M",
        orders: "Ntụnye",
        logout: "Pụọ"
    },

    pidgin: {
        appName: "🌾 FarmLink",
        subtitle: "Connecting Farmers Straight With Buyers",
        welcomeText: "Welcome Back",
        loginSubtitle: "Login with your phone number",
        createAccount: "Create Account",
        login: "Login",
        register: "Register",
        dashboard: "Dashboard",
        sell: "Sell Produce",
        favorites: "My Favorites",
        orders: "Orders",
        logout: "Comot"
    }

};

const lang = localStorage.getItem("language") || "english";
const t = translations[lang];

if (document.getElementById("appName")) {
    document.getElementById("appName").textContent = t.appName;
}

if (document.getElementById("welcomeText")) {
    document.getElementById("welcomeText").textContent = t.welcomeText;
}

if (document.getElementById("loginSubtitle")) {
    document.getElementById("loginSubtitle").textContent = t.loginSubtitle;
}

if (document.getElementById("loginBtn")) {
    document.getElementById("loginBtn").textContent = t.login;
}

if (document.getElementById("createAccountBtn")) {
    document.getElementById("createAccountBtn").textContent = t.createAccount;
}