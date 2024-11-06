import React, { useEffect, useState } from 'react';
import './OrderDetail.css'; // Import CSS cho popup
import { useDispatch, useSelector } from 'react-redux';
import {getOrderItemDetail, getDetailOrderReducer, getOrderDetail} from "../../actions/OrderAction"

function OrderDetail(props) {
  const [activeTab, setActiveTab] = useState("product");
  const dispatch = useDispatch();

  const { orderItemList } = useSelector((state) => state.orderItemList);
  const {order} = useSelector((state) => state.orderDetail)
  
  useEffect(() => {
    if (props.orderId) {
      dispatch(getOrderItemDetail(props.orderId));
      dispatch(getOrderDetail(props.orderId));
    }
  }, [dispatch, props.orderId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
 
 
  return (
    <div>
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={() => props.setOpenPopup(false)}>X</button>
            <h2>DETAIL INFO</h2>
            <button
            className={`tab-button ${activeTab === "product" ? "active" : ""}`}
            onClick={() => handleTabChange("product")}
          >
           Customer
          </button>
          <button
            className={`tab-button ${activeTab === "order" ? "active" : ""}`}
            onClick={() => handleTabChange("order")}
          >
            Order Item 
          </button>
          {activeTab === "product" && order && (
            <div className="popup-table">
            <table>
              <tbody>
                <tr>
                  <td><strong>OrderId</strong></td>
                  <td>{order.id}</td>
                </tr>
        
                <tr>
                  <td><strong>Total Price:</strong></td>
                  <td>{order.totalPrice}</td>
                </tr>
                <tr>
                  <td><strong>Customer</strong></td>
                  <td>{order.username}</td>
                </tr>
                <tr>
                  <td><strong>Phone</strong></td>
                  <td>{order.phoneNo}</td>
                </tr>
                <tr>
                  <td><strong>Address</strong></td>
                  <td>{order.address}</td>
                </tr>
                <tr>
                  <td><strong>Shipping Price</strong></td>
                  <td>{order.shippingPrice}</td>
                </tr>
              </tbody>

            </table>
          </div>
          
          )}
          {activeTab === "order" && orderItemList && (
            <div className="popup-table">
            <table>
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>stock</th>
                  <th>createdDate</th>
                  <th>Image</th>
                  <th>Name</th>\
                </tr>
              </thead>
              <tbody>
                {orderItemList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>{item.createdDate}</td>
                    <td>
                            <img
                              src={item.imageUrl}
                              alt={`OrderItem ${index + 1}`}
                              style={{ width: "50px", height: "50px" }}
                            />
                          </td>
                    <td>{item.name}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          )}
</div>
        </div>
      
    </div>
  );
}

export default OrderDetail;
