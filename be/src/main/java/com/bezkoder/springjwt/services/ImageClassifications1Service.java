package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.ImageClassifications1;
import com.bezkoder.springjwt.repository.ImageClassificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageClassifications1Service {
    private final ImageClassificationRepository imageClassificationRepository;

    private final FileService fileService;
    public  void deleteByIds(List<Long> ids) {
        imageClassificationRepository.deleteAllById(ids);
        List<String> names = imageClassificationRepository.getNamesByIds(ids);
        System.out.println(names);
        fileService.deleteByNames(names);
    }
    public void saveAll(List<ImageClassifications1> imageClassifications1List)
    {
        imageClassificationRepository.saveAll(imageClassifications1List);
    }

}
