package com.ltmanager.backend.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ltmanager.backend.task.Task;
import com.ltmanager.backend.task.TaskDTO;
import com.ltmanager.backend.user.enums.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class UserDTO {
    private UUID id;
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String name;
    @JsonIgnore
    private Role role;
    @JsonIgnore
    private List<TaskDTO> tasks;
}
