package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name ="images_product")
@Builder
public class Image_Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Lob
    @Column( columnDefinition = "longtext")
    private String image;


    @ManyToOne
    @JoinColumn(name="product_id")
    @JsonBackReference
    private Product product;

    public Image_Product( String image,Product product)
    {
        this.product=  product;
        this.image = image;
    }

    public Image_Product(String image) {
        this.image = image;
    }
}
