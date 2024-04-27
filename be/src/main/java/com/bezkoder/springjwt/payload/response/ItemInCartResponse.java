package com.bezkoder.springjwt.payload.response;


import com.bezkoder.springjwt.models.ImageClassifications1;
import com.bezkoder.springjwt.models.Product;
import com.bezkoder.springjwt.models.TypesOfProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ItemInCartResponse {
    public long itemInCartId;
    public long quantity;
    public TypesOfProduct typesOfProduct;
    public String imageClassification;
    public List<TypesOfProduct> listTopOfProduct;
    public String productName;
    public String title1;
    public String title2;
    public ItemInCartResponse(long itemInCartId, long quantity, TypesOfProduct typesOfProduct, List<TypesOfProduct> listTopOfProduct)
    {
        this.itemInCartId = itemInCartId;
        this.quantity = quantity;
        this.typesOfProduct = typesOfProduct;
        this.listTopOfProduct = listTopOfProduct;
    }

}
