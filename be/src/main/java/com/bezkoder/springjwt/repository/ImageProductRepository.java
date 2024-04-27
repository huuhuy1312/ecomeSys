package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Image_Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageProductRepository extends JpaRepository<Image_Product,Long> {
}
