// sw.js
// Convert the Base64 public key to Uint8Array
const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};

// Subscribe to push notifications
self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BDkSVjag20lurbtcVxwO1gzedJabTauZssA84vI6X2iXYHV2fjnQzTbrShR7mE1GEBoD0CchjbvZjRPUJQwK3DQ") // Replace with your public key
    });

    // Save subscription to your backend server
    const response = await fetch(`https://api.janpadnewslive.com/api/v1/save-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
    });

    // console.log('Subscription saved', await response.json());
});

self.addEventListener('push', function (event) {
    const data = event.data.json();  // Parse the JSON payload
    // console.log('Push event received:', data);

    const title = data.title || 'Notification Title';
    const options = {
        body: data.body || 'Default body text',
        icon: data.icon || '/default-icon.png',
        data: {
            url: data.url  // Store the URL in the notification data
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', function (event) {
    const notification = event.notification;
    const urlToOpen = notification.data.url;  // Retrieve the URL from notification data
    // console.log("Notification clicked, opening URL:", urlToOpen);

    event.notification.close();  // Close the notification

    // Open the URL in a new tab or window
    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});
