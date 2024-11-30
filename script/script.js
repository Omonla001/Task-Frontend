// File: script.js

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

// Render tasks
function renderTasks(filter = 'all', searchQuery = '') {
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
      <button onclick="toggleComplete(${task.id})">${task.completed ? 'Mark as Pending' : 'Mark as Completed'}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add task
addTaskBtn.addEventListener('click', () => {
  const title = taskTitle.value.trim();
  const description = taskDesc.value.trim();
  const deadline = taskDeadline.value;
  const priority = taskPriority.value;

  if (!title || !deadline) {
    alert('Title and deadline are required!');
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    description,
    deadline,
    priority,
    completed: false
  });

  taskTitle.value = '';
  taskDesc.value = '';
  taskDeadline.value = '';
  taskPriority.value = 'medium';

  renderTasks();
});

// Toggle task completion
function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
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

// Initial render
renderTasks();
