import { useEffect, useMemo, useState } from "react";
import "./order.scss";
import { DataGrid } from "@mui/x-data-grid";
import Add from "../../components/add/Add";
import OrderDetail from "../../components/order/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {getAllReviews} from "../../actions/ReviewAction";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";



const ReviewList = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const { reviewList } = useSelector((state) => state.reviewList);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10); 
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllReviews(page, pageSize));
  }, [dispatch, page, pageSize])

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "comment",
      type: "string",
      headerName: "Comment",
      width: 250,
    },
    {
      field: "ratings",
      type: "string",
      headerName: "Ratings",
      width: 150,
    },
    {
      field: "created_Date",
      type: "string",
      headerName: "created_Date",
      width: 200,
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
    if (reviewList && reviewList.reviews) {
      return reviewList.reviews.map((review, index) => ({
        id: review.id,
        comment : review.comment,
        ratings: review.ratings,
        created_Date: review.createdAt,
      }));
    }
    return [];
  }, [reviewList]);


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); // Reset to first page when pageSize changes
  };

  const handleView = (id) => {
    navigate(`/products/${id}`);
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
        count={Math.ceil(reviewList.totalItems / pageSize)}
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
        <h1>Reviews</h1>
        <button onClick={() => setOpenPopup(true)}>Reviews</button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowCount={reviewList?.totalItems || 0}
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
      {openPopup && <OrderDetail setOpenPopup={setOpenPopup} />}
    </div>
  );
};

export default ReviewList;
