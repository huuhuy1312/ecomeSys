package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Category;
import com.bezkoder.springjwt.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    CategoryRepository categoryRepository;
    @GetMapping("/all")
    public ResponseEntity<?> getAllCategories()
    {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestParam String nameCategory) {

        if (categoryRepository.existsByName(nameCategory)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Category already exists");
        } else {
            Category category = new Category();
            category.setName(nameCategory);
            categoryRepository.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body("Category added successfully");
        }
    }

    @DeleteMapping("/all")
    public void deleteAllCategories()
    {
        categoryRepository.deleteAll();
    }
}
