package com.app.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.customException.ResourceNotFoundException;
import com.app.dto.ApiResponse;
import com.app.dto.CartDto;
import com.app.dto.ProductDTO;
import com.app.dto.ProductDescDTO;
import com.app.dto.ReviewDTO;
import com.app.pojo.Cart;
import com.app.pojo.Product;
import com.app.pojo.ProductDescription;
import com.app.pojo.ProductImage;
import com.app.pojo.ProductStatus;
import com.app.pojo.Review;
import com.app.pojo.SubSubCategory;
import com.app.pojo.User;
import com.app.repository.CartRepository;
import com.app.repository.ProductDescriptionRepository;
import com.app.repository.ProductImageRepository;
import com.app.repository.ProductRepository;
import com.app.repository.ReviewRepository;
import com.app.repository.SubSubCategoryRepository;
import com.app.repository.UserRepository;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SubSubCategoryRepository subSubCategoryRepository;

	@Autowired
	private ProductImageRepository productImageRepository;

	@Autowired
	private ProductDescriptionRepository productDescriptionRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	@Autowired
	private ModelMapper mapper;

	// add product
	@Override
	public ApiResponse addNewProduct(ProductDTO productDto) {

		Product product = mapper.map(productDto, Product.class);

		User seller = userRepository.findById(productDto.getSellerId()).orElseThrow(() -> 	new ResourceNotFoundException("Invalid Seller"));
		SubSubCategory cat = subSubCategoryRepository.findById(productDto.getCategoryId()).orElseThrow(() -> 	new ResourceNotFoundException("Invalid Category"));

		product.setSeller(seller);
		product.setCategory(cat);
		product.setStatus(ProductStatus.ADDED);

		Product p = productRepository.save(product);

		return new ApiResponse(p.getId().toString());	
	}

	@Override
	public ProductDTO getProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow();
		List<ProductImage> productImages = productImageRepository.findByProduct(product);
		ProductDTO productDto = mapper.map(product, ProductDTO.class);
		productDto.setCategoryId(product.getCategory().getId());
		productDto.setSellerId(product.getSeller().getId());
		List<Long> list = new ArrayList<>();

		for (ProductImage pi : productImages) {
			list.add(pi.getId());
		}
		productDto.setProductImageIds(list);
		// TODO add sellerid and categoryid in productDto
		return productDto;
	}

	@Override
	public ApiResponse deleteProduct(Long id) {
		Product product = productRepository.findById(id).orElseThrow();
		product.setStatus(ProductStatus.REMOVED);
		return new ApiResponse("Product Removed");
	}

	@Override
	public ApiResponse addImage(Long productId, MultipartFile image) throws IOException {
		ProductImage productImage = new ProductImage();
		Product product = productRepository.findById(productId).orElseThrow();
		productImage.setProduct(product);
		productImage.setImage(image.getBytes());

		productImageRepository.save(productImage);

		return new ApiResponse("Image added successfully");
	}

	@Override
	public byte[] getImages(Long imageId) throws IOException {

		ProductImage productImage = productImageRepository.findById(imageId).orElseThrow();
		return productImage.getImage();
	}

	@Override
    public ApiResponse addProductToCart(CartDto cartDto) {
      
      User user = userRepository.findById(cartDto.getUserId()).orElseThrow();
      Product product = productRepository.findById(cartDto.getProductId()).orElseThrow();
      
      Cart tempCart = cartRepository.findByUserAndProduct(user, product);
      
      if(tempCart == null) {
        Cart cart = new Cart();
        cart.setProduct(product);
        cart.setUser(user);
        cart.setQuantity(cartDto.getQuantity());
        cartRepository.save(cart);
        return new ApiResponse("Product added to cart");
      }
      
      if(cartDto.getQuantity() == 1)
      tempCart.setQuantity(tempCart.getQuantity() + 1);
      else tempCart.setQuantity(tempCart.getQuantity() - 1);
      
      
      System.out.println(tempCart.getQuantity());
      return new ApiResponse("Product quantity changed to cart");
    }

	public ApiResponse reviewProduct(ReviewDTO reviewDto) {
		User customer = userRepository.findById(reviewDto.getCustomerId()).orElseThrow();
		Product product = productRepository.findById(reviewDto.getProductId()).orElseThrow();

		Review review = new Review();

		review.setRating(reviewDto.getRating());
		review.setReview(reviewDto.getReview());

		reviewRepository.save(review);
		return new ApiResponse("Review added successfully!");
	}

	@Override
	public List<ReviewDTO> getReviews(Long productId) {
		Product product = productRepository.findById(productId).orElseThrow();
		List<Review> reviews = reviewRepository.findAllByProduct(product);
		return reviews.stream().map(review -> mapper.map(review, ReviewDTO.class)).collect(Collectors.toList());
	}

	@Override
	public List<SubSubCategory> getCategories() {
		return subSubCategoryRepository.findAll();
	}

	@Override
	public List<ProductDTO> getProductsBySellerId(Long sellerId) {
		User seller = userRepository.findById(sellerId).orElseThrow(() -> new ResourceNotFoundException("Invalid Id"));
		List<Product> products = productRepository.findAllBySeller(seller);

		return products.stream().map(product -> {
			ProductDTO productDto = mapper.map(product, ProductDTO.class);
			List<ProductImage> productImages = productImageRepository.findByProduct(product);
			List<Long> list = new ArrayList<>();

			for (ProductImage pi : productImages) {
				list.add(pi.getId());
			}

			productDto.setProductImageIds(list);
			productDto.setSellerId(sellerId);
			productDto.setCategoryId(product.getCategory().getId());

			return productDto;
		}).collect(Collectors.toList());
	}

	@Override
	public ApiResponse addProductDescription(ProductDescDTO productDescDTO) {
		Product product = productRepository.findById(productDescDTO.getProductId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid productId"));
		ProductDescription pd = mapper.map(productDescDTO, ProductDescription.class);
		pd.setProduct(product);
		productDescriptionRepository.save(pd);
		return new ApiResponse("Product Description Added Successfully!");
	}

	@Override
	public List<ProductDTO> getAllProducts() {
		List<Product> products = productRepository.findAll();
		return products.stream().map(product -> {
			ProductDTO productDto = mapper.map(product, ProductDTO.class);
			List<ProductImage> productImages = productImageRepository.findByProduct(product);
			List<Long> list = new ArrayList<>();

			for (ProductImage pi : productImages) {
				list.add(pi.getId());
			}

			productDto.setProductImageIds(list);
			productDto.setSellerId(product.getSeller().getId());
			productDto.setCategoryId(product.getCategory().getId());

			return productDto;
		}).collect(Collectors.toList());
	}

	@Override
	public ApiResponse removeProductFromCart(Long cartId) {
		cartRepository.deleteById(cartId);
		return new ApiResponse("Product removed from cart successfully");
	}

	@Override
	public ProductDescription getProductDescription(Long productId) {
		Product product = productRepository.findById(productId).orElseThrow(() -> new ResourceNotFoundException("Invalid productId"));
		return productDescriptionRepository.findByProduct(product);
	}

}
