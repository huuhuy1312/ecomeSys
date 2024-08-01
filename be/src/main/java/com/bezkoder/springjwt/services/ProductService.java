package com.bezkoder.springjwt.services;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.EditProductRequest;
import com.bezkoder.springjwt.payload.request.TOPRequestAdd;
import com.bezkoder.springjwt.payload.request.TOPRequestEdit;
import com.bezkoder.springjwt.repository.ProductRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ImageClassifications1Service imageClassifications1Service;
    private final ImageProductService imageProductService;
    private final SellerService sellerService;
    private final CategoryService categoryService;
    private final SupplierService supplierService;
    private final TypeOfProductService typeOfProductService;
    private final FileService fileService;

    @Transactional
    public void editProduct(EditProductRequest editProductRequest) throws IOException {
        //Delete TOP Image
        imageClassifications1Service.deleteByIds(editProductRequest.listImageLabel1Del);
        //Delete Image Product
        imageProductService.deleteByIds(editProductRequest.listImageProductDel);
        System.out.println(editProductRequest.changeTitleNum);
        //Delete TOP label1s;
        typeOfProductService.deleteByLabel1sAndProductId(editProductRequest.label1sDelete,editProductRequest.id);
        //Delete TOP label2s:
        typeOfProductService.deleteByLabel2sAndProductId(editProductRequest.label2sDelete,editProductRequest.id);
        //Save description file
        String description = fileService.storeFile(editProductRequest.description);
        //Product
        Product product = productRepository.findById(editProductRequest.id).orElse(null);
        product.setName(editProductRequest.name);
        product.setTitle1(editProductRequest.title1);
        product.setTitle2(editProductRequest.title2);
        product.setDescription(description);
        product.setSeller(sellerService.findById(editProductRequest.sellerId));
        product.setCategory(categoryService.findById(editProductRequest.categoryId));
        product.setSupplier(supplierService.findById(editProductRequest.supplierId));

        productRepository.save(product);
        //Save TOP
        ObjectMapper objectMapper = new ObjectMapper();
        TOPRequestEdit[] topRequestEdits = objectMapper.readValue(editProductRequest.listTypeOfProduct, TOPRequestEdit[].class);
        for (TOPRequestEdit requestEdit : topRequestEdits) {
            System.out.println(requestEdit.toString());
        }
        Set<String> label1Set = new LinkedHashSet<>();
        List<TypesOfProduct> typesOfProductList = new ArrayList<>();
        for (TOPRequestEdit topRequestEdit: topRequestEdits){
            TypesOfProduct typesOfProduct = new TypesOfProduct(topRequestEdit.label1,topRequestEdit.label2,topRequestEdit.quantity,topRequestEdit.price,topRequestEdit.cost,product);
            if(topRequestEdit.id!=null)
            {
                typesOfProduct.setId(topRequestEdit.id);
            }
            typesOfProductList.add(typesOfProduct);
            label1Set.add(topRequestEdit.label1);
        }
        typeOfProductService.saveAll(typesOfProductList);
        List<String> label1List = new ArrayList<>(label1Set);
        System.out.println(label1List);
        //Save Image Label1s
        if(editProductRequest.imageLabel1s!=null) {
            List<ImageClassifications1> imageClassifications1List = new ArrayList<>();
            for (int i = 0; i < editProductRequest.imageLabel1s.size(); i++) {
                String fileName = fileService.storeFile(editProductRequest.imageLabel1s.get(i));
                ImageClassifications1 imageClassifications1 = ImageClassifications1.builder().image(fileName).product(product).classification1(label1List.get(i)).build();

                imageClassifications1List.add(imageClassifications1);
            }
            imageClassifications1Service.saveAll(imageClassifications1List);
        }

        //Save Image Products
        if(editProductRequest.imageProducts!=null) {
            List<Image_Product> imageProductList = new ArrayList<>();
            for (int i = 0; i < editProductRequest.imageProducts.size(); i++) {
                String fileName = fileService.storeFile(editProductRequest.imageProducts.get(i));
                Image_Product imageProduct = Image_Product.builder().image(fileName).product(product).build();
                imageProductList.add(imageProduct);
            }
            imageProductService.addAll(imageProductList);
        }
    }
}



