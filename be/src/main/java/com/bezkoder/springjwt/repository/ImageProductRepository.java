package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Image_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageProductRepository extends JpaRepository<Image_Product,Long> {

    @Override
    @Modifying
    void deleteAllById(Iterable<? extends Long> longs);

    @Query("SELECT ip.image FROM Image_Product ip WHERE ip.id IN :ids")
    List<String> getNamesByIds(@Param("ids") List<Long> ids);
}
