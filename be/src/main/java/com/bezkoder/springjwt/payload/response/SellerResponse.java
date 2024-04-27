package com.bezkoder.springjwt.payload.response;

public class SellerResponse {
    public long id;
    public String shopName;

    public SellerResponse(long id, String shopName) {
        this.id=id;
        this.shopName=shopName;
    }
}
