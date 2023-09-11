package com.ltmanager.backend.user;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping( "/api/lt")
@Slf4j
public class UserController {
    private final UserService service;

    UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public List<UserDTO> find(){
        log.info("GET /api/lt/users");
        return service.all().stream().toList();
    }

    @GetMapping("/user/{id}")
    UserDTO one(@PathVariable UUID id){
        log.info("GET /api/lt/user/{id}", id);
        return service.findById(id);
    }

    @PostMapping("/user")
    UserDTO newUser(@RequestBody UserDTO entity) {
        log.info("POST /api/lt/user");
        return service.saveOrUpdate(entity);
    }

    @PutMapping("/user/{id}")
    UserDTO update(@RequestBody UserDTO entity, @PathVariable UUID id){
        entity.setId(id);
        log.info("PUT /api/lt/user/{}", id);
        return service.saveOrUpdate(entity);
    }

    @DeleteMapping("/user/{id}")
    void deleteUser(@PathVariable UUID id) {
        log.info("DELETE /api/lt/user/{}", id);
        service.deleteById(id);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    ResponseEntity<String> onJdbcSQLIntegrityConstraintViolationException(DataIntegrityViolationException e) {
        return new ResponseEntity("Os dados fornecidos não obedecem às restrições. " +
                "Provavelmente já existe um registro similar salvo no banco de dados.", HttpStatus.BAD_REQUEST);
    }
}
