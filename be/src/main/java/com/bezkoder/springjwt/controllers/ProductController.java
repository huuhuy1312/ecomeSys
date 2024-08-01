package com.bezkoder.springjwt.controllers;

import com.bezkoder.springjwt.models.*;
import com.bezkoder.springjwt.payload.request.*;

import com.bezkoder.springjwt.repository.*;

import com.bezkoder.springjwt.services.FileService;
import com.bezkoder.springjwt.services.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/product")
@RequiredArgsConstructor
public class ProductController {
    @Value("${file.upload-dir}")
    private String fileDir;
    private final ProductRepository productRepository;
    private final TypesOfProductRepository typesOfProductRepository;
    private final SellerRepository sellerRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;
    private final ImageProductRepository imageProductRepository;
    private final ImageClassificationRepository imageClassificationRepository;
    private final FileService fileService;
    private final ProductService productService;
    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@ModelAttribute @Valid AddProductRequest addProductRequest) throws IOException {
        // Lưu File Description
        String nameFileDescription = fileService.storeFile(addProductRequest.description);
        // Tạo đối tượng Product
        Seller seller = sellerRepository.findById(addProductRequest.sellerId).orElseThrow(null);
        if (seller == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy seller");
        }
        Category category = categoryRepository.findById(addProductRequest.categoryId).orElseThrow(null);
        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy category có id =" + addProductRequest.categoryId);
        }
        Supplier supplier = supplierRepository.findById(addProductRequest.supplierId).orElseThrow(null);
        if (supplier == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy supplier có id =" + addProductRequest.supplierId);
        }
        Product product = new Product(addProductRequest.name, nameFileDescription, 0L, Long.MAX_VALUE, Long.MIN_VALUE,
                addProductRequest.title1, addProductRequest.title2, seller, new ArrayList<>(), category, supplier, new ArrayList<>(), new ArrayList<>());
        // Lưu các File Ảnh Sản phẩm
        addProductRequest.imageProducts.forEach(file -> {
            try {
                String fileName = fileService.storeFile(file);
                Image_Product imageProduct = new Image_Product(fileName);
                imageProduct.setProduct(product); // Thiết lập mối quan hệ
                product.getImageProducts().add(imageProduct);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        // Xử lý các TOP
        ObjectMapper objectMapper = new ObjectMapper();
        TOPRequestAdd[] topRequestAdds = objectMapper.readValue(addProductRequest.listTypeOfProduct, TOPRequestAdd[].class);

        Set<String> label1 = new LinkedHashSet<>();
        long quantity = 0;
        long priceMax = Long.MIN_VALUE;
        long priceMin = Long.MAX_VALUE;

        for (TOPRequestAdd topRequestAdd : topRequestAdds) {
            TypesOfProduct typesOfProduct = new TypesOfProduct(
                    topRequestAdd.label1,
                    topRequestAdd.label2,
                    topRequestAdd.quantity,
                    topRequestAdd.price,
                    topRequestAdd.cost
            );
            typesOfProduct.setProduct(product); // Thiết lập mối quan hệ
            quantity += typesOfProduct.getQuantity();
            label1.add(topRequestAdd.label1);
            product.getTypesOfProducts().add(typesOfProduct);
            priceMax = Math.max(priceMax, typesOfProduct.getPrice());
            priceMin = Math.min(priceMin, typesOfProduct.getPrice());
        }
        List<String> label1List = new ArrayList<>(label1);

        // Lưu các file ảnh Label1
        for (int i = 0; i < addProductRequest.imageLabel1s.size(); i++) {
            String fileName = fileService.storeFile(addProductRequest.imageLabel1s.get(i));
            ImageClassifications1 imageClassifications1 = new ImageClassifications1(fileName, label1List.get(i));
            imageClassifications1.setProduct(product); // Thiết lập mối quan hệ
            product.getImageClassifications1List().add(imageClassifications1);
        }

        product.setQuantity(quantity);
        product.setPriceMin(priceMin);
        product.setPriceMax(priceMax);

        // Lưu đối tượng Product và các quan hệ OneToMany của nó
        productRepository.save(product);

        return ResponseEntity.ok("Thêm sản phẩm có id=" + product.getId() + " thành công");
    }
    //    @PostMapping(value="/edit",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<?> editProduct(@ModelAttribute @Valid AddProductRequest addProductRequest) throws IOException {
//        Optional<Product> optionalProduct = productRepository.findById(addProductRequest.id);
//        Product product = optionalProduct.orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm"));
//        ResponseEntity<?> uploadFileResponse = uploadFileService.uploadHtmlFileService(addProductRequest.description);
//        if(uploadFileResponse.getStatusCode() !=HttpStatus.OK){
//            return uploadFileResponse;
//        }
//        // Update product properties with new information
//        product.setName(addProductRequest.name);
//        product.setDescription((String) uploadFileResponse.getBody());
//        product.setTitle1(addProductRequest.title1);
//        product.setTitle2(addProductRequest.title2);
//
//        // Find and set the category
//        Optional<Category> optionalCategory = categoryRepository.findById(addProductRequest.categoryId);
//        Category category = optionalCategory.orElseThrow(() -> new RuntimeException("Không tìm thấy category với id=" + addProductRequest.categoryId));
//        product.setCategory(category);
//
//        // Find and set the supplier
//        Optional<Supplier> optionalSupplier = supplierRepository.findById(addProductRequest.supplierId);
//        Supplier supplier = optionalSupplier.orElseThrow(() -> new RuntimeException("Không tìm thấy supplier với id=" + addProductRequest.supplierId));
//        product.setSupplier(supplier);
//        productRepository.save(product);
//        product.getImageProducts().clear();
//        product.getTypesOfProducts().clear();
//        product.getImageClassifications1List().clear();
//        productRepository.save(product);
//        System.out.println(addProductRequest.listTypeOfProduct);
//
//        System.out.println(addProductRequest.listTypeOfProduct);
//        for (String image : addProductRequest.image) {
//            Image_Product imageProduct = new Image_Product(image, product);
//            product.getImageProducts().add(imageProduct);
//        }
//        for (TOPRequest tmp : addProductRequest.listTypeOfProduct) {
//            TypesOfProduct typesOfProduct = new TypesOfProduct(tmp.label1, tmp.label2, tmp.quantity, tmp.price, tmp.cost, product);
//            product.getTypesOfProducts().add(typesOfProduct);
//        }
//        for (ImageClass1Request tmp : addProductRequest.imageClassifications) {
//            ImageClassifications1 imageClassifications1 = new ImageClassifications1(tmp.image, tmp.classification1, product);
//            product.getImageClassifications1List().add(imageClassifications1);
//        }
//        productRepository.save(product);
//
//        return ResponseEntity.ok("Sửa thành công");
//    }
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity<?> editProduct(@ModelAttribute @Valid EditProductRequest editProductRequest) throws IOException {
        //Delete Image Product
        productService.editProduct(editProductRequest);
        //Delete TOP Image
        return ResponseEntity.ok("Product updated successful ly");
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
    private String storeFile(MultipartFile file) throws IOException {
        if(!isImageFileorHTMLFile(file) || file.getOriginalFilename() == null){
            throw new IOException("Invalid format file");
        }
        String baseFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String uniqueFileName = UUID.randomUUID().toString() + "_" + baseFileName;
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir);
        }
        Path destinations = Paths.get(uploadDir.toString(), uniqueFileName);
        Files.copy(file.getInputStream(), destinations, StandardCopyOption.REPLACE_EXISTING);
        return uniqueFileName;
    }
    @PostMapping( "/uploads_image")
    public ResponseEntity<?> uploadFile(@ModelAttribute("files") List<MultipartFile> files) {
        try{
            files = files == null ? new ArrayList<>() : files;
            for (MultipartFile file : files) {
                if (file.getSize() == 0) {
                    continue;
                }
                if (file.getSize() > 10 * 1024 * 1024) {
                    return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                            .body(localizationUtils.getLocalizedMessage("File "+file.getName()+" quá lớn"));
                }
                if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
                    return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                            .body(localizationUtils.getLocalizedMessage("File "+file.getName()+" không đúng định dạng"));
                }
                String newFile = storeFile(file);

            }
            return ResponseEntity.ok("Upload file thành công");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    private boolean isImageFileorHTMLFile(MultipartFile file){
        String contentType = file.getContentType();
        return contentType != null && (contentType.startsWith("image/") || contentType.equals("text/html"));
    }
    @PostMapping(value = "/upload_html_file", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadHtmlFile(@RequestParam("file") MultipartFile file) throws Exception {
        if (file.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
            throw new Exception("Please select a file to upload.");
        }
        // Kiểm tra loại nội dung của file
        if (file.getContentType() == null || !file.getContentType().equals("text/html")) {
            String errorMessage = localizationUtils.getLocalizedMessage(MessageKeys.UPLOAD_FILE_MUST_BE_HTML);
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(errorMessage);
        }
        try {
            // Xử lý file tại đây
           String newFile = storeFile(file);
            return ResponseEntity.ok(newFile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file.");
        }

    }

    @GetMapping("/read-html/{fileName:.+}")
    public ResponseEntity<?> viewHTML(@PathVariable String fileName) {
        try {
            Path destinations = Paths.get(fileDir);
            Path filePath = destinations.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                String contentType;
                try {
                    contentType = Files.probeContentType(filePath);
                } catch (IOException ex) {
                    contentType = "application/octet-stream";
                }
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.parseMediaType(contentType));
                // Return ResponseEntity containing the resource
                return ResponseEntity.ok()
                        .headers(headers)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/read-image/{imageName}")
    public ResponseEntity<String> viewImage(@PathVariable String imageName) {
        try {
            Path destinations = Paths.get(fileDir);
            Path imagePath = destinations.resolve(imageName).normalize();
            byte[] imageBytes;
            if (Files.exists(imagePath)) {
                imageBytes = Files.readAllBytes(imagePath);
            } else {
                Path notFoundImagePath = destinations.resolve("not_found.jpg").normalize();
                imageBytes = Files.readAllBytes(notFoundImagePath);
            }
            String base64Image = Base64.getEncoder().encodeToString(imageBytes);
            String dataUri = "data:image/png;base64," + base64Image;
            return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, "text/plain").body(dataUri);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    private static class localizationUtils {
        public static String getLocalizedMessage(String key) {
            // Trả về thông điệp lỗi theo khóa
            // Cần thay thế bằng logic thực tế để lấy thông điệp lỗi đã được dịch
            if (key.equals(MessageKeys.UPLOAD_FILE_MUST_BE_HTML)) {
                return "Uploaded file must be an HTML file.";
            }
            return "Unknown error.";
        }
    }

    private static class MessageKeys {
        public static final String UPLOAD_FILE_MUST_BE_HTML = "upload.file.must.be.html";
    }

    @PostMapping("/upload_test")
    public ResponseEntity<String> handleFileUpload(@RequestParam("imageClassifications") List<MultipartFile> files) {
        for (Object file : files) {
            System.out.println(file.getClass());
//            if (file instanceof MultipartFile) {
//                MultipartFile multipartFile = (MultipartFile) file;
//                // Ví dụ lưu file vào thư mục uploads
//                String fileName = multipartFile.getOriginalFilename();
//                try {
//                    multipartFile.transferTo(new File("/path/to/uploads/" + fileName));
//                } catch (IOException e) {
//                    e.printStackTrace();
//                    return ResponseEntity.badRequest().body("Lỗi khi lưu file " + fileName);
//                }
//            }
        }

        // Trả về phản hồi thành công
        return ResponseEntity.ok("Upload thành công");
    }


}
