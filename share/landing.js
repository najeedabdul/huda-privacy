/* No analytics, cookies, remote scripts or network requests. */
(function (root) {
  'use strict';
  const APP_STORE = 'https://apps.apple.com/us/app/huda-quran-prayer-adhkar/id6812155953';
  const SELECTORS = new Set(['id', 'surah', 'verse', 'ayah', 'chapter', 'hadith', 'focus', 'section', 'period', 'item', 'part', 'collection', 'topic', 'tab']);

  function sharedRoute(search) {
    const input = new URLSearchParams(search).get('route');
    if (!input || input.length > 2048) return null;
    const [path, query = ''] = input.split('?');
    if (!/^\/(?:[a-zA-Z0-9_-]+(?:\.[0-9]+)?\/?)*$/.test(path)) return null;
    const params = new URLSearchParams(query);
    for (const key of [...params.keys()]) if (!SELECTORS.has(key)) params.delete(key);
    const suffix = params.toString();
    return `${path}${suffix ? `?${suffix}` : ''}`;
  }

  function device(navigator) {
    if (/Android/i.test(navigator.userAgent)) return 'android';
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1)) return 'ios';
    return 'desktop';
  }

  function mount(win, doc) {
    const route = sharedRoute(win.location.search);
    const platform = device(win.navigator);
    const open = doc.getElementById('open');
    const status = doc.getElementById('status');
    const store = doc.getElementById('store');
    let timer;
    let left = false;
    const cancel = () => { left = true; win.clearTimeout(timer); };
    const onVisibility = () => { if (doc.visibilityState === 'hidden') cancel(); };
    win.addEventListener('pagehide', cancel);
    doc.addEventListener('visibilitychange', onVisibility);

    if (route) {
      open.href = `huda://${route}`;
      open.hidden = false;
      // Launch only from an explicit tap: browsers block unprompted scheme launches.
      open.addEventListener('click', () => {
        cancel();
        status.textContent = 'If Huda did not open, download it below, then return to this link.';
      });
    } else {
      status.textContent = 'This shared link is incomplete or invalid. You can still get Huda below.';
    }
    if (platform === 'android') {
      store.hidden = true;
      status.textContent = route ? 'Already have Huda? Tap “Open in Huda”. Google Play availability is coming soon.'
        : 'This shared link is incomplete or invalid. Google Play availability is coming soon.';
    } else if (platform === 'ios' && route) {
      status.textContent = 'Already installed? Tap “Open in Huda”. Otherwise, opening the App Store shortly…';
      timer = win.setTimeout(() => {
        if (!left && doc.visibilityState !== 'hidden') win.location.replace(APP_STORE);
      }, 6000);
    }
    return () => {
      cancel();
      win.removeEventListener('pagehide', cancel);
      doc.removeEventListener('visibilitychange', onVisibility);
    };
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { sharedRoute, device, mount, APP_STORE };
  else mount(root, root.document);
})(typeof window !== 'undefined' ? window : globalThis);
