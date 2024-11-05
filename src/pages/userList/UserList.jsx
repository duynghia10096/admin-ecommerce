import { useEffect, useMemo, useState } from "react";
import "./order.scss";
import { DataGrid } from "@mui/x-data-grid";
import Add from "../../components/add/Add";
import OrderDetail from "../../components/order/OrderDetail";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getAllUsers } from "../../actions/UserAction";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";



const UserList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [openPopup, setOpenPopup] = useState(false);
    const [open, setOpen] = useState(false);
    const { userList } = useSelector((state) => state.userList);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllUsers(page, pageSize));
    }, [dispatch, page, pageSize])

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        {
            field: "username",
            type: "string",
            headerName: "UserName",
            width: 250,
        },
        {
            field: "email",
            type: "string",
            headerName: "Email",
            width: 150,
        },
        {
            field: "firstName",
            type: "string",
            headerName: "FirstName",
            width: 200,
        },
        {
            field: "lastName",
            type: "string",
            headerName: "lastName",
            width: 200,
        },
        {
            field: "createdAt",
            type: "string",
            headerName: "createdAt",
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
        if (userList && userList.users) {
            return userList.users.map((user, index) => ({
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                firstName: user.lastName,
                createdAt: user.createdAt,
            }));
        }
        return [];
    }, [userList]);


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
                count={Math.ceil(userList.totalItems / pageSize)}
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
                rowCount={userList?.totalItems || 0}
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

export default UserList;
