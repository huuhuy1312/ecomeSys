package com.bezkoder.springjwt.payload.response;

import lombok.*;
import org.springframework.http.HttpStatus;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResponseObject<T> {
    private HttpStatus status;
    private int statusCode;
    private String message;
    private T data;

}
