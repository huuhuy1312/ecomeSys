package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.AddItemInCartResquest;
import com.bezkoder.springjwt.payload.response.ItemInCartResponse;
import com.bezkoder.springjwt.repository.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/itemInCart")
public class ItemInCartController {
    @Autowired
    private TypesOfProductRepository typesOfProductRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemInCartRepository itemInCartRepository;
    @Autowired
    private  ImageClassificationRepository imageClassificationRepository;
    @PostMapping("/add")
    public ResponseEntity<?> addItemInCart(@RequestBody @Valid AddItemInCartResquest addItemInCartResquest) {
        Optional<ItemInCart> itemInCartOptional = itemInCartRepository.findItemInCartByCartIdAndTypesOfProductId(addItemInCartResquest.getCartId(), addItemInCartResquest.getTopId());
        if (itemInCartOptional.isPresent()) {
            ItemInCart itemInCart = itemInCartOptional.get();
            itemInCart.setQuantity(itemInCart.getQuantity()+addItemInCartResquest.quantity);
            itemInCartRepository.save(itemInCart);
        } else {
            Optional<TypesOfProduct> typesOfProduct = typesOfProductRepository.findById(addItemInCartResquest.getTopId());
            TypesOfProduct typesOfProduct1 = typesOfProduct.orElseThrow(() -> new RuntimeException("Khong tìm thấy loại sản phẩm có pid =" + addItemInCartResquest.getTopId()));

            Optional<Cart> cartOptional = cartRepository.findById(addItemInCartResquest.getCartId());
            Cart cart = cartOptional.orElseThrow(() -> new RuntimeException("Khong tim thay cart co id =" + addItemInCartResquest.getCartId()));

            ItemInCart itemInCart = new ItemInCart(typesOfProduct1, cart, addItemInCartResquest.quantity);
            itemInCartRepository.save(itemInCart);
        }
        return ResponseEntity.ok("Thêm vào giỏ hàng thành công!!!");
    }
    @GetMapping("/{cid}")
    public ResponseEntity<?> getItemInCartById(@PathVariable long cid)
    {

        List<ItemInCart> itemInCarts = itemInCartRepository.findByCartId(cid);
        List<ItemInCartResponse> itemInCartResponses = new ArrayList<>();
        for (ItemInCart item: itemInCarts){
            Product product = item.getTypesOfProduct().getProduct();
            ItemInCartResponse tmp = new ItemInCartResponse(item.getId(),item.getQuantity(),item.getTypesOfProduct(),product.getTypesOfProducts());
            if(item.getTypesOfProduct().getLabel1() !=null) {
                tmp.setImageClassification(imageClassificationRepository.findImageClassifications1ByProductIdAndClassification1(item.getTypesOfProduct().getProduct().getId(),item.getTypesOfProduct().getLabel1()).getImage());
                tmp.setTitle1(product.getTitle1());
                tmp.setTitle2(product.getTitle2());
            }
            else{
                Image_Product ipTMP = product.getImageProducts().get(0);
                tmp.setImageClassification(ipTMP.getImage());
            }
            tmp.setProductName(product.getName());
            itemInCartResponses.add(tmp);
        }
        return ResponseEntity.ok(itemInCartResponses);
    }
}
