if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/dex/sw.js', { scope: '/dex/' })})}