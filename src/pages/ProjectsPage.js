import fetchFromApi from '../services/fetchAPI.js';

async function displayProjects() {
  try {
    const projects = await fetchFromApi('projects');

    if (!Array.isArray(projects)) {
      throw new Error('Failed to fetch projects or projects is not an array');
    }

    const projectsContainer = document.querySelector('#projects-container');
    projectsContainer.innerHTML = ''; // Clear existing projects

    projects.forEach(project => {
      const projectElement = document.createElement('div');
      projectElement.classList.add('project', 'border', 'p-4', 'mb-4');

      projectElement.innerHTML = `
        <h2 class="text-xl font-bold">${project.name}</h2>
        <p>${project.description}</p>
        <p><strong>Created At:</strong> ${new Date(project.createdAt).toLocaleDateString()}</p>
        <button class="edit-button bg-blue-500 text-white py-1 px-2 rounded mt-2">Edit</button>
        <button class="delete-button bg-red-500 text-white py-1 px-2 rounded mt-2 ml-2">Delete</button>
      `;

      // Add event listeners for edit and delete buttons
      projectElement.querySelector('.edit-button').addEventListener('click', () => editProject(project.id));
      projectElement.querySelector('.delete-button').addEventListener('click', () => deleteProject(project.id));

      projectsContainer.appendChild(projectElement);
    });
  } catch (error) {
    console.error('An error occurred while displaying projects:', error);
  }
}

async function editProject(projectId) {
  const newName = prompt('Enter new project name:');
  const newDescription = prompt('Enter new project description:');
  
  if (newName && newDescription) {
    try {
      await fetchFromApi(`projects/${projectId}`, {
        method: 'PUT',
        body: { name: newName, description: newDescription },
      });
      displayProjects(); // Refresh the project list
    } catch (error) {
      console.error('An error occurred while editing the project:', error);
    }
  }
}

async function deleteProject(projectId) {
  if (confirm('Are you sure you want to delete this project?')) {
    try {
      await fetchFromApi(`projects/${projectId}`, {
        method: 'DELETE',
      });
      displayProjects(); // Refresh the project list
    } catch (error) {
      console.error('An error occurred while deleting the project:', error);
    }
  }
}

document.addEventListener('DOMContentLoaded', displayProjects);