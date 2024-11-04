// utils/deviceHelpers.js

export function isInstagramApp() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return userAgent.includes('Instagram');
  }
  