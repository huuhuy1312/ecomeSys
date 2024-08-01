package com.bezkoder.springjwt.models;

import com.bezkoder.springjwt.models.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ImageClassifications1 {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long id;

    @Lob
    @Column( columnDefinition = "longtext")
    private String image;

    private String classification1;





    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonBackReference(value="product-reference")
    private Product product;
    public ImageClassifications1( String image,String classification1,Product product)
    {
        this.classification1= classification1;
        this.product=  product;
        this.image = image;
    }

    public ImageClassifications1(String image, String classification1) {
        this.image = image;
        this.classification1 = classification1;
    }
}
