import fetchFromApi from "../services/fetchAPI.js";

// SHOW ALL PROJECTS
async function displayProjects(filterTags = "") {
  try {
    const projects = await fetchFromApi("projects");

    if (!Array.isArray(projects)) {
      throw new Error("Failed to fetch projects or projects is not an array");
    }

    const projectsContainer = document.querySelector("#projects-container");
    projectsContainer.innerHTML = ""; // Clear existing projects

    const filteredProjects = projects.filter((project) => 
      project.tags.toLowerCase().includes(filterTags.toLowerCase())
    );

    filteredProjects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project", "border", "p-4", "mb-4", "w-full");

      
      projectElement.innerHTML = `
      <img src="../img/opt/${project.img}" alt="${project.name}" class="w-1/4 h-1/4">
      <h2 class="text-xl font-bold">${project.name}</h2>
        <p>${project.description}</p>
        <p><strong>Tags:</strong> ${project.tags}</p>
        <p><strong>Created At:</strong> ${new Date(
          project.createdAt
        ).toLocaleDateString()}</p>`;

      projectsContainer.appendChild(projectElement);
    });
  } catch (error) {
    console.error("An error occurred while displaying projects:", error);
  }
}

// Filter Projects
document.querySelector("#filter-input").addEventListener("input", (event) => {
  const filterTags = event.target.value;
  displayProjects(filterTags);
});

document.addEventListener("DOMContentLoaded", () => displayProjects());
