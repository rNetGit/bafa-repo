// site.js

window.initializeHomePageWidgets = () => {
    console.log("✅ JS: Home page widgets initialized.");

    // Example: bind events, scroll behavior, etc.
    // window.addEventListener("scroll", () => console.log("scrolling..."));
};

window.cleanupHomePageWidgets = () => {
    console.log("🧹 JS: Cleaned up home page events.");

    // Example: unbind anything you attach
    // window.removeEventListener("scroll", ...);
};

window.tryShareEvent = async function (shareData) {
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            return true;
        } catch (err) {
            return false;
        }
    }
    return false;
};
