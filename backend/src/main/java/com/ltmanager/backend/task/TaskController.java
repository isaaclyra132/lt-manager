package com.ltmanager.backend.task;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:8062")
@RestController
@RequestMapping( "/api/lt")
public class TaskController {

    private final TaskService service;

    TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/tasks")
    List<TaskDTO> find(Authentication authentication){
        return service.all(authentication).stream().toList();
    }

    @GetMapping("/tasks/archived")
    List<TaskDTO> findArchivedTasks(Authentication authentication){
        return service.allArquived(authentication).stream().toList();
    }

    @GetMapping("/task/{id}")
    TaskDTO one(@PathVariable UUID id){
        return service.findById(id);
    }

    @PostMapping("/task")
    TaskDTO newTask(@RequestBody TaskDTO entity, Authentication authentication) {
        return service.saveOrUpdate(entity, authentication);
    }

    @PutMapping("/task/{id}")
    TaskDTO update(@RequestBody TaskDTO entity, @PathVariable UUID id){
        entity.setId(id);
        return service.saveOrUpdate(entity);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ResponseEntity<String> onJdbcSQLIntegrityConstraintViolationException(DataIntegrityViolationException e) {
        return new ResponseEntity("Os dados fornecidos não obedecem às restrições. " +
                "Provavelmente já existe um registro similar salvo no banco de dados.", HttpStatus.BAD_REQUEST);
    }
}
