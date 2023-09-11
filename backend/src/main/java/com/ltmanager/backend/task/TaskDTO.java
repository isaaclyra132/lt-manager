package com.ltmanager.backend.task;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ltmanager.backend.task.enums.TaskStatus;
import com.ltmanager.backend.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class TaskDTO {

    private UUID id;
    private String title;
    private String description;
    private TaskStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    @JsonIgnore
    private User user;
}
