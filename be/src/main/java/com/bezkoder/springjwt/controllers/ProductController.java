package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.AddProductRequest;
import com.bezkoder.springjwt.payload.request.ImageClass1Request;
import com.bezkoder.springjwt.payload.request.TOPRequest;
import com.bezkoder.springjwt.repository.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private TypesOfProductRepository typesOfProductRepository;
    @Autowired
    private SellerRepository sellerRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private SupplierRepository supplierRepository;
    @Autowired
    private ImageProductRepository imageProductRepository;
    @Autowired
    private ImageClassificationRepository imageClassificationRepository;
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody @Valid AddProductRequest addProductRequest) {
        Product product = new Product(addProductRequest.name, addProductRequest.description, addProductRequest.title1, addProductRequest.title2);
        long quantityOfProduct = 0;

        Optional<Seller> seller = sellerRepository.findById(addProductRequest.sellerId);
        Seller seller1 = seller.orElseThrow(() -> new RuntimeException("Ko tim duoc seller"));
        product.setSeller(seller1);
        System.out.println(addProductRequest.categoryId);
        Optional<Category> category = categoryRepository.findById(addProductRequest.categoryId);
        Category findCategory = category.orElseThrow(() -> new RuntimeException("Khong tim thay category voi id=" + addProductRequest.categoryId));
        product.setCategory(findCategory);
        Optional<Supplier> supplier = supplierRepository.findById(addProductRequest.supplierId);
        Supplier findSupplier = supplier.orElseThrow(() -> new RuntimeException("Khong tin thay supplier voi id= " + addProductRequest.supplierId));
        product.setSupplier(findSupplier);
        productRepository.save(product);
        for(String image: addProductRequest.image)
        {
            Image_Product tmp = new Image_Product(image,product);
            imageProductRepository.save(tmp);
        }
        System.out.println(addProductRequest.listTypeOfProduct);
        if (addProductRequest.listTypeOfProduct != null) {
            List<TOPRequest> typesOfProducts = addProductRequest.listTypeOfProduct;
            long priceProductMin = Long.MAX_VALUE;
            long priceProductMax = Long.MIN_VALUE;

            for (TOPRequest typesOfProduct : typesOfProducts) {
                quantityOfProduct += typesOfProduct.quantity;
                typesOfProductRepository.save(new TypesOfProduct(typesOfProduct.label1, typesOfProduct.label2, typesOfProduct.quantity, typesOfProduct.price, typesOfProduct.cost, product));
                priceProductMin = Math.min(typesOfProduct.price, priceProductMin);
                priceProductMax = Math.max(typesOfProduct.price, priceProductMax);
            }
            List<ImageClass1Request> imageClassifications1List = addProductRequest.imageClassifications;
            for (ImageClass1Request image: imageClassifications1List)
            {
                imageClassificationRepository.save(new ImageClassifications1(image.getImage(),image.getClassification1(),product));
            }

            product.setPriceMax(priceProductMax);
            product.setPriceMin(priceProductMin);
            product.setQuantity(quantityOfProduct);
        }
        productRepository.save(product);
        return ResponseEntity.ok("Thêm sản phẩm thành công");
    }
    @PutMapping("/edit")
    public ResponseEntity<?> editProduct(@RequestBody @Valid AddProductRequest addProductRequest) {
        Optional<Product> optionalProduct = productRepository.findById(addProductRequest.id);
        Product product = optionalProduct.orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));

        // Update product properties with new information
        product.setName(addProductRequest.name);
        product.setDescription(addProductRequest.description);
        product.setTitle1(addProductRequest.title1);
        product.setTitle2(addProductRequest.title2);

        // Find and set the category
        Optional<Category> optionalCategory = categoryRepository.findById(addProductRequest.categoryId);
        Category category = optionalCategory.orElseThrow(() -> new RuntimeException("Không tìm thấy category với id=" + addProductRequest.categoryId));
        product.setCategory(category);

        // Find and set the supplier
        Optional<Supplier> optionalSupplier = supplierRepository.findById(addProductRequest.supplierId);
        Supplier supplier = optionalSupplier.orElseThrow(() -> new RuntimeException("Không tìm thấy supplier với id=" + addProductRequest.supplierId));
        product.setSupplier(supplier);
        productRepository.save(product);
        product.getImageProducts().clear();
        product.getTypesOfProducts().clear();
        product.getImageClassifications1List().clear();
        productRepository.save(product);
        System.out.println(addProductRequest.listTypeOfProduct);

        System.out.println(addProductRequest.listTypeOfProduct);
        for (String image : addProductRequest.image) {
            Image_Product imageProduct = new Image_Product(image, product);
            product.getImageProducts().add(imageProduct);
        }
        for (TOPRequest tmp : addProductRequest.listTypeOfProduct) {
            TypesOfProduct typesOfProduct = new TypesOfProduct(tmp.label1, tmp.label2, tmp.quantity, tmp.price, tmp.cost, product);
            product.getTypesOfProducts().add(typesOfProduct);
        }
        for (ImageClass1Request tmp : addProductRequest.imageClassifications) {
            ImageClassifications1 imageClassifications1 = new ImageClassifications1(tmp.image, tmp.classification1, product);
            product.getImageClassifications1List().add(imageClassifications1);
        }
        productRepository.save(product);

        return ResponseEntity.ok("Sửa thành công");
    }

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            List<Product> productOptional = productRepository.findAll();
            return new ResponseEntity<>(productOptional, HttpStatus.OK);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(null); // hoặc một giá trị thích hợp khác tùy vào yêu cầu của bạn
        }
    }
    @GetMapping("/{pid}")
    public ResponseEntity<?> getProductByID(@PathVariable long pid)
    {
        Optional<Product> product = productRepository.findById(pid);
        Product product1 = product.orElseThrow(()->new RuntimeException("Không tìm thấy sản phẩm với Id: "+pid));
        System.out.println(product1.getTypesOfProducts());
        return ResponseEntity.ok(product);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchProductByName(@RequestParam String keyword) {
        System.out.println(keyword);
        try {
            List<Product> productList = productRepository.filterByName(keyword);
            return ResponseEntity.ok(productList);
        } catch (RuntimeException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @DeleteMapping("{pid}")
    public void deleteProductByID(@PathVariable long pid)
    {
        productRepository.deleteById(pid);
    }

}
