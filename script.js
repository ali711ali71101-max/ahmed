document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-journal-text"></i>
                    <p>لا توجد مهام مضافة بعد</p>
                </div>
            `;
            deleteAllBtn.style.display = 'none';
            return;
        }
        
        deleteAllBtn.style.display = 'block';
        
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            taskElement.innerHTML = `
                <input class="form-check-input task-checkbox" type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text ${task.completed ? 'text-muted' : ''}" style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.text}</span>
                <button class="btn btn-sm btn-outline-danger delete-btn">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            
            // Add event listeners for the new task
            const deleteBtn = taskElement.querySelector('.delete-btn');
            const checkbox = taskElement.querySelector('.task-checkbox');
            const taskText = taskElement.querySelector('.task-text');
            
            deleteBtn.addEventListener('click', () => deleteTask(index));
            
            checkbox.addEventListener('change', () => toggleTask(index));
            
            taskList.appendChild(taskElement);
        });
    }
    
    // Add new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;
        
        tasks.unshift({
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        });
        
        saveTasks();
        taskInput.value = '';
        taskInput.focus();
        renderTasks();
    }
    
    // Delete task
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
    
    // Toggle task completion
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }
    
    // Delete all tasks
    function deleteAllTasks() {
        if (confirm('هل أنت متأكد من حذف جميع المهام؟')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    deleteAllBtn.addEventListener('click', deleteAllTasks);
    
    // Initial render
    renderTasks();
});
