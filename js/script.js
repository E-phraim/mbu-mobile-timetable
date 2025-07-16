// Batch naming system
const batchNames = [
  "Apex",
  "Blaze",
  "Cipher",
  "Delta",
  "Echo",
  "Falcon",
  "Genesis",
  "Horizon",
  "Inferno",
  "Jade",
  "Kairos",
  "Lightning",
  "Matrix",
  "Nova",
  "Omega",
  "Phoenix",
  "Quantum",
  "Rebel",
  "Storm",
  "Titan",
  "Ultra",
  "Vertex",
  "Warrior",
  "Zenith",
];

// Basic Program Structure (3 months)
const basicProgram = [
  {
    course: "COMP 101",
    name: "Computer Introduction",
    weeks: 2,
    schedule: [
      { time: "8:00-9:30am", type: "CLASS" },
      { time: "9:30-11:00am", type: "LAB" },
      { time: "12:30-2:00pm", type: "HOME" },
    ],
  },
  {
    course: "MSW 101",
    name: "Microsoft Word",
    weeks: 2,
    schedule: [
      { time: "8:00-9:30am", type: "LAB" },
      { time: "9:30-11:00am", type: "CLASS" },
      { time: "12:30-2:00pm", type: "HOME" },
    ],
  },
  {
    course: "MSE 101",
    name: "Microsoft Excel",
    weeks: 2,
    schedule: [
      { time: "8:00-9:30am", type: "LAB" },
      { time: "9:30-11:00am", type: "CLASS" },
      { time: "12:30-2:00pm", type: "HOME" },
    ],
  },
  {
    course: "MSP 101",
    name: "Microsoft Publisher",
    weeks: 1,
    schedule: [
      { time: "8:00-9:30am", type: "LAB" },
      { time: "9:30-11:00am", type: "CLASS" },
      { time: "12:30-2:00pm", type: "HOME" },
    ],
  },
  {
    course: "MSI 101",
    name: "Microsoft Internet",
    weeks: 1,
    schedule: [
      { time: "8:00-9:30am", type: "LAB" },
      { time: "9:30-11:00am", type: "CLASS" },
      { time: "12:30-2:00pm", type: "HOME" },
    ],
  },
  {
    course: "CD 101",
    name: "CorelDraw",
    weeks: 2,
    schedule: [
      { time: "9:30-11:00am", type: "LAB" },
      { time: "12:30-2:00pm", type: "CLASS & HOME" },
    ],
  },
  {
    course: "MSPT 101",
    name: "Microsoft PowerPoint",
    weeks: 1,
    schedule: [
      { time: "9:30-11:00am", type: "LAB" },
      { time: "12:30-2:00pm", type: "CLASS & HOME" },
    ],
  },
  {
    course: "ESW 101",
    name: "Easy Worship",
    weeks: 1,
    schedule: [
      { time: "9:30-11:00am", type: "LAB" },
      { time: "12:30-2:00pm", type: "CLASS & HOME" },
    ],
  },
];

// Advanced Program Structure (continues after basic)
const advancedProgram = [
  { course: "CD 201", name: "Advanced CorelDraw", weeks: 2 },
  { course: "MSW 201", name: "Advanced MS Word", weeks: 2 },
  { course: "MSE 201", name: "Advanced Excel", weeks: 2 },
  { course: "MSA 201", name: "MS Access", weeks: 2 },
  { course: "PS 201", name: "Photoshop", weeks: 2 },
  { course: "EXAM", name: "Examinations", weeks: 1 },
  { course: "IT 201", name: "IT Support", weeks: 2 },
];

// Initialize
document.getElementById("currentDate").value = new Date()
  .toISOString()
  .split("T")[0];
populateBatchDropdown();

function populateBatchDropdown() {
  const select = document.getElementById("batchSelect");

  // Define key batch dates based on your actual schedule
  const keyBatches = [
    { date: "2024-12-01", name: "Phoenix" },
    { date: "2024-12-15", name: "Quantum" },
    { date: "2025-01-01", name: "Rebel" },
    { date: "2025-01-15", name: "Storm" },
    { date: "2025-02-01", name: "Titan" },
    { date: "2025-02-15", name: "Ultra" },
    { date: "2025-03-01", name: "Vertex" },
    { date: "2025-03-15", name: "Warrior" },
    { date: "2025-04-01", name: "Zenith" },
    { date: "2025-04-15", name: "Apex" },
    { date: "2025-05-01", name: "Blaze" },
    { date: "2025-05-15", name: "Cipher" },
    { date: "2025-06-01", name: "Delta" },
    { date: "2025-06-15", name: "Echo" },
    { date: "2025-06-30", name: "Falcon" },
    { date: "2025-07-14", name: "Genesis" },
    { date: "2025-07-28", name: "Horizon" },
    { date: "2025-08-11", name: "Inferno" },
    { date: "2025-08-25", name: "Jade" },
    { date: "2025-09-08", name: "Kairos" },
    { date: "2025-09-22", name: "Lightning" },
    { date: "2025-10-06", name: "Matrix" },
    { date: "2025-10-20", name: "Nova" },
    { date: "2025-11-03", name: "Omega" },
  ];

  keyBatches.forEach((batch) => {
    const batchDate = new Date(batch.date);
    const month = batchDate.toLocaleDateString("en-US", { month: "short" });
    const day = batchDate.getDate();

    const batchId = `${month.toLowerCase()}${day}${batch.name}`;
    const displayName = `${month} ${day} - ${batch.name}`;

    const option = document.createElement("option");
    option.value = batchId;
    option.textContent = displayName;
    option.dataset.startDate = batch.date;

    select.appendChild(option);
  });
}

function generateTimetable() {
  const batchSelect = document.getElementById("batchSelect");
  const currentDate = new Date(document.getElementById("currentDate").value);

  if (!batchSelect.value) {
    alert("Please select a batch first!");
    return;
  }

  const selectedOption = batchSelect.options[batchSelect.selectedIndex];
  const batchStartDate = new Date(selectedOption.dataset.startDate);
  const batchName = selectedOption.textContent;

  const timetable = document.getElementById("timetable");
  timetable.innerHTML = "";

  // Calculate current week and progress
  const weeksSinceStart = Math.floor(
    (currentDate - batchStartDate) / (7 * 24 * 60 * 60 * 1000)
  );
  const totalWeeks = 25; // 12 weeks basic + 13 weeks advanced

  // Show status indicator
  showStatusIndicator(
    batchName,
    weeksSinceStart,
    totalWeeks,
    currentDate,
    batchStartDate
  );

  // Generate Basic Program Schedule
  generateBasicProgram(batchName, batchStartDate, currentDate, timetable);

  // Generate Advanced Program Schedule
  const advancedStartDate = new Date(batchStartDate);
  advancedStartDate.setDate(advancedStartDate.getDate() + 12 * 7); // 12 weeks after basic
  generateAdvancedProgram(batchName, advancedStartDate, currentDate, timetable);
}

function showStatusIndicator(
  batchName,
  weeksSinceStart,
  totalWeeks,
  currentDate,
  batchStartDate
) {
  const indicator = document.getElementById("statusIndicator");
  indicator.style.display = "block";

  const progressPercentage = Math.min(
    (weeksSinceStart / totalWeeks) * 100,
    100
  );

  let statusText = "";
  if (weeksSinceStart < 0) {
    statusText = `${batchName} hasn't started yet (starts in ${Math.abs(
      weeksSinceStart
    )} week${Math.abs(weeksSinceStart) !== 1 ? "s" : ""})`;
  } else if (weeksSinceStart <= 12) {
    statusText = `${batchName} is in Basic Program - Week ${
      weeksSinceStart + 1
    } of 12`;
  } else if (weeksSinceStart <= 25) {
    statusText = `${batchName} is in Advanced Program - Week ${
      weeksSinceStart - 11
    } of 13`;
  } else {
    statusText = `${batchName} has completed the program`;
  }

  indicator.innerHTML = `
        <div class="current-status">${statusText}</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
        </div>
        <div>Progress: ${Math.round(progressPercentage)}% Complete</div>
    `;
}

function generateBasicProgram(batchName, startDate, currentDate, container) {
  const section = document.createElement("div");
  section.className = "timetable-section";

  section.innerHTML = `
        <div class="section-header">
            Basic Program (3 Months) - ${batchName}
        </div>
    `;

  let currentWeekNumber = 0;
  let courseStartDate = new Date(startDate);

  basicProgram.forEach((course) => {
    const weekBlock = document.createElement("div");
    weekBlock.className = "week-block";

    const courseEndDate = new Date(courseStartDate);
    courseEndDate.setDate(courseEndDate.getDate() + course.weeks * 7 - 1);

    // Determine week status
    const weeksSinceStart = Math.floor(
      (currentDate - startDate) / (7 * 24 * 60 * 60 * 1000)
    );
    const isCurrentWeek =
      weeksSinceStart >= currentWeekNumber &&
      weeksSinceStart < currentWeekNumber + course.weeks;
    const isCompleted = weeksSinceStart >= currentWeekNumber + course.weeks;

    if (isCurrentWeek) {
      weekBlock.classList.add("current-week");
    } else if (isCompleted) {
      weekBlock.classList.add("completed");
    }

    let statusBadge = "";
    if (isCurrentWeek) {
      statusBadge = '<div class="week-status">📍 Current</div>';
    } else if (isCompleted) {
      statusBadge = '<div class="week-status">✅ Done</div>';
    }

    const weekHeader = `
            <div class="week-header ${isCurrentWeek ? "current-week" : ""} ${
      isCompleted ? "completed" : ""
    }">
                ${course.course} - ${course.name}
                <br>
                ${formatDateRange(courseStartDate, courseEndDate, course.weeks)}
                ${statusBadge}
            </div>
        `;

    const weekContent = `
            <div class="week-content">
                ${course.schedule
                  .map(
                    (slot) => `
                    <div class="time-slot">
                        <div class="time-info">${slot.time}</div>
                        <div class="class-info">
                            <div class="class-item ${slot.type
                              .toLowerCase()
                              .replace(" & ", "-")
                              .replace(" ", "-")}-item">
                                ${slot.type}
                            </div>
                            <div class="class-item">${course.course}</div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    weekBlock.innerHTML = weekHeader + weekContent;
    section.appendChild(weekBlock);

    // Move to next course
    currentWeekNumber += course.weeks;
    courseStartDate.setDate(courseStartDate.getDate() + course.weeks * 7);
  });

  container.appendChild(section);
}

function generateAdvancedProgram(batchName, startDate, currentDate, container) {
  const section = document.createElement("div");
  section.className = "timetable-section";

  section.innerHTML = `
        <div class="section-header advanced-section">
            Advanced Program (6 Months Total) - ${batchName}
        </div>
    `;

  const batchStartDate = new Date(startDate);
  batchStartDate.setDate(batchStartDate.getDate() - 12 * 7); // Go back to original batch start

  let currentWeekNumber = 12; // Advanced starts at week 12
  let courseStartDate = new Date(startDate);

  advancedProgram.forEach((course) => {
    const weekBlock = document.createElement("div");
    weekBlock.className = "week-block";

    const courseEndDate = new Date(courseStartDate);
    courseEndDate.setDate(courseEndDate.getDate() + course.weeks * 7 - 1);

    // Determine week status
    const weeksSinceStart = Math.floor(
      (currentDate - batchStartDate) / (7 * 24 * 60 * 60 * 1000)
    );
    const isCurrentWeek =
      weeksSinceStart >= currentWeekNumber &&
      weeksSinceStart < currentWeekNumber + course.weeks;
    const isCompleted = weeksSinceStart >= currentWeekNumber + course.weeks;

    if (isCurrentWeek) {
      weekBlock.classList.add("current-week");
    } else if (isCompleted) {
      weekBlock.classList.add("completed");
    }

    let statusBadge = "";
    if (isCurrentWeek) {
      statusBadge = '<div class="week-status">📍 Current</div>';
    } else if (isCompleted) {
      statusBadge = '<div class="week-status">✅ Done</div>';
    }

    const weekHeader = `
            <div class="week-header ${isCurrentWeek ? "current-week" : ""} ${
      isCompleted ? "completed" : ""
    }">
                ${course.course} - ${course.name}
                <br>
                ${formatDateRange(courseStartDate, courseEndDate, course.weeks)}
                ${statusBadge}
            </div>
        `;

    const weekContent = `
            <div class="week-content">
                <div class="time-slot">
                    <div class="time-info">2:00-3:30pm</div>
                    <div class="class-info">
                        <div class="class-item advanced-color">CLASS</div>
                        <div class="class-item">${course.course}</div>
                    </div>
                </div>
                <div class="time-slot">
                    <div class="time-info">3:30-5:00pm</div>
                    <div class="class-info">
                        <div class="class-item home-item">PRACTICE</div>
                        <div class="class-item">${course.course}</div>
                    </div>
                </div>
            </div>
        `;

    weekBlock.innerHTML = weekHeader + weekContent;
    section.appendChild(weekBlock);

    // Move to next course
    currentWeekNumber += course.weeks;
    courseStartDate.setDate(courseStartDate.getDate() + course.weeks * 7);
  });

  container.appendChild(section);
}

function formatDateRange(startDate, endDate, weeks) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const start = startDate.toLocaleDateString("en-US", options);
  const end = endDate.toLocaleDateString("en-US", options);

  return `${start} - ${end} (${weeks} week${weeks > 1 ? "s" : ""})`;
}