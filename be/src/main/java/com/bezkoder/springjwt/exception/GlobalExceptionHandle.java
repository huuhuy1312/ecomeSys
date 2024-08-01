//package com.bezkoder.springjwt.exception;
//
//import com.bezkoder.springjwt.payload.response.ResponseObject;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//@RestControllerAdvice
//public class GlobalExceptionHandle {
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> handleFileException(Exception e){
//        return ResponseEntity.badRequest().body(
//                ResponseObject.builder()
//                        .status()
//        )
//
//    }
//}
