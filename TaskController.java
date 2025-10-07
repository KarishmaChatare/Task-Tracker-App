package com.tasktracker.controller;

import com.tasktracker.model.Task;
import com.tasktracker.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository repository;

    public TaskController(TaskRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return repository.save(task);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        Task t = repository.findById(id).orElseThrow();
        t.setTitle(task.getTitle());
        t.setCompleted(task.isCompleted());
        return repository.save(t);
    }

    // ==============================
// FUTURE: Connect to MySQL
// ==============================
// 1️⃣ Install MySQL on your machine or use a cloud MySQL DB
// 2️⃣ Create a database: CREATE DATABASE taskdb;
// 3️⃣ Update application.properties with MySQL URL, username, password
// 4️⃣ Change spring.jpa.hibernate.ddl-auto=update
// 5️⃣ Restart the backend. Spring Boot will create the tables automatically

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
