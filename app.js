console.log("Hello World!");

let hasDownloadedResume = false;
const name = "Patrick";

// HW9 Skills Feature
let skills = [];

// HW9 Navigation Menu
const navItems = [
  "Summary",
  "Skills",
  "Projects",
  "Education",
  "Experience",
  "Contact",
];

function renderNavMenu() {
  $("#navMenu").empty();

  navItems.forEach((item) => {
    const li = $(`
      <li class="nav-item">
        <a class="nav-link" href="#${item.toLowerCase()}">${item}</a>
      </li>
    `);

    $("#navMenu").append(li);
  });
}

function addSkill() {
  const name = $("#skillInput").val().trim();

  if (name === "") return;

  // Validation: no duplicates
  const exists = skills.some((s) => s.toLowerCase() === name.toLowerCase());
  if (exists) {
    alert("Skill already exists!");
    return;
  }

  skills.push(name);
  renderSkills();
  $("#skillInput").val("");
}

function renderSkills() {
  $("#skillsList").empty(); // clear the list

  skills.forEach((skill, index) => {
    const li = $(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${skill}</span>
        <div>
          <button class="editBtn btn btn-sm btn-warning me-2" data-index="${index}">Edit</button>
          <button class="deleteBtn btn btn-sm btn-danger" data-index="${index}">X</button>
        </div>
      </li>
    `);

    // Smooth animation
    li.hide().appendTo("#skillsList").fadeIn(300);
  });
}

// Edit Skill
$(document).on("click", ".editBtn", function () {
  const index = $(this).data("index");
  const currentName = skills[index];

  const newName = prompt("Edit skill:", currentName);

  if (newName && newName.trim() !== "") {
    skills[index] = newName.trim();
    renderSkills();
  }
});

// Delete Skill (with animation)
$(document).on("click", ".deleteBtn", function () {
  const index = $(this).data("index");
  const li = $(this).closest("li");

  li.slideUp(300, function () {
    skills.splice(index, 1);
    renderSkills();
  });
});

$(document).on("click", ".nav-link", function (e) {
  e.preventDefault();

  const target = $(this).attr("href");

  $("html, body").animate(
    {
      scrollTop: $(target).offset().top - 50,
    },
    600,
  );
});

// Project Array Vars - homework8
const projectTitles = [
  "Portfolio Website",
  "Dino Runner Game",
  "Cybersecurity Lab",
  "Pixel Sprite Creation",
];

const projectDescriptions = [
  "A personal portfolio showcasing my skills, projects, and resume.",
  "A simple browser-based game inspired by the Chrome Dino Runner.",
  "Hands-on security exercises focusing on vulnerabilities and defenses.",
  "A little pixel art project where I designed a few characters and cleaned them up into game-ready sprites. Mostly about learning LibreSprite and getting comfortable with shading and exporting.",
];

const projectDeadlines = [
  "2026-03-30",
  "2026-04-10",
  "2026-03-01",
  "2026-06-14",
];

const projectImages = [
  "images/ml_logo.png",
  "images/dino.png",
  "images/d20.png",
  "images/liv-dino.png",
];

// EDUCATION DATA — homework8
const educationData = [
  {
    institution: "Northern Arizona University",
    degree: "B.S. Computer Science",
    details: "Emphasis: Cybersecurity",
    dates: "Aug 2025 - Present",
  },
  {
    institution: "University of Montana",
    degree: "B.A. English",
    details: "Emphasis: Literature",
    dates: "Aug 2009 - 2011",
  },
];

// EXPERIENCE DATA — homework8
const experienceData = [
  {
    company: "Single Speed Coffee Roasters",
    role: "Prep Cook",
    responsibilities:
      "Manage station cleanliness<br>Maintain inventory and ensure freshness<br>Assist customers and teammates",
    dates: "Mar 2026 - Present",
  },
  {
    company: "Dark Sky Brewing Co.",
    role: "General Tap Room Manager",
    responsibilities:
      "Manage daily operations<br>Oversee inventory and kegs<br>Train and support staff",
    dates: "Nov 2022 - Mar 2026",
  },
  {
    company: "Warner's Nursery",
    role: "Interior Manager",
    responsibilities:
      "Maintained plant health<br>Assisted customers<br>Managed inventory and displays",
    dates: "Dec 2020 - Nov 2022",
  },
  {
    company: "Whole Foods Market",
    role: "Prepared Foods Team Lead",
    responsibilities:
      "Led daily prep and service<br>Coordinated scheduling and workflow<br>Monitored quality and safety",
    dates: "May 2015 - July 2020",
  },
];

function getTimeBasedGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

function showGreeting(name) {
  const greetingDiv = document.getElementById("greeting");
  const timeGreeting = getTimeBasedGreeting();

  greetingDiv.textContent =
    timeGreeting + ", my name is " + name + "! Welcome to my portfolio!";
}

function daysUntilDeadline(deadlineDate) {
  const today = new Date();
  const deadline = new Date(deadlineDate);

  const differenceInTime = deadline - today;
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
}

//FUNCTION FOR PROJECT ARRAY - homework8

function loadProjects() {
  const container = document.getElementById("projectList");
  container.innerHTML = "";

  for (let i = 0; i < projectTitles.length; i++) {
    const today = new Date();
    const deadline = new Date(projectDeadlines[i]);

    let statusText = "";
    let statusClass = "";

    if (deadline > today) {
      statusText = "Ongoing";
      statusClass = "status-ongoing";
    } else {
      statusText = "Completed";
      statusClass = "status-completed";
    }

    const projectHTML = `
    <div class="col-md-6 mb-4">
      <div class="card h-100 shadow-sm hover-shadow transition d-flex">
        <div class="row g-0 flex-grow-1">
          <div class="col-4 d-flex align-items-stretch">
            <img
              src="${projectImages[i]}"
              alt="${projectTitles[i]} Logo"
              class="img-fluid rounded-start project-img w-100 h-100"
            />
          </div>

          <div class="col-8">
            <div class="card-body">
              <h5 class="card-title fw-bold">${projectTitles[i]}</h5>
              <p class="card-text">${projectDescriptions[i]}</p>
              <p class="card-text"><strong>Deadline:</strong> ${projectDeadlines[i]}</p>          
              <p class="card-text"><strong>Status:</strong> <span class="${statusClass}">${statusText}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    container.innerHTML += projectHTML;
  }
}

//FUNCTION FOR EDUCATION TABLE - homework8

function loadEducationTable() {
  const container = document.getElementById("educationTable");
  container.innerHTML = ""; // clear anything old

  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-hover", "align-middle");

  const thead = document.createElement("thead");
  thead.classList.add("table-dark");

  const headerRow = document.createElement("tr");
  const headers = ["Institution", "Degree", "Details", "Dates"];

  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  educationData.forEach((item) => {
    const row = document.createElement("tr");

    const institution = document.createElement("td");
    institution.textContent = item.institution;

    const degree = document.createElement("td");
    degree.textContent = item.degree;

    const details = document.createElement("td");
    details.textContent = item.details;

    const dates = document.createElement("td");
    dates.textContent = item.dates;

    row.appendChild(institution);
    row.appendChild(degree);
    row.appendChild(details);
    row.appendChild(dates);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

//FUNCTION FOR EXPERIENCE TABLE - homework8

function loadExperienceTable() {
  const container = document.getElementById("experienceTable");
  container.innerHTML = "";

  const table = document.createElement("table");
  table.classList.add("table", "table-striped", "table-hover", "align-middle");

  const thead = document.createElement("thead");
  thead.classList.add("table-dark");

  const headerRow = document.createElement("tr");
  const headers = ["Company", "Role", "Responsibilities", "Dates"];

  headers.forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");

  experienceData.forEach((item) => {
    const row = document.createElement("tr");

    const company = document.createElement("td");
    company.textContent = item.company;

    const role = document.createElement("td");
    role.textContent = item.role;

    const responsibilities = document.createElement("td");
    responsibilities.innerHTML = item.responsibilities;

    const dates = document.createElement("td");
    dates.textContent = item.dates;

    row.appendChild(company);
    row.appendChild(role);
    row.appendChild(responsibilities);
    row.appendChild(dates);

    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}

//DARK MODE TOGGLE FUNCTION - homework8

function toggleTheme() {
  const body = document.body;

  if (body.classList.contains("dark-theme")) {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");
  }
}

//STYLE FUNCTION

function applyCustomStyles() {
  const fontSize = document.getElementById("fontSizeInput").value;
  const bgColor = document.getElementById("bgColorInput").value;

  if (fontSize) {
    document.body.style.fontSize = fontSize + "px";
  }

  if (bgColor) {
    document.body.style.backgroundColor = bgColor;
  }
}

window.onload = function () {
  showGreeting(name);

  //NEW FUNCTION CALLS - homework8

  loadProjects();
  loadEducationTable();
  loadExperienceTable();
  $("#addSkillBtn").on("click", addSkill);
  renderNavMenu();

  document
    .getElementById("toggleTheme")
    .addEventListener("click", function (e) {
      e.preventDefault(); //
      toggleTheme();
    });

  document
    .getElementById("applyStyles")
    .addEventListener("click", applyCustomStyles);

  const daysLeft = daysUntilDeadline("2026-03-15");
  console.log("Days until project deadline:", daysLeft);

  const resumeButton = document.getElementById("downloadResume");

  const counterEl = document.getElementById("downloadCount");

  let resumeDownloadCount =
    parseInt(localStorage.getItem("resumeDownloadCount")) || 0;

  if (counterEl) {
    counterEl.textContent = resumeDownloadCount;
  }

  resumeButton.addEventListener("click", function (event) {
    event.preventDefault();

    resumeDownloadCount++;
    localStorage.setItem("resumeDownloadCount", resumeDownloadCount);

    if (counterEl) {
      counterEl.textContent = resumeDownloadCount;
    }

    alert("Your resume was downloaded successfully!");

    window.location.href = resumeButton.href;
  });
  resumeButton.addEventListener("click", function () {
    if (!hasDownloadedResume) {
      setTimeout(() => alert("Your resume was downloaded successfully!"), 2000);
      hasDownloadedResume = true;
    }
  });
};
