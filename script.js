let userEmail = "";
let userPassword = "";

let loadingInterval = null;
let loadingCompletionTimeout = null;
let loadingProgress = 0;
let loadingResetCount = 0;
let loadingBackwardsDone = [];


function showScreen(screenId) {
    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(screenId);

    if (target) {
        target.classList.add("active");
    }

    window.scrollTo(0, 0);
}


/* =========================
   ACCOUNT CREATION
========================= */

function createAccount(event) {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const error = document.getElementById("signupError");

    error.textContent = "";

    if (password.length < 8) {
        error.textContent =
            "Password must contain at least 8 characters.";
        return;
    }

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match.";
        return;
    }

    userEmail = email;
    userPassword = password;

    showAccountCreation();
}


function showAccountCreation() {
    showScreen("accountCreated");
}


/* =========================
   LOGIN
========================= */

function login(event) {
    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const error =
        document.getElementById("loginError");

    error.textContent = "";

    if (email !== userEmail || password !== userPassword) {
        error.textContent = "Incorrect email or password.";
        return;
    }

    // Correct credentials.
    // Unfortunately...
    showScreen("accessDenied");
}


function forgotPassword() {
    alert(
        "Your password has been forgotten.\n\n" +
        "Unfortunately, we cannot help you remember it."
    );
}


/* =========================
   LOADING
========================= */

function goToLoading() {
    showScreen("loading");
    startLoading();
}


function startLoading() {

    // Stop any previous loading process.
    clearInterval(loadingInterval);
    clearTimeout(loadingCompletionTimeout);

    loadingProgress = 0;

    // Reset the backward-progress events.
    loadingBackwardsDone = [];

    updateProgress();

    const messages = [
        "Loading uselessness...",
        "Contacting uselessness server...",
        'Server responded: "Why?"',
        "Calculating...",
        "Recalculating...",
        "Determining purpose...",
        "Purpose not found.",
        "Searching for purpose...",
        "Still nothing.",
        "Optimizing nothing...",
        "Almost accomplishing something...",
        "Canceling that...",
        "Returning to nothing...",
        "Processing unnecessary information...",
        "Checking absolutely nothing...",
        "Finalizing uselessness..."
    ];

    let messageIndex = 0;

    const loadingMessage =
        document.getElementById("loadingMessage");

    loadingMessage.textContent = messages[0];


    loadingInterval = setInterval(() => {

        loadingProgress += 1;


        /*
         * Make the progress go backwards
         * ONLY ONCE at each point.
         *
         * 25 → 23
         * 48 → 46
         * 72 → 70
         *
         * After that, it continues normally.
         */

        if (
            loadingProgress === 25 &&
            !loadingBackwardsDone.includes(25)
        ) {
            loadingBackwardsDone.push(25);
            loadingProgress = 23;
        }


        if (
            loadingProgress === 48 &&
            !loadingBackwardsDone.includes(48)
        ) {
            loadingBackwardsDone.push(48);
            loadingProgress = 46;
        }


        if (
            loadingProgress === 72 &&
            !loadingBackwardsDone.includes(72)
        ) {
            loadingBackwardsDone.push(72);
            loadingProgress = 70;
        }


        updateProgress();


        /*
         * Change the loading message
         * every few percentage points.
         */

        if (loadingProgress % 4 === 0) {

            messageIndex++;

            if (messageIndex >= messages.length) {
                messageIndex = messages.length - 1;
            }

            loadingMessage.textContent =
                messages[messageIndex];
        }


        /*
         * FINISHED.
         */

        if (loadingProgress >= 100) {

            clearInterval(loadingInterval);

            loadingProgress = 100;

            updateProgress();

            loadingMessage.textContent =
                "Experience ready.";


            loadingCompletionTimeout = setTimeout(() => {
                showScreen("success");
            }, 1200);
        }

    }, 300);
}


function updateProgress() {

    const progressBar =
        document.getElementById("progress");

    const progressText =
        document.getElementById("progressText");


    progressBar.style.width =
        loadingProgress + "%";

    progressText.textContent =
        loadingProgress;
}


/* =========================
   DO NOT CLICK
========================= */

function resetLoading() {

    loadingResetCount++;

    const clickMessage =
        document.getElementById("clickMessage");


    const messages = [
        "Why did you do that?",
        "We literally told you not to.",
        "You are doing this to yourself.",
        "Impressive.",
        "We have learned nothing from this."
    ];


    const messageIndex =
        Math.min(
            loadingResetCount - 1,
            messages.length - 1
        );


    clickMessage.textContent =
        messages[messageIndex];


    // Start the entire useless loading process again.
    startLoading();
}


/* =========================
   DASHBOARD
========================= */

function showDashboard() {
    showScreen("dashboard");
}


/* =========================
   SETTINGS
========================= */

function toggleSetting(button) {

    button.classList.toggle("active");


    if (button.classList.contains("active")) {

        button.textContent = "ON";

    } else {

        button.textContent = "OFF";
    }
}


/* =========================
   DELETE ACCOUNT
========================= */

function deleteAccount() {

    const confirmed = confirm(
        "Are you sure you want to delete your account?"
    );


    if (!confirmed) {
        return;
    }


    alert(
        "Account deletion complete.\n\n" +
        "Your account has been deleted."
    );


    userEmail = "";
    userPassword = "";


    showScreen("login");
}


/* =========================
   CLEANUP
========================= */

window.addEventListener("beforeunload", () => {

    clearInterval(loadingInterval);
    clearTimeout(loadingCompletionTimeout);

});