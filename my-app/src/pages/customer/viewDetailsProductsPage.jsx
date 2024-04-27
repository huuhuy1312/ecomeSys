import React, { useState, useEffect } from 'react';
import "../../css/homepage/bootstrap.min.css";
import "../../css/homepage/plugin.css";
import "../../css/homepage/bundle.css";
import "../../css/homepage/style.css";
import "../../css/homepage/responsive.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faAngleRight, faHeart, faSearch, faRss, faAngleDown, faShoppingCart, faTimesCircle, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import cartService from "../../services/cart.service"
import { useLocation, useNavigate } from 'react-router-dom';
import productService from '../../services/product.service';
import itemService from '../../services/item.service';
import ratesService from '../../services/rates.service';
function ViewDetailsProductPage() {

    //Header Start
    const [tab, setTab] = useState("moreInfo");
    const [rateStar, setRateStar] = useState(0);
    const [inputValue, setInputValue] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const [cartData, setCartData] = useState(null);
    const [totalPriceInCart, setTotalPriceInCart] = useState(0);
    const [product, setProduct] = useState(null);
    const getCartData = () => {
        cartService.getByID(1)
            .then(data => {
                setCartData(data["items"]);
                setTotalPriceInCart(data.items.reduce((sum, item) => sum + item.totalPrice, 0))
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    const getProductByID = (productId) => {
        productService.getProductById(productId)
            .then(data => {
                console.log(data)
                setProduct(data)
            })
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const keyword = searchParams.get('productId');
        //Get Cart
        getCartData();
        getProductByID(keyword)

    }, []);
    const [showMiniCart, setShowMiniCart] = useState(false);
    const toogleMiniCart = () => {
        setShowMiniCart(!showMiniCart);
    }
    const [searchName, setSearchName] = useState(null);
    const updateSearchName = (e) => {
        setSearchName(e.target.value);
    }
    const handleClickSearchName = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${searchName}`)
        console.log(searchName);
    }
    //Header End

    //Ratings Start
    const MyComponent = ({ transparency }) => {
        const starStyle = {
            maskImage: `linear-gradient(270deg, transparent ${(1 - transparency) * 100}%, gray ${(1 - transparency) * 100}%)`,
        };

        return (
            <a>
                <FontAwesomeIcon icon={faStar} style={starStyle} />
            </a>
        );
    };
    const RatingStars = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const decimalPart = rating - fullStars;
        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <li key={i}>
                    <a href="#">
                        <FontAwesomeIcon icon={faStar} />
                    </a>
                </li>
            );
        }
        if (decimalPart > 0) {
            const transparency = decimalPart;
            stars.push(<li><a href="#"><MyComponent transparency={transparency}></MyComponent></a></li>);
        }

        return <ul>{stars}</ul>;
    };
    //Ratings End

    function formatPriceToVND(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }

    const addToCart = (idProduct) => {
        itemService.addItem(idProduct, inputValue, 1)
            .then(response => {
                console.log(response);
                getCartData();
            })
            .catch(error => {
                console.error(error);
            })
    }
    const [nameRate, setNameRate] = useState(null);
    const changeNameRate = (e) => {
        setNameRate(e.target.value)
    }
    const [reviewRate, setReviewRate] = useState(null);
    const changeReviewRate = (e) => {
        setReviewRate(e.target.value)
    }
    const addRate = (productId, rateStar, rateReview, customerId) => {

        ratesService.addRate(productId, rateStar, rateReview, customerId)
            .then(
                response => {
                    console.log(response);
                    window.location.reload();
                }
            )
    }
    return (
        <div className='pos_page'>
            <div className='container'>
                <div className='pos_page_inner'>
                    <div className='header_area'>
                        <div className='header_top'>
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-6">
                                    <div className="switcher">
                                        <ul>
                                            <li className="languages"><a href="#"><img src={"img/logo/fontlogo.jpg"} alt="" /> English <FontAwesomeIcon icon={faAngleDown} /></a>
                                                <ul className="dropdown_languages">
                                                    <li><a href="#"><img src={"img/logo/fontlogo.jpg"} alt="" /> English</a></li>
                                                    <li><a href="#"><img src={"img/logo/fontlogo2.jpg"} alt="" /> French </a></li>
                                                </ul>
                                            </li>

                                            <li className="currency"><a href="#"> Currency : $ <FontAwesomeIcon icon={faAngleDown} /></a>
                                                <ul className="dropdown_currency">
                                                    <li><a href="#"> Dollar (USD)</a></li>
                                                    <li><a href="#"> Euro (EUR)  </a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="header_links">
                                        <ul>
                                            <li><a href="contact.html" title="Contact">Contact</a></li>
                                            <li><a href="wishlist.html" title="wishlist">My wishlist</a></li>
                                            <li><a href="my-account.html" title="My account">My account</a></li>
                                            <li><a href="cart.html" title="My cart">My cart</a></li>
                                            <li><a href="login.html" title="Login">Login</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header_middel">
                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-3">
                                    <div className="logo">
                                        <a href="index.html"><img src={"/img/logo.logo.jpg.png"} alt="" /></a>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-9">
                                    <div className="header_right_info">
                                        <div className="search_bar">
                                            <form>
                                                <input placeholder="Search..." type="text" onChange={(e) => updateSearchName(e)} />
                                                <button type="submit" onClick={(e) => handleClickSearchName(e)}><FontAwesomeIcon icon={faSearch} /></button>
                                            </form>
                                        </div>

                                        <div className="shopping_cart">
                                            <a href="#" onClick={toogleMiniCart}><FontAwesomeIcon icon={faShoppingCart} /> 2Items - $209.44 <FontAwesomeIcon icon={faAngleDown} /></a>
                                            <div style={{ display: showMiniCart ? 'block' : 'none' }} className="mini_cart">
                                                {cartData ? (
                                                    <>
                                                        {cartData.map(item => (
                                                            <div className="cart_item" key={item.id}>
                                                                <div className="cart_img">
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + item.product.linkImage} alt="" /></a>
                                                                </div>
                                                                <div className="cart_info">
                                                                    <a href="#">{item.product.name}</a>
                                                                    <span className="cart_price">{item.totalPrice} VNĐ</span>
                                                                    <span className="quantity">Quantity: {item.quantity}</span>
                                                                </div>
                                                                <div className="cart_remove">
                                                                    <a title="Remove this item" href="#"><FontAwesomeIcon icon={faTimesCircle} /></a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div className="shipping_price">
                                                            <span> Shipping </span>
                                                            <span>  $7.00  </span>
                                                        </div>
                                                        <div className="total_price">
                                                            <span> total </span>
                                                            <span className="prices">  $227.00  </span>
                                                        </div>
                                                        <div className="cart_button">
                                                            <a href="checkout.html"> Check out</a>
                                                        </div>
                                                    </>) : (<p>Loading cart data...</p>)}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header_bottom">
                            <div className="row">
                                <div className="col-12">
                                    <div className="main_menu_inner">
                                        <div className="main_menu d-none d-lg-block">
                                            <nav>
                                                <ul>
                                                    <li className="active"><a href="index.html">Home</a>
                                                        <div className="mega_menu jewelry">
                                                            <div className="mega_items jewelry">
                                                                <ul>
                                                                    <li><a href="index.html">Home 1</a></li>
                                                                    <li><a href="index-2.html">Home 2</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="shop.html">shop</a>
                                                        <div className="mega_menu jewelry">
                                                            <div className="mega_items jewelry">
                                                                <ul>
                                                                    <li><a href="shop-list.html">shop list</a></li>
                                                                    <li><a href="shop-fullwidth.html">shop Full Width Grid</a></li>
                                                                    <li><a href="shop-fullwidth-list.html">shop Full Width list</a></li>
                                                                    <li><a href="shop-sidebar.html">shop Right Sidebar</a></li>
                                                                    <li><a href="shop-sidebar-list.html">shop list Right Sidebar</a></li>
                                                                    <li><a href="single-product.html">Product Details</a></li>
                                                                    <li><a href="single-product-sidebar.html">Product sidebar</a></li>
                                                                    <li><a href="single-product-video.html">Product Details video</a></li>
                                                                    <li><a href="single-product-gallery.html">Product Details Gallery</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="#">women</a>
                                                        <div className="mega_menu">
                                                            <div className="mega_top fix">
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Accessories</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Cocktai</a></li>
                                                                        <li><a href="#">day</a></li>
                                                                        <li><a href="#">Evening</a></li>
                                                                        <li><a href="#">Sundresses</a></li>
                                                                        <li><a href="#">Belts</a></li>
                                                                        <li><a href="#">Sweets</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mega_items">
                                                                    <h3><a href="#">HandBags</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Accessories</a></li>
                                                                        <li><a href="#">Hats and Gloves</a></li>
                                                                        <li><a href="#">Lifestyle</a></li>
                                                                        <li><a href="#">Bras</a></li>
                                                                        <li><a href="#">Scarves</a></li>
                                                                        <li><a href="#">Small Leathers</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Tops</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Evening</a></li>
                                                                        <li><a href="#">Long Sleeved</a></li>
                                                                        <li><a href="#">Shrot Sleeved</a></li>
                                                                        <li><a href="#">Tanks and Camis</a></li>
                                                                        <li><a href="#">Sleeveless</a></li>
                                                                        <li><a href="#">Sleeveless</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div className="mega_bottom fix">
                                                                <div className="mega_thumb">
                                                                    <a href="#"><img src={"img/banner/banner1.jpg"} alt="" /></a>
                                                                </div>
                                                                <div className="mega_thumb">
                                                                    <a href="#"><img src={"img/banner/banner2.jpg"} alt="" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="#">men</a>
                                                        <div className="mega_menu">
                                                            <div className="mega_top fix">
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Rings</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Platinum Rings</a></li>
                                                                        <li><a href="#">Gold Ring</a></li>
                                                                        <li><a href="#">Silver Ring</a></li>
                                                                        <li><a href="#">Tungsten Ring</a></li>
                                                                        <li><a href="#">Sweets</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Bands</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Platinum Bands</a></li>
                                                                        <li><a href="#">Gold Bands</a></li>
                                                                        <li><a href="#">Silver Bands</a></li>
                                                                        <li><a href="#">Silver Bands</a></li>
                                                                        <li><a href="#">Sweets</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mega_items">
                                                                    <a href="#"><img src={"img/banner/banner3.jpg"} alt="" /></a>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </li>
                                                    <li><a href="#">pages</a>
                                                        <div className="mega_menu">
                                                            <div className="mega_top fix">
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Column1</a></h3>
                                                                    <ul>
                                                                        <li><a href="portfolio.html">Portfolio</a></li>
                                                                        <li><a href="portfolio-details.html">single portfolio </a></li>
                                                                        <li><a href="about.html">About Us </a></li>
                                                                        <li><a href="about-2.html">About Us 2</a></li>
                                                                        <li><a href="services.html">Service </a></li>
                                                                        <li><a href="my-account.html">my account </a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Column2</a></h3>
                                                                    <ul>
                                                                        <li><a href="blog.html">Blog </a></li>
                                                                        <li><a href="blog-details.html">Blog  Details </a></li>
                                                                        <li><a href="blog-fullwidth.html">Blog FullWidth</a></li>
                                                                        <li><a href="blog-sidebar.html">Blog  Sidebar</a></li>
                                                                        <li><a href="faq.html">Frequently Questions</a></li>
                                                                        <li><a href="404.html">404</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mega_items">
                                                                    <h3><a href="#">Column3</a></h3>
                                                                    <ul>
                                                                        <li><a href="contact.html">Contact</a></li>
                                                                        <li><a href="cart.html">cart</a></li>
                                                                        <li><a href="checkout.html">Checkout  </a></li>
                                                                        <li><a href="wishlist.html">Wishlist</a></li>
                                                                        <li><a href="login.html">Login</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li><a href="blog.html">blog</a>
                                                        <div className="mega_menu jewelry">
                                                            <div className="mega_items jewelry">
                                                                <ul>
                                                                    <li><a href="blog-details.html">blog details</a></li>
                                                                    <li><a href="blog-fullwidth.html">blog fullwidth</a></li>
                                                                    <li><a href="blog-sidebar.html">blog sidebar</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="contact.html">contact us</a></li>

                                                </ul>
                                            </nav>
                                        </div>
                                        <div className="mobile-menu d-lg-none">
                                            <nav>
                                                <ul>
                                                    <li><a href="index.html">Home</a>
                                                        <div>
                                                            <div>
                                                                <ul>
                                                                    <li><a href="index.html">Home 1</a></li>
                                                                    <li><a href="index-2.html">Home 2</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="shop.html">shop</a>
                                                        <div>
                                                            <div>
                                                                <ul>
                                                                    <li><a href="shop-list.html">shop list</a></li>
                                                                    <li><a href="shop-fullwidth.html">shop Full Width Grid</a></li>
                                                                    <li><a href="shop-fullwidth-list.html">shop Full Width list</a></li>
                                                                    <li><a href="shop-sidebar.html">shop Right Sidebar</a></li>
                                                                    <li><a href="shop-sidebar-list.html">shop list Right Sidebar</a></li>
                                                                    <li><a href="single-product.html">Product Details</a></li>
                                                                    <li><a href="single-product-sidebar.html">Product sidebar</a></li>
                                                                    <li><a href="single-product-video.html">Product Details video</a></li>
                                                                    <li><a href="single-product-gallery.html">Product Details Gallery</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="#">women</a>
                                                        <div>
                                                            <div>
                                                                <div>
                                                                    <h3><a href="#">Accessories</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Cocktai</a></li>
                                                                        <li><a href="#">day</a></li>
                                                                        <li><a href="#">Evening</a></li>
                                                                        <li><a href="#">Sundresses</a></li>
                                                                        <li><a href="#">Belts</a></li>
                                                                        <li><a href="#">Sweets</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h3><a href="#">HandBags</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Accessories</a></li>
                                                                        <li><a href="#">Hats and Gloves</a></li>
                                                                        <li><a href="#">Lifestyle</a></li>
                                                                        <li><a href="#">Bras</a></li>
                                                                        <li><a href="#">Scarves</a></li>
                                                                        <li><a href="#">Small Leathers</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h3><a href="#">Tops</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Evening</a></li>
                                                                        <li><a href="#">Long Sleeved</a></li>
                                                                        <li><a href="#">Shrot Sleeved</a></li>
                                                                        <li><a href="#">Tanks and Camis</a></li>
                                                                        <li><a href="#">Sleeveless</a></li>
                                                                        <li><a href="#">Sleeveless</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <a href="#"><img src={"img/banner/banner1.jpg"} alt="" /></a>
                                                                </div>
                                                                <div>
                                                                    <a href="#"><img src={"img/banner/banner2.jpg"} alt="" /></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="#">men</a>
                                                        <div>
                                                            <div>
                                                                <div>
                                                                    <h3><a href="#">Rings</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Platinum Rings</a></li>
                                                                        <li><a href="#">Gold Ring</a></li>
                                                                        <li><a href="#">Silver Ring</a></li>
                                                                        <li><a href="#">Tungsten Ring</a></li>
                                                                        <li><a href="#">Sweets</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h3><a href="#">Bands</a></h3>
                                                                    <ul>
                                                                        <li><a href="#">Platinum Bands</a></li>
                                                                        <li><a href="#">Gold Bands</a></li>
                                                                        <li><a href="#">Silver Bands</a></li>
                                                                        <li><a href="#">Silver Bands</a></li>
                                                                        <li><a href="#">Sweets</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <a href="#"><img src={"img/banner/banner3.jpg"} alt="" /></a>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </li>
                                                    <li><a href="#">pages</a>
                                                        <div>
                                                            <div>
                                                                <div>
                                                                    <h3><a href="#">Column1</a></h3>
                                                                    <ul>
                                                                        <li><a href="portfolio.html">Portfolio</a></li>
                                                                        <li><a href="portfolio-details.html">single portfolio </a></li>
                                                                        <li><a href="about.html">About Us </a></li>
                                                                        <li><a href="about-2.html">About Us 2</a></li>
                                                                        <li><a href="services.html">Service </a></li>
                                                                        <li><a href="my-account.html">my account </a></li>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h3><a href="#">Column2</a></h3>
                                                                    <ul>
                                                                        <li><a href="blog.html">Blog </a></li>
                                                                        <li><a href="blog-details.html">Blog  Details </a></li>
                                                                        <li><a href="blog-fullwidth.html">Blog FullWidth</a></li>
                                                                        <li><a href="blog-sidebar.html">Blog  Sidebar</a></li>
                                                                        <li><a href="faq.html">Frequently Questions</a></li>
                                                                        <li><a href="404.html">404</a></li>
                                                                    </ul>
                                                                </div>
                                                                <div>
                                                                    <h3><a href="#">Column3</a></h3>
                                                                    <ul>
                                                                        <li><a href="contact.html">Contact</a></li>
                                                                        <li><a href="cart.html">cart</a></li>
                                                                        <li><a href="checkout.html">Checkout  </a></li>
                                                                        <li><a href="wishlist.html">Wishlist</a></li>
                                                                        <li><a href="login.html">Login</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>

                                                    <li><a href="blog.html">blog</a>
                                                        <div>
                                                            <div>
                                                                <ul>
                                                                    <li><a href="blog-details.html">blog details</a></li>
                                                                    <li><a href="blog-fullwidth.html">blog fullwidth</a></li>
                                                                    <li><a href="blog-sidebar.html">blog sidebar</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li><a href="contact.html">contact us</a></li>

                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="breadcrumbs_area">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb_content">
                                    <ul>
                                        <li><a href="index.html">home</a></li>
                                        <li><FontAwesomeIcon icon={faAngleRight} /></li>
                                        <li>View Details</li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='product_details'>
                        <div className='row'>
                            <div className="col-lg-5 col-md-6">
                                <div className="product_tab fix">

                                    <div className="tab-content produc_tab_c" style={{ width: "100%" }}>
                                        <div className="tab-pane fade show active" id="p_tab1" role="tabpanel">
                                            <div className="modal_img">
                                                <a href="#"><img src={`${product?.image}`} alt="" style={{ width: "100%" }} /></a>
                                                <div className="img_icone">
                                                    <img src={"img/cart/span-new.png"} alt="" />
                                                </div>
                                                <div className="view_img">
                                                    <a className="large_view" href={product?.linkImage}><FontAwesomeIcon icon={faSearchPlus} /></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="p_tab2" role="tabpanel">
                                            <div className="modal_img">
                                                <a href="#"><img src={"img/product/product14.jpg"} alt="" /></a>
                                                <div className="img_icone">
                                                    <img src={"img/cart/span-new.png"} alt="" />
                                                </div>
                                                <div className="view_img">
                                                    <a className="large_view" href="assets\img\product\product14.jpg"><FontAwesomeIcon icon={faSearchPlus} /></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade" id="p_tab3" role="tabpanel">
                                            <div className="modal_img">
                                                <a href="#"><img src={"img/product/product15.jpg"} alt="" /></a>
                                                <div className="img_icone">
                                                    <img src={"img/cart/span-new.png"} alt="" />
                                                </div>
                                                <div className="view_img">
                                                    <a className="large_view" href="assets\img\product\product15.jpg"> <i className="fa fa-search-plus"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product_tab_button">
                                        <ul className="nav" role="tablist">
                                            {product?.typesOfProducts.length > 1 ?
                                                (
                                                    <>
                                                        {product?.typesOfProducts.map((item) => {
                                                            return (
                                                                <li>
                                                                    <a className="active" data-toggle="tab" href="#p_tab1" role="tab" aria-controls="p_tab1" aria-selected="false"><img src={`${item.image}`} alt="" /></a>
                                                                </li>
                                                            )
                                                        })
                                                        }
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-6">
                                <div className="product_d_right">
                                    <h1>{product?.name}</h1>
                                    <div className="product_ratting mb-10">
                                        <ul>
                                            <RatingStars rating={4.3} />
                                        </ul>
                                    </div>
                                    <div className="product_desc">
                                        <p>{product?.description}</p>
                                    </div>

                                    <div className="content_price mb-15">
                                        <span>
                                            {product?.priceMin === product?.priceMax ? (
                                                formatPriceToVND(product?.priceMax)
                                            ) : (
                                                `${formatPriceToVND(product?.priceMin)} - ${formatPriceToVND(product?.priceMax)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="box_quantity mb-20">
                                        <form >
                                            <label>quantity</label>
                                            <input min="1" max="100" value={inputValue} type="number" step={1} onChange={(e) => setInputValue(e.target.value)} />
                                        </form>
                                        <button onClick={() => addToCart(product?.id)}><FontAwesomeIcon icon={faHeart} /> Add to cart</button>
                                        <a href="#" title="add to wishlist"><FontAwesomeIcon icon={faHeart} /></a>
                                    </div>
                                    {/* <div className="product_d_size mb-20">
                                        <label for="group_1">size</label>
                                        <select name="size" id="group_1">
                                            <option value="1">S</option>
                                            <option value="2">M</option>
                                            <option value="3">L</option>
                                        </select>
                                    </div>

                                    <div className="sidebar_widget color">
                                        <h2>Choose Color</h2>
                                        <div className="widget_color">
                                            <ul>
                                                <li><a href="#"></a></li>
                                                <li><a href="#"></a></li>
                                                <li> <a href="#"></a></li>
                                                <li><a href="#"></a></li>
                                            </ul>
                                        </div>
                                    </div> */}

                                    <div className="product_stock mb-20">
                                        <p>{product?.quantity}</p>
                                        <span> In stock </span>
                                    </div>
                                    <div className="wishlist-share">
                                        <h4>Share on:</h4>
                                        <ul>
                                            <li><a href="#"><FontAwesomeIcon icon={faRss} /></a></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="product_d_info">
                        <div className="row">
                            <div className="col-12">
                                <div className="product_d_inner">
                                    <div className="product_info_button">
                                        <ul className="nav" role="tablist">
                                            <li>
                                                <a
                                                    className={tab === "moreInfo" ? "active" : ""}
                                                    data-toggle="tab"
                                                    role="tab"
                                                    aria-controls="info"
                                                    aria-selected={tab === "moreInfo" ? "true" : "false"}
                                                    onClick={() => setTab("moreInfo")}
                                                >
                                                    More info
                                                </a>

                                            </li>
                                            <li>
                                                <a
                                                    className={tab === "dataSheet" ? "active" : ""}
                                                    data-toggle="tab"
                                                    role="tab"
                                                    aria-controls="info"
                                                    aria-selected={tab === "dataSheet" ? "true" : "false"}
                                                    onClick={() => setTab("dataSheet")}
                                                >
                                                    Data Sheet
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className={tab === "reviews" ? "active" : ""}
                                                    data-toggle="tab"
                                                    role="tab"
                                                    aria-controls="info"
                                                    aria-selected={tab === "reviews" ? "true" : "false"}
                                                    onClick={() => setTab("reviews")}
                                                >
                                                    Reviews
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="tab-content">
                                        <div
                                            className={`tab-pane fade ${tab === "moreInfo" ? "show active" : ""}`}
                                            id="info"
                                            role="tabpanel"
                                        >
                                            <div className="product_info_content">
                                                <p>Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!</p>
                                            </div>
                                        </div>

                                        <div
                                            className={`tab-pane fade ${tab === "dataSheet" ? "show active" : ""}`}
                                            id="info"
                                            role="tabpanel"
                                        >
                                            <div className="product_d_table">
                                                <form action="#">
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td className="first_child">Compositions</td>
                                                                <td>Polyester</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="first_child">Styles</td>
                                                                <td>Girly</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="first_child">Properties</td>
                                                                <td>Short Dress</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </form>
                                            </div>
                                            <div className="product_info_content">
                                                <p>Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!</p>
                                            </div>
                                        </div>
                                        <div
                                            className={`tab-pane fade ${tab === "reviews" ? "show active" : ""}`}
                                            id="info"
                                            role="tabpanel"
                                        >
                                            <div className="product_info_content">
                                                <p>Fashion has been creating well-designed collections since 2010. The brand offers feminine designs delivering stylish separates and statement dresses which have since evolved into a full ready-to-wear collection in which every item is a vital part of a woman's wardrobe. The result? Cool, easy, chic looks with youthful elegance and unmistakable signature style. All the beautiful pieces are made in Italy and manufactured with the greatest attention. Now Fashion extends to a range of accessories including shoes, hats, belts and more!</p>
                                            </div>
                                            <div className="product_info_inner">
                                                <div className="product_ratting mb-10">
                                                    <ul>
                                                        <li className={rateStar == 1 ? "active" : ""}><a onClick={() => setRateStar(1)}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></a></li>
                                                        <li className={rateStar == 2 ? "active" : ""}><a onClick={() => setRateStar(2)}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></a></li>
                                                        <li className={rateStar == 3 ? "active" : ""}><a onClick={() => setRateStar(3)}> <FontAwesomeIcon icon={faStar}></FontAwesomeIcon></a></li>
                                                        <li className={rateStar == 4 ? "active" : ""}><a onClick={() => setRateStar(4)}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></a></li>
                                                        <li className={rateStar == 5 ? "active" : ""}><a onClick={() => setRateStar(5)}><FontAwesomeIcon icon={faStar}></FontAwesomeIcon></a></li>
                                                    </ul>
                                                    <strong>Posthemes</strong>
                                                    <p>09/07/2018</p>
                                                </div>
                                                <div className="product_demo">
                                                    <strong>demo</strong>
                                                    <p>That's OK!</p>
                                                </div>
                                            </div>
                                            <div className="product_review_form">
                                                <div >
                                                    <h2>Add a review </h2>
                                                    <p>Your email address will not be published. Required fields are marked </p>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label for="review_comment">Your review </label>
                                                            <textarea value={reviewRate} onChange={(e) => changeReviewRate(e)} id="review_comment"></textarea>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <label for="author">Name</label>
                                                            <input value={nameRate} onChange={(e) => changeNameRate(e)} id="author" type="text" />

                                                        </div>

                                                    </div>
                                                    <button onClick={() => addRate(product?.id, rateStar, reviewRate, 1)}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default ViewDetailsProductPage;