package com.ltmanager.backend.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping( "/api/lt")
@Slf4j
public class TaskController {

    private final TaskService service;

    TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/tasks")
    List<TaskDTO> find(Authentication authentication){
        log.info("GET /api/lt/tasks");
        return service.all(authentication).stream().toList();
    }

    @GetMapping("/tasks/archived")
    List<TaskDTO> findArchivedTasks(Authentication authentication){
        log.info("GET /api/lt/tasks/archived");
        return service.allArquived(authentication).stream().toList();
    }

    @GetMapping("/task/{id}")
    TaskDTO one(@PathVariable UUID id){
        log.info("GET /api/lt/task/{}", id);
        return service.findById(id);
    }

    @PostMapping("/task")
    TaskDTO newTask(@RequestBody TaskDTO entity, Authentication authentication) {
        log.info("POST /api/lt/task");
        return service.saveOrUpdate(entity, authentication);
    }

    @PutMapping("/task/{id}")
    TaskDTO update(@RequestBody TaskDTO entity, @PathVariable UUID id){
        entity.setId(id);
        log.info("PUT /api/lt/task/{}", id);
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
