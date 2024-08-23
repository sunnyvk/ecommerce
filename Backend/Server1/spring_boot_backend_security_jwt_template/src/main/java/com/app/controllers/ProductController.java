package com.app.controllers;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.dto.CartDto;
import com.app.dto.ProductDTO;
import com.app.dto.ProductDescDTO;
import com.app.dto.ReviewDTO;
import com.app.service.ProductService;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
	@Autowired
	private ProductService prodService;

	@PostMapping("/addProduct")
	public ApiResponse addNewProduct(@RequestBody @Valid ProductDTO product) {
		return prodService.addNewProduct(product);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getProduct(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.getProduct(id));
	}

	@PutMapping("/editProduct")
	public ResponseEntity<?> editProduct(@RequestBody @Valid ProductDTO productDto) {
		System.out.println(productDto);
		return ResponseEntity.status(HttpStatus.OK).body(prodService.addNewProduct(productDto));
	}

	@GetMapping("/deleteProduct/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.deleteProduct(id));
	}

	@PostMapping(value = "/images/{productId}", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImage(@PathVariable Long productId, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload img " + productId);
		return ResponseEntity.status(HttpStatus.CREATED).body(prodService.addImage(productId, imageFile));
	}

	@GetMapping(value = "/images/{imageId}", produces = { IMAGE_GIF_VALUE, IMAGE_JPEG_VALUE, IMAGE_PNG_VALUE })
	public ResponseEntity<?> downloadImage(@PathVariable Long imageId) throws IOException {

		System.out.println("in download img ");
		return ResponseEntity.ok(prodService.getImages(imageId));
	}

	@PostMapping("/cart")
	public ResponseEntity<?> addToCart(@RequestBody CartDto cartDto) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.addProductToCart(cartDto));
	}

	@PostMapping("/review")
	public ResponseEntity<?> reviewProduct(@RequestBody ReviewDTO reviewDto) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.reviewProduct(reviewDto));
	}
	
	@GetMapping("/allProducts/{id}")
	public ResponseEntity<?> getAllProductsBySellerId(@PathVariable Long id) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.getProductsBySellerId(id));
	}
	
	@PostMapping("/description")
	  public ResponseEntity<?> describeProduct(@RequestBody ProductDescDTO prodDescDto){
	    return ResponseEntity.status(HttpStatus.OK).body(prodService.addProductDescription(prodDescDto));
	  }
	
	@GetMapping("/allProducts")
	  public ResponseEntity<?> getAllProducts(){
	    return ResponseEntity.status(HttpStatus.OK).body(prodService.getAllProducts());
	  }
	
	@DeleteMapping("/cart/{cartId}")
	public ResponseEntity<?> deleteProductFromCart(@PathVariable Long cartId) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.removeProductFromCart(cartId));
	}
	
	@GetMapping("/description/{productId}")
	public ResponseEntity<?> getProductDescription(@PathVariable Long productId) {
		return ResponseEntity.status(HttpStatus.OK).body(prodService.getProductDescription(productId));
	}

}
