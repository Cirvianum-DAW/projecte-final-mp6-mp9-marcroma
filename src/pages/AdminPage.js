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
        <h2 class="text-xl font-bold">${project.name}</h2>
        <p>${project.description}</p>
        <p><strong>Tags:</strong> ${project.tags}</p>
        <p><strong>Created At:</strong> ${new Date(
          project.createdAt
        ).toLocaleDateString()}</p>
        <button class="edit-button bg-blue-500 text-white py-1 px-2 rounded mt-2">Edit</button>
        <button class="delete-button bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2">Delete</button>
      `;

      // Add event listeners for edit and delete buttons
      projectElement
        .querySelector(".edit-button")
        .addEventListener("click", () => editProject(project.id));
      projectElement
        .querySelector(".delete-button")
        .addEventListener("click", () => deleteProject(project.id));

      projectsContainer.appendChild(projectElement);
    });
  } catch (error) {
    console.error("An error occurred while displaying projects:", error);
  }
}

// EDIT A PROJECT
async function editProject(projectId) {
  const newName = prompt("Enter new project name:");
  const newDescription = prompt("Enter new project description:");
  const newTags = prompt("Enter new project tags (comma separated):");

  if (newName && newDescription && newTags) {
    try {
      await fetchFromApi(`projects/${projectId}`, {
        method: "PUT",
        body: { name: newName, description: newDescription, tags: newTags },
      });
      displayProjects(); // Refresh the project list
    } catch (error) {
      console.error("An error occurred while editing the project:", error);
    }
  }
}

// DELETE A PROJECT
async function deleteProject(projectId) {
  const projects = await fetchFromApi("projects");
  const projectExists = projects.some((project) => project.id === projectId);

  if (!projectExists) {
    console.error(`Project with ID ${projectId} does not exist.`);
    return;
  }

  if (confirm("Are you sure you want to delete this project?")) {
    console.log("Project Id: ", projectId);

    try {
      const response = await fetchFromApi(`projects/${projectId}`, {
        method: "DELETE",
      });

      console.log("DELETE response status:", response.status);
      displayProjects(); // Refresh the project list
    } catch (error) {
      console.error("An error occurred while deleting the project:", error);
    }
  }
}

// CREATE A PROJECT
const createButton = document.querySelector("#create-project");
createButton.addEventListener("click", createProject);

async function createProject() {
  const name = prompt("Enter project name:");
  const description = prompt("Enter project description:");
  const tags = prompt("Enter project tags (comma separated):");

  if (name && description && tags) {
    try {
      await fetchFromApi("projects", {
        method: "POST",
        body: { name, description, tags },
      });
      displayProjects(); // Refresh the project list
    } catch (error) {
      console.error("An error occurred while creating the project:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => displayProjects());
