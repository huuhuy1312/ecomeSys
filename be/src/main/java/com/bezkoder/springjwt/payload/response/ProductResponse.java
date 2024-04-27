package com.bezkoder.springjwt.payload.response;

import com.bezkoder.springjwt.models.Seller;
import com.bezkoder.springjwt.models.TypesOfProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    public long id;
    public long price;
    public String name;
    public String description;
    public double rateStar;
    public long quantity;
    public long Cost;
    public String linkImage;
    public long revenue;
    public int soldQuantity;
    public Seller seller;
    public List<TypesOfProduct> typesOfProducts;
}
