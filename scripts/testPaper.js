import displayQuestion from "./displayQuestion.js";
import progressBar from "./progressBar.js";
import progressBarSelection from "./progressBarSelection.js";

const testPaper = function (selectedTestPaper, mainContent, selectedTestTitle) {
  // console.log(selectedTestPaper, mainContent, selectedTestTitle, siderbarProgressSection);
  while (mainContent.firstChild) {
    mainContent.removeChild(mainContent.firstChild);
  }

  //creating the main content heading title
  const mainHeading = document.createElement("h1");
  mainHeading.setAttribute("id", "main-heading");
  mainHeading.textContent = selectedTestTitle;
  mainContent.appendChild(mainHeading);

  const questionSection = document.createElement("section");
  questionSection.setAttribute("id", "question-section");
  mainContent.appendChild(questionSection);

  //creating the question paper containing a list of objects
  const questionPaper = [];
  for (const item of Object.values(selectedTestPaper)) {
    item.forEach((element) => {
      questionPaper.push(element);
    });
  }
  // console.log(questionPaper);

  // calling display question function to display a specific question
  let counter = 0;
  displayQuestion(questionPaper[counter], questionSection);
  const controlsSection = document.createElement("section");
  controlsSection.setAttribute("id", "controls-section");

  // Displaying the control buttons
  //creating the progress bar
  const progressBarNodesList = progressBar(
    questionPaper,
    counter,
    questionSection
  );

  //default progress bar question selection
  progressBarSelection(progressBarNodesList, counter);
  progressBarNodesList.forEach((element) => {
    element.addEventListener("click", (event) => {
      counter = Number(event.target.textContent - 1);
      progressBarSelection(progressBarNodesList, counter);
      displayQuestion(questionPaper[counter], questionSection);
    });
  });
  //Creating the Previous button
  const previousButton = document.createElement("div");
  previousButton.setAttribute("class", "previous-button");
  previousButton.textContent = "Previous";
  previousButton.addEventListener("click", () => {
    counter > 0 ? counter-- : console.log("counter is 0");
    displayQuestion(questionPaper[counter], questionSection);
    progressBarSelection(progressBarNodesList, counter);
  });
  controlsSection.appendChild(previousButton);
  mainContent.appendChild(controlsSection);

  //Creating the next button
  const nextButton = document.createElement("div");
  nextButton.setAttribute("class", "next-button");
  nextButton.textContent = "Next";
  nextButton.addEventListener("click", () => {
    counter < questionPaper.length - 1
      ? counter++
      : console.log("counter is at the end of the list");
    displayQuestion(questionPaper[counter], questionSection);
    progressBarSelection(progressBarNodesList, counter);
  });
  controlsSection.appendChild(nextButton);
  mainContent.appendChild(controlsSection);
};

export default testPaper;
