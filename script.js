
const MOODS = [
  {
    key: "Happy",
    emoji: "😊",
    bgClass: "bg-happy",
    color: "#10b981",
    particles: ["✨", "🌟", "💫", "🎉", "🌈", "☀️"],
    quotes: [
      "Your smile is contagious—keep spreading the joy!",
      "Happiness is a choice, and you're making great ones today.",
      "The world is brighter because of your positive energy.",
      "This feeling of joy—bottle it up and remember it.",
      "You're radiating good vibes today!"
    ],
    tips: ["Share your happiness with someone", "Take a photo to remember this moment", "Do something kind for others"]
  },
  {
    key: "Sad",
    emoji: "😔",
    bgClass: "bg-sad",
    color: "#3b82f6",
    particles: ["💧", "🌧️", "☁️", "💙", "🌫️"],
    quotes: [
      "It's okay to feel sad—emotions are valid and temporary.",
      "This feeling will pass, like clouds moving across the sky.",
      "Be gentle with yourself during difficult times.",
      "Sometimes sadness helps us appreciate the good moments more.",
      "You're stronger than you know, even when you feel weak."
    ],
    tips: ["Reach out to a friend", "Practice deep breathing", "Write in a journal"]
  },
  {
    key: "Angry",
    emoji: "😠",
    bgClass: "bg-angry",
    color: "#ef4444",
    particles: ["⚡", "🔥", "💥", "🌪️", "💢"],
    quotes: [
      "Anger is energy—channel it into positive change.",
      "Take a deep breath and count to ten.",
      "This intense feeling will cool down with time.",
      "What is your anger trying to tell you?",
      "Transform this fire into fuel for growth."
    ],
    tips: ["Try physical exercise", "Practice mindfulness", "Talk to someone you trust"]
  },
  {
    key: "Tired",
    emoji: "😴",
    bgClass: "bg-tired",
    color: "#8b5cf6",
    particles: ["💤", "🌙", "⭐", "🌌", "😪"],
    quotes: [
      "Rest is not a reward for work completed, but a requirement for work to come.",
      "Your body and mind are asking for care—listen to them.",
      "Taking breaks is productive, not lazy.",
      "Recharge now so you can shine brighter later.",
      "Sleep is the best meditation."
    ],
    tips: ["Take a power nap", "Go to bed early tonight", "Reduce screen time"]
  },
  {
    key: "Calm",
    emoji: "😌",
    bgClass: "bg-calm",
    color: "#06b6d4",
    particles: ["🍃", "🌊", "🕊️", "☮️", "🧘‍♀️", "💙"],
    quotes: [
      "In the midst of chaos, you found your center.",
      "This peaceful feeling—let it wash over you completely.",
      "Calmness is a superpower in our busy world.",
      "Your serenity is inspiring to those around you.",
      "Peace begins with a smile and a deep breath."
    ],
    tips: ["Practice meditation", "Spend time in nature", "Listen to calming music"]
  },
  {
    key: "Excited",
    emoji: "🤩",
    bgClass: "bg-excited",
    color: "#f59e0b",
    particles: ["🎊", "🎉", "⚡", "🌟", "🔥", "🎈"],
    quotes: [
      "Your enthusiasm is infectious—share it with the world!",
      "This excitement is fuel for amazing things to come.",
      "Harness this energy and make something incredible happen.",
      "The world needs more people as passionate as you are right now.",
      "This is what being alive feels like!"
    ],
    tips: ["Channel energy into a project", "Share your excitement with others", "Start something new"]
  },
  {
    key: "Anxious",
    emoji: "😰",
    bgClass: "bg-anxious",
    color: "#f59e0b",
    particles: ["🌀", "💭", "🫨", "😵‍💫"],
    quotes: [
      "Anxiety is your mind trying to protect you—acknowledge it, then breathe.",
      "You've overcome anxiety before, and you can do it again.",
      "This feeling is temporary, but your strength is permanent.",
      "Focus on what you can control, release what you can't.",
      "One breath at a time, one step at a time."
    ],
    tips: ["Try the 4-7-8 breathing technique", "Ground yourself with 5-4-3-2-1 method", "Talk to someone"]
  },
  {
    key: "Neutral",
    emoji: "😐",
    bgClass: "bg-neutral",
    color: "#6b7280",
    particles: ["⚪", "🔘", "⚫", "🔹", "◯"],
    quotes: [
      "Sometimes neutral is exactly where you need to be.",
      "Steady and balanced—there's wisdom in this feeling.",
      "Not every day needs to be extraordinary, and that's okay.",
      "You're in a peaceful middle ground—appreciate the stability.",
      "From this calm center, you can move in any direction."
    ],
    tips: ["Try something new", "Reflect on your goals", "Practice gratitude"]
  }
];
const S = {
  click: document.getElementById("sndClick"),
  chime: document.getElementById("sndChime"),
  toggle: document.getElementById("sndToggle"),
  play(name) {
    if (muteToggle.checked) return;
    const a = this[name];
    if (!a) return;
    a.currentTime = 0;
    a.play().catch(() => {}); 
  }
};

// Enhanced App Class
class EnhancedMoodMirror {
  constructor() {
    this.currentMood = null;
    this.moodHistory = this.loadData('moodHistory') || [];
    this.settings = this.loadData('settings') || this.getDefaultSettings();
    this.streakCount = this.calculateStreak();
    this.stats = this.calculateStats();
    this.init();
    
  }



  getDefaultSettings() {
    return {
      soundEnabled: true,
      persistData: false,
      notifications: false,
      theme: 'auto'
    };
  }

  async init() {
    await this.showLoadingScreen();
    this.bindElements();
    this.bindEvents();
    this.renderMoodButtons();
    this.updateUI();
    this.setupVoiceRecognition();
    this.checkNotificationPermission();


    // Load last session if enabled
    if (this.settings.persistData) {
      this.restoreLastSession();
    }
  }

  showLoadingScreen() {
    return new Promise(resolve => {
      setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
        resolve();
      }, 1500);
    });
  }

  bindElements() {
    this.elements = {
      moodGrid: document.getElementById('moodGrid'),
      resultCard: document.getElementById('resultCard'),
      selectedMood: document.getElementById('selectedMood'),
      quote: document.getElementById('motivationalQuote'),
      moodMeta: document.getElementById('moodMeta'),
      streakCounter: document.getElementById('streakCounter'),
      totalEntries: document.getElementById('totalEntries'),
      dominantMood: document.getElementById('dominantMood'),
      weeklyAvg: document.getElementById('weeklyAvg'),
      intensityRange: document.getElementById('intensityRange'),
      intensityLabel: document.getElementById('intensityLabel'),
      notesInput: document.getElementById('notesInput'),
      charCount: document.getElementById('charCount'),
      historyList: document.getElementById('historyList'),
      historyFilter: document.getElementById('historyFilter'),
      muteToggle: document.getElementById('muteToggle'),
      persistToggle: document.getElementById('persistToggle'),
      notificationsToggle: document.getElementById('notificationsToggle'),
      modal: document.getElementById('modal'),
      modalOverlay: document.getElementById('modalOverlay'),
      modalTitle: document.getElementById('modalTitle'),
      modalBody: document.getElementById('modalBody'),
      toast: document.getElementById('toast')
    };
  }

  bindEvents() {
    // Mood actions

    document.getElementById('randomizeBtn').addEventListener('click', () => this.randomizeMood());
    document.getElementById('clearBtn').addEventListener('click', () => this.clearMood());
    document.getElementById('saveBtn').addEventListener('click', () => this.saveMoodEntry());
    document.getElementById('shareBtn').addEventListener('click', () => this.shareMood());

    // Settings
    this.elements.muteToggle.addEventListener('change', (e) => this.updateSetting('soundEnabled', !e.target.checked));
    this.elements.persistToggle.addEventListener('change', (e) => this.updateSetting('persistData', e.target.checked));
    this.elements.notificationsToggle.addEventListener('change', (e) => this.toggleNotifications(e.target.checked));

    // Input handlers
    this.elements.intensityRange.addEventListener('input', (e) => this.updateIntensity(e.target.value));
    this.elements.notesInput.addEventListener('input', (e) => this.updateCharCount(e.target.value));
    this.elements.historyFilter.addEventListener('change', (e) => this.filterHistory(e.target.value));

    // History
    document.getElementById('clearHistoryBtn').addEventListener('click', () => this.clearHistory());
    document.getElementById('exportBtn').addEventListener('click', () => this.exportData());

    // Modal
    document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
    this.elements.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.elements.modalOverlay) this.closeModal();
    });

    // Help and voice
    document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
    document.getElementById('voiceBtn').addEventListener('click', () => this.startVoiceInput());

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  renderMoodButtons() {
    this.elements.moodGrid.innerHTML = '';
    MOODS.forEach((mood, index) => {
      const btn = document.createElement('button');
      btn.className = 'mood-btn';
      btn.setAttribute('data-mood', mood.key);
      btn.setAttribute('data-index', index);
      btn.innerHTML = `
        <span class="mood-emoji">${mood.emoji}</span>
        <span class="mood-label">${mood.key}</span>
      `;
      btn.addEventListener('click', () => this.selectMood(mood));
      this.elements.moodGrid.appendChild(btn);
    });
  }

  selectMood(mood) {
    S.play('click');
    this.currentMood = mood;
    this.updateMoodDisplay(mood);
    this.createParticles(mood);
    this.updateMoodButtons(mood.key);
    this.updateMoodMeta();
  }

  updateMoodDisplay(mood) {
    const moodClasses = MOODS.map(m => m.bgClass);
    this.elements.resultCard.classList.remove(...moodClasses);
    this.elements.resultCard.classList.add('dynamic-bg', mood.bgClass);

    this.elements.selectedMood.textContent = `${mood.emoji} ${mood.key}`;

    const quote = this.getPersonalizedQuote(mood);
    this.elements.quote.textContent = quote;
    this.elements.quote.className = 'quote';

    S.play('chime');
  }

  getPersonalizedQuote(mood) {
    const baseQuote = mood.quotes[Math.floor(Math.random() * mood.quotes.length)];
    const intensity = parseInt(this.elements.intensityRange.value);
    const note = this.elements.notesInput.value.trim();

    let personalizedQuote = baseQuote;

    if (intensity >= 4) {
      personalizedQuote += " Your high energy is amazing—use it wisely!";
    } else if (intensity <= 2) {
      personalizedQuote += " Take it slow and be patient with yourself.";
    }

    return personalizedQuote;
  }

  updateMoodMeta() {
    if (!this.currentMood) return;

    const intensity = this.elements.intensityRange.value;
    const timestamp = new Date().toLocaleString();
    const tip = this.currentMood.tips[Math.floor(Math.random() * this.currentMood.tips.length)];

    this.elements.moodMeta.innerHTML = `
      <div>Intensity: ${intensity}/5 • ${timestamp}</div>
      <div style="margin-top: 4px; font-style: italic;">💡 Tip: ${tip}</div>
    `;
  }

  updateMoodButtons(selectedMoodKey) {
    document.querySelectorAll('.mood-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mood === selectedMoodKey);
    });
  }

  createParticles(mood) {
    const existingParticles = this.elements.resultCard.querySelector('.mood-particles');
    if (existingParticles) existingParticles.remove();

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'mood-particles';

    const particleCount = Math.floor(Math.random() * 4) + 6;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.textContent = mood.particles[Math.floor(Math.random() * mood.particles.length)];

      particle.style.left = Math.random() * 90 + '%';
      particle.style.top = Math.random() * 80 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (Math.random() * 2 + 2) + 's';

      particlesContainer.appendChild(particle);
    }

    this.elements.resultCard.appendChild(particlesContainer);
  }

  randomizeMood() {
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)];
    this.selectMood(randomMood);
  }

  clearMood() {
    this.currentMood = null;
    const moodClasses = MOODS.map(m => m.bgClass);
    this.elements.resultCard.classList.remove(...moodClasses, 'dynamic-bg');

    const particles = this.elements.resultCard.querySelector('.mood-particles');
    if (particles) particles.remove();

    this.elements.selectedMood.textContent = 'Select a mood above';
    this.elements.quote.textContent = 'Choose how you\'re feeling to get personalized insights and motivation.';
    this.elements.moodMeta.innerHTML = '';

    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
    S.play('toggle');
  }

  saveMoodEntry() {
    if (!this.currentMood) {
      this.showToast('Please select a mood first!', 'warning');
      return;
    }

    const entry = {
      id: Date.now(),
      mood: this.currentMood.key,
      emoji: this.currentMood.emoji,
      intensity: parseInt(this.elements.intensityRange.value),
      note: this.elements.notesInput.value.trim(),
      timestamp: Date.now(),
      date: new Date().toDateString()
    };

    this.moodHistory.unshift(entry);
    this.saveData('moodHistory', this.moodHistory);

    this.stats = this.calculateStats();
    this.streakCount = this.calculateStreak();
    this.updateUI();

    this.showToast('Mood entry saved successfully! 🎉', 'success');
    S.play('chime');

    // Clear form
    this.elements.notesInput.value = '';
    this.updateCharCount('');
  }

  async shareMood() {
    if (!this.currentMood) return;

    const shareData = {
      title: 'Mood Mirror',
      text: `I'm feeling ${this.currentMood.key} ${this.currentMood.emoji} today!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        this.copyToClipboard(shareData.text);
      }
    } else {
      this.copyToClipboard(shareData.text);
    }
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Copied to clipboard!', 'success');
    });
  }

  updateIntensity(value) {
    this.elements.intensityLabel.textContent = `${value}/5`;
    if (this.currentMood) {
      this.updateMoodMeta();
    }
  }

  updateCharCount(text) {
    const count = text.length;
    this.elements.charCount.textContent = count;
    this.elements.charCount.style.color = count > 280 ? 'var(--danger)' : 'var(--text-muted)';
  }

  calculateStreak() {
    if (this.moodHistory.length === 0) return 0;

    const today = new Date().toDateString();
    const uniqueDates = [...new Set(this.moodHistory.map(entry =>
      new Date(entry.timestamp).toDateString()
    ))].sort((a, b) => new Date(b) - new Date(a));

    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const entryDate = new Date(uniqueDates[i]);
      const expectedDate = new Date(currentDate);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (entryDate.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  calculateStats() {
    if (this.moodHistory.length === 0) {
      return { total: 0, dominant: '😊', weeklyAvg: 0 };
    }

    const moodCounts = {};
    let totalIntensity = 0;

    // Filter for last 7 days
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const weeklyEntries = this.moodHistory.filter(entry => entry.timestamp > weekAgo);

    this.moodHistory.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      totalIntensity += entry.intensity || 3;
    });

    const dominant = Object.keys(moodCounts).reduce((a, b) =>
      moodCounts[a] > moodCounts[b] ? a : b, 'Happy'
    );

    const dominantEmoji = MOODS.find(m => m.key === dominant)?.emoji || '😊';
    const weeklyAvg = weeklyEntries.length > 0
      ? (weeklyEntries.reduce((sum, entry) => sum + (entry.intensity || 3), 0) / weeklyEntries.length).toFixed(1)
      : 0;

    return {
      total: this.moodHistory.length,
      dominant: dominantEmoji,
      weeklyAvg: weeklyAvg
    };
  }

  updateUI() {
    // Update streak counter
    const streakNum = this.elements.streakCounter.querySelector('.streak-number');
    const streakLabel = this.elements.streakCounter.querySelector('.streak-label');
    streakNum.textContent = this.streakCount;
    streakLabel.textContent = this.streakCount === 1 ? 'day streak' : 'days streak';

    // Update stats
    this.elements.totalEntries.textContent = this.stats.total;
    this.elements.dominantMood.textContent = this.stats.dominant;
    this.elements.weeklyAvg.textContent = this.stats.weeklyAvg;

    // Update history
    this.renderHistory();
  }

  renderHistory() {
    const filter = this.elements.historyFilter.value;
    let filteredHistory = [...this.moodHistory];

    if (filter !== 'all') {
      const days = parseInt(filter);
      const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
      filteredHistory = this.moodHistory.filter(entry => entry.timestamp > cutoff);
    }

    this.elements.historyList.innerHTML = '';

    if (filteredHistory.length === 0) {
      this.elements.historyList.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 20px;">No mood entries yet</div>';
      return;
    }

    filteredHistory.slice(0, 20).forEach(entry => {
      const item = document.createElement('div');
      item.className = 'history-item';

      const date = new Date(entry.timestamp);
      const timeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      item.innerHTML = `
        <div class="history-emoji">${entry.emoji}</div>
        <div class="history-content">
          <div class="history-mood">${entry.mood} (${entry.intensity}/5)</div>
          <div class="history-date">${timeString}</div>
          ${entry.note ? `<div class="history-note">"${entry.note}"</div>` : ''}
        </div>
      `;

      this.elements.historyList.appendChild(item);
    });
  }

  filterHistory(days) {
    this.renderHistory();
  }

  clearHistory() {
    if (confirm('Are you sure you want to clear all mood history? This cannot be undone.')) {
      this.moodHistory = [];
      this.saveData('moodHistory', this.moodHistory);
      this.stats = this.calculateStats();
      this.streakCount = this.calculateStreak();
      this.updateUI();
      this.showToast('History cleared', 'success');
      S.play('toggle');
    }
  }

  exportData() {
    const dataToExport = {
      moodHistory: this.moodHistory,
      stats: this.stats,
      streak: this.streakCount,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `mood-mirror-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast('Data exported successfully!', 'success');
  }

  setupVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        this.processSpeechInput(transcript);
      };

      this.recognition.onerror = (event) => {
        this.showToast('Voice recognition error. Please try again.', 'warning');
      };
    }
  }

  startVoiceInput() {
    if (this.recognition) {
      this.recognition.start();
      this.showToast('Listening... Say how you\'re feeling!', 'info');
    } else {
      this.showToast('Voice recognition not supported in your browser', 'warning');
    }
  }

  processSpeechInput(transcript) {
    const moodKeywords = {
      'happy': 'Happy',
      'sad': 'Sad',
      'angry': 'Angry',
      'tired': 'Tired',
      'calm': 'Calm',
      'excited': 'Excited',
      'anxious': 'Anxious',
      'neutral': 'Neutral',
      'good': 'Happy',
      'bad': 'Sad',
      'fine': 'Neutral',
      'okay': 'Neutral',
      'low' : 'Sad',
      'furious' : 'Angry',
      'great' : 'Happy',
       
    };

    for (const [keyword, moodKey] of Object.entries(moodKeywords)) {
      if (transcript.includes(keyword)) {
        const mood = MOODS.find(m => m.key === moodKey);
        if (mood) {
          this.selectMood(mood);
          this.showToast(`Great! I heard "${moodKey}"`, 'success');
          return;
        }
      }
    }

    this.showToast('I didn\'t catch a mood from that. Try saying "I feel happy" or similar.', 'info');
  }

  async checkNotificationPermission() {
    if ('Notification' in window && this.settings.notifications) {
      if (Notification.permission === 'default') {
        await Notification.requestPermission();
      }
    }
  }

  async toggleNotifications(enabled) {
    this.updateSetting('notifications', enabled);

    if (enabled && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        this.showToast('Notifications enabled! We\'ll send gentle daily reminders.', 'success');
        this.scheduleNotification();
      } else {
        this.elements.notificationsToggle.checked = false;
        this.showToast('Notification permission denied', 'warning');
      }
    }
  }

  scheduleNotification() {
    // Schedule daily notification at 7 PM
    const now = new Date();
    const scheduledTime = new Date();
    scheduledTime.setHours(19, 0, 0, 0);

    if (scheduledTime <= now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime.getTime() - now.getTime();

    setTimeout(() => {
      if (this.settings.notifications && Notification.permission === 'granted') {
        new Notification('Mood Mirror Reminder', {
          body: 'How are you feeling today? Take a moment to check in with yourself.',
          icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪞</text></svg>',
          tag: 'mood-reminder'
        });
      }
    }, timeUntilNotification);
  }

  handleKeyboardShortcuts(e) {
    if (e.altKey) {
      const keyMap = {
        '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7
      };

      if (keyMap.hasOwnProperty(e.key)) {
        e.preventDefault();
        const moodIndex = keyMap[e.key];
        if (MOODS[moodIndex]) {
          this.selectMood(MOODS[moodIndex]);
        }
      }

      if (e.key === 's') {
        e.preventDefault();
        this.saveMoodEntry();
      }

      if (e.key === 'c') {
        e.preventDefault();
        this.clearMood();
      }
    }

    if (e.key === 'Escape') {
      this.closeModal();
    }
  }

  showHelp() {
    this.showModal('How to Use Mood Mirror', `
      <div style="line-height: 1.8;">
        <h4 style="margin: 16px 0 8px 0;">🎯 Getting Started</h4>
        <ul style="margin-left: 20px;">
          <li>Click on a mood that matches how you're feeling</li>
          <li>Adjust the intensity slider (1-5)</li>
          <li>Add optional notes about your mood</li>
          <li>Save your entry to track your mood over time</li>
        </ul>
        
        <h4 style="margin: 16px 0 8px 0;">⌨️ Keyboard Shortcuts</h4>
        <ul style="margin-left: 20px;">
          <li><strong>Alt + 1-8:</strong> Quick select moods</li>
          <li><strong>Alt + S:</strong> Save mood entry</li>
          <li><strong>Alt + C:</strong> Clear selection</li>
          <li><strong>Escape:</strong> Close modal</li>
        </ul>
        
        <h4 style="margin: 16px 0 8px 0;">🎤 Voice Input</h4>
        <p>Click the microphone button and say "I feel [mood]" to quickly select your mood!</p>
        
        <h4 style="margin: 16px 0 8px 0;">📊 Tracking Benefits</h4>
        <ul style="margin-left: 20px;">
          <li>Build self-awareness of emotional patterns</li>
          <li>Track your mood streak and progress</li>
          <li>Get personalized tips and motivation</li>
          <li>Export your data for further analysis</li>
        </ul>
      </div>
    `);
  }

  showModal(title, content) {
    this.elements.modalTitle.textContent = title;
    this.elements.modalBody.innerHTML = content;
    this.elements.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.elements.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  showToast(message, type = 'info') {
    const toast = this.elements.toast;
    const icon = toast.querySelector('.toast-icon');
    const messageEl = toast.querySelector('.toast-message');

    const icons = { success: '✅', warning: '⚠️', info: 'ℹ️', error: '❌' };
    const colors = { success: 'var(--success)', warning: 'var(--warning)', info: 'var(--accent-blue)', error: 'var(--danger)' };

    icon.textContent = icons[type] || icons.info;
    messageEl.textContent = message;
    toast.style.background = colors[type] || colors.info;

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  playSound(soundName) {
    if (!this.settings.soundEnabled) return;

    try {
      const audio = document.getElementById(`snd${soundName.charAt(0).toUpperCase() + soundName.slice(1)}`);
      if (audio) {
        audio.currentTime = 0;
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn(`Audio playback failed: ${error}`);
          });
        }
      }
    } catch (error) {
      console.warn(`Error playing sound ${soundName}: ${error}`);
    }
  }
  updateSetting(key, value) {
    this.settings[key] = value;
    this.saveData('settings', this.settings);
  }

  restoreLastSession() {
    const lastSession = this.loadData('lastSession');
    if (lastSession && lastSession.timestamp > Date.now() - (24 * 60 * 60 * 1000)) { // Within 24 hours
      this.elements.intensityRange.value = lastSession.intensity || 3;
      this.elements.intensityLabel.textContent = `${lastSession.intensity || 3}/5`;
      this.elements.notesInput.value = lastSession.note || '';

      if (lastSession.mood) {
        const mood = MOODS.find(m => m.key === lastSession.mood);
        if (mood) {
          this.selectMood(mood);
        }
      }
    }
  }

  saveLastSession() {
    if (!this.settings.persistData) return;

    const session = {
      mood: this.currentMood?.key,
      intensity: parseInt(this.elements.intensityRange.value),
      note: this.elements.notesInput.value.trim(),
      timestamp: Date.now()
    };

    this.saveData('lastSession', session);
  }

  saveData(key, data) {
    try {
      localStorage.setItem(`moodMirror_${key}`, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save data to localStorage:', e);
    }
  }

  loadData(key) {
    try {
      const data = localStorage.getItem(`moodMirror_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed to load data from localStorage:', e);
      return null;
    }
  }
}

// Initialize the enhanced app
document.addEventListener('DOMContentLoaded', () => {
  window.moodMirror = new EnhancedMoodMirror();
});

// Auto-save session when user interacts
window.addEventListener('beforeunload', () => {
  if (window.moodMirror) {
    window.moodMirror.saveLastSession();
  }
});

// Handle visibility change for notifications
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && window.moodMirror) {
    window.moodMirror.updateUI();
  }
});
setTimeout(() => {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
  }

}, 3000);
