package com.bezkoder.springjwt.payload.request;

import com.bezkoder.springjwt.models.ImageClassifications1;
import com.bezkoder.springjwt.models.Supplier;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddProductRequest {
    public long id;
    public String name;
    public String description;
    public long quantity;
    public long priceMin;
    public long priceMax;
    public String title1;
    public String title2;
    public long sellerId;
    public List<TOPRequest>listTypeOfProduct;
    public long categoryId;
    public long supplierId;
    public String [] image;
    public  List<ImageClass1Request> imageClassifications;
}
