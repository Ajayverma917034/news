// utils/registerSW.js

export const registerSW = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered', registration);
        } catch (error) {
            console.error('Service Worker registration failed', error);
        }
    } else {
        console.error('Service Worker is not supported in this browser.');
    }
};
