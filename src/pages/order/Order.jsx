import { useEffect, useMemo, useState } from "react";
import "./order.scss";
import { DataGrid } from "@mui/x-data-grid";
import Add from "../../components/add/Add";
import OrderDetail from "../../components/order/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {getAllOrder} from "../../actions/OrderAction";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Order = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const { orderList } = useSelector((state) => state.orderList);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); 
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllOrder(page, pageSize));
  }, [dispatch, page, pageSize])

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "totalPrice",
      type: "string",
      headerName: "Total Price",
      width: 250,
    },
    {
      field: "username",
      type: "string",
      headerName: "Username",
      width: 150,
    },
    {
      field: "status",
      type: "string",
      headerName: "Status",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 200,
      type: "string",
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      type: "string",
    },
    {
      field: "paidAt",
      headerName: "Paid At",
      width: 150,
      type: "string",
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <button onClick={() => handleView(params.row.id)}
              style={{ marginRight: 10 }} >
              View
            </button>
            <button onClick={() => handleDelete(params.row.id)}>Delete</button>
          </>
        )
      }
    }
  ];

  const rows = useMemo(() => {
    if (orderList && orderList.orders) {
      return orderList.orders.map((order, index) => ({
        id: order.id,
        totalPrice : order.totalPrice,
        username: order.username,
        status: order.status,
        createdAt: order.createdAt,
        paymentStatus: order.paymentStatus,
        paidAt: order.paidAt,
      }));
    }
    return [];
  }, [orderList]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when pageSize changes
  };

  const handleView = (id) => {
    setSelectedOrderId(id); // Lưu ID của đơn hàng được chọn
    setOpenPopup(true); // Mở popup
  };
  
  // Hàm xử lý sự kiện Delete sản phẩm
  const handleDelete = (id) => {
    console.log("Delete product", id);
    // Thực hiện logic xóa sản phẩm tại đây
    // Ví dụ: dispatch action để xóa sản phẩm
    // dispatch(deleteProduct(id));
  };
  const CustomPagination = () => {
    return (
      <Pagination
        count={Math.ceil(orderList.totalItems / pageSize)}
        page={page + 1}
        onChange={(event, value) => handlePageChange(value - 1)}
        color="primary"
        showFirstButton
        showLastButton
      />
    );
  };
  return (
    <div className="products">
      <div className="info">
        <h1>Orders</h1>
        <button onClick={() => setOpenPopup(true)}>Order</button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowCount={orderList?.totalItems || 0}
        pagination
        page={page}
        paginationMode="server"  // Enable server-side pagination
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        autoHeight
        disableSelectionOnClick
        components={{
          Pagination: CustomPagination, // Use custom pagination
        }}
        className="productListTable"
      />
      {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
      {openPopup && <OrderDetail orderId={selectedOrderId} setOpenPopup={setOpenPopup} />}
    </div>
  );
};

export default Order;
