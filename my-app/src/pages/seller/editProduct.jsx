import { useEffect, useState } from "react";
import "../../css/seller/main.css"
import CurrencyInput from 'react-currency-input-field';
import Menu from "./components/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
function EditProductPage() {
    const [showForm, setShowForm] = useState(null);
    const [categories, setCategories] = useState(null);
    const [nameNewCategory, setNameNewCategory] = useState(null);
    const [suppliers, setSuppliers] = useState(null);
    const [nameNewSupplier, setNameNewSupplier] = useState(null);
    const [nameProductInput, setNameProductInput] = useState(null);
    const [categoryInput, setCategoryInput] = useState(null);
    const [supplierInput, setSupplierInput] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [descriptionInput, setDescriptionInput] = useState(null);
    const [cntError, setCntError] = useState(0);
    const [classifications, setClassifications] = useState(['']);
    const [classifications2, setClassifications2] = useState(['']);
    const [infoClassification, setInfoClassification] = useState([]);
    const [classTitle, setClassTitle] = useState([]);

    const idProductLoad =  useParams()["id"]
    const [productLoad, setProductLoad] = useState(null);
    const convertToJson = () => {
        console.log(classifications);
        console.log(classifications2);
        let results = [];
    
        for (let i = 0; i < classifications.length - 1; i++) {
            if (classifications2.length>1) {
                for (let j = 0; j < classifications2.length - 1; j++) {
                    console.log(infoClassification[`${i}_${j}`][3]);
    
                    const jsonData = {
                        "label1": classifications[i],
                        "label2": classifications2[j],
                        "price": infoClassification[`${i}_${j}`][0],
                        "cost": infoClassification[`${i}_${j}`][1],
                        "quantity": infoClassification[`${i}_${j}`][2],
                        "image": "abc"
                    };
    
                    results.push(jsonData);
                }
            } else {
                console.log("Đã vào 1")
                const jsonData = {
                    "label1": classifications[i],
                    "label2": null,
                    "price": infoClassification[`${i}_-1`][0],
                    "cost": infoClassification[`${i}_-1`][1],
                    "quantity": infoClassification[`${i}_-1`][2],
                    "image": "abc"
                };
    
                results.push(jsonData);
            }
        }
    
        console.log(results);
        return results;
    };
    
    // Convert image to base64
    const handleImageChange = (event) => {
        console.log("da vao");
        return new Promise((resolve, reject) => {
            const file = event.target.files[0];
            if (!file) {
                reject("No file selected");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                setSelectedImage(base64Image);
                resolve(base64Image);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    };
    //Get categories
    const getCategoris = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/category/all", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Network reponse was not ok");
            }
            const data = await response.json();
            setCategories(data);

        } catch (error) {
            console.error(error)
        }
    }
    //Add categories
    const addCategory = async () => {
        if (nameNewCategory !== null) {
            try {
                const response = await fetch(`http://localhost:8080/api/category/add?nameCategory=${nameNewCategory}`, {
                    method: "POST",
                });
                if (response.ok) {
                    const data = await response.text();
                    getCategoris();
                } else {
                    const errorText = await response.text();
                    console.error(errorText);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    //Get suppliers
    const getSupplier = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/supplier/all", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Network reponse was not ok");
            }
            const data = await response.json();
            setSuppliers(data);

        } catch (error) {
            console.error(error)
        }
    }
    //Add Supllier
    const addSupplier = async () => {
        if (nameNewSupplier !== null) {
            try {
                const response = await fetch(`http://localhost:8080/api/supplier/add?nameSupplier=${nameNewSupplier}`, {
                    method: "POST",
                });
                if (response.ok) {
                    const data = await response.text();
                    console.log(data);
                    getSupplier();
                } else {
                    const errorText = await response.text();
                    console.error(errorText);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
    //Add Product
    const addProduct = async () => {
        if (cntError === 0) {
            console.log(classTitle.length)
            if (classTitle.length === 0) {

                try {
                    const response = await fetch(`http://localhost:8080/api/product/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "name": nameProductInput,
                            "description": descriptionInput,
                            "image": selectedImage,
                            "sellerId": 1,
                            "categoryId": categoryInput,
                            "supplierId": supplierInput,
                            "typesOfProducts": [{
                                "label1": null,
                                "label2": null,
                                "image": selectedImage,
                                "quantity": infoClassification["-1_-1"][2],
                                "price": infoClassification["-1_-1"][1],
                                "cost": infoClassification["-1_-1"][0],
                            }],
                        }),
                    });
                    if (response.ok) {
                        const data = await response.text();
                        console.log(data);
                    } else {
                        const errorText = await response.text();
                        console.error(errorText);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
            else {
                try {
                    console.log("ĐÃ vào")
                    const response = await fetch(`http://localhost:8080/api/product/add`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "name": nameProductInput,
                            "description": descriptionInput,
                            "image": selectedImage,
                            "sellerId": 1,
                            "categoryId": categoryInput,
                            "supplierId": supplierInput,
                            "typesOfProducts": convertToJson(),
                        }),
                    });
                    if (response.ok) {
                        const data = await response.text();
                        console.log(data);
                    } else {
                        const errorText = await response.text();
                        console.error(errorText);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };
    const getProductById= async()=>{
        try{
            const response = await fetch(`http://localhost:8080/api/product/${idProductLoad}`,{
                method:"GET"
            })
            if(!response.ok){
                throw new Error("Network response was not ok")
            }
            const data = await response.json();
            setProductLoad(data)
            setCategoryInput(data["category"])
            setNameProductInput(data["name"])
            setSupplierInput(data["supplier"])
            setDescriptionInput(data["description"])
            
            
        }catch(error)
        {
            console.error(error)
        }
    }
    useEffect(() => {
        setCntError(document.getElementsByClassName("error").length)
        getProductById();
        getCategoris();
        getSupplier();
        
    }, [])
    const handleInputChange = (index, event) => {
        const values = [...classifications];
        values[index] = event.target.value;
        setCntError(document.getElementsByClassName("error").length)
        const position = classifications.findIndex(item => item === values[index]);
        setClassifications(values);
        if (event.target.value !== '' && index === values.length - 1) {
            setClassifications([...values, '']);
        }
    };
    const handleDelete = (index) => {
        const values = [...classifications];
        values.splice(index, 1);
        setClassifications(values);
    };
    const handleInputChange2 = (index, event) => {
        const values = [...classifications2];
        values[index] = event.target.value;
        setClassifications2(values);
        if (event.target.value !== '' && index === values.length - 1) {
            setClassifications2([...values, '']);
        }
    };
    const handleDelete2 = (index) => {
        const values = [...classifications2];
        values.splice(index, 1);
        setClassifications2(values);
    }
    const renderClassificationColumns = () => {
        const columns = [];
        for (let i = 1; i <= classTitle.length; i++) {
            columns.push(<th key={`classification_${i}`}>{classTitle[i - 1].trim() === "" ? `Nhóm phân loại ${i}` : classTitle[i - 1]}</th>);
        }
        return columns;
    };
    const infoClassificationInput = (key, index, value) => {
        const values = infoClassification;
        if (!values[key]) {
            values[key] = [];
        }
        values[key][index] = value;
        setInfoClassification(values);
    };
    const handleInputTitleChange = (string, index) => {
        const values = [...classTitle];
        values[index] = string;
        setClassTitle(values);
    }
    useEffect(()=>{
        console.log(productLoad)
        
    },[productLoad])


    return (

        <div>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css" />
            <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
            <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css" />
            <body className="app sidebar-mini rtl">
                <header className="app-header">
                    <a className="app-sidebar__toggle" href="#" data-toggle="sidebar"
                        aria-label="Hide Sidebar"></a>
                    <ul className="app-nav">
                        <li><a className="app-nav__item" href="/index.html"><i className='bx bx-log-out bx-rotate-180'></i> </a>

                        </li>
                    </ul>
                </header>
                <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
                <Menu />
                <main className="app-content">
                    <div className="app-title">
                        <ul className="app-breadcrumb breadcrumb">
                            <li className="breadcrumb-item">Danh sách sản phẩm</li>
                            <li className="breadcrumb-item"><a href="#">Thêm sản phẩm</a></li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Thông tin cơ bản</h3>
                                <div className="tile-body">
                                    <div className="row element-button">
                                        <div className="col-sm-2">
                                            <a className="btn btn-add btn-sm" onClick={() => setShowForm("supplier")}><i
                                                className="fas fa-folder-plus"></i> Thêm nhà cung cấp</a>
                                        </div>
                                        <div className="col-sm-2">
                                            <a className="btn btn-add btn-sm" onClick={() => setShowForm("category")} data-toggle="modal" data-target="#adddanhmuc"><i
                                                className="fas fa-folder-plus"></i> Thêm danh mục</a>
                                        </div>
                                    </div>
                                    <form className="row">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Tên sản phẩm </label>
                                            <input className="form-control" type="text" onChange={(e) => { setNameProductInput(e.target.value) }} value={nameProductInput}/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Danh mục</label>
                                            <select className="form-control" id="exampleSelect1"  onChange={(e) => { setCategoryInput(e.target.value == "-- Chọn nhà danh mục --" ? null : e.target.value) }}>
                                                <option>-- Chọn nhà danh mục --</option>
                                                <option selected={false}>-- Chọn nhà danh mục 1--</option>
                                                {
                                                    categories && categories.map(category => (
                                                        <option 
                                                            selected={categoryInput && categoryInput.id === category.id}
                                                            key={category.id} 
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>

                                        </div>
                                        <div className="form-group col-md-4 ">
                                            <label className="control-label">Nhà cung cấp</label>
                                            <select className="form-control" id="exampleSelect1" onChange={(e) => { setSupplierInput(e.target.value == "-- Chọn nhà cung cấp --" ? null : e.target.value) }}>
                                                <option>-- Chọn nhà cung cấp --</option>
                                                {
                                                    suppliers && suppliers.map(supplier => (
                                                        <option key={supplier.id} selected={supplierInput && supplierInput.id== supplier.id} value={supplier.id}>{supplier.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="control-label">Ảnh sản phẩm</label>
                                            <div id="myfileupload">
                                                <input type="file" onChange={(e) => setSelectedImage(handleImageChange(e))} accept="image/*" />
                                            </div>
                                            <div id="thumbbox">
                                                <img height="450" width="400" alt="Thumb image" id="thumbimage" style={{ display: "none" }} />
                                                <a className="removeimg" ></a>
                                            </div>
                                            <div id="boxchoice">
                                                <a className="Choicefile"><i className="fas fa-cloud-upload-alt"></i> Chọn ảnh</a>
                                                <p style={{ clear: "both" }}></p>
                                            </div>

                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="control-label">Mô tả sản phẩm</label>
                                            <textarea className="form-control" name="mota" id="mota" onChange={(e) => { setDescriptionInput(e.target.value) }} value={descriptionInput}></textarea>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tile">
                                <h3 className="tile-title">Thông tin bán hàng</h3>
                                <div className="tile-body">
                                    <form className="row">
                                        <div style={{ width: "100%" }}>
                                            <div style={{ fontFamily: "sans-serif", fontWeight: "700", fontSize: "20px", marginLeft: "30px", marginBottom: "10px" }}>Phân loại hàng</div>
                                            <div className="classification" style={{ width: "95%", padding: "5px ", margin: "auto", position: "relative" }}>
                                                {classTitle.length === 0 ? (
                                                    <>
                                                        <div style={{ display: "flex", margin: "10px 0px" }}>
                                                            <label className="col-md-1">Giá nhập:</label>
                                                            <CurrencyInput className="col-md-3" style={{ "backgroundColor": "#f1f1f1" }} intlConfig={{ locale: 'vi-VN', currency: 'VND' }} onValueChange={(value) => { infoClassificationInput("-1_-1", 0, value) }} />
                                                        </div>
                                                        <div style={{ display: "flex", margin: "10px 0px" }}>
                                                            <label className="col-md-1">Giá bán:</label>
                                                            <CurrencyInput className="col-md-3" style={{ "backgroundColor": "#f1f1f1" }} intlConfig={{ locale: 'vi-VN', currency: 'VND' }} onValueChange={(value) => { infoClassificationInput("-1_-1", 1, value) }} />
                                                        </div>
                                                        <div style={{ display: "flex", margin: "10px 0px" }}>
                                                            <label className="col-md-1">Kho hàng:</label>
                                                            <input className="form-control col-md-3" type="number" min={0} onChange={(e) => { infoClassificationInput("-1_-1", 2, e.target.value) }} />
                                                        </div>

                                                        <button className="col-md-6" style={{ fontSize: "20px" }} onClick={() => { setClassTitle([""]); }}> + Thêm nhóm phân loại</button>
                                                    </>
                                                ) : (
                                                    <div >
                                                        <div style={{ backgroundColor: "#f6f6f6", marginBottom: "5px" }}>
                                                            <FontAwesomeIcon icon={faXmark} style={{ position: "absolute", right: "2%", fontSize: "20px" }} onClick={() => { setClassTitle([]); setClassifications([""]); setClassifications2([""]) }} />
                                                            <div className="form-group classification-1 col-md-6" style={{ display: "flex" }}>
                                                                <label className="control-label col-md-3">Nhóm phân loại 1</label>
                                                                <input className="form-control col-md-4" onChange={(e) => { handleInputTitleChange(e.target.value, 0) }} type="text" />
                                                            </div>
                                                            <div>
                                                                {classifications.map((value, index) => (
                                                                    <div key={index} className="form-group classification-2 col-md-12" style={{ display: "flex" }}>
                                                                        <label className="control-label col-md-2">Phân loại hàng</label>
                                                                        <div className="classification_child col-md-5" style={{ display: "flex" }}>
                                                                            <input
                                                                                className="form-control col-md-10"
                                                                                type="text"
                                                                                value={value}
                                                                                onChange={(event) => handleInputChange(index, event)}
                                                                            />
                                                                            {index < classifications.length - 1 && (
                                                                                <FontAwesomeIcon
                                                                                    icon={faTrash}
                                                                                    className="col-md-1"
                                                                                    style={{ alignSelf: "center", fontSize: "20px", marginLeft: "10px", cursor: 'pointer' }}
                                                                                    onClick={() => handleDelete(index)}
                                                                                />
                                                                            )}
                                                                            {classifications.findIndex(item => item === classifications[index]) !== index && (
                                                                                <span className="col-md-4 error" style={{ color: 'red', alignSelf: "center" }}>Giá trị trùng lặp</span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        {classTitle.length === 2 ? (
                                                            <div >
                                                                <div style={{ backgroundColor: "#f6f6f6", marginBottom: "5px" }}>
                                                                    <FontAwesomeIcon icon={faXmark} style={{ position: "absolute", right: "2%", fontSize: "20px" }} onClick={() => { setClassTitle([classTitle[0]]); setClassifications2([""]) }} />
                                                                    <div className="form-group classification-1 col-md-6" style={{ display: "flex" }}>
                                                                        <label className="control-label col-md-3">Nhóm phân loại 2</label>
                                                                        <input className="form-control col-md-4" type="text" onChange={(e) => { handleInputTitleChange(e.target.value, 1) }} />
                                                                    </div>
                                                                    <div>
                                                                        {classifications2.map((value, index) => (
                                                                            <div key={index} className="form-group classification-2 col-md-12" style={{ display: "flex" }}>
                                                                                <label className="control-label col-md-2">Phân loại hàng</label>
                                                                                <div className="classification_child col-md-5" style={{ display: "flex" }}>
                                                                                    <input
                                                                                        className="form-control col-md-10"
                                                                                        type="text"
                                                                                        value={value}
                                                                                        onChange={(event) => handleInputChange2(index, event)}
                                                                                    />
                                                                                    {index < classifications2.length - 1 && (
                                                                                        <FontAwesomeIcon
                                                                                            icon={faTrash}
                                                                                            className="col-md-1"
                                                                                            style={{ alignSelf: "center", fontSize: "20px", marginLeft: "10px", cursor: 'pointer' }}
                                                                                            onClick={() => handleDelete2(index)}
                                                                                        />
                                                                                    )}
                                                                                    {classifications2.findIndex(item => item === classifications2[index]) !== index && (
                                                                                        <span className="col-md-4" style={{ color: 'red', alignSelf: "center" }}>Giá trị trùng lặp</span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ) : (
                                                            <button className="col-md-6" style={{ fontSize: "20px" }} onClick={() => setClassTitle([...classTitle, ""])}> + Thêm nhóm phân loại 2</button>
                                                        )}
                                                        <div className="classification-table">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        {renderClassificationColumns()}
                                                                        <th>Hình ảnh-3</th>
                                                                        <th>Giá bán-0</th>
                                                                        <th>Giá nhập-1</th>
                                                                        <th>Kho hàng-2</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        classifications.map((classification, index) => {
                                                                            if (classification.trim() !== "") {
                                                                                return (
                                                                                    <>
                                                                                        {classifications2.length !== 1 ? (
                                                                                            classifications2.map((classification2, index2) => {
                                                                                                if (classification2.trim() !== "") {
                                                                                                    return (
                                                                                                        <tr key={`${index}-${index2}`}>
                                                                                                            <td>{classification}</td>
                                                                                                            <td>{classification2}</td>
                                                                                                            <td>
                                                                                                                <input type="file" onChange={(e) => infoClassificationInput(`${index}_${index2}`, 3, handleImageChange(e))} accept="image/*" />
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <CurrencyInput
                                                                                                                    intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                                                                                                                    onValueChange={(value) => infoClassificationInput(`${index}_${index2}`, 0, value)}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <CurrencyInput
                                                                                                                    intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                                                                                                                    onValueChange={(value) => infoClassificationInput(`${index}_${index2}`, 1, value)}
                                                                                                                />
                                                                                                            </td>
                                                                                                            <td>
                                                                                                                <input
                                                                                                                    className="form-control"
                                                                                                                    type="number"
                                                                                                                    min={0}
                                                                                                                    onChange={(e) => infoClassificationInput(`${index}_${index2}`, 2, e.target.value)}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                    );
                                                                                                }

                                                                                            })
                                                                                        ) : (
                                                                                            <tr key={`${index}`}>
                                                                                                <td>{classification}</td>
                                                                                                <td>
                                                                                                    <input type="file" onChange={(e) => infoClassificationInput(`${index}_-1`, 3, handleImageChange(e))} accept="image/*" />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <CurrencyInput
                                                                                                        intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                                                                                                        onValueChange={(value) => infoClassificationInput(`${index}_-1`, 0, value)}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <CurrencyInput
                                                                                                        intlConfig={{ locale: 'vi-VN', currency: 'VND' }}
                                                                                                        onValueChange={(value) => infoClassificationInput(`${index}_-1`, 1, value)}
                                                                                                    />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <input
                                                                                                        className="form-control"
                                                                                                        type="number"
                                                                                                        min={0}
                                                                                                        onChange={(e) => infoClassificationInput(`${index}_-1`, 2, e.target.value)}
                                                                                                    />
                                                                                                </td>
                                                                                            </tr>
                                                                                        )}
                                                                                    </>

                                                                                );
                                                                            }
                                                                            return null;
                                                                        })
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <button className="btn btn-save" type="button" onClick={addProduct}>Lưu lại</button>

                                <a className="btn btn-cancel" href="table-data-product.html">Hủy bỏ</a>
                            </div>
                        </div>
                    </div >
                </main >
                <div className={`modal fade ${showForm === "supplier" ? "show" : ""}`} id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle"
                    data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group  col-md-12">
                                        <span className="thong-tin-thanh-toan">
                                            <h5>Thêm mới nhà cung cấp</h5>
                                        </span>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="control-label">Nhập tên nhà cung cấp mới</label>
                                        <input className="form-control" type="text" required onChange={(e) => { setNameNewSupplier(e.target.value) }} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="control-label">Nhà cung cấp hiện đang có</label>
                                        <ul style={{ paddingLeft: "20px" }}>

                                            {suppliers && suppliers.map(supplier => (
                                                <li key={supplier.id} style={{ listStyle: "inside" }}>{supplier.name}</li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-save" onClick={addSupplier} type="button">Lưu lại</button>
                                    <a className="btn btn-cancel" onClick={() => setShowForm(null)}>Hủy bỏ</a>
                                </div>
                                <div className="modal-footer"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <form className="row">
                                                            <div style={{ width: "100%" }}>
                                                                <div style={{ fontFamily: "sans-serif", fontWeight: "700", fontSize: "20px", marginLeft: "30px", marginBottom: "10px" }}>Phân loại 1</div>
                                                                <div className="classification" style={{ backgroundColor: "#f6f6f6", width: "95%", margin: "auto", display: "flex" }}>
                                                                    <div className="form-group col-md-3" >
                                                                        <label className="control-label">Giá bán</label>
                                                                        <CurrencyInput intlConfig={{ locale: 'vi-VN', currency: 'VND' }} onValueChange={(value) => { setPriceInput(value) }} />
                                                                    </div>
                                                                    <div className="form-group col-md-3">
                                                                        <label className="control-label">Giá vốn</label>
                                                                        <CurrencyInput intlConfig={{ locale: 'vi-VN', currency: 'VND' }} onValueChange={(value) => { setCostInput(value) }} />
                                                                    </div>
                                                                    <div className="form-group col-md-4">
                                                                        <label className="control-label">Ảnh sản phẩm</label>
                                                                        <div id="myfileupload">
                                                                            <input type="file" onChange={handleImageChange} accept="image/*" />
                                                                        </div>
                                                                        <div id="thumbbox">
                                                                            <img height="450" width="400" alt="Thumb image" id="thumbimage" style={{ display: "none" }} />
                                                                            <a className="removeimg" ></a>
                                                                        </div>
                                                                        <div id="boxchoice">
                                                                            <a className="Choicefile"><i className="fas fa-cloud-upload-alt"></i> Chọn ảnh</a>
                                                                            <p style={{ clear: "both" }}></p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group col-md-2">
                                                                        <label className="control-label">Số lượng</label>
                                                                        <input className="form-control" type="number" min={0} />
                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </form> */}
                <div className={`modal fade ${showForm === "category" ? "show" : ""}`} id="adddanhmuc" role="dialog" aria-labelledby="exampleModalCenterTitle"
                    data-backdrop="static" data-keyboard="false">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="form-group  col-md-12">
                                        <span className="thong-tin-thanh-toan">
                                            <h5>Thêm mới danh mục </h5>
                                        </span>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="control-label">Nhập tên danh mục mới</label>
                                        <input className="form-control" type="text" required onChange={(e) => { setNameNewCategory(e.target.value) }} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="control-label">Danh mục sản phẩm hiện đang có</label>
                                        <ul style={{ paddingLeft: "20px" }}>

                                            {categories && categories.map(category => (
                                                <li key={category.id} style={{ listStyle: "inside" }}>{category.name}</li>
                                            ))}

                                        </ul>
                                    </div>
                                </div>
                                <button className="btn btn-save" type="button" onClick={addCategory}>Lưu lại</button>
                                <a className="btn btn-cancel" onClick={() => setShowForm(null)}>Hủy bỏ</a>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>


            </body >
        </div >
    );

}
export default EditProductPage;