// Inject floating panel
(function injectPanel() {
  if (document.getElementById('voice-sider-panel')) return;
  const panel = document.createElement('div');
  panel.id = 'voice-sider-panel';
  panel.innerHTML = `
    <div id="voice-sider-header">
      <span id="voice-sider-mic">
        <svg viewBox="0 0 24 24"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.92V21h-3a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-2.08A7 7 0 0 0 19 12z"/></svg>
      </span>
      <span id="voice-sider-awake">Listening...</span>
      🎤 Voice Sider
      <button id="voice-sider-min" title="Minimize">–</button>
      <button id="voice-sider-help" title="Show Commands">?</button>
    </div>
    <div id="voice-sider-commands"></div>
    <div id="voice-sider-feedback"></div>
    <div id="voice-sider-cmdlist" style="display:none;"></div>
    <button id="voice-sider-toggle">Start Listening</button>
  `;
  document.body.appendChild(panel);

  // Minimize/maximize logic
  const minBtn = panel.querySelector('#voice-sider-min');
  minBtn.onclick = function(e) {
    e.stopPropagation();
    panel.classList.toggle('minimized');
  };

  // Help/command list toggle logic
  const helpBtn = panel.querySelector('#voice-sider-help');
  const cmdList = panel.querySelector('#voice-sider-cmdlist');
  helpBtn.onclick = function(e) {
    e.stopPropagation();
    if (cmdList.style.display === 'none') {
      showCommandList();
    } else {
      hideCommandList();
    }
  };

  // Drag logic
  let isDragging = false, offsetX = 0, offsetY = 0;
  const header = panel.querySelector('#voice-sider-header');
  header.onmousedown = function(e) {
    if (e.target === minBtn || e.target === helpBtn) return;
    isDragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
    document.onmousemove = function(e) {
      if (isDragging) {
        panel.style.left = (e.clientX - offsetX) + 'px';
        panel.style.top = (e.clientY - offsetY) + 'px';
      }
    };
    document.onmouseup = function() {
      isDragging = false;
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
})();

function showCommandList() {
  const cmdList = document.getElementById('voice-sider-cmdlist');
  if (!cmdList) return;
  cmdList.innerHTML = getCommandListHTML();
  cmdList.style.display = 'block';
}
function hideCommandList() {
  const cmdList = document.getElementById('voice-sider-cmdlist');
  if (cmdList) cmdList.style.display = 'none';
}
function getCommandListHTML() {
  const currentUrl = window.location.href;
  const isGmail = currentUrl.includes('mail.google.com');
  const isYouTube = currentUrl.includes('youtube.com');
  const isLeetCode = currentUrl.includes('leetcode.com');
  const isGitHub = currentUrl.includes('github.com');
  const isLinkedIn = currentUrl.includes('linkedin.com');
  const isChatGPT = currentUrl.includes('chat.openai.com');
  const isGoogle = currentUrl.includes('google.com/search');
  let html = '<div style="padding:16px 20px; max-height:300px; overflow-y:auto; font-size:1em;">';
  html += '<b>Universal Commands</b><ul>';
  html += '<li>Scroll up/down/left/right</li>';
  html += '<li>Go to top / Go to bottom</li>';
  html += '<li>Go back / Go forward</li>';
  html += '<li>Refresh / Reload</li>';
  html += '<li>Open new tab / Close tab</li>';
  html += '<li>Click / Move cursor up/down/left/right</li>';
  html += '<li>Type [text] in [field] field</li>';
  html += '<li>Click [button]</li>';
  html += '</ul>';
  if (isGmail) {
    html += '<b>Gmail Commands</b><ul>';
    html += '<li>Open inbox/sent/drafts/spam/starred/important/snoozed/trash/all mail</li>';
    html += '<li>Compose email to [recipient] with subject [subject] and message [message]</li>';
    html += '<li>Send email</li>';
    html += '<li>Open email from [sender] / about [subject]</li>';
    html += '<li>Open latest email</li>';
    html += '<li>Read this email</li>';
    html += '<li>Reply to this email with [message]</li>';
    html += '<li>Forward this email to [recipient] with message [message]</li>';
    html += '</ul>';
  }
  if (isYouTube) {
    html += '<b>YouTube Commands</b><ul>';
    html += '<li>Play/Open video [title]</li>';
    html += '<li>Pause / Play / Next / Previous</li>';
    html += '<li>Mute / Unmute / Fullscreen / Exit fullscreen</li>';
    html += '<li>Seek forward/backward [N] seconds</li>';
    html += '<li>Increase/Decrease volume</li>';
    html += '<li>Show video title/description/stats</li>';
    html += '<li>Open channel [name]</li>';
    html += '</ul>';
  }
  if (isLeetCode) {
    html += '<b>LeetCode Commands</b><ul>';
    html += '<li>Open problems/contests/discuss</li>';
    html += '<li>Open problem [name]</li>';
    html += '<li>Run code / Submit code</li>';
    html += '<li>Read problem statement</li>';
    html += '</ul>';
  }
  if (isGitHub) {
    html += '<b>GitHub Commands</b><ul>';
    html += '<li>Open pull requests</li>';
    html += '<li>Open issues</li>';
    html += '<li>Open notifications</li>';
    html += '<li>Open repositories</li>';
    html += '<li>Go to profile</li>';
    html += '<li>Create new repository</li>';
    html += '</ul>';
  }
  if (isLinkedIn) {
    html += '<b>LinkedIn Commands</b><ul>';
    html += '<li>Open messages</li>';
    html += '<li>Open jobs</li>';
    html += '<li>Open notifications</li>';
    html += '<li>Go to my network</li>';
    html += '<li>Go to profile</li>';
    html += '</ul>';
  }
  if (isChatGPT) {
    html += '<b>ChatGPT Commands</b><ul>';
    html += '<li>New chat</li>';
    html += '<li>Clear conversation</li>';
    html += '<li>Open settings</li>';
    html += '<li>Go to home</li>';
    html += '</ul>';
  }
  if (isGoogle) {
    html += '<b>Google Search Commands</b><ul>';
    html += '<li>Search for [query]</li>';
    html += '<li>Open first result</li>';
    html += '<li>Open images</li>';
    html += '<li>Open news</li>';
    html += '<li>Open videos</li>';
    html += '</ul>';
  }
  html += '<div style="margin-top:10px; color:#b3e5fc; font-size:0.95em;">Say "hide commands" or click "?" to close this list.</div>';
  html += '</div>';
  return html;
}

// Update mic and awake indicator based on listening state
function updateMicUI() {
  const mic = document.getElementById('voice-sider-mic');
  const awake = document.getElementById('voice-sider-awake');
  if (!mic || !awake) return;
  if (isAwake) {
    mic.classList.add('listening');
    awake.classList.add('active');
  } else {
    mic.classList.remove('listening');
    awake.classList.remove('active');
  }
}

// Voice recognition setup
let recognizing = false;
let recognition;
const commandsDiv = () => document.getElementById('voice-sider-commands');
const feedbackDiv = () => document.getElementById('voice-sider-feedback');
const toggleBtn = () => document.getElementById('voice-sider-toggle');

// --- Hands-Free Voice Activation and Speech Feedback ---
let isAwake = false;
const WAKE_WORD = "hey buddy";
const STOP_WORD = "stop listening";

function appendCommand(text) {
  const div = commandsDiv();
  div.innerHTML = `<div>${text}</div>` + div.innerHTML;
}
function setFeedback(text) {
  feedbackDiv().textContent = text;
  if (isAwake) {
    updateMicUI();
  }
}

function startRecognition() {
  if (!('webkitSpeechRecognition' in window)) {
    setFeedback('Web Speech API not supported.');
    return;
  }
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.onresult = function(event) {
    let interim = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript.trim().toLowerCase();
      if (!isAwake && transcript.includes(WAKE_WORD)) {
        isAwake = true;
        setFeedback("Voice Sider is now listening.");
        updateMicUI();
        continue;
      }
      if (isAwake && transcript.includes(STOP_WORD)) {
        isAwake = false;
        setFeedback("Voice Sider stopped listening.");
        updateMicUI();
        continue;
      }
      if (isAwake && event.results[i].isFinal) {
        appendCommand(transcript);
        handleVoiceCommand(transcript);
      } else {
        interim += transcript;
      }
    }
    setFeedback(interim ? 'Listening: ' + interim : '');
  };
  recognition.onend = function() {
    recognizing = false;
    toggleBtn().textContent = 'Start Listening';
    setFeedback('Stopped.');
  };
  recognition.start();
  recognizing = true;
  toggleBtn().textContent = 'Stop Listening';
  setFeedback('Listening... Say "Hey buddy" to activate.');
  updateMicUI();
}

function stopRecognition() {
  if (recognition) recognition.stop();
  recognizing = false;
  toggleBtn().textContent = 'Start Listening';
  setFeedback('Stopped.');
  updateMicUI();
}

// Remove toggleBtn click requirement for hands-free mode
// Optionally, you can hide or disable the button in the UI
// toggleBtn().onclick = function() {};
toggleBtn().style.display = 'none';

// Command parsing and action handlers
function handleVoiceCommand(cmd) {
  const c = cmd.toLowerCase().trim();
  if (c === 'show commands' || c === 'show help') { showCommandList(); setFeedback('Showing commands'); return; }
  if (c === 'hide commands' || c === 'close help' || c === 'close commands') { hideCommandList(); setFeedback('Hiding commands'); return; }
  const includes = (arr) => arr.some(k => c.includes(k));
  const currentUrl = window.location.href;
  const isGmail = currentUrl.includes('mail.google.com');
  const isYouTube = currentUrl.includes('youtube.com');
  const isLeetCode = currentUrl.includes('leetcode.com');
  const isGitHub = currentUrl.includes('github.com');
  const isLinkedIn = currentUrl.includes('linkedin.com');
  const isChatGPT = currentUrl.includes('chat.openai.com');
  const isGoogle = currentUrl.includes('google.com/search');

  // --- Universal Web Browsing Commands (Always Available) ---
  let universalMatched = false;
  // Scroll
  if (includes(['scroll up'])) { window.scrollBy({ top: -100, behavior: 'smooth' }); setFeedback('Scrolling up'); universalMatched = true; }
  else if (includes(['scroll down'])) { window.scrollBy({ top: 100, behavior: 'smooth' }); setFeedback('Scrolling down'); universalMatched = true; }
  else if (includes(['scroll left'])) { window.scrollBy({ left: -100, behavior: 'smooth' }); setFeedback('Scrolling left'); universalMatched = true; }
  else if (includes(['scroll right'])) { window.scrollBy({ left: 100, behavior: 'smooth' }); setFeedback('Scrolling right'); universalMatched = true; }
  else if (includes(['go to top', 'scroll to top', 'top of page'])) { window.scrollTo({ top: 0, behavior: 'smooth' }); setFeedback('Scrolling to top'); universalMatched = true; }
  else if (includes(['go to bottom', 'scroll to bottom', 'bottom of page'])) { window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }); setFeedback('Scrolling to bottom'); universalMatched = true; }
  // Navigation
  else if (includes(['go back', 'back', 'previous page'])) { window.history.back(); setFeedback('Going back'); universalMatched = true; }
  else if (includes(['go forward', 'forward', 'next page'])) { window.history.forward(); setFeedback('Going forward'); universalMatched = true; }
  else if (includes(['refresh', 'reload', 'reload page'])) { location.reload(); setFeedback('Refreshing'); universalMatched = true; }
  else if (includes(['new tab', 'open new tab'])) { window.open('', '_blank'); setFeedback('Opening new tab'); universalMatched = true; }
  else if (includes(['close tab', 'close current tab'])) { if (window.opener) { window.close(); setFeedback('Closing tab'); } else { setFeedback('Cannot close this tab (browser restriction)'); } universalMatched = true; }
  // Mouse/cursor
  else if (includes(['move cursor up'])) { moveCursor('up'); universalMatched = true; }
  else if (includes(['move cursor down'])) { moveCursor('down'); universalMatched = true; }
  else if (includes(['move cursor left'])) { moveCursor('left'); universalMatched = true; }
  else if (includes(['move cursor right'])) { moveCursor('right'); universalMatched = true; }
  else if (includes(['click'])) { mouseClick(); universalMatched = true; }
  // Form
  let m = c.match(/type (.+) in (.+) field/);
  if (m) { fillFormField(m[2], m[1]); universalMatched = true; }
  m = c.match(/click (submit|button|send)/);
  if (m) { clickButton(m[1]); universalMatched = true; }
  m = c.match(/open link number (\d+)/);
  if (m) { openLinkNumber(parseInt(m[1])); universalMatched = true; }

  // If a universal command matched, do not return yet—try Gmail-specific commands too.

  // --- Gmail Robust Commands (Super Robust) ---
  if (isGmail) {
    // Helper: find sidebar tab by text (fuzzy, case-insensitive, multiple selectors)
    function findGmailTab(tab) {
      const tabLower = tab.toLowerCase();
      const selectors = [
        `a[title^="${tab}"]`,
        `a[title*="${tab}"]`,
        `a[aria-label^="${tab}"]`,
        `a[aria-label*="${tab}"]`,
      ];
      for (const sel of selectors) {
        const el = Array.from(document.querySelectorAll(sel)).find(e => (e.textContent || '').toLowerCase().includes(tabLower));
        if (el) return el;
      }
      // Fallback: search all links
      return Array.from(document.querySelectorAll('a')).find(a => (a.textContent || '').toLowerCase().includes(tabLower));
    }
    // Helper: retry logic for dynamic elements
    function retryQuery(selector, tries = 10, delay = 200) {
      return new Promise((resolve) => {
        function attempt(n) {
          const el = typeof selector === 'string' ? document.querySelector(selector) : selector();
          if (el) return resolve(el);
          if (n > 0) setTimeout(() => attempt(n - 1), delay);
          else resolve(null);
        }
        attempt(tries);
      });
    }
    // Open tabs (robust)
    const tabMatch = c.match(/open (inbox|sent|drafts|spam|starred|important|snoozed|trash|all mail)/);
    if (tabMatch) {
      const tab = findGmailTab(tabMatch[1]);
      if (tab) { tab.click(); setFeedback(`Opening ${tabMatch[1]}`); return; }
      setFeedback(`Could not find ${tabMatch[1]} tab. Try expanding the sidebar or check your Gmail layout.`); return;
    }
    // Conversational Compose/Reply/Forward Flow
    if (includes(['open compose', 'compose'])) {
      gmailState = { mode: 'compose', to: '', subject: '', body: '' };
      const tryCompose = async () => {
        let composeBtn = document.querySelector('div[role="button"][gh="cm"], .T-I.T-I-KE.L3');
        if (!composeBtn) composeBtn = Array.from(document.querySelectorAll('button,div[role=button]')).find(b => /compose|new/i.test(b.textContent));
        if (!composeBtn) { setFeedback('Could not find compose button.'); return; }
        composeBtn.click();
        setFeedback('Compose window opened. You can now say "to [email]", "subject [subject]", or "body [text]".');
      };
      tryCompose();
      return;
    }
    if (includes(['reply'])) {
      gmailState = { mode: 'reply', to: '', subject: '', body: '' };
      const tryReply = async () => {
        let replyBtn = document.querySelector('div[role="button"][aria-label^="Reply"]');
        if (!replyBtn) replyBtn = Array.from(document.querySelectorAll('div[role=button]')).find(b => /reply/i.test((b.getAttribute('aria-label') || b.textContent || '')));
        if (!replyBtn) { setFeedback('Could not find reply button.'); return; }
        replyBtn.click();
        setFeedback('Reply box opened. You can now say "body [text]" and "send email".');
      };
      tryReply();
      return;
    }
    if (includes(['forward'])) {
      gmailState = { mode: 'forward', to: '', subject: '', body: '' };
      const tryForward = async () => {
        let moreBtn = document.querySelector('div[aria-label="More"]');
        if (!moreBtn) moreBtn = Array.from(document.querySelectorAll('div[aria-label]')).find(b => /more/i.test(b.getAttribute('aria-label')));
        if (!moreBtn) { setFeedback('Could not find more button for forward.'); return; }
        moreBtn.click();
        setTimeout(() => {
          const forwardBtn = Array.from(document.querySelectorAll('div[role="menuitem"]')).find(el => (el.innerText || '').toLowerCase().includes('forward'));
          if (forwardBtn) {
            forwardBtn.click();
            setFeedback('Forward box opened. You can now say "to [email]", "body [text]", and "send email".');
          } else {
            setFeedback('Could not find forward button.');
          }
        }, 800);
      };
      tryForward();
      return;
    }
    if (gmailState.mode) {
      // To (allowed in compose and forward)
      let m = c.match(/^to (.+)/);
      if (m && (gmailState.mode === 'compose' || gmailState.mode === 'forward')) {
        gmailState.to = m[1];
        const trySetTo = (tries = 8) => {
          let to = document.querySelector('textarea[name="to"]') || document.querySelector('input[name="to"]') || document.querySelector('textarea');
          if (to && !to.disabled && !to.readOnly) {
            to.focus();
            to.value = m[1];
            to.dispatchEvent(new Event('input', {bubbles:true}));
            to.dispatchEvent(new Event('change', {bubbles:true}));
            setFeedback('Recipient set.');
          } else if (tries > 0) {
            setTimeout(() => trySetTo(tries - 1), 200);
          } else {
            setFeedback('Could not find or edit recipient field.');
          }
        };
        trySetTo();
        return;
      }
      // Subject (allowed in compose and forward)
      m = c.match(/^subject (.+)/);
      if (m && (gmailState.mode === 'compose' || gmailState.mode === 'forward')) {
        gmailState.subject = m[1];
        const trySetSubject = (tries = 8) => {
          let subject = document.querySelector('input[name="subjectbox"]') || document.querySelector('input[placeholder="Subject"]');
          if (subject && !subject.disabled && !subject.readOnly) {
            subject.focus();
            subject.value = m[1];
            subject.dispatchEvent(new Event('input', {bubbles:true}));
            subject.dispatchEvent(new Event('change', {bubbles:true}));
            setFeedback('Subject set.');
          } else if (tries > 0) {
            setTimeout(() => trySetSubject(tries - 1), 200);
          } else {
            setFeedback('Could not find or edit subject field.');
          }
        };
        trySetSubject();
        return;
      }
      // Body (allowed in all modes)
      m = c.match(/^body (.+)/);
      if (m) {
        gmailState.body = m[1];
        const trySetBody = (tries = 8) => {
          let message = document.querySelector('div[aria-label="Message Body"]') || document.querySelector('div[role="textbox"]');
          if (message) {
            message.focus();
            message.innerText = m[1];
            message.dispatchEvent(new Event('input', {bubbles:true}));
            message.dispatchEvent(new Event('change', {bubbles:true}));
            setFeedback('Body set.');
          } else if (tries > 0) {
            setTimeout(() => trySetBody(tries - 1), 200);
          } else {
            setFeedback('Could not find message body field.');
          }
        };
        trySetBody();
        return;
      }
      // Send email
      if (includes(['send email'])) {
        retryQuery('div[role="button"][data-tooltip^="Send"]').then(sendBtn => {
          if (sendBtn) { sendBtn.click(); setFeedback('Email sent'); gmailState = { mode: null, to: '', subject: '', body: '' }; }
          else setFeedback('Could not find send button.');
        });
        return;
      }
    }
    // Open latest email
    if (includes(['open latest email', 'open first email'])) {
      const email = document.querySelector('tr.zA');
      if (email) { email.click(); setFeedback('Opening latest email'); return; }
      setFeedback('No emails found.'); return;
    }
    // Open specific email by sender or subject
    let m = c.match(/open email (from|about) (.+)/);
    if (m) {
      const emails = Array.from(document.querySelectorAll('tr.zA'));
      const email = emails.find(e => (e.innerText || '').toLowerCase().includes(m[2].toLowerCase()));
      if (email) { email.click(); setFeedback(`Opening email ${m[1]} ${m[2]}`); return; }
      setFeedback('Could not find that email. Try searching or check your inbox.'); return;
    }
    // Read email (skip quoted, robust)
    if (includes(['read this email', 'read email'])) {
      const emailBody = document.querySelector('div.a3s');
      if (emailBody) {
        let text = emailBody.innerText.split('--\n')[0].split('On ')[0];
        setFeedback('Reading email: ' + (text.trim().slice(0, 200) || '[No content]'));
        return;
      }
      setFeedback('No email content found.'); return;
    }
    // Reply to email (robust)
    m = c.match(/reply( to this email)?( with (.+))?/);
    if (m) {
      const tryReply = async () => {
        let replyBtn = document.querySelector('div[role="button"][aria-label^="Reply"]');
        if (!replyBtn) replyBtn = Array.from(document.querySelectorAll('div[role=button]')).find(b => /reply/i.test((b.getAttribute('aria-label') || b.textContent || '')));
        if (!replyBtn) { setFeedback('Could not find reply button.'); return; }
        replyBtn.click();
        const body = await retryQuery('div[aria-label="Message Body"]');
        if (m[3] && body) { body.innerText = m[3]; body.dispatchEvent(new Event('input', {bubbles:true})); setFeedback('Reply drafted'); }
        else if (body) { setFeedback('Reply box opened.'); }
        else { setFeedback('Could not find reply body.'); return; }
        const sendBtn = await retryQuery('div[role="button"][data-tooltip^="Send"]');
        if (sendBtn) { sendBtn.click(); setFeedback('Reply sent'); }
        else setFeedback('Could not find send button for reply.');
      };
      tryReply();
      return;
    }
    // Forward email (robust)
    m = c.match(/forward( this email)?( to ([^ ]+))?( with message (.+))?/);
    if (m) {
      const tryForward = async () => {
        let moreBtn = document.querySelector('div[aria-label="More"]');
        if (!moreBtn) moreBtn = Array.from(document.querySelectorAll('div[aria-label]')).find(b => /more/i.test(b.getAttribute('aria-label')));
        if (!moreBtn) { setFeedback('Could not find more button for forward.'); return; }
        moreBtn.click();
        setTimeout(() => {
          const forwardBtn = Array.from(document.querySelectorAll('div[role="menuitem"]')).find(el => (el.innerText || '').toLowerCase().includes('forward'));
          if (forwardBtn) {
            forwardBtn.click();
            setTimeout(async () => {
              const to = await retryQuery('textarea[name="to"]');
              const message = await retryQuery('div[aria-label="Message Body"]');
              if (m[3] && to) { to.value = m[3]; to.dispatchEvent(new Event('input', {bubbles:true})); }
              if (m[5] && message) { message.innerText = m[5]; message.dispatchEvent(new Event('input', {bubbles:true})); }
              const sendBtn = await retryQuery('div[role="button"][data-tooltip^="Send"]');
              if (sendBtn) { sendBtn.click(); setFeedback('Forwarded email'); }
              else setFeedback('Could not find send button for forward.');
            }, 1200);
          } else {
            setFeedback('Could not find forward button.');
          }
        }, 800);
      };
      tryForward();
      return;
    }
  }
  // If nothing matched
  if (!universalMatched) {
  setFeedback('Command not recognized: ' + c);
  console.log('Unmatched command:', c);
  }

  // --- LeetCode Hands-on Voice Commands ---
  if (isLeetCode) {
    // Open problems (robust href selector)
    if (includes(['open problems', 'go to problems'])) {
      const link = document.querySelector('a[href*="/problems"]');
      if (link) {
        link.click();
        setFeedback('Opening problems');
      } else {
        setFeedback('Problems link not found.');
      }
      return;
    }
    // Open explore (robust href selector)
    if (includes(['open explore', 'go to explore'])) {
      const link = document.querySelector('a[href*="/explore"]');
      if (link) {
        link.click();
        setFeedback('Opening explore');
      } else {
        setFeedback('Explore link not found.');
      }
      return;
    }
    // Open contest (robust href selector)
    if (includes(['open contest', 'go to contest', 'open contests', 'go to contests'])) {
      const link = document.querySelector('a[href*="/contest"]');
      if (link) {
        link.click();
        setFeedback('Opening contest');
      } else {
        setFeedback('Contest link not found.');
      }
      return;
    }
    // Open interview (robust href selector)
    if (includes(['open interview', 'go to interview'])) {
      const link = document.querySelector('a[href*="/interview"]');
      if (link) {
        link.click();
        setFeedback('Opening interview');
      } else {
        setFeedback('Interview link not found.');
      }
      return;
    }
    // Open store (robust href selector)
    if (includes(['open store', 'go to store'])) {
      const link = document.querySelector('a[href*="/store"]');
      if (link) {
        link.click();
        setFeedback('Opening store');
      } else {
        setFeedback('Store link not found.');
      }
      return;
    }
    // Open discuss
    if (includes(['open discuss', 'go to discuss'])) {
      leetRetryQuery(() => Array.from(document.querySelectorAll('a')).find(a => /discuss/i.test(a.textContent)), 10, 200).then(link => {
        if (link) { link.click(); setFeedback('Opening discuss'); } else { setFeedback('Discuss link not found.'); }
      });
      return;
    }
    // Open Online Interview (dropdown)
    if (includes(['open online interview', 'go to online interview'])) {
      const tab = document.querySelector('a[href*="/interview"]');
      if (tab) {
        tab.click(); // Open dropdown
        setTimeout(() => {
          const submenu = Array.from(document.querySelectorAll('a')).find(a => /online interview/i.test(a.textContent));
          if (submenu) {
            submenu.click();
            setFeedback('Opening Online Interview');
          } else {
            setFeedback('Online Interview link not found.');
          }
        }, 300);
      } else {
        setFeedback('Interview tab not found.');
      }
      return;
    }
    // Open Assessment (dropdown)
    if (includes(['open assessment', 'go to assessment'])) {
      const tab = document.querySelector('a[href*="/interview"]');
      if (tab) {
        tab.click();
        setTimeout(() => {
          const submenu = Array.from(document.querySelectorAll('a')).find(a => /assessment/i.test(a.textContent));
          if (submenu) {
            submenu.click();
            setFeedback('Opening Assessment');
          } else {
            setFeedback('Assessment link not found.');
          }
        }, 300);
      } else {
        setFeedback('Interview tab not found.');
      }
      return;
    }
    // Open Redeem (dropdown)
    if (includes(['open redeem', 'go to redeem'])) {
      const tab = document.querySelector('a[href*="/store"]');
      if (tab) {
        tab.click();
        setTimeout(() => {
          const submenu = Array.from(document.querySelectorAll('a')).find(a => /redeem/i.test(a.textContent));
          if (submenu) {
            submenu.click();
            setFeedback('Opening Redeem');
          } else {
            setFeedback('Redeem link not found.');
          }
        }, 300);
      } else {
        setFeedback('Store tab not found.');
      }
      return;
    }
    // Open Premium (dropdown)
    if (includes(['open premium', 'go to premium'])) {
      const tab = document.querySelector('a[href*="/store"]');
      if (tab) {
        tab.click();
        setTimeout(() => {
          const submenu = Array.from(document.querySelectorAll('a')).find(a => /premium/i.test(a.textContent));
          if (submenu) {
            submenu.click();
            setFeedback('Opening Premium');
          } else {
            setFeedback('Premium link not found.');
          }
        }, 300);
      } else {
        setFeedback('Store tab not found.');
      }
      return;
    }
  }

  // --- LinkedIn Hands-on Voice Commands ---
  if (isLinkedIn) {
    // Open messages
    if (includes(['open messages', 'go to messages'])) {
      const link = Array.from(document.querySelectorAll('a,button')).find(el => /messag/i.test(el.textContent || ''));
      if (link) { link.click(); setFeedback('Opening messages'); } else { setFeedback('Messages link not found.'); }
      return;
    }
    // Open jobs
    if (includes(['open jobs', 'go to jobs'])) {
      const link = Array.from(document.querySelectorAll('a,button')).find(el => /job/i.test(el.textContent || ''));
      if (link) { link.click(); setFeedback('Opening jobs'); } else { setFeedback('Jobs link not found.'); }
      return;
    }
    // Open notifications
    if (includes(['open notifications', 'go to notifications'])) {
      const link = Array.from(document.querySelectorAll('a,button')).find(el => /notificat/i.test(el.textContent || '') || el.getAttribute('aria-label')?.toLowerCase().includes('notification'));
      if (link) { link.click(); setFeedback('Opening notifications'); } else { setFeedback('Notifications link not found.'); }
      return;
    }
    // Go to my network
    if (includes(['go to my network', 'open my network'])) {
      const link = Array.from(document.querySelectorAll('a,button')).find(el => /network/i.test(el.textContent || ''));
      if (link) { link.click(); setFeedback('Opening my network'); } else { setFeedback('My network link not found.'); }
      return;
    }
    // Go to profile
    if (includes(['go to profile', 'open profile'])) {
      const link = Array.from(document.querySelectorAll('a,button')).find(el => /profile/i.test(el.textContent || ''));
      if (link) { link.click(); setFeedback('Opening profile'); } else { setFeedback('Profile link not found.'); }
      return;
    }
    // Search for [query]
    let m = c.match(/^search for (.+)$/);
    if (m) {
      const searchInput = document.querySelector('input[placeholder*="Search"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.value = m[1];
        searchInput.dispatchEvent(new Event('input', {bubbles:true}));
        setTimeout(() => {
          const form = searchInput.form;
          if (form) form.submit();
        }, 200);
        setFeedback('Searched for: ' + m[1]);
      } else {
        setFeedback('Search bar not found.');
      }
      return;
    }
  }

  // --- GitHub Hands-on Voice Commands ---
  if (isGitHub) {
    // Open issues
    if (includes(['open issues', 'go to issues'])) {
      const link = Array.from(document.querySelectorAll('a')).find(el => /issues/i.test(el.textContent || ''));
      if (link) { link.click(); setFeedback('Opening issues'); } else { setFeedback('Issues link not found.'); }
      return;
    }
    // Open pull requests
    if (includes(['open pull requests', 'go to pull requests', 'open pulls', 'go to pulls'])) {
      const link = Array.from(document.querySelectorAll('a')).find(el => /pull request|pulls/i.test(el.textContent || ''));
      if (link) { link.click(); setFeedback('Opening pull requests'); } else { setFeedback('Pull requests link not found.'); }
      return;
    }
    // Open notifications
    if (includes(['open notifications', 'go to notifications'])) {
      const link = Array.from(document.querySelectorAll('a,button')).find(el => /notificat/i.test(el.textContent || '') || el.getAttribute('aria-label')?.toLowerCase().includes('notification'));
      if (link) { link.click(); setFeedback('Opening notifications'); } else { setFeedback('Notifications link not found.'); }
      return;
    }
    // Go to profile
    if (includes(['go to profile', 'open profile'])) {
      const avatar = document.querySelector('summary[aria-label*="View profile"]') || document.querySelector('img.avatar-user');
      if (avatar) { avatar.click(); setFeedback('Opening profile menu'); } else { setFeedback('Profile avatar not found.'); }
      return;
    }
    // Search for [query]
    let m = c.match(/^search for (.+)$/);
    if (m) {
      const searchInput = document.querySelector('input[aria-label="Search GitHub"]') || document.querySelector('input[type="search"]');
      if (searchInput) {
        searchInput.focus();
        searchInput.value = m[1];
        searchInput.dispatchEvent(new Event('input', {bubbles:true}));
        setTimeout(() => {
          searchInput.form?.submit();
        }, 200);
        setFeedback('Searched for: ' + m[1]);
      } else {
        setFeedback('Search bar not found.');
      }
      return;
    }
    // Open repository by name
    m = c.match(/^open repository (.+)$/);
    if (m) {
      const repoName = m[1].toLowerCase();
      const link = Array.from(document.querySelectorAll('a')).find(a => (a.textContent || '').toLowerCase().includes(repoName) && /repo/i.test(a.getAttribute('href') || ''));
      if (link) { link.click(); setFeedback('Opening repository: ' + m[1]); } else { setFeedback('Repository link not found.'); }
      return;
    }
  }
}

// Mouse, scroll, form, navigation helpers
function moveCursor(direction) {
  // Not possible to move system cursor from JS, so simulate with a floating dot
  let dot = document.getElementById('voice-sider-cursor');
  if (!dot) {
    dot = document.createElement('div');
    dot.id = 'voice-sider-cursor';
    dot.style.position = 'fixed';
    dot.style.zIndex = 2147483647;
    dot.style.width = '16px';
    dot.style.height = '16px';
    dot.style.borderRadius = '50%';
    dot.style.background = '#fff';
    dot.style.border = '2px solid #333';
    dot.style.left = '50vw';
    dot.style.top = '50vh';
    document.body.appendChild(dot);
  }
  const step = 50;
  let left = parseInt(dot.style.left) || window.innerWidth/2;
  let top = parseInt(dot.style.top) || window.innerHeight/2;
  if (direction === 'up') top -= step;
  if (direction === 'down') top += step;
  if (direction === 'left') left -= step;
  if (direction === 'right') left += step;
  dot.style.left = left + 'px';
  dot.style.top = top + 'px';
  setFeedback('Moving cursor ' + direction);
}
function mouseClick(doubleClick) {
  const dot = document.getElementById('voice-sider-cursor');
  if (!dot) return setFeedback('Cursor not initialized.');
  const x = dot.getBoundingClientRect().left + 8;
  const y = dot.getBoundingClientRect().top + 8;
  const el = document.elementFromPoint(x, y);
  if (el) {
    el.dispatchEvent(new MouseEvent('mouseover', {bubbles:true, clientX:x, clientY:y}));
    el.dispatchEvent(new MouseEvent('mousedown', {bubbles:true, clientX:x, clientY:y}));
    el.dispatchEvent(new MouseEvent('mouseup', {bubbles:true, clientX:x, clientY:y}));
    el.dispatchEvent(new MouseEvent('click', {bubbles:true, clientX:x, clientY:y}));
    if (doubleClick) el.dispatchEvent(new MouseEvent('dblclick', {bubbles:true, clientX:x, clientY:y}));
    setFeedback(doubleClick ? 'Double clicked' : 'Clicked');
  } else {
    setFeedback('No element to click.');
  }
}
function scrollPage(direction) {
  const amount = 100; // Reduced amount for smoother scrolling
  if (direction === 'up') window.scrollBy({ top: -amount, behavior: 'smooth' });
  if (direction === 'down') window.scrollBy({ top: amount, behavior: 'smooth' });
  if (direction === 'left') window.scrollBy({ left: -amount, behavior: 'smooth' });
  if (direction === 'right') window.scrollBy({ left: amount, behavior: 'smooth' });
  setFeedback('Scrolling ' + direction);
}
function fillFormField(field, value) {
  // Try to find input by label, placeholder, or name
  const inputs = Array.from(document.querySelectorAll('input, textarea'));
  const match = inputs.find(i => {
    const label = document.querySelector(`label[for='${i.id}']`);
    return (label && label.textContent.toLowerCase().includes(field)) ||
      (i.placeholder && i.placeholder.toLowerCase().includes(field)) ||
      (i.name && i.name.toLowerCase().includes(field));
  });
  if (match) {
    match.focus();
    match.value = value;
    match.dispatchEvent(new Event('input', {bubbles:true}));
    setFeedback(`Typed "${value}" in ${field} field`);
  } else {
    setFeedback('Field not found.');
  }
}
function clickButton(type) {
  // Try to find button by text or type
  const btns = Array.from(document.querySelectorAll('button, input[type=submit], input[type=button]'));
  const match = btns.find(b => b.textContent.toLowerCase().includes(type) || (b.value && b.value.toLowerCase().includes(type)));
  if (match) {
    match.click();
    setFeedback('Clicked ' + type + ' button');
  } else {
    setFeedback('Button not found.');
  }
}
function openLinkNumber(num) {
  const links = Array.from(document.querySelectorAll('a[href]'));
  if (links[num-1]) {
    links[num-1].click();
    setFeedback('Opened link #' + num);
  } else {
    setFeedback('Link not found.');
  }
}

// Email-specific helpers
function openCompose() {
  // Try Gmail compose button
  let btn = document.querySelector('div[role=button][gh=cm], .T-I.T-I-KE.L3');
  if (!btn) btn = Array.from(document.querySelectorAll('button,div[role=button]')).find(b => /compose|new/i.test(b.textContent));
  if (btn) { btn.click(); setFeedback('Opening compose'); } else { setFeedback('Compose button not found.'); }
}
function openInbox() {
  // Try Gmail inbox link
  let link = document.querySelector('a[title^="Inbox"], a[title*="Inbox"], a[aria-label^="Inbox"], a[aria-label*="Inbox"]');
  if (!link) link = Array.from(document.querySelectorAll('a')).find(a => /inbox/i.test(a.textContent));
  if (link) { link.click(); setFeedback('Opening inbox'); } else { setFeedback('Inbox link not found.'); }
}
function openFirstEmail() {
  // Try Gmail first email row
  let email = document.querySelector('tr.zA, .UI table.F.cf.zt tr');
  if (!email) email = Array.from(document.querySelectorAll('tr,div')).find(e => /unread|email|message/i.test(e.textContent));
  if (email) { email.click(); setFeedback('Opening first email'); } else { setFeedback('Email not found.'); }
} 

// Gmail conversational state
let gmailState = { mode: null, to: '', subject: '', body: '' };

// Helper: retry logic for dynamic elements (LeetCode)
function leetRetryQuery(selector, tries = 10, delay = 200) {
  return new Promise((resolve) => {
    function attempt(n) {
      const el = typeof selector === 'string' ? document.querySelector(selector) : selector();
      if (el) return resolve(el);
      if (n > 0) setTimeout(() => attempt(n - 1), delay);
      else resolve(null);
    }
    attempt(tries);
  });
}

// Start recognition automatically for hands-free wake word
startRecognition(); 