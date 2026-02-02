const API_TOKEN = 'f287fbbb6c808199065f288492b59ea1f39bad58';
const API_URL = 'https://api-ssl.bitly.com/v4/shorten';

const urlInput = document.getElementById('urlInput');
const shortenBtn = document.getElementById('shortenBtn');
const result = document.getElementById('result');
const shortUrl = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');
const linksList = document.getElementById('linksList');

let savedLinks = JSON.parse(localStorage.getItem('shortenedLinks')) || [];

shortenBtn.addEventListener('click', shortenURL);
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') shortenURL();
});
copyBtn.addEventListener('click', () => copyToClipboard(shortUrl.href));

function isValidURL(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

async function shortenURL() {
    const longUrl = urlInput.value.trim();

    if (!longUrl) {
        alert('Please enter a URL');
        return;
    }

    if (!isValidURL(longUrl)) {
        alert('Please enter a valid URL (must start with http:// or https://)');
        return;
    }

    shortenBtn.textContent = 'Shortening...';
    shortenBtn.disabled = true;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ long_url: longUrl })
        });

        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        const data = await response.json();
        const shortened = data.link;

        shortUrl.href = shortened;
        shortUrl.textContent = shortened;
        result.classList.remove('hidden');

        const linkData = {
            id: Date.now(),
            original: longUrl,
            shortened: shortened,
            date: new Date().toLocaleDateString()
        };

        savedLinks.unshift(linkData);
        localStorage.setItem('shortenedLinks', JSON.stringify(savedLinks));

        displayLinks();
        urlInput.value = '';

    } catch (error) {
        alert('Error shortening URL. Please check your API token and try again.');
        console.error(error);
    } finally {
        shortenBtn.textContent = 'Shorten';
        shortenBtn.disabled = false;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = '#218838';
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '#28a745';
        }, 2000);
    }).catch(err => {
        alert('Failed to copy');
        console.error(err);
    });
}

function displayLinks() {
    if (savedLinks.length === 0) {
        linksList.innerHTML = '<div class="empty-state">No links yet. Shorten your first URL!</div>';
        return;
    }

    linksList.innerHTML = savedLinks.map(link => `
        <div class="link-item">
            <div class="link-info">
                <p class="original-url" title="${link.original}">${link.original}</p>
                <a class="short-link" href="${link.shortened}" target="_blank">${link.shortened}</a>
                <p style="color: #999; font-size: 0.8rem; margin-top: 5px;">${link.date}</p>
            </div>
            <div class="link-actions">
                <button class="copy-link-btn" onclick="copyToClipboard('${link.shortened}')">Copy</button>
                <button class="delete-btn" onclick="deleteLink(${link.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteLink(id) {
    if (confirm('Delete this link?')) {
        savedLinks = savedLinks.filter(link => link.id !== id);
        localStorage.setItem('shortenedLinks', JSON.stringify(savedLinks));
        displayLinks();
    }
}

displayLinks();