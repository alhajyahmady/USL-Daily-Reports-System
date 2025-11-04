// app.js
// USL Daily Reports System - Main Logic

console.log("USL Daily Reports System loaded successfully!");

// ⏳ Subiri Firebase ianze
const waitForFirebase = setInterval(() => {
  if (window.USL_FIREBASE) {
    clearInterval(waitForFirebase);
    initApp();
  }
}, 500);

function initApp() {
  const { auth, db } = window.USL_FIREBASE;

  // Background rotation
  const backgrounds = [
    "http://www.ctm.co.tz/api/catalog/product/m/a/marmo-latte-ceramic-wall-tile-ls4.jpg?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/v/i/vieana-perla-wall-tile.jpg?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/r/o/rock-dark-shiny-ceramic-wall-tile_1.jpg?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/0/2/02_4.jpg?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/s/t/strtivmf2060---viena-marfil-lifestyle.jpg?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/v/e/venato_gold_ripples_satin_finish_ceramic_feature_wall_tile_-3.webp?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/w/s/ws1cvw10a7l_-futura_vibes_white_shiny_ceramic_wall_tile_-_600_x_300mm_2_.webp?width=700&height=700&store=TZ&image-type=small_image",
    "http://www.ctm.co.tz/api/catalog/product/f/o/forest-dark-wall-tile-300x600mm.jpg?width=700&height=700&store=TZ&image-type=small_image",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile9.jpeg",
    "backgrounds/tile10.jpeg",
  ];
  let current = 0;
  function changeBackground() {
    document.body.style.backgroundImage = `url('${backgrounds[current]}')`;
    current = (current + 1) % backgrounds.length;
  }
  changeBackground();
  setInterval(changeBackground, 16000); // badilika kila sekunde 16

  // Elements
  const loginSection = document.getElementById("login-section");
  const signupSection = document.getElementById("signup-section");
  const reportSection = document.getElementById("report-section");
  const managerSection = document.getElementById("manager-section");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  // Switching sections
  showSignup.onclick = () => {
    loginSection.classList.add("hidden");
    signupSection.classList.remove("hidden");
  };
  showLogin.onclick = () => {
    signupSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  };

  // Signup
  document.getElementById("signupBtn").onclick = async () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const role = document.getElementById("role").value;

    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await db.collection("users").doc(user.uid).set({ email, role });
      alert("Umesajiliwa vizuri! Sasa unaweza kuingia.");
      signupSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
    } catch (error) {
      alert("Kuna kosa: " + error.message);
    }
  };

  // Login
  document.getElementById("loginBtn").onclick = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const userDoc = await db.collection("users").doc(user.uid).get();
      const role = userDoc.exists ? userDoc.data().role : "employee";

      loginSection.classList.add("hidden");

      if (role === "manager") {
        managerSection.classList.remove("hidden");
        loadReports();
      } else {
        reportSection.classList.remove("hidden");
      }
    } catch (error) {
      alert("Kuna kosa: " + error.message);
    }
  };

  // Submit report
  document.getElementById("submitReport").onclick = async () => {
    const text = document.getElementById("reportText").value;
    const user = auth.currentUser;
    if (!text.trim()) return alert("Tafadhali andika ripoti kwanza.");

    try {
      await db.collection("reports").add({
        text,
        user: user.email,
        date: new Date().toLocaleString()
      });
      alert("Ripoti imetumwa!");
      document.getElementById("reportText").value = "";
    } catch (error) {
      alert("Kuna kosa: " + error.message);
    }
  };

  // Load reports for manager
  async function loadReports() {
    const reportsList = document.getElementById("reportsList");
    reportsList.innerHTML = "<p>Inapakia ripoti...</p>";

    db.collection("reports").orderBy("date", "desc").onSnapshot(snapshot => {
      reportsList.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.className = "report-item";
        div.innerHTML = `<strong>${data.user}</strong><br>${data.text}<br><small>${data.date}</small>`;
        reportsList.appendChild(div);
      });
    });
  }

  // Logout buttons
  document.getElementById("logoutBtn").onclick = () => auth.signOut();
  document.getElementById("logoutManager").onclick = () => auth.signOut();

  // When logout
  auth.onAuthStateChanged(user => {
    if (!user) {
      reportSection.classList.add("hidden");
      managerSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
    }
  });
}
