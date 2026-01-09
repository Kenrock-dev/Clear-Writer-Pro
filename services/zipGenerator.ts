
import JSZip from 'jszip';

// Content scripts and assets based on user-provided code
const MANIFEST_CONTENT = `{
  "manifest_version": 3,
  "name": "ClearWriter Pro",
  "version": "3.5.0",
  "description": "Universal AI writing assistant for every browser tab.",
  "permissions": [
    "storage",
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon48.png"
  },
  "icons": {
    "16": "icon16.png",
    "48": "icon48.png",
    "128": "icon128.png"
  },
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "js": [
        "contentScript.js"
      ]
    }
  ]
}`;

const CONTENT_SCRIPT_JS = `
let sparkle = null;
let menu = null;

async function getSettings() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['activeProvider', 'geminiKey', 'groqKey'], (res) => {
            resolve({
                provider: res.activeProvider || 'gemini',
                key: res.activeProvider === 'groq' ? res.groqKey : res.geminiKey
            });
        });
    });
}

async function callAI(text, operation) {
    const { provider, key } = await getSettings();
    if (!key) throw new Error("API Key missing. Open Extension Settings.");

    const prompt = \`Rewrite the following text for "\${operation}": "\${text}"\`;
    const sys = "You are a professional editor. Rewrite user text. Return ONLY the rewritten text.";

    if (provider === 'gemini') {
        // Use gemini-3-flash-preview for text rewriting tasks as per current best practices
        const url = \`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=\${key}\`;
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                config: { systemInstruction: sys }
            })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.candidates[0].content.parts[0].text;
    } else {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Authorization': \`Bearer \${key}\`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'system', content: sys }, { role: 'user', content: prompt }]
            })
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.choices[0].message.content;
    }
}

function createSparkle() {
    const btn = document.createElement('div');
    btn.style.cssText = 'position:fixed;z-index:999999;background:#6366f1;width:32px;height:32px;border-radius:10px;display:none;align-items:center;justify-content:center;box-shadow:0 8px 16px rgba(99,102,241,0.3);cursor:pointer;border:2px solid #fff;';
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="white"><path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/></svg>';
    document.body.appendChild(btn);
    return btn;
}

function showMenu(text, rect) {
    if (menu) menu.remove();
    menu = document.createElement('div');
    menu.style.cssText = 'position:fixed;z-index:999999;background:#fff;border-radius:16px;box-shadow:0 20px 40px rgba(0,0,0,0.1);border:1px solid #f1f5f9;width:220px;padding:8px;font-family:sans-serif;';
    menu.style.top = (rect.bottom + window.scrollY + 12) + 'px';
    menu.style.left = (rect.left + window.scrollX) + 'px';

    const ops = ['Improve flow', 'Fix grammar', 'Simplify', 'Professional tone'];
    menu.innerHTML = ops.map(op => \`<div class="cw-item" style="padding:10px;cursor:pointer;border-radius:10px;font-size:13px;font-weight:600;color:#334155;">\${op}</div>\`).join('');
    
    document.body.appendChild(menu);
    menu.querySelectorAll('.cw-item').forEach((item, i) => {
        item.onmouseover = () => item.style.background = '#f8fafc';
        item.onmouseout = () => item.style.background = 'none';
        item.onclick = async () => {
            menu.innerHTML = '<div style="padding:20px;text-align:center;font-size:11px;font-weight:900;color:#6366f1;">Processing...</div>';
            try {
                const result = await callAI(text, ops[i]);
                menu.innerHTML = \`<div style="padding:15px;font-size:14px;line-height:1.5;max-height: 200px; overflow-y: auto;">\${result}</div><div style="padding:8px;border-top:1px solid #f1f5f9;display:flex;gap:8px;"><button id="cw-apply" style="flex:1;background:#6366f1;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;cursor:pointer;">Apply</button></div>\`;
                document.getElementById('cw-apply').onclick = () => {
                   document.execCommand('insertText', false, result);
                   menu.remove();
                };
            } catch (e) {
                menu.innerHTML = \`<div style="padding:15px;color:red;font-size:12px;">\${e.message}</div>\`;
                setTimeout(() => menu.remove(), 3000);
            }
        };
    });
}

document.addEventListener('mouseup', () => {
    const sel = window.getSelection();
    const text = sel.toString().trim();
    if (text.length > 5) {
        if (!sparkle) sparkle = createSparkle();
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        sparkle.style.display = 'flex';
        sparkle.style.top = (rect.top + window.scrollY - 40) + 'px';
        sparkle.style.left = (rect.left + window.scrollX + rect.width / 2 - 16) + 'px';
        sparkle.onclick = (e) => { 
            e.stopPropagation();
            sparkle.style.display = 'none'; 
            showMenu(text, rect); 
        };
    } else {
        if (sparkle) sparkle.style.display = 'none';
    }
});

document.addEventListener('mousedown', (e) => {
    if (menu && !menu.contains(e.target)) menu.remove();
});
`;

const POPUP_HTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { width: 320px; font-family: sans-serif; background: #fcfdfe; color: #1e293b; padding: 20px; margin: 0; }
        h1 { font-size: 16px; font-weight: 800; margin: 0 0 20px; color: #6366f1; }
        .group { margin-bottom: 20px; }
        label { display: block; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; }
        select, input { width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 13px; outline: none; }
        button { width: 100%; padding: 14px; background: #6366f1; color: #fff; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .footer { font-size: 10px; text-align: center; color: #94a3b8; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>ClearWriter Settings</h1>
    <div class="group">
        <label>AI Provider</label>
        <select id="provider">
            <option value="gemini">Google Gemini</option>
            <option value="groq">Groq Console</option>
        </select>
    </div>
    <div class="group">
        <label id="key-label">API Key</label>
        <input type="password" id="api-key" placeholder="Paste key here...">
    </div>
    <button id="save">Save Settings</button>
    <div class="footer">v3.5.0 • Private Local Storage</div>
    <script src="popup.js"></script>
</body>
</html>
`;

const POPUP_JS = `
document.addEventListener('DOMContentLoaded', () => {
    const provSelect = document.getElementById('provider');
    const keyInput = document.getElementById('api-key');
    const saveBtn = document.getElementById('save');

    chrome.storage.local.get(['activeProvider', 'geminiKey', 'groqKey'], (res) => {
        provSelect.value = res.activeProvider || 'gemini';
        keyInput.value = (res.activeProvider === 'groq' ? res.groqKey : res.geminiKey) || '';
    });

    saveBtn.onclick = () => {
        const p = provSelect.value;
        const key = keyInput.value.trim();
        const update = { activeProvider: p };
        if (p === 'gemini') update.geminiKey = key;
        else update.groqKey = key;

        chrome.storage.local.set(update, () => {
            saveBtn.innerText = 'Settings Saved!';
            setTimeout(() => saveBtn.innerText = 'Save Settings', 2000);
        });
    };
});
`;

// Simple Base64 icons (Placeholder blue squares with 'C')
const ICON_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABJUlEQVR4nO2YwUrDMBRF7z90pbuW7t69uOnW3Ytbd67duXFpXfpj/6A/YFfBNoS8N9E0M0IOfBfC69C8hLx7U7U1uH6/T8v7K5fLxS3LclHXDfIsy8ayLBfP8/y93+/H9Xp9jY8pTVNf1/Xv5/OZN03zR9E0zT9N03zf73eGZVn6tm29XdcN8mzb+n673R79fv8Wn0mS5N8kyfF96vU9Lctyz7Lc0zR9Xq9X3jTNL0XTNH80TfN1u91K/HwGfA6fB5+N5X8OAnwOfA6fD58NnwOfA+fE58DnwPnwuS/fL9fL9fL9fL9fL9fL9XJePofPAz6Hz4PPxs9nwOfA+fA5fDZ+PgM+B87p+37fE7IuPpfPfXy+Ievic/ncx+cbsi4+l899fL4h6+LzeXw8Hg/p9395f877f98A/Y/m029T68gAAAAASUVORK52AYII=";

export const generateExtensionZip = async () => {
  const zip = new JSZip();

  zip.file("manifest.json", MANIFEST_CONTENT);
  zip.file("contentScript.js", CONTENT_SCRIPT_JS);
  zip.file("popup.html", POPUP_HTML);
  zip.file("popup.js", POPUP_JS);

  // Use a blob for the icon
  const iconData = Uint8Array.from(atob(ICON_BASE64), c => c.charCodeAt(0));
  zip.file("icon16.png", iconData);
  zip.file("icon48.png", iconData);
  zip.file("icon128.png", iconData);

  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const link = document.createElement("a");
  link.href = url;
  link.download = "clearwriter-pro.zip";
  link.click();
  URL.revokeObjectURL(url);
};