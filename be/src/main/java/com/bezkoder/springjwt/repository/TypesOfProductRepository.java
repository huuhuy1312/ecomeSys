package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.TypesOfProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypesOfProductRepository extends JpaRepository<TypesOfProduct,Long> {
    List<TypesOfProduct> findByProductId(long pid);
}
