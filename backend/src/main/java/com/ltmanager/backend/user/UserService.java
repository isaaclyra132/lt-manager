package com.ltmanager.backend.user;

import com.ltmanager.backend.common.AbstractService;
import com.ltmanager.backend.user.enums.Role;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework .stereotype.Service;

import java.util.Objects;

@Service
@Slf4j
public class UserService extends AbstractService<User, UserDTO> {
    private UserRepository repository;

    private PasswordEncoder encoder;

    public UserService(UserRepository repository, PasswordEncoder encoder) {
        super(repository);
        this.repository = repository;
        this.encoder = encoder;
    }

    @Override
    public UserDTO saveOrUpdate(UserDTO entityDTO) {
        log.info("New user created!");
        var preparedUser = prepareUser(entityDTO);
        return super.saveOrUpdate(preparedUser);
    }

    private UserDTO prepareUser(UserDTO entityDTO) {
        if (Objects.nonNull(entityDTO.getPassword())){
            entityDTO.setPassword(encoder.encode(entityDTO.getPassword()));
            entityDTO.setRole(Role.ROLE_USER); // TODO - Refatorar quando adicionar novas roles
        }
        return entityDTO;
    }


    @Override
    public Class<User> getEntityClass() {
        return User.class;
    }

    @Override
    public Class<UserDTO> getDTOClass() {
        return UserDTO.class;
    }

    @Override
    public String getEntityName() {
        return "User";
    }
}
