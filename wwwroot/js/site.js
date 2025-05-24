// site.js

window.initializeHomePageWidgets = () => {
    // Initialize home page widgets
};

window.cleanupHomePageWidgets = () => {
    // Clean up home page widgets
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
