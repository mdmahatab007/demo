// =========================================
// EcoSocial Development Alliance - Data Store
// All site content is managed here and in localStorage
// =========================================

const ECOSOCIAL_DATA_KEY = 'ecosocial_data';

const DEFAULT_DATA = {
  siteInfo: {
    name: 'EcoSocial Development Alliance',
    tagline: 'Growing Nature, Empowering People',
    email: 'eco.sd.alliance@gmail.com',
    facebook: 'https://www.facebook.com/profile.php?id=61564697565795',
    joinFormLink: '',
    logoText: 'EcoSocial'
  },
  aboutUs: {
    title: 'About EcoSocial Development Alliance',
    subtitle: 'Our Mission & Vision',
    content: `EcoSocial Development Alliance (ESDA) is a forward-thinking non-profit organization dedicated to bridging the gap between environmental sustainability and social development. Founded with a deep commitment to nature and humanity, we believe that a healthy environment is the foundation for thriving communities.

Our organization works at the grassroots level, partnering with local communities, governments, and international bodies to implement projects that address climate change, biodiversity loss, poverty, and social inequality simultaneously.

We operate on the principle that ecological restoration and human development are not competing goals — they are deeply intertwined. When nature flourishes, people flourish. When communities are empowered, they become the best stewards of their local ecosystems.`,
    mission: 'To foster sustainable ecological and social development through community-driven initiatives, education, and advocacy.',
    vision: 'A world where every community lives in harmony with nature — prosperous, resilient, and equitable.',
    values: [
      { icon: '🌿', title: 'Sustainability', desc: 'Every action we take is rooted in long-term ecological thinking.' },
      { icon: '🤝', title: 'Community', desc: 'We believe lasting change comes from within communities themselves.' },
      { icon: '🌍', title: 'Inclusion', desc: 'We embrace diversity and ensure no voice is left unheard.' },
      { icon: '🔬', title: 'Innovation', desc: 'We use evidence-based approaches and creative solutions.' }
    ],
    stats: [
      { number: '500+', label: 'Members Nationwide' },
      { number: '50+', label: 'Projects Completed' },
      { number: '12', label: 'Districts Covered' },
      { number: '10K+', label: 'Lives Impacted' }
    ],
    teamTitle: 'Our Leadership',
    founderName: 'Mozahid Howlader',
    founderRole: 'Founder & Executive Director',
    founderBio: 'Mozahid Howlader is a passionate environmentalist and social entrepreneur with over a decade of experience in community development and ecological restoration. His vision gave birth to EcoSocial Development Alliance.'
  },
  members: [
    {
      id: 1,
      name: 'Mozahid Howlader',
      role: 'Founder & Executive Director',
      badge: 'Founder',
      image: '',
      featured: true
    },
    {
      id: 2,
      name: 'Sarah Rahman',
      role: 'Program Director',
      badge: 'Leadership',
      image: '',
      featured: true
    },
    {
      id: 3,
      name: 'Karim Ahmed',
      role: 'Field Coordinator',
      badge: 'Field Team',
      image: '',
      featured: false
    },
    {
      id: 4,
      name: 'Nusrat Islam',
      role: 'Community Liaison',
      badge: 'Community',
      image: '',
      featured: false
    }
  ],
  gallery: [
    {
      id: 1,
      caption: 'Tree Plantation Drive 2024',
      image: '',
      category: 'Environment'
    },
    {
      id: 2,
      caption: 'Community Workshop — Chittagong',
      image: '',
      category: 'Community'
    },
    {
      id: 3,
      caption: 'Youth Leadership Training',
      image: '',
      category: 'Education'
    },
    {
      id: 4,
      caption: 'Coastal Cleanup Campaign',
      image: '',
      category: 'Environment'
    },
    {
      id: 5,
      caption: 'Annual Conference 2024',
      image: '',
      category: 'Events'
    },
    {
      id: 6,
      caption: 'Mangrove Restoration Project',
      image: '',
      category: 'Environment'
    }
  ],
  joinPage: {
    title: 'Join as a Member',
    subtitle: 'Be part of the change you want to see in the world.',
    description: 'Becoming a member of EcoSocial Development Alliance means joining a passionate community of changemakers. Whether you are a student, professional, researcher, or activist — there is a place for you here.',
    benefits: [
      '🌿 Access to exclusive events and workshops',
      '🤝 Network with like-minded changemakers',
      '📚 Training and capacity building programs',
      '🏆 Recognition and leadership opportunities',
      '📰 Monthly newsletter and updates',
      '💼 Volunteering and internship placements'
    ],
    formLink: ''
  }
};

function getSiteData() {
  try {
    const stored = localStorage.getItem(ECOSOCIAL_DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Deep merge to add new default keys
      return deepMerge(DEFAULT_DATA, parsed);
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveSiteData(data) {
  localStorage.setItem(ECOSOCIAL_DATA_KEY, JSON.stringify(data));
}

function deepMerge(defaults, overrides) {
  const result = JSON.parse(JSON.stringify(defaults));
  for (const key in overrides) {
    if (overrides[key] && typeof overrides[key] === 'object' && !Array.isArray(overrides[key])) {
      result[key] = deepMerge(result[key] || {}, overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
}

function getNextId(items) {
  return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
}

// Shared nav render
function renderNav(activePage) {
  const data = getSiteData();
  return `
    <nav>
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <div style="width:46px;height:46px;background:linear-gradient(135deg,#2e8b57,#023e8a);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">🌿</div>
          <div class="nav-logo-text">
            <span class="brand">EcoSocial</span>
            <span class="tagline">Development Alliance</span>
          </div>
        </a>
        <ul class="nav-links" id="navLinks">
          <li><a href="index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>
          <li><a href="gallery.html" ${activePage==='gallery'?'class="active"':''}>Gallery</a></li>
          <li><a href="about.html" ${activePage==='about'?'class="active"':''}>About Us</a></li>
          <li><a href="contact.html" ${activePage==='contact'?'class="active"':''}>Contact Us</a></li>
          <li><a href="join.html" class="cta-btn ${activePage==='join'?'active':''}">Join as a Member</a></li>
        </ul>
        <button class="hamburger" onclick="document.getElementById('navLinks').classList.toggle('open')" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>`;
}

// Shared footer render
function renderFooter() {
  const data = getSiteData();
  const si = data.siteInfo;
  return `
    <footer>
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-brand">
            <div style="width:52px;height:52px;background:linear-gradient(135deg,#2e8b57,#023e8a);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;">🌿</div>
            <div>
              <div style="font-family:'Playfair Display',serif;font-size:1.1rem;color:#fff;font-weight:700;">EcoSocial</div>
              <div style="font-size:.75rem;color:#52b788;">Development Alliance</div>
            </div>
            <p>Growing nature, empowering communities. Together for a sustainable future.</p>
            <span class="tagline">"${si.tagline}"</span>
          </div>
          <div class="footer-col">
            <h4>Pages</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="join.html">Join as Member</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="${si.facebook}" target="_blank">Facebook</a></li>
              <li><a href="mailto:${si.email}">${si.email}</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Admin</h4>
            <ul>
              <li><a href="admin/index.html">Admin Panel</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${si.name}. All rights reserved.</span>
          <div class="social-links">
            <a href="${si.facebook}" target="_blank" class="social-link" title="Facebook">f</a>
            <a href="mailto:${si.email}" class="social-link" title="Email">✉</a>
          </div>
        </div>
      </div>
    </footer>`;
}

// Contact FAB
function renderContactFAB() {
  const data = getSiteData();
  const si = data.siteInfo;
  return `
    <div class="contact-fab">
      <div class="contact-panel" id="contactPanel">
        <div class="contact-panel-header">
          <h3>Get in Touch</h3>
          <p>We'd love to hear from you!</p>
        </div>
        <div class="contact-options">
          <a href="${si.facebook}" target="_blank" class="contact-option fb">
            <div class="contact-option-icon">f</div>
            <div class="contact-option-text">
              <strong>Facebook</strong>
              <span>Message us on Facebook</span>
            </div>
          </a>
          <a href="mailto:${si.email}" class="contact-option email">
            <div class="contact-option-icon">✉</div>
            <div class="contact-option-text">
              <strong>Email Us</strong>
              <span>${si.email}</span>
            </div>
          </a>
        </div>
      </div>
      <button class="contact-fab-btn" onclick="toggleContact()" title="Contact Us">💬</button>
    </div>`;
}

function toggleContact() {
  document.getElementById('contactPanel').classList.toggle('open');
}

// Close contact if click outside
document.addEventListener('click', function(e) {
  const fab = document.querySelector('.contact-fab');
  if (fab && !fab.contains(e.target)) {
    const panel = document.getElementById('contactPanel');
    if (panel) panel.classList.remove('open');
  }
});
