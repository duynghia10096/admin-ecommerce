import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions/ProductAction'
import "./add.scss";
import { fetchApparelList, fetchBrandList, fetchGenderList } from '../../actions/CategoryAction'
import { useAlert } from 'react-alert';
import loadingImage from '../../images/loading.webp';


const Add = (props) => {

    const [formData, setFormData] = useState(new FormData());
    const dispatch = useDispatch();
    const { brands } = useSelector((state) => state.brands);
    const { apparels } = useSelector((state) => state.apparels);
    const { genders } = useSelector((state) => state.genders);
    const alert = useAlert();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        dispatch(fetchApparelList());
        dispatch(fetchBrandList());
        dispatch(fetchGenderList());
    }, [dispatch]);

    useEffect(() => {
        if (success) {
            alert.show('Product has been created successfully!', {
                type: 'success',
            });
        }
    }, [success, alert]);


  

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleImageChange = (e) => {
        if (e.target.files) {
            setFormData({ ...formData, images: [...e.target.files] });
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // dispatch(addProduct(formData));
        try {
            await dispatch(addProduct(formData));
            setSuccess(true);
        } catch {
            console.log("Failed to add product:");
        } finally {
            setLoading(false);
        }
        props.setOpen(false)
    };

    if (loading) {
        return (
            <div className="loading-container">
                <img src={loadingImage} alt="Loading" className="loading-image" />
            </div>
        );
    }

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Add new {props.slug}</h1>
             
                <form onSubmit={handleSubmit}>
                    <div className="item">
                        <label>ProductName</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="ProductName"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label>Apparel</label>
                        <select name="apparelName" onChange={handleInputChange}>
                            <option value="">Select Apparel</option>
                            {apparels && apparels.map((apparel) => (
                                <option key={apparel.id} value={apparel.type}>
                                    {apparel.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="item">
                        <label>Gender</label>
                        <select name="genderName" onChange={handleInputChange}>
                            <option value="">Select Gender</option>
                            {genders && genders.map((gender) => (
                                <option key={gender.id} value={gender.type}>
                                    {gender.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="item">
                        <label>Brand</label>
                        <select name="brandName" onChange={handleInputChange}>
                            <option value="">Select Brand</option>
                            {brands && brands.map((brand) => (
                                <option key={brand.id} value={brand.type}>
                                    {brand.type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="item">
                        <label>Color</label>
                        <input
                            type="text"
                            name="color"
                            placeholder="color"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="description"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label>Stock</label>
                        <input
                            type="text"
                            name="stock"
                            placeholder="stock"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label>Price</label>
                        <input
                            type="text"
                            name="price"
                            placeholder="price"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="item">
                        <label>Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </div>
                    <button type="submit" onSubmit={handleSubmit}>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Add;