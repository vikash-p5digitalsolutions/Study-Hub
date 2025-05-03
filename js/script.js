// js/script.js: Dark mode and UI toggles
// Toggle the .dark-mode class on <body>
// Toggle Dark Mode with Button Text Change
// Toggle Dark Mode with Button Text Change and Save in localStorage
// Toggle Dark Mode
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const darkModeIcon = document.getElementById('darkModeIcon');
  darkModeIcon.textContent = document.body.classList.contains('dark-mode') ? "☀️" : "🌙";
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Auto-load dark mode
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeIcon').textContent = "☀️";
  }

  // Attach hamburger click listener
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  }
});

// Toggle between Login and Register forms
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('register-form').style.display = 'none';
}

// Handle Registration Form Submission
document.getElementById('register-form')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const user = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value,
    role: document.getElementById('role').value,
    subject: document.getElementById('role').value === 'teacher' ? document.getElementById('subject').value : null,
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration Successful!');
  window.location.href = "login.html";
});

// Toggle Subject Field
function toggleSubjectField() {
  const role = document.getElementById('role').value;
  const subjectContainer = document.getElementById('subject-container');
  subjectContainer.style.display = role === 'teacher' ? 'block' : 'none';
  if (role === 'teacher') populateSubjects();
}

// Populate Subjects
function populateSubjects() {
  const subjects = ["Mathematics", "Physics", "Chemistry", "English", "Computer Science", "Biology"];
  const subjectSelect = document.getElementById('subject');
  subjectSelect.innerHTML = '<option value="">Select Subject</option>';
  subjects.forEach(sub => {
    const option = document.createElement('option');
    option.value = sub;
    option.textContent = sub;
    subjectSelect.appendChild(option);
  });
}

// Load Teachers
if (document.getElementById('teachers-container')) {
  fetch('database/Teachers.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('teachers-container');
      container.innerHTML = '';
      data.forEach(teacher => {
        container.innerHTML += `
          <div class="teacher-card">
            <h3>${teacher.name}</h3>
            <p>${teacher.subject}</p>
            <a href="${teacher.zoom_link}" target="_blank">
              <button>Consult on Zoom</button>
            </a>
          </div>`;
      });
    })
    .catch(err => console.error('Error loading teachers:', err));
}

// Load Live Classes
if (document.getElementById('live-classes-container')) {
  fetch('database/LiveClasses.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('live-classes-container');
      container.innerHTML = '';
      data.forEach(item => {
        container.innerHTML += `
          <div class="live-class-card">
            <h3>${item.topic}</h3>
            <p>Scheduled: ${new Date(item.schedule).toLocaleString()}</p>
            <a href="${item.zoom_link}" target="_blank">
              <button>Join Live Class</button>
            </a>
          </div>`;
      });
    })
    .catch(err => console.error('Error loading live classes:', err));
}

// Load Courses
if (document.getElementById('courses-container')) {
  fetch('database/Courses.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('courses-container');
      container.innerHTML = '';
      data.forEach(course => {
        container.innerHTML += `
          <div class="course-card">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <a href="course-detail.html?id=${course.id}">
              <button>View Details</button>
            </a>
          </div>`;
      });
    })
    .catch(err => console.error('Error loading courses:', err));
}

// Load Notes
if (document.getElementById('notes-container')) {
  fetch('database/Notes.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('notes-container');
      container.innerHTML = '';
      data.forEach(note => {
        container.innerHTML += `
          <div class="note-card">
            <h3>${note.title}</h3>
            <p>Price: $${note.price}</p>
            <a href="${note.file_url}" download>
              <button>Download</button>
            </a>
          </div>`;
      });
    })
    .catch(err => console.error('Error loading notes:', err));
          }
