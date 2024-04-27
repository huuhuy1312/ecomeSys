package com.bezkoder.springjwt.repository;


import com.bezkoder.springjwt.models.ItemInCart;
import com.bezkoder.springjwt.models.TypesOfProduct;
import com.bezkoder.springjwt.models.ImageClassifications1;
import com.bezkoder.springjwt.payload.response.ItemInCartResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemInCartRepository extends JpaRepository<ItemInCart,Long> {
    List<ItemInCart>  findByCartId(long cid);
    Optional<ItemInCart> findItemInCartByCartIdAndTypesOfProductId(long cartId, long topId);

    @Query("SELECT new com.bezkoder.springjwt.payload.response.ItemInCartResponse(iic.id, iic.quantity, iic.typesOfProduct,ic.image) " +
            "FROM ItemInCart iic " +
            "JOIN iic.typesOfProduct as tp " +
            "JOIN ImageClassifications1 ic on ic.product = tp.product AND ic.classification1= tp.label1 " +
            "WHERE iic.cart.id = :cartId")
    List<ItemInCartResponse> findAllItemsByCartId(long cartId);
}
