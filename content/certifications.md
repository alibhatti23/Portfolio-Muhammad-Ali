---
title: "Certifications & Achievements"
description: "My professional certifications and achievements including AWS, Meta, Google, IBM, GitHub certifications and competition wins."
keywords: [Certifications, Achievements, AWS, Meta, Google, IBM, GitHub, HackerRank, Programming Competitions]
lastmod: 2025-03-05
showtoc: false
searchHidden: true
ShowRssButtonInSectionTermList: false
ShowShareButtons: false
hideMeta: true
---

<style>
.tabs {
  display: flex;
  gap: 0;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border);
}
.tab-btn {
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: var(--muted-foreground);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}
.tab-btn:hover {
  color: var(--primary);
}
.tab-btn.active {
  color: var(--primary);
}
.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--primary);
}
.tab-content {
  display: none;
}
.tab-content.active {
  display: block;
}
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.cert-grid figure,
.cert-grid p {
  margin: 0;
  padding: 0;
}
.cert-card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--entry);
  padding: 0;
  border: 1px solid var(--code-block-border, var(--border));
}
.cert-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
.cert-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  object-position: center;
  display: block;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.cert-card-info {
  padding: 1rem;
}
.cert-card-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}
.cert-card-info p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--muted-foreground);
}
.cert-card-info .verify-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--primary);
  text-decoration: none;
}
.cert-card-info .verify-link:hover {
  text-decoration: underline;
}
.achievement-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.achievement-item {
  padding: 1.25rem;
  background: var(--entry);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border: 1px solid var(--code-block-border, var(--border));
}
.achievement-item h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
}
.achievement-item p {
  margin: 0;
  color: var(--muted-foreground);
  font-size: 0.95rem;
}
.achievement-item .date {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--muted-foreground);
}
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
}
.modal-overlay.active {
  display: flex;
}
.modal-content {
  max-width: 900px;
  max-height: 90vh;
  background: var(--theme);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}
.modal-content img {
  width: 100%;
  max-height: 70vh;
  object-fit: contain;
  background: #000;
}
.modal-details {
  padding: 1.5rem;
}
.modal-details h2 {
  margin: 0 0 0.5rem 0;
}
.modal-details p {
  margin: 0.25rem 0;
  color: var(--muted-foreground);
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  z-index: 1001;
  background: rgba(0,0,0,0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.modal-close:hover {
  background: rgba(0,0,0,0.8);
}
</style>

<div class="tabs">
<button class="tab-btn active" onclick="switchTab('certifications')">Certifications</button>
<button class="tab-btn" onclick="switchTab('achievements')">Achievements</button>
</div>

<div id="certifications" class="tab-content active">
<div class="cert-grid">

<div class="cert-card" onclick="openModal('/assets/certification/aws-cpp.jpg', 'AWS Certified Cloud Practitioner', 'Amazon Web Services', 'Oct 2025')">
<img src="/assets/certification/aws-cpp.jpg" alt="AWS Certified Cloud Practitioner">
<div class="cert-card-info">
<h3>AWS Certified Cloud Practitioner</h3>
<p>Amazon Web Services</p>
<a href="https://www.credly.com/badges/d12ea9df-c9c3-40c2-8f48-e8d3cc289900" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/calico.jpg', 'CALICO Spring 25', 'UC Berkeley', 'Jun 2025')">
<img src="/assets/certification/calico.jpg" alt="CALICO Spring 25">
<div class="cert-card-info">
<h3>CALICO Spring '25</h3>
<p>UC Berkeley</p>
<a href="https://hkn.eecs.berkeley.edu/examfiles/certificates?id=5721" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/meta-frontend-developer.jpg', 'Meta Front-End Developer', 'Meta', 'Jun 2025')">
<img src="/assets/certification/meta-frontend-developer.jpg" alt="Meta Front-End Developer">
<div class="cert-card-info">
<h3>Meta Front-End Developer</h3>
<p>Meta</p>
<a href="https://www.coursera.org/account/accomplishments/professional-cert/EOD4GA2NMYMM" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/sql-intermediate.jpg', 'SQL (Intermediate)', 'HackerRank', 'May 2025')">
<img src="/assets/certification/sql-intermediate.jpg" alt="SQL Intermediate">
<div class="cert-card-info">
<h3>SQL (Intermediate)</h3>
<p>HackerRank</p>
<a href="https://www.hackerrank.com/certificates/32242ff98c07" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/meta-mysql.jpg', 'Database Structures and Management with MySQL', 'Meta', 'Apr 2025')">
<img src="/assets/certification/meta-mysql.jpg" alt="Database Structures and Management with MySQL">
<div class="cert-card-info">
<h3>Database Structures & MySQL</h3>
<p>Meta</p>
<a href="https://www.coursera.org/account/accomplishments/verify/647YYNTB39M2" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/puzzle-day.jpg', 'CS50x Puzzle Day 2025', 'Harvard University', 'Apr 2025')">
<img src="/assets/certification/puzzle-day.jpg" alt="CS50x Puzzle Day 2025">
<div class="cert-card-info">
<h3>CS50x Puzzle Day 2025</h3>
<p>Harvard University</p>
<a href="https://certificates.cs50.io/d7ecbce7-91eb-4f1d-8dc1-bda0c3564972" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/meta-intro-databases.jpg', 'Introduction to Databases', 'Meta', 'Mar 2025')">
<img src="/assets/certification/meta-intro-databases.jpg" alt="Introduction to Databases">
<div class="cert-card-info">
<h3>Introduction to Databases</h3>
<p>Meta</p>
<a href="https://www.coursera.org/account/accomplishments/verify/ITLH074TW550" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/aws-intro-genai.jpg', 'Introduction to Generative AI', 'Amazon Web Services', 'Mar 2025')">
<img src="/assets/certification/aws-intro-genai.jpg" alt="Introduction to Generative AI">
<div class="cert-card-info">
<h3>Introduction to Generative AI</h3>
<p>Amazon Web Services</p>
<a href="https://www.credly.com/badges/5a8f69dc-f881-4c30-94e3-94a89ca62c52" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/google-agile.jpg', 'Agile Project Management', 'Google', 'Jan 2025')">
<img src="/assets/certification/google-agile.jpg" alt="Agile Project Management">
<div class="cert-card-info">
<h3>Agile Project Management</h3>
<p>Google</p>
<a href="https://www.coursera.org/account/accomplishments/verify/YKWFRIEPJQST" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/github-foundions.jpg', 'GitHub Foundations', 'GitHub', 'Jan 2025')">
<img src="/assets/certification/github-foundions.jpg" alt="GitHub Foundations">
<div class="cert-card-info">
<h3>GitHub Foundations</h3>
<p>GitHub</p>
<a href="https://www.credly.com/badges/4ddc90a7-090b-4a36-b318-76da222cabba" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/problem-solving.jpg', 'Problem Solving (Intermediate)', 'HackerRank', 'Jan 2025')">
<img src="/assets/certification/problem-solving.jpg" alt="Problem Solving Intermediate">
<div class="cert-card-info">
<h3>Problem Solving (Intermediate)</h3>
<p>HackerRank</p>
<a href="https://www.hackerrank.com/certificates/7542b0741a9d" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/meta-javascript.jpg', 'Programming with JavaScript', 'Meta', 'Jan 2025')">
<img src="/assets/certification/meta-javascript.jpg" alt="Programming with JavaScript">
<div class="cert-card-info">
<h3>Programming with JavaScript</h3>
<p>Meta</p>
<a href="https://www.coursera.org/account/accomplishments/verify/YY8J2RAW0UWY" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/ibm-devops.jpg', 'Introduction to DevOps', 'IBM', 'Dec 2024')">
<img src="/assets/certification/ibm-devops.jpg" alt="Introduction to DevOps">
<div class="cert-card-info">
<h3>Introduction to DevOps</h3>
<p>IBM</p>
<a href="https://www.coursera.org/account/accomplishments/verify/HEJPAL3ZNCQD" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/ibm-software-engineering.jpg', 'Introduction to Software Engineering', 'IBM', 'Dec 2024')">
<img src="/assets/certification/ibm-software-engineering.jpg" alt="Introduction to Software Engineering">
<div class="cert-card-info">
<h3>Introduction to Software Engineering</h3>
<p>IBM</p>
<a href="https://www.coursera.org/account/accomplishments/verify/SSFJX9Q9LOVD" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/google-cloud-digital-leader.jpg', 'Google Cloud Digital Leader', 'Google', 'Feb 2024')">
<img src="/assets/certification/google-cloud-digital-leader.jpg" alt="Google Cloud Digital Leader">
<div class="cert-card-info">
<h3>Google Cloud Digital Leader</h3>
<p>Google</p>
<a href="https://www.coursera.org/account/accomplishments/verify/RFTCJ5KWNSMR" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/google-python.jpg', 'Crash Course on Python', 'Google', 'Jan 2024')">
<img src="/assets/certification/google-python.jpg" alt="Crash Course on Python">
<div class="cert-card-info">
<h3>Crash Course on Python</h3>
<p>Google</p>
<a href="https://www.coursera.org/account/accomplishments/verify/KQDGM9ECXRF9" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/google-data-everywhere.jpg', 'Foundations: Data, Data, Everywhere', 'Google', 'Jan 2024')">
<img src="/assets/certification/google-data-everywhere.jpg" alt="Foundations: Data, Data, Everywhere">
<div class="cert-card-info">
<h3>Foundations: Data, Data, Everywhere</h3>
<p>Google</p>
<a href="https://www.coursera.org/account/accomplishments/verify/7JGEDDR7PASY" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/google-git-github.jpg', 'Introduction to Git and GitHub', 'Google', 'Jan 2024')">
<img src="/assets/certification/google-git-github.jpg" alt="Introduction to Git and GitHub">
<div class="cert-card-info">
<h3>Introduction to Git and GitHub</h3>
<p>Google</p>
<a href="https://www.coursera.org/account/accomplishments/verify/CHETJ3H9G279" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/ibm-critical-thinking.jpg', 'Solving Problems with Creative and Critical Thinking', 'IBM', 'Jan 2024')">
<img src="/assets/certification/ibm-critical-thinking.jpg" alt="Solving Problems with Creative and Critical Thinking">
<div class="cert-card-info">
<h3>Creative & Critical Thinking</h3>
<p>IBM</p>
<a href="https://www.coursera.org/account/accomplishments/verify/W8BYDH8QGBLW" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/ucdavis-critical-thinking.jpg', 'Critical Thinking Skills for the Professional', 'UC Davis', 'Dec 2023')">
<img src="/assets/certification/ucdavis-critical-thinking.jpg" alt="Critical Thinking Skills for the Professional">
<div class="cert-card-info">
<h3>Critical Thinking Skills</h3>
<p>UC Davis</p>
<a href="https://www.coursera.org/account/accomplishments/verify/7HE4RC6U1WUY" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

<div class="cert-card" onclick="openModal('/assets/certification/deeplearning-ai-for-everyone.jpg', 'AI For Everyone', 'DeepLearning.AI', 'Nov 2023')">
<img src="/assets/certification/deeplearning-ai-for-everyone.jpg" alt="AI For Everyone">
<div class="cert-card-info">
<h3>AI For Everyone</h3>
<p>DeepLearning.AI</p>
<a href="https://www.coursera.org/account/accomplishments/verify/WXYWQ2YNDYDM" target="_blank" rel="noopener noreferrer" class="verify-link" onclick="event.stopPropagation()">Verify</a>
</div>
</div>

</div>
</div>

<div id="achievements" class="tab-content">
<div class="achievement-list">

<div class="achievement-item">
<h3>CALICO Spring '25 - Rank #92 Worldwide, #2 in Pakistan</h3>
<p>Secured Rank #92 globally and #2 in Pakistan in the CALICO Spring '25 programming competition by UC Berkeley.</p>
<div class="date">2025</div>
</div>

<div class="achievement-item">
<h3>2000+ GitHub Contributions</h3>
<p>Made over 2000 contributions on GitHub in 2025, demonstrating consistent open-source involvement.</p>
<div class="date">2025</div>
</div>

<div class="achievement-item">
<h3>HyprFlux - 800+ Stars</h3>
<p>Created HyprFlux, a complete Arch Linux desktop operating system with branded live ISO, TUI installer, Hyprland desktop, and managed desktop environment. It reached 800+ stars on GitHub.</p>
<div class="date">2025</div>
</div>

<div class="achievement-item">
<h3>Full-Time Job Offer at VieroMind</h3>
<p>Received a full job offer at VieroMind based on performance and skills.</p>
<div class="date">2025</div>
</div>

<div class="achievement-item">
<h3>2nd Position - Pakathon (VieroMind)</h3>
<p>Secured 2nd position in Pakathon, a nationwide hackathon organized by VieroMind.</p>
<div class="date">2024</div>
</div>

<div class="achievement-item">
<h3>1st Position - Maktab-e-Gulab Programming Competition</h3>
<p>Won 1st place in the Maktab-e-Gulab Programming Competition.</p>
<div class="date">2024</div>
</div>

<div class="achievement-item">
<h3>1st Position - Cybersecurity Workshop</h3>
<p>Secured 1st place in a 3-day hands-on Cybersecurity Workshop organized by Ignite - National Technology Fund.</p>
<div class="date">Sep 2024</div>
</div>

<div class="achievement-item">
<h3>3rd Position - Speed Programming (ACM-W)</h3>
<p>Secured 3rd place in the Speed Programming competition at the ACM-W Celebration Event held at Air University.</p>
<div class="date">2024</div>
</div>

<div class="achievement-item">
<h3>400+ Problems Solved</h3>
<p>Solved over 400+ problems on LeetCode and GeeksforGeeks platforms.</p>
<div class="date">Ongoing</div>
</div>

</div>
</div>

<div class="modal-overlay" id="certModal" onclick="closeModal(event)">
<span class="modal-close" onclick="closeModal(event)">&times;</span>
<div class="modal-content" onclick="event.stopPropagation()">
<img id="modalImg" src="" alt="Certificate">
<div class="modal-details">
<h2 id="modalTitle"></h2>
<p id="modalOrg"></p>
<p id="modalDate"></p>
</div>
</div>
</div>

<script>
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(function(el) { el.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(el) { el.classList.remove('active'); });
  document.getElementById(tabId).classList.add('active');
  event.target.classList.add('active');
}
function openModal(imgSrc, title, org, date) {
  document.getElementById('modalImg').src = imgSrc;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalOrg').textContent = org;
  document.getElementById('modalDate').textContent = date;
  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal(event) {
  if (event.target.classList.contains('modal-overlay') || event.target.classList.contains('modal-close')) {
    document.getElementById('certModal').classList.remove('active');
    document.body.style.overflow = '';
  }
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('certModal').classList.remove('active');
    document.body.style.overflow = '';
  }
});
</script>
