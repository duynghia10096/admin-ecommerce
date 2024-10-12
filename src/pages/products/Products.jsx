import { useEffect, useMemo, useState } from "react";
import "./Products.scss";
import { DataGrid } from "@mui/x-data-grid";
import Add from "../../components/add/Add";
import OrderDetail from "../../components/order/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllProduct } from "../../actions/ProductAction"
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";



const Products = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const { productList } = useSelector((state) => state.productList);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProduct(page, pageSize));
  }, [dispatch, page, pageSize])

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "name",
      type: "string",
      headerName: "name",
      width: 250,
    },
    {
      field: "color",
      type: "string",
      headerName: "Color",
      width: 150,
    },
    {
      field: "price",
      type: "string",
      headerName: "Price",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "inStock",
      headerName: "In Stock",
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
    if (productList && productList.products) {
      return productList.products.map((product, index) => ({
        id: product.id,
        img: product.imageURL,
        name: product.name,
        color: product.color,
        price: product.price,
        createdAt: product.publicationDate,
        inStock: product.availableQuantity,
      }));
    }
    return [];
  }, [productList]);


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
        count={Math.ceil(productList.totalItems / pageSize)}
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
        <h1>Products</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
        <button onClick={() => setOpenPopup(true)}>Order</button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowCount={productList?.totalItems || 0}
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

export default Products;
