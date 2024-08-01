package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.TypesOfProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface TypesOfProductRepository extends JpaRepository<TypesOfProduct,Long> {
    List<TypesOfProduct> findByProductId(long pid);

    @Override
    <S extends TypesOfProduct> List<S> saveAll(Iterable<S> entities);

    @Modifying
    @Transactional
    @Query("DELETE FROM TypesOfProduct top WHERE top.label1 IN :label1s AND top.product.id = :productId")
    void DeleteByLabel1AndProductId(@Param("label1s") List<String> label1s, @Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM TypesOfProduct top WHERE top.label2 IN :label2s AND top.product.id = :productId")
    void DeleteByLabel2AndProductId(@Param("label2s") List<String> label2s, @Param("productId") Long productId);

}
