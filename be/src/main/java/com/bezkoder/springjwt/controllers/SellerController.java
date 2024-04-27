package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Seller;
import com.bezkoder.springjwt.models.User;
import com.bezkoder.springjwt.payload.request.AddSellerRequest;
import com.bezkoder.springjwt.repository.SellerRepository;
import com.bezkoder.springjwt.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("api/seller")
public class SellerController {
    @Autowired
    SellerRepository sellerRepository;
    @Autowired
    UserRepository userRepository;
    @PostMapping("/add")
    public void addSeller(@RequestBody @Valid AddSellerRequest addSellerRequest)
    {
        User user = userRepository.findById(Long.parseLong(addSellerRequest.uid));
        Seller seller= new Seller();
        seller.setShopName(addSellerRequest.shopName);
        seller.setUser(user);
        sellerRepository.save(seller);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Seller>> getAllSeller()
    {
        List<Seller> sellers = sellerRepository.findAll();
        return ResponseEntity.ok(sellers);
    }
}
