import { useEffect } from "react";
import Single from "../../components/single/Single"
import { singleProduct } from "../../data"
import "./product.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Lấy productId từ URL
import { getProductDetail } from "../../actions/ProductAction";

const Product = () => {
  const { productId } = useParams();  
  const dispatch = useDispatch();
  const {product, loading} = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetail(productId));

  },[dispatch, productId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="product">
       {product && <Single product={product} {...singleProduct} />}
    </div>
  )
}

export default Product