package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.Supplier;
import com.bezkoder.springjwt.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SupplierService {
    private final SupplierRepository supplierRepository;
    public Supplier findById(Long id)
    {
        return supplierRepository.findById(id).orElseThrow(()->new RuntimeException("Not found supplier with id="+id));
    }
}
