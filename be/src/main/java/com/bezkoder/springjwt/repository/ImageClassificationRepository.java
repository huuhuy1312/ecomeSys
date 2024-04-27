package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.ImageClassifications1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ImageClassificationRepository extends JpaRepository<ImageClassifications1,Long> {
    ImageClassifications1 findImageClassifications1ByProductIdAndClassification1(long pid, String title1);
}
