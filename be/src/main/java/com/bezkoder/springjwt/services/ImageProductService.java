package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.Image_Product;
import com.bezkoder.springjwt.repository.ImageProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageProductService {
    private final ImageProductRepository imageProductRepository;
    private final FileService fileService;

    public void deleteByIds(List<Long> ids){
        imageProductRepository.deleteAllById(ids);
        List<String> names = imageProductRepository.getNamesByIds(ids);
        System.out.println(names);
        fileService.deleteByNames(names);

    }
    public void addAll(List<Image_Product> imageProducts)
    {
        imageProductRepository.saveAll(imageProducts);
    }
}
