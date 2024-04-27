package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.Cart;
import com.bezkoder.springjwt.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartRepository cartRepository;
    @GetMapping("/{cartId}")
    public ResponseEntity<?> getCartByID(@PathVariable long cartId)
    {
        Optional<Cart> cartOptional =cartRepository.findById(cartId);
        Cart cart = cartOptional.orElseThrow(()-> new RuntimeException("Khong tim thay"));
        return ResponseEntity.ok(cart);
    }

}
