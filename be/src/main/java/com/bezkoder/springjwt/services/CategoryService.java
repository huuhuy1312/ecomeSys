package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.Category;
import com.bezkoder.springjwt.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    public Category findById(Long id){
        return categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Not found category with id="+id));
    }
}
