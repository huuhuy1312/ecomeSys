package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.TypesOfProduct;
import com.bezkoder.springjwt.repository.TypesOfProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeOfProductService {
    private final TypesOfProductRepository typesOfProductRepository;

    public void saveAll(List<TypesOfProduct> typesOfProducts){
        typesOfProductRepository.saveAll(typesOfProducts);
    }

    public void deleteByLabel1sAndProductId(List<String> label1s, Long productId){
        typesOfProductRepository.DeleteByLabel1AndProductId(label1s,productId);
    }

    public void deleteByLabel2sAndProductId(List<String> label2s,Long productId){
        typesOfProductRepository.DeleteByLabel2AndProductId(label2s,productId);
    }

}
