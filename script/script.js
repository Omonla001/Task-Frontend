

// Elements
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');
const taskDeadline = document.getElementById('task-deadline');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// In-memory tasks array
let tasks = [];

//  Base URL for API requests
const API_BASE = 'http://localhost:8000/tasks'; 

// Check if userToken exists in sessionStorage
const token = sessionStorage.getItem('userToken');

if (!token) {
  // Redirect to login page if no token is found
  alert('You must log in to access the dashboard.');
  window.location.href = 'login.html';
}

// Utility function for authenticated requests
async function fetchWithAuth(url, option = {}) {
  const headers = option.headers || {};
  headers['Authorization'] = `Bearer ${token}`;
  headers['Content-Type'] = 'application/json';
  option.headers = headers;
 
  const response = await fetch(url, option);

  if (response.status === 401) {
    alert('Session expired. Please log in again.');
    sessionStorage.removeItem('userToken'); // Clear the token
    window.location.href = 'login.html'; // Redirect to login page
    return;
  }
  return response;
}

// Render tasks
async function renderTasks(filter = 'all', searchQuery = '') {
  taskList.innerHTML = '';
  
  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed) ||
      (filter === task.priority) ||
      (filter === 'overdue' && new Date(task.deadline) < new Date() && !task.completed);
      
    const matchesSearch =
      searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Render filtered tasks
  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task ${task.completed ? 'completed' : ''} ${new Date(task.deadline) < new Date() && !task.completed ? 'task-overdue' : ''}`;
    li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Deadline: ${task.deadline}</p>
      <p>Priority: ${task.priority}</p>
      <button onclick="toggleComplete(${task._id})">${task.completed ? 'Mark as Pending' : 'Mark as Completed'}</button>
      <button onclick="deleteTask(${task._id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Load tasks on page load
window.onload = () => {
  loadTasks(); // Ensure tasks are loaded when the page is ready
};

// Fetch tasks from the backend
async function loadTasks() {
  try {
    const response = await fetchWithAuth(`${API_BASE}/userTask`);
    const result = await response.json();
    
    if (response.ok) {
      tasks = result.tasks;
      renderTasks();
    } else {
      alert(result.message || 'Failed to fetch tasks.');
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
  }
}

// Add a new task
addTaskBtn.addEventListener('click', async () => {
  const title = taskTitle.value.trim();
  const description = taskDesc.value.trim();
  const deadline = taskDeadline.value;
  const priority = taskPriority.value;

  if (!title || !deadline) {
    alert('Title and deadline are required!');
    return;
  }

  try {
    const response = await fetchWithAuth(`${API_BASE}/createTask`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        description,
        deadline,
        priority,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      alert(result.message || 'Task created successfully!');
      loadTasks(); // Reload tasks from the backend
    } else {
      alert(result.error || 'Failed to create task.');
    }
  } catch (err) {
    console.error('Error creating task:', err);
  }
});

// Toggle task completion
async function toggleComplete(id) {
  if (!id){
    console.error('Task ID is missing');
    return;
  }

  console.log('Toggling task with ID:', id);
  try {
    const task = tasks.find(t => t._id === id);
    if (!task){
      console.error('Task not found');
      return;
    }
      
    const response = await fetchWithAuth(`${API_BASE}/userTask/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !task.completed}),
    });
    const result = await response.json();
    
    if (!response.ok) {
      const error = await response.json();
      alert(error.message || 'An error occurred while processing the request.');
      return;
  }
  

    if (response.ok) {
      alert(result.message || 'Task updated successfully!');
      loadTasks(); // Reload tasks from the backend
    } else {
      alert(result.message || 'Failed to update task.');
    }
  } catch (err) {
    console.error('Error updating task:', err);
  }
}

// Delete a task
async function deleteTask(id) {
  if (!id) {
    console.error('Task ID is missing');
    return;
  }
  console.log('Deleting task with ID:', id);
  try {
    const response = await fetchWithAuth(`${API_BASE}/userTask/${id}`, { method: 'DELETE' });
    const result = await response.json();
    
    if (response.ok) {
      alert(result.message || 'Task deleted successfully!');
      loadTasks(); // Reload tasks from the backend
    } else {
      alert(result.message || 'Failed to delete task.');
    }
  } catch (err) {
    console.error('Error deleting task:', err);
  }
}

// Filter tasks
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');
    renderTasks(button.dataset.filter);
  });
});

// Search tasks
searchBtn.addEventListener('click', () => {
  renderTasks('all', searchInput.value.trim());
});

