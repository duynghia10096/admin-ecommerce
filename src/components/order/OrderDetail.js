import React, { useState } from 'react';
import './OrderDetail.css'; // Import CSS cho popup

function OrderDetail(props) {
  const [activeTab, setActiveTab] = useState("product");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
 

  return (
    <div>
      

        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={() => props.setOpenPopup(false)}>X</button>
            <h2>Order</h2>
            <button
            className={`tab-button ${activeTab === "product" ? "active" : ""}`}
            onClick={() => handleTabChange("product")}
          >
            Product Info
          </button>
          <button
            className={`tab-button ${activeTab === "order" ? "active" : ""}`}
            onClick={() => handleTabChange("order")}
          >
            Order Detail
          </button>
          {activeTab === "product" && (
            <div className='popup-table'>
            <table>
              <tbody>
               
                
                <tr>
                  <td><strong>Năm ra mắt:</strong></td>
                  <td>2019</td>
                </tr>
                <tr>
                  <td><strong>Thời gian bảo hành:</strong></td>
                  <td>24 Tháng</td>
                </tr>
                <tr>
                  <td><strong>Địa điểm bảo hành:</strong></td>
                  <td>Nguyễn Kim</td>
                </tr>
              </tbody>
            </table>
            </div>
          
          )}
          {activeTab === "order" && (
            <div className='popup-table'>
            <table>
              <tbody>
                <tr>
                  <td><strong>Model:</strong></td>
                  <td>A412FA-EK156T</td>
                </tr>
                <tr>
                  <td><strong>Màu sắc:</strong></td>
                  <td>Xanh</td>
                </tr>
                <tr>
                  <td><strong>Nhà sản xuất:</strong></td>
                  <td>Asus</td>
                </tr>
                <tr>
                  <td><strong>Xuất xứ:</strong></td>
                  <td>Trung Quốc</td>
                </tr>
                <tr>
                  <td><strong>Năm ra mắt:</strong></td>
                  <td>2019</td>
                </tr>
                <tr>
                  <td><strong>Thời gian bảo hành:</strong></td>
                  <td>24 Tháng</td>
                </tr>
                <tr>
                  <td><strong>Địa điểm bảo hành:</strong></td>
                  <td>Nguyễn Kim</td>
                </tr>
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
