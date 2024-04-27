import React, { useState, useEffect } from 'react';
import "../../css/homepage/bootstrap.min.css";
import "../../css/homepage/plugin.css";
import "../../css/homepage/bundle.css";
import "../../css/homepage/style.css";
import "../../css/homepage/responsive.css";
import logoShop from "../../css/homepage/img/logo/logo.jpg.png"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSearch, faAngleDown, faShoppingCart, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import cartService from "../../services/cart.service"
import productService from '../../services/product.service';
import categoryServer from '../../services/category.server';
import { useNavigate } from 'react-router-dom';
import itemService from '../../services/item.service';

function HomePage() {

    //Get data
    const [cartData, setCartData] = useState(null);
    const [listProduct, setListProduct] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [totalPriceInCart, setTotalPriceInCart] = useState(0);
    const navigate = useNavigate();
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
    useEffect(() => {
        //Get Cart
        getCartData();
        //Get Products
        productService.getAllProduct()
            .then(data => {
                setListProduct(data)
                console.log(listProduct)
            })
        categoryServer.getAll()
            .then(data => {
                setListCategory(data);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    //Show MiniCart
    const [showMiniCart, setShowMiniCart] = useState(false);
    const toogleMiniCart = () => {
        setShowMiniCart(!showMiniCart);
    }
    //Sort Products
    const [sortBy, setSortBy] = useState('position');
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
    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };
    const sortProducts = (productList, sortBy) => {
        const sortFunctions = {
            idAscending: (a, b) => a.id - b.id,
            priceAscending: (a, b) => a.price - b.price,
            priceDescending: (a, b) => b.price - a.price,
            nameAscending: (a, b) => a.name.localeCompare(b.name),
            nameDescending: (a, b) => b.name.localeCompare(a.name),
            rateStarAscending: (a, b) => a.rateStar - b.rateStar,
            rateStarDescending: (a, b) => b.rateStar - a.rateStar,
            soldQuantityAscending: (a, b) => a.soldQuantity - b.soldQuantity,
            soldQuantityDescending: (a, b) => b.soldQuantity - a.soldQuantity,
        };

        const sortFunction = sortFunctions[sortBy] || sortFunctions.idAscending;

        return productList.slice().sort(sortFunction);
    };
    const addToCart = (idProduct) => {
        itemService.addItem(idProduct, 1, 1)
            .then(response => {
                console.log(response);
                getCartData();
            })
            .catch(error => {
                console.error(error);
            })
    }
    function formatPriceToVND(price) {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    }

    // Sử dụng hàm với giá trị cụ thể
    // Search product by Name
    const [searchName, setSearchName] = useState(null);
    const updateSearchName = (e) => {
        setSearchName(e.target.value);
    }
    const handleClickSearchName = (e) => {
        e.preventDefault();
        navigate(`/search?keyword=${searchName}`)
        console.log(searchName);
    }
    //Delete Item in Cart
    const deleteItemInCart = (itemId) => {
        itemService.deleteItemById(itemId)
            .then(response => {
                getCartData();
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            })
    }
    const viewDetail = (productId) => {
        navigate(`/detailsProduct?productId=${productId}`)
    }
    useEffect(() => {
        console.log(listProduct)
    }, [listProduct])
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
                                            <li className="languages"><a href="#"><img src={"/img/logo/fontlogo.jpg"} alt="" /> English <FontAwesomeIcon icon={faAngleDown} /></a>
                                                <ul className="dropdown_languages">
                                                    <li><a href="#"><img src={"/img/logo/fontlogo.jpg"} alt="" /> English</a></li>
                                                    <li><a href="#"><img src={"/img/logo/fontlogo2.jpg"} alt="" /> French </a></li>
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
                                            <li><a href="/login" title="Login">Login</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="header_middel">
                            <div className="row align-items-center">
                                <div className="col-lg-3 col-md-3">
                                    <div className="logo">
                                        <a href="index.html"><img src={logoShop} alt="" /></a>
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
                                            <a href="#" onClick={toogleMiniCart}><FontAwesomeIcon icon={faShoppingCart} /> {formatPriceToVND(totalPriceInCart)} <FontAwesomeIcon icon={faAngleDown} /></a>
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
                                                                    <span className="cart_price">{formatPriceToVND(item.totalPrice)}</span>
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
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner1.jpg"} alt="" /></a>
                                                                </div>
                                                                <div className="mega_thumb">
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner2.jpg"} alt="" /></a>
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
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner3.jpg"} alt="" /></a>
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
                                                                        <li><a href="/login">Login</a></li>
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
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner1.jpg"} alt="" /></a>
                                                                </div>
                                                                <div>
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner2.jpg"} alt="" /></a>
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
                                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner3.jpg"} alt="" /></a>
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
                                                                        <li><a href="/login">Login</a></li>
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
                    <div className='pos_home_section'>
                        <div className='row pos_home'>
                            <div className="col-lg-3 col-md-8 col-12">
                                <div className="sidebar_widget banner mb-35">
                                    <div className="banner_img mb-35">
                                        <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner5.jpg"} alt="" /></a>
                                    </div>
                                    <div className="banner_img">
                                        <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner6.jpg"} alt="" /></a>
                                    </div>
                                    <div className="sidebar_widget catrgorie mb-35">
                                        <h3>Categories</h3>
                                        <ul>
                                            {listCategory.map((category) => (
                                                <li key={category.id} className="has-sub">
                                                    <a href="#">
                                                        <i className="fa fa-caret-right"></i> {category.name}
                                                    </a>
                                                    {/* {category.subcategories && category.subcategories.length > 0 && (
                                                        <ul className="categorie_sub">
                                                            {category.subcategories.map((subCategory) => (
                                                                <li key={subCategory.id}>
                                                                    <a href="#">
                                                                        <i className="fa fa-caret-right"></i> {subCategory.name}
                                                                    </a>
                                                                    {subCategory.subcategories && subCategory.subcategories.length > 0 && (
                                                                        <ul className="categorie_sub">
                                                                            {subCategory.subcategories.map((nestedSubCategory) => (
                                                                                <li key={nestedSubCategory.id}>
                                                                                    <a href="#">
                                                                                        <i className="fa fa-caret-right"></i> {nestedSubCategory.name}
                                                                                    </a>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )} */}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* Wishlist */}
                                    {/* <div className="sidebar_widget wishlist mb-35">
                                        <div className="block_title">
                                            <h3><a href="#">Wishlist</a></h3>
                                        </div>
                                        <div className="cart_item">
                                            <div className="cart_img">
                                                <a href="#"><img src="assets\img\cart\cart.jpg" alt=""></a>
                                            </div>
                                            <div className="cart_info">
                                                <a href="#">lorem ipsum dolor</a>
                                                <span className="cart_price">$115.00</span>
                                                <span className="quantity">Qty: 1</span>
                                            </div>
                                            <div className="cart_remove">
                                                <a title="Remove this item" href="#"><i className="fa fa-times-circle"></i></a>
                                            </div>
                                        </div>
                                        <div className="cart_item">
                                            <div className="cart_img">
                                                <a href="#"><img src="assets\img\cart\cart2.jpg" alt=""></a>
                                            </div>
                                            <div className="cart_info">
                                                <a href="#">Quisque ornare dui</a>
                                                <span className="cart_price">$105.00</span>
                                                <span className="quantity">Qty: 1</span>
                                            </div>
                                            <div className="cart_remove">
                                                <a title="Remove this item" href="#"><i className="fa fa-times-circle"></i></a>
                                            </div>
                                        </div>
                                        <div className="block_content">
                                            <p>2  products</p>
                                            <a href="#">» My wishlists</a>
                                        </div>
                                    </div> */}
                                    <div className="sidebar_widget tags mb-35">
                                        <div className="block_title">
                                            <h3>popular tags</h3>
                                        </div>
                                        <div className="block_tags">
                                            <a href="#">ipod</a>
                                            <a href="#">samsung</a>
                                            <a href="#">apple</a>
                                            <a href="#">iphone5s</a>
                                            <a href="#">superdrive</a>
                                            <a href="#">shuffle</a>
                                            <a href="#">nano</a>
                                            <a href="#">iphone4s</a>
                                            <a href="#">canon</a>
                                        </div>
                                    </div>
                                    <div className="sidebar_widget newsletter mb-35">
                                        <div className="block_title">
                                            <h3>newsletter</h3>
                                        </div>
                                        <form action="#">
                                            <p>Sign up for your newsletter</p>
                                            <input placeholder="Your email address" type="text" />
                                            <button type="submit">Subscribe</button>
                                        </form>
                                    </div>
                                    <div className="sidebar_widget bottom ">
                                        <div className="banner_img">
                                            <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner9.jpg"} alt="" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-12">
                                {/* <div className="slider">
                                    <div className="slide slide--1">
                                        <div className="testimonial">
                                            <img src={process.env.PUBLIC_URL + "img/slider/slide_1.png"} alt="" />
                                        </div>
                                    </div>

                                    <div className="slide slide--2">
                                        <div className="testimonial">
                                            <img src={process.env.PUBLIC_URL + "img/slider/slide_2.png"} alt="" />
                                        </div>
                                    </div>

                                    <div className="slide slide--3">
                                        <div className="testimonial">
                                            <img src={process.env.PUBLIC_URL + "img/slider/slide_3.png"} alt="" />
                                        </div>
                                    </div>


                                    <button className="slider__btn slider__btn--left" onClick={previousSlide}>&larr;</button>
                                    <button className="slider__btn slider__btn--right" onClick={nextSlide}>&rarr;</button>
                                    <div className="dots" onClick={handleDotClick}></div>
                                </div> */}


                                <div className="row">
                                    {listProduct ? (
                                        <>
                                            {listProduct.map((item) => {
                                                // Định dạng số theo định dạng tiền tệ Việt Nam (VND)
                                                function formatCurrency(price) {
                                                    const formattedPrice = new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    }).format(price);

                                                    return formattedPrice;
                                                }

                                                return (
                                                    <div className="col-lg-4 col-md-6">
                                                        <div className="single_product" key={item.id} style={{ height: "100%" }}>
                                                            <div className="product_thumb" style={{ height: "50%", display: "flex", justifyContent: "center" }}>
                                                                <a style={{ display: "flex", margin: "auto" }} href="single-product.html"><img src={`${item.image}`} alt="" /></a>
                                                                <div className="img_icone">
                                                                    <img src={process.env.PUBLIC_URL + "img/cart/span-new.png"} alt="" />
                                                                </div>
                                                                <div className="product_action">
                                                                    <a onClick={() => addToCart(item.id)}> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</a>
                                                                </div>
                                                            </div>
                                                            <div className="product_content" style={{ height: "30%" }}>
                                                                <span className="product_price">
                                                                    {item.priceMin === item.priceMax ? (
                                                                        formatCurrency(item.priceMax)
                                                                    ) : (
                                                                        `${formatCurrency(item.priceMin)} - ${formatCurrency(item.priceMax)}`
                                                                    )}
                                                                </span>

                                                                <h3 className="product_title"><a href="single-product.html">{item.name}</a></h3>
                                                                <div className="product_ratting">
                                                                    {item.rateStar == 1 ? "No ratings yet" :
                                                                        <ul>
                                                                            <RatingStars rating={4.3} />

                                                                        </ul>
                                                                    }
                                                                    <p>Sold Quantity: {item.sold_quantity}</p>
                                                                </div>
                                                            </div>
                                                            <div className="product_info">
                                                                <ul>
                                                                    <li><a href="#" title=" Add to Wishlist ">Add to Wishlist</a></li>
                                                                    <li><a onClick={() => viewDetail(item.id)} data-toggle="modal" data-target="#modal_box" title="Quick view">View Details</a></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </>
                                    ) : (
                                        <p>Loading Product...</p>
                                    )}
                                </div>
                                <div className="banner_area mb-60">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="single_banner">
                                                <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner7.jpg"} alt="" /></a>
                                                <div className="banner_title">
                                                    <p>Up to <span> 40%</span> off</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="single_banner">
                                                <a href="#"><img src={process.env.PUBLIC_URL + "img/banner/banner8.jpg"} alt="" /></a>
                                                <div className="banner_title title_2">
                                                    <p>sale off <span> 30%</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="brand_logo mb-60">
                                    <div className="block_title">
                                        <h3>Brands</h3>
                                    </div>
                                    <div className="row">
                                        <div className="brand_active owl-carousel">
                                            <div className="col-lg-2">
                                                <div className="single_brand">
                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/brand/brand1.jpg"} alt="" /></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="single_brand">
                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/brand/brand2.jpg"} alt="" /></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="single_brand">
                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/brand/brand3.jpg"} alt="" /></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="single_brand">
                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/brand/brand4.jpg"} alt="" /></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="single_brand">
                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/brand/brand5.jpg"} alt="" /></a>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="single_brand">
                                                    <a href="#"><img src={process.env.PUBLIC_URL + "img/brand/brand6.jpg"} alt="" /></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div >

    );
}

export default HomePage;
