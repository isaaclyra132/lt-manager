package com.ltmanager.backend.task;

import com.ltmanager.backend.common.AbstractService;
import com.ltmanager.backend.task.enums.TaskStatus;
import com.ltmanager.backend.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@Slf4j
public class TaskService extends AbstractService<Task, TaskDTO> {
    private TaskRepository repository;
    public TaskService(TaskRepository repository) {
        super(repository);
        this.repository = repository;
    }

    public List<TaskDTO> all(Authentication authentication) {
        User user =  (User) authentication.getPrincipal();
        return super.all().stream().filter(taskDTO ->
            taskDTO.getUser().getId().equals(user.getId()) && taskDTO.getStatus() != TaskStatus.ARQUIVADA
        ).toList();
    }

    public List<TaskDTO> allArquived(Authentication authentication) {
        User user =  (User) authentication.getPrincipal();
        return super.all().stream().filter(taskDTO ->
                taskDTO.getUser().getId().equals(user.getId()) && taskDTO.getStatus().equals(TaskStatus.ARQUIVADA)
        ).toList();
    }

    public TaskDTO saveOrUpdate(TaskDTO taskDTO, Authentication authentication) {
        var preparedTask = prepareTask(taskDTO, authentication);
        return super.saveOrUpdate(preparedTask);
    }

    @Override
    public TaskDTO saveOrUpdate(TaskDTO taskDTO) {
        var oldTask = repository.findById(taskDTO.getId());
        taskDTO.setUpdatedAt(LocalDateTime.now());
        taskDTO.setUser(oldTask.orElseThrow().getUser());
        taskDTO.setCreatedAt(oldTask.orElseThrow().getCreatedAt());
        return super.saveOrUpdate(taskDTO);
    }

    TaskDTO prepareTask(TaskDTO taskDTO, Authentication authentication) {
        User user =  (User) authentication.getPrincipal();
        taskDTO.setUser(user);
        taskDTO.setCreatedAt(LocalDateTime.now());
        taskDTO.setUpdatedAt(LocalDateTime.now());
        taskDTO.setStatus(TaskStatus.NAO_INICIADA);
        return taskDTO;
    }

    @Override
    public Class<Task> getEntityClass() {
        return Task.class;
    }

    @Override
    public Class<TaskDTO> getDTOClass() {
        return TaskDTO.class;
    }

    @Override
    public String getEntityName() {
        return "Task";
    }
}
