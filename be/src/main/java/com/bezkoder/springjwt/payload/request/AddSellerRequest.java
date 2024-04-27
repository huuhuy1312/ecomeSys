package com.bezkoder.springjwt.payload.request;

import jakarta.validation.constraints.NotBlank;

public class AddSellerRequest {
    @NotBlank
    public String shopName;

    @NotBlank
    public String uid;
}
