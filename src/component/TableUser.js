import React, { useEffect, useState, version } from "react";
import { Table, Button, Stack } from "react-bootstrap";
import { fetchAllUser } from "../Service/userService";
import ReactPaginate from "react-paginate";
import AddNew from "./AddNew";
import EditUser from "./EditUser";
import _ from "lodash";
import { ToastContainer } from "react-toastify";

function TableUser() {
  const [totalPage, setTotalPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const [listUser, setListUser] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState([]);

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleClose = () => {
    setShowModal(false);
    setShowModalEdit(false);
  };
  useEffect(() => {
    getUsers(1);
  }, []);
  //
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setListUser(res.data);
      setTotalPage(res.total_pages);
      setTotalUser(res.total);
    }
  };
  //
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  };
  //
  const handleEditClick = (user) => {
    setDataUserEdit(user);
    setShowModalEdit(true);
  };
  //
  const handldeEditUser = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  return (
    <>
      <Stack direction="horizontal" className="mb-3" gap={3}>
        <div>List User</div>
        <Button className="ms-auto" onClick={() => setShowModal(true)}>
          Add New
        </Button>
        <div className="vr" />
        <Button className="bg-warning border">Back</Button>
      </Stack>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`user - ${index}`}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <Button
                      className="mx-3 btn-warning"
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    <Button className="btn-danger">Delete</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
      <AddNew
        handleClose={handleClose}
        show={showModal}
        handleUpdateTable={handleUpdateTable}
      />
      <EditUser
        handleClose={handleClose}
        show={showModalEdit}
        dataUserEdit={dataUserEdit}
        handldeEditUser={handldeEditUser}
      />
    </>
  );
}
export default TableUser;
