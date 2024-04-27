package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Category;
import com.bezkoder.springjwt.models.Supplier;
import com.bezkoder.springjwt.repository.SupplierRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/supplier")
public class SupplierController {
    @Autowired
    public SupplierRepository supplierRepository;
    @PostMapping("/add")
    public ResponseEntity<?> addSupplier(@RequestParam String nameSupplier)
    {
        if(supplierRepository.existsByName(nameSupplier))
        {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Supplier already exists");
        }
        else{
            Supplier supplier = new Supplier(nameSupplier);
            supplierRepository.save(supplier);
            return ResponseEntity.status(HttpStatus.CREATED).body("Supplier added successfully");
        }
    }
    @GetMapping("/all")
    public ResponseEntity<?> getAllSupplier()
    {
        return ResponseEntity.ok(supplierRepository.findAll());
    }
}
