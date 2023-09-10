package com.ltmanager.backend.user;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping( "/api/lt")
public class UserController {
    private final UserService service;

    UserController(UserService service) {
        this.service = service;
    }

    @GetMapping("/users")
    public List<UserDTO> find(){
        return service.all().stream().toList();
    }

    @GetMapping("/user/{id}")
    UserDTO one(@PathVariable UUID id){
        return service.findById(id);
    }

    @PostMapping("/user")
    UserDTO newCandidate(@RequestBody UserDTO entity) {
        return service.saveOrUpdate(entity);
    }

    @PutMapping("/user/{id}")
    UserDTO update(@RequestBody UserDTO entity, @PathVariable UUID id){
        entity.setId(id);
        return service.saveOrUpdate(entity);
    }

    @DeleteMapping("/user/{id}")
    void deleteCandidate(@PathVariable UUID id) {
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
