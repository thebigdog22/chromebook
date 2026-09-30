const browserView = document.getElementById('browserView');
const addressBar = document.getElementById('addressBar');
const goBtn = document.getElementById('goBtn');
const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const homeBtn = document.getElementById('homeBtn');
const bookmarkBtn = document.getElementById('bookmarkBtn');
const bookmarkList = document.getElementById('bookmarkList');

const defaultHome = 'https://example.com';

function normalizeUrl(rawValue) {
  const value = rawValue.trim();

  if (!value) return defaultHome;
  if (/^https?:\/\//i.test(value)) return value;
  if (/^www\./i.test(value)) return `https://${value}`;

  const isLikelySearch = value.includes(' ') || !value.includes('.') || value.length < 3;
  if (isLikelySearch) {
    return `https://www.google.com/search?q=${encodeURIComponent(value)}`;
  }

  return `https://${value}`;
}

function updateAddressBar() {
  const url = browserView.getURL();
  addressBar.value = url || defaultHome;
}

function loadUrl(value) {
  const finalUrl = normalizeUrl(value);
  browserView.src = finalUrl;
  addressBar.value = finalUrl;
}

goBtn.addEventListener('click', () => loadUrl(addressBar.value));
addressBar.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') loadUrl(addressBar.value);
});

backBtn.addEventListener('click', () => browserView.goBack());
forwardBtn.addEventListener('click', () => browserView.goForward());
reloadBtn.addEventListener('click', () => browserView.reload());
homeBtn.addEventListener('click', () => loadUrl(defaultHome));
bookmarkBtn.addEventListener('click', () => {
  const url = browserView.getURL() || defaultHome;
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = new URL(url).hostname || 'Bookmark';
  btn.dataset.url = url;
  li.appendChild(btn);
  bookmarkList.appendChild(li);
  btn.addEventListener('click', () => browserView.src = btn.dataset.url);
});

bookmarkList.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-url]');
  if (!btn) return;
  browserView.src = btn.dataset.url;
});

browserView.addEventListener('did-finish-load', () => {
  updateAddressBar();
});

browserView.addEventListener('did-stop-loading', () => {
  updateAddressBar();
});

browserView.addEventListener('page-title-updated', (_, title) => {
  document.title = title || 'Chromebook Browser';
});

loadUrl(defaultHome);
