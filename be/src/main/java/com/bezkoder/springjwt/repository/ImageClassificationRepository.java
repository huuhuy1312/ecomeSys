package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.ImageClassifications1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ImageClassificationRepository extends JpaRepository<ImageClassifications1,Long> {
    ImageClassifications1 findImageClassifications1ByProductIdAndClassification1(long pid, String title1);


    @Override
    void deleteAllById(Iterable<? extends Long> longs);

    @Query("SELECT ic.image FROM ImageClassifications1 ic WHERE ic.id IN :ids")
    List<String> getNamesByIds(@Param("ids") List<Long> ids);

}
