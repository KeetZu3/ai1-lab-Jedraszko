// app.js

// document.addEventListener("click", (event) => {
//     const isInsideTaskList = event.target.closest("#taskList") !== null;
//     if (!isInsideTaskList && todo.editIndex !== -1) {
//         // Clicked outside the task list while in edit mode, save the edited task
//         todo.saveEditedTask(todo.editIndex, document.querySelector("#taskList li input").value);
//     }
// });
class Todo {
    constructor() {
        this.tasks = [];
        this.term = "";
        this.editIndex = -1;
    }

    draw() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        this.getFilteredTasks().forEach((task, index) => {
            const li = document.createElement("li");

            if (this.editIndex === index) {
                const input = document.createElement("input");
                input.type = "text";
                input.value = task.text;
                //input.addEventListener("blur", () => this.saveEditedTask(index, input.value));
                li.appendChild(input);

                const dateInput = document.createElement("input");
                dateInput.type = "datetime-local";
                dateInput.value = task.dueDate || "";
                dateInput.addEventListener("blur", (event) => this.saveEditedDate(index, event.target.value));
                li.appendChild(dateInput);

                const saveButton = document.createElement("button");
                saveButton.textContent = "Save";
                saveButton.addEventListener("click", () => this.saveEditedTask(index, input.value, dateInput.value));
                li.appendChild(saveButton);
            } else {
                const span = document.createElement("span");
                const highlightedText = task.text.replace(new RegExp(`(${this.term})`, 'gi'), '<mark>$1</mark>');
                span.innerHTML = highlightedText;
                span.style.backgroundColor = task.highlighted ? "yellow" : "transparent";
                span.addEventListener("click", (event) => this.editTask(index, event.target));
                li.appendChild(span);

                const dateSpan = document.createElement("span");
                dateSpan.textContent = task.dueDate ? ` - Due Date: ${task.dueDate}` : "";
                li.appendChild(dateSpan);

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => this.deleteTask(index));
                li.appendChild(deleteButton);
            }

            taskList.appendChild(li);
        });
    }

    addTask(text, dueDate) {
        if (text.length >= 3 && text.length <= 255 && (dueDate === "" || new Date(dueDate) > new Date())) {
            this.tasks.push({ text, dueDate, highlighted: false });
            this.draw();
            this.saveToLocalStorage();
        } else {
            alert("Invalid task or due date");
        }
    }

    editTask(index, target) {
        if (this.editIndex === index) {
            if (target.tagName === "INPUT") {
                if (target.type === "text") {
                    // If the target is a text input field, save the edited text
                    this.saveEditedTask(index, target.value);
                } else if (target.type === "datetime-local") {
                    // If the target is a date input field, save the edited date
                    this.saveEditedDate(index, target.value);
                }
            } else {
                // If the target is a span, switch to edit mode
                this.editIndex = index;
                this.draw();
                const li = document.querySelector(`#taskList li:nth-child(${index + 1})`);
                const input = li.querySelector("input[type='text']");
                const dateInput = li.querySelector("input[type='datetime-local']");
                if (input) {
                    input.focus();
                } else if (dateInput) {
                    dateInput.focus();
                }
            }
        } else {
            this.editIndex = index;
            this.draw();
            const li = document.querySelector(`#taskList li:nth-child(${index + 1})`);
            const input = li.querySelector("input[type='text']");
            const dateInput = li.querySelector("input[type='datetime-local']");
            if (input) {
                input.focus();
            } else if (dateInput) {
                dateInput.focus();
            }
        }
    }

    saveEditedTask(index, newText) {
        this.tasks[index].text = newText;
        this.editIndex = -1;
        this.draw();
        this.saveToLocalStorage();
    }

    saveEditedDate(index, newDate) {
        this.tasks[index].dueDate = newDate;
        this.editIndex = -1;
        this.draw();
        this.saveToLocalStorage();
    }

    handleDateInput(event, index) {
        this.tasks[index].dueDate = event.target.value;
    }

    deleteTask(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            this.tasks.splice(index, 1);
            this.editIndex = -1;
            this.draw();
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    loadFromLocalStorage() {
        const savedTasks = localStorage.getItem("tasks");
        this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        this.draw();
    }

    setSearchTerm(term) {
        this.term = term;
        this.draw();
    }

    getFilteredTasks() {
        return this.tasks.filter(task => task.text.toLowerCase().includes(this.term.toLowerCase()));
    }
}

const todo = new Todo();
todo.loadFromLocalStorage();

document.getElementById("searchInput").addEventListener("input", (event) => {
    todo.setSearchTerm(event.target.value);
});

function addTask() {
    const newTaskInput = document.getElementById("newTask");
    const dueDateInput = document.getElementById("dueDate");
    todo.addTask(newTaskInput.value, dueDateInput.value);
    newTaskInput.value = "";
    dueDateInput.value = "";
}
