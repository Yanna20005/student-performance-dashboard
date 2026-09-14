// display.js
// Display module: responsible ONLY for rendering data into the DOM.
// No data filtering/searching logic lives here - that stays in gradeUtils.js.

import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

const studentListEl = document.getElementById("studentList");
const classAverageEl = document.getElementById("classAverage");
const passingCountEl = document.getElementById("passingCount");
const displayedCountEl = document.getElementById("displayedCount");
const topStudentEl = document.getElementById("topStudent");
const messageAreaEl = document.getElementById("messageArea");

export function displayStudents(students) {
  studentListEl.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.innerHTML = `
      <h3 class="student-name">${name}</h3>
      <p class="student-block">Block: ${block}</p>
      <ul class="student-scores">
        <li>Quiz: ${quiz}</li>
        <li>Lab: ${lab}</li>
        <li>Exam: ${exam}</li>
      </ul>
      <p class="student-grade">Final Grade: ${finalGrade.toFixed(2)}</p>
      <p class="student-status">Status: <span class="status-${status.replace(/\s+/g, "-").toLowerCase()}">${status}</span></p>
      <p class="student-remark">Remark: ${remark}</p>
    `;

    studentListEl.appendChild(card);
  });
}

export function displaySummary(students) {
  const average = calculateClassAverage(students);
  const passing = countPassingStudents(students);
  const top = getTopStudent(students);

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passing;
  displayedCountEl.textContent = students.length;
  topStudentEl.textContent = top
    ? '${top.name} (${calculateFinalGrade(top).toFixed(2)})'
    :"-";
}

export function displayMessage(message) {
  messageAreaEl.textContent = message;
}
