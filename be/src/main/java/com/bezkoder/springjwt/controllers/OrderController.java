package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.AddOrderRequest;
import com.bezkoder.springjwt.repository.CustomerRepository;

import com.bezkoder.springjwt.repository.OrderRepository;
import com.bezkoder.springjwt.repository.ShipmentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    public OrderRepository orderRepository;

    @Autowired
    public CustomerRepository customerRepository;

    @Autowired
    public ShipmentRepository shipmentRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addOrder(@RequestBody @Valid AddOrderRequest addOrderRequest)
    {
        long totalPrice =0;
        List<String> list_item_id = addOrderRequest.items;

        Optional<Customer> customer = customerRepository.findById(addOrderRequest.cus_id);
        Customer findCustomer = customer.orElseThrow(()->new RuntimeException("Khong tim thay Customer co id ="+addOrderRequest.cus_id));

        Optional<Shipment> shipment = shipmentRepository.findById(addOrderRequest.ship_id);
        Shipment findshipment = shipment.orElseThrow(()->new RuntimeException("Khong tim thay shipmet co id ="+addOrderRequest.ship_id));
        Order order = new Order(StatusOrder.AWAIT_PICKUP.name(),null,findCustomer,findshipment);
        orderRepository.save(order);

        order.setTotalPrice(totalPrice);
        return ResponseEntity.ok(order);
    }


}
