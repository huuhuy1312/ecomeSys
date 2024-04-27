package com.bezkoder.springjwt.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String house_num;
    private String street;
    private String district;
    private String province;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @JsonBackReference
    private Customer customer;

    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "seller_id")
    private Seller seller;
    public Address(long id, String houseNum, String street, String district, String province) {
        this.id = id;
        this.house_num = houseNum;
        this.street = street;
        this.district = district;
        this.province = province;
    }

    public Address(String houseNum, String street, String district, String province) {
        this.house_num = houseNum;
        this.street = street;
        this.district = district;
        this.province = province;
    }
}
