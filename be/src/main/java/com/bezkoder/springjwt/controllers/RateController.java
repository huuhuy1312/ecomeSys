package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Customer;
import com.bezkoder.springjwt.models.Product;
import com.bezkoder.springjwt.models.Rates;
import com.bezkoder.springjwt.payload.request.AddRateRequest;
import com.bezkoder.springjwt.repository.CustomerRepository;

import com.bezkoder.springjwt.repository.ProductRepository;
import com.bezkoder.springjwt.repository.RateRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/rate")
public class RateController {
    @Autowired
    private RateRepository rateRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @GetMapping("/{pid}")
    public ResponseEntity<?>getRatesByProductId(@PathVariable long pid)
    {
        return ResponseEntity.ok(rateRepository.findByProductId(pid));
    }

    @PostMapping("/add")
    public  ResponseEntity<?>addRate(@RequestBody AddRateRequest addRateRequest)
    {
        System.out.println(addRateRequest.customerId);
        System.out.println(addRateRequest.rateStar);
        System.out.println(addRateRequest.rateReview);
        System.out.println(addRateRequest.productId);
        Optional<Product> productOptional = productRepository.findById(addRateRequest.productId);
        Product product = productOptional.orElseThrow(()->new RuntimeException("Khong tim thay Product có "));
        Optional<Customer> customerOptional = customerRepository.findById(addRateRequest.customerId);
        Customer customer = customerOptional.orElseThrow(()->new RuntimeException("Khong tim thay customer co "));
        Rates rates = new Rates(addRateRequest.rateStar,addRateRequest.rateReview, product,customer);
        rateRepository.save(rates);
        return ResponseEntity.ok("Lưu thành công");
    }
}
