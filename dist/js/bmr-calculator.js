// DOM elements
const heightBtn = document.getElementById("height-btn");
const weightBtn = document.getElementById("weight-btn");
const bmrResults = document.querySelector(".bmr-results");
const heightOptions = document.getElementById("height-options");
const weightOptions = document.getElementById("weight-options");

// Event listener for document click
document.addEventListener("click", (event) => {
  handleOptionsToggle(event, heightBtn, heightOptions);
  handleOptionsToggle(event, weightBtn, weightOptions);
});

heightBtn.addEventListener("click", () => {
  toggleOptionsVisibility(heightOptions);
});

weightBtn.addEventListener("click", () => {
  toggleOptionsVisibility(weightOptions);
});

// Function to handle the click event for options
function handleOptionClick(optionsContainer, inputId) {
  optionsContainer.addEventListener("click", (event) => {
    updateSelectedOption(event.target, optionsContainer, inputId);
  });
}

// Add event listener for height options
handleOptionClick(heightOptions, "height");

// Add event listener for weight options
handleOptionClick(weightOptions, "weight");

// Add event listener to the "Calculate" button
document.querySelector(".btn").addEventListener("click", calculateBMR);

// Function to check if the clicked element is inside the specified container
function isClickInsideElement(element, container) {
  let targetElement = element;
  do {
    if (targetElement == container) {
      return true;
    }
    targetElement = targetElement.parentNode;
  } while (targetElement);
  return false;
}

// Function to toggle options visibility
function toggleOptionsVisibility(optionsContainer) {
  optionsContainer.classList.toggle("open");
}

// Function to handle options toggle on document click
function handleOptionsToggle(event, button, optionsContainer) {
  if (!isClickInsideElement(event.target, button)) {
    optionsContainer.classList.remove("open");
  }
}

// Function to handle the click event for options
function updateSelectedOption(selectedOption, optionsContainer, inputId) {
  if (selectedOption.classList.contains("option")) {
    // Remove selected class from all options in optionsContainer
    optionsContainer.querySelectorAll(".option").forEach((option) => {
      option.classList.remove("selected");
    });

    // Add selected class to the clicked option
    selectedOption.classList.add("selected");

    // Update the unit text in the button
    const unitBtn = document.getElementById(`${inputId}-btn`);
    unitBtn.querySelector(".Unit").textContent = selectedOption.textContent;

    // Update the input value based on the selected option
    const inputElement = document.getElementById(inputId);
    inputElement.setAttribute("value", ""); // Clear the value
    inputElement.setAttribute(
      "placeholder",
      `Enter your ${inputId} in ${selectedOption.textContent.toLowerCase()}`
    );
  }
}

// Function to calculate BMR
function calculateBMR() {
  // Retrieve values from the form inputs
  const age = parseFloat(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const gender = document.querySelector('input[name="gender"]:checked').value;

  // Retrieve the selected units for height and weight
  const heightUnit = document.querySelector(
    "#height-options .option.selected"
  ).textContent;
  const weightUnit = document.querySelector(
    "#weight-options .option.selected"
  ).textContent;

  // Check if all required values are provided
  if (isNaN(height) || isNaN(weight) || isNaN(age) || !gender) {
    alert("Please fill in all the required fields.");
    return;
  }

  // Convert height and weight to a consistent unit
  const heightInCM = convertToCM(height, heightUnit);
  const weightInKG = convertToKG(weight, weightUnit);

  // Function to convert different units to CM for height
  function convertToCM(value, unit) {
    switch (unit) {
      case "CM":
        return value;
      case "Inch":
        return value * 2.54; // 1 Inch = 2.54 CM
      case "Feet":
        return value * 30.48; // 1 Feet = 30.48 CM
      default:
        return value;
    }
  }

  // Function to convert different units to KG for weight
  function convertToKG(value, unit) {
    return unit === "KG" ? value : value * 0.453592; // 1 LB = 0.453592 KG
  }

  // Perform BMR calculation based on the Harris-Benedict equation
  let bmr;
  if (gender === "male") {
    bmr = 88.362 + 13.397 * weightInKG + 4.799 * heightInCM - 5.677 * age;
  } else {
    bmr = 447.593 + 9.247 * weightInKG + 3.098 * heightInCM - 4.33 * age;
  }

  // Calculate daily calorie needs for different activity levels
  const activityLevels = [
    { level: "BMR", multiplier: 1 },
    { level: "Sedentary", multiplier: 1.2 },
    { level: "Exercise 1-3 times/week", multiplier: 1.375 },
    { level: "Exercise 4-5 times/week", multiplier: 1.418 },
    {
      level: "Daily exercise or intense exercise 3-4 times/week",
      multiplier: 1.462,
    },
    { level: "Intense exercise 6-7 times/week", multiplier: 1.55 },
    {
      level: "Very intense exercise daily, or physical job",
      multiplier: 1.725,
    },
  ];

  // Create a table to display the results
  const tableBody = document.querySelector("#results-table tbody");
  tableBody.innerHTML = ""; // Clear previous results

  activityLevels.forEach((activity) => {
    const dailyCalories = bmr * activity.multiplier;

    // Add a row to the table with the results
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);

    cell1.textContent = activity.level;
    cell2.textContent = dailyCalories.toFixed(0);

    // Create a link inside cell3
    const link = document.createElement("a");
    link.textContent = "Use";
    link.href = `../meal-plan-generator.html?calories=${dailyCalories.toFixed(
      0
    )}`;

    // Append the link to cell3
    cell3.appendChild(link);
  });

  // Show the table
  bmrResults.classList.add("show");
}
