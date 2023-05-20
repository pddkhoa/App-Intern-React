import React, { useEffect, useState, version } from "react";
import { Table, Stack, Form, InputGroup } from "react-bootstrap";
import { fetchAllUser } from "../Service/userService";
import ReactPaginate from "react-paginate";
import AddNew from "./AddNew";
import EditUser from "./EditUser";
import { deleteUser } from "../Service/userService";
import _, { orderBy, debounce } from "lodash";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";
import { Button } from "@mui/material";
import Papa from "papaparse";
import "./TableUser.scss";
function TableUser() {
  const [totalPage, setTotalPage] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [sortBy, setSortBy] = useState([""]);
  const [field, setField] = useState([""]);

  const [listUser, setListUser] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState([]);
  const [dataExport, setDataExport] = useState([]);

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handleSort = (field, sortBy) => {
    setField(field);
    setSortBy(sortBy);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, field, sortBy);
    setListUser(cloneListUser);
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
  const onDeleteUser = (id) => {
    const deleteU = async () => {
      let res = await deleteUser(id);
      console.log(res);
      if (res && +res.statusCode === 204) {
        toast.success("Delete Success");
        handldeDeleteUser(id);
      } else {
        toast.success("Delete Fail");
      }
    };
    deleteU();
  };
  //
  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept csv file...");
        return;
      }

      //
      Papa.parse(file, {
        complete: function (result) {
          let rawCSV = result.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 4) {
              if (
                rawCSV[0][0] === "Id" ||
                rawCSV[0][1] === "First Name" ||
                rawCSV[0][2] === "Last Name" ||
                rawCSV[0][3] === "Email"
              ) {
                let res = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 4) {
                    let obj = {};
                    obj.id = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    obj.email = item[3];
                    res.push(obj);
                  }
                });
                setListUser(res);
              } else {
                toast.error("Wrong format file!");
              }
            } else {
              toast.error("Wrong format file!");
            }
          } else {
            toast.error("Not found data in file");
          }
        },
      });
    }
  };
  //
  const handleExport = (event, done) => {
    let res = [];
    if (listUser && listUser.length > 0) {
      res.push(["Id", "First Name", "Last Name", "Email"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.first_name;
        arr[2] = item.last_name;
        arr[3] = item.email;
        res.push(arr);
      });
      setDataExport(res);
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
  //
  const handldeDeleteUser = (id) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== id);
    setListUser(cloneListUser);
  };
  //
  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 500);
  return (
    <>
      <InputGroup className="mb-3 w-50">
        <InputGroup.Text id="basic-addon1">
          <i className="fa-solid fa-magnifying-glass"></i>
        </InputGroup.Text>
        <Form.Control
          onChange={(event) => handleSearch(event)}
          placeholder="Search email..."
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <Stack direction="horizontal" className="mb-3" gap={3}>
        <Button
          className="ms-auto"
          variant="contained"
          color="success"
          onClick={() => setShowModal(true)}
          startIcon={<i className="fa-solid fa-user-plus"></i>}
        >
          Add New User
        </Button>
        <div className="vr" />
        <Button
          variant="contained"
          color="primary"
          startIcon={<i className="fa-solid fa-upload"></i>}
        >
          <label htmlFor="test">import</label>
        </Button>
        <Form.Control
          id="test"
          type="file"
          onChange={(event) => handleImportCSV(event)}
          hidden
        ></Form.Control>
        <div className="vr" />
        <CSVLink
          data={dataExport}
          filename={"my-file.csv"}
          onClick={(event, done) => handleExport(event, done)}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<i className="fa-solid fa-file-arrow-down"></i>}
          >
            Export
          </Button>
        </CSVLink>
      </Stack>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>
              <div className="sort-header d-flex justify-content-between">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-up-1-9 mx-1"
                    onClick={() => handleSort("id", "asc")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-down-9-1"
                    onClick={() => handleSort("id", "desc")}
                  ></i>
                </span>
              </div>
            </th>
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
                      className="mx-3"
                      variant="outlined"
                      color="primary"
                      startIcon={<i className="fa-solid fa-pen-to-square"></i>}
                      onClick={() => handleEditClick(item)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Sure to delete?"
                      onConfirm={() => onDeleteUser(item.id)}
                    >
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<i className="fa-solid fa-trash"></i>}
                      >
                        Delete
                      </Button>
                    </Popconfirm>
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
