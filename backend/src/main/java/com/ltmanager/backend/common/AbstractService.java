package com.ltmanager.backend.common;

import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public abstract class AbstractService<E,D> {

    protected JpaRepository<E, UUID> repository;
    private static ModelMapper modelMapper = new ModelMapper();

    public AbstractService(JpaRepository<E, UUID> repository) {
        this.repository = repository;
    }

    public abstract Class<E> getEntityClass();

    public abstract Class<D> getDTOClass();

    public abstract String getEntityName();

    public Collection<D> all(){
        return repository.findAll().stream()
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
    }

    public Page<D> all(int page, int pageSize){
        Pageable paging = PageRequest.of(page, pageSize);
        return findAllPeageble(paging);
    }

    public Page<D> all(int page, int pageSize, String ...sortBy){
        Sort.by("email").ascending().and(Sort.by("username").descending());
        Pageable paging = PageRequest.of(page, pageSize, Sort.by(sortBy));
        return findAllPeageble(paging);
    }

    private Page findAllPeageble(Pageable paging) {
        var pageable = repository.findAll(paging);
        List<D> itens = pageable.stream()
                .peek(System.out::println)
                .map(this::mapEntityToDTO)
                .collect(Collectors.toList());
        var actualPage = pageable.getPageable();
        return Page.from(actualPage.getPageNumber(), actualPage.getPageSize(), pageable.getTotalElements(), itens);
    }

    public D saveOrUpdate(D entityDTO) {
        var entity = mapDTOToEntity(entityDTO);
        var result = repository.save(entity);
        return mapEntityToDTO(result);
    }

    public D findById(UUID id) {
        var result = repository.findById(id).orElseThrow(() -> new NotFoundException(getEntityName(), id));
        return mapEntityToDTO(result);
    }

    public void deleteById(UUID id) {
        repository.deleteById(id);
    }

    public D mapEntityToDTO(E entity) {
        return modelMapper.map(entity, getDTOClass());
    }

    public E mapDTOToEntity(D entityDTO) {
        return modelMapper.map(entityDTO, getEntityClass());
    }
}