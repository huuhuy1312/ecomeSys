package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.Seller;
import com.bezkoder.springjwt.repository.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerService {
    private final SellerRepository sellerRepository;

    public Seller findById(Long id)
    {
        return sellerRepository.findById(id).orElseThrow(()->new RuntimeException("Not found seller id="+id));
    }
}
