// main.js
// Controller module: connects data, processing utilities, display
// functions, and the user interface. Event-driven entry point.

import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import { displayStudents, displaySummary } from "./display.js";

// UI controls (exact required IDs)
const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  displayStudents(result);
  displaySummary(result);
}

function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";

  displayStudents(students);
  displaySummary(students);
}

// Event-driven wiring - addEventListener only, no inline handlers.
applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetFilters);

// Live search as the user types; Apply Filters still works independently.
searchInput.addEventListener("input", applyFilters);
searchInput.addEventListener("keyup", applyFilters);

// Optional immediate response to filter changes; Apply Filters still works.
blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

// Initial render on page load: all six students and the initial summary.
displayStudents(students);
displaySummary(students);
