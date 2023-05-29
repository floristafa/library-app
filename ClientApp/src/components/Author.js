import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD = () => {

    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    

    const [editID, setEditID] = useState('');
    const [editName, setEditName] = useState('');
    const [editBio, setEditBio] = useState('');
    

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setEditName('');
        setEditBio('');
        setEditID('');
        setShow(false);
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7261/api/Authors/')
            .then((result) => {
                setData(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleEdit = (e, id) => {
        e.preventDefault();
        handleShow();
        axios.get(`https://localhost:7261/api/Authors/${id}`)
            .then((result) => {              
                const dt = result.data;
                setEditName(result.data.name);
                setEditBio(result.data.bio);
                setEditID(id);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleDelete = (e, id) => {
        e.preventDefault();
        if (window.confirm("Are you sure to delete this record!") == true) {
            axios.delete(`https://localhost:7261/api/Authors/${id}`)
                .then((result) => {
                    debugger
                    if (result.status === 200) {
                        getData();
                        clear();
                        toast.success('Details deteled !', {
                            position: toast.POSITION.TOP_RIGHT
                        });                        
                    }
                })
                .catch((error) => {
                    console.log(error);
                    toast.error(error, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                })
        } 
    }

    // const handleActiveChange = (e) => {
    //     if (e.target.checked)
    //         setIsActive(1)
    //     else
    //         setIsActive(0)
    // }
    // const handleEditActiveChange = (e) => {
    //     if (e.target.checked)
    //     setIsEditActive(1)
    //     else
    //     setIsEditActive(0)
    // }

    const handleSave = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            bio: bio,
            // isActive: isActive
        }
        axios.post('https://localhost:7261/api/Authors/', data)
            .then((result) => {
                if (result.status === 201) {
                    getData();
                    clear();
                    toast.success('Details added !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = {
            id: editID,
            name: editName,
            bio: editBio,
            
        }
        axios.put(`https://localhost:7261/api/Authors/?id=${editID}`, data)
            .then((result) => {
                if (result.status === 200) {
                    getData();
                    clear();
                    handleClose();
                    toast.success('Details updated !', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error(error, {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
    }

    const clear = () => {
        setName('')
        setBio('')
        setEditName('');
        setEditBio('');
        setEditID('');
    }

    return (
        <Fragment>
             <ToastContainer />
            <br></br>
            <Row>
                <Col md={3}>
                    <input type="text" name="name" className="form-control"
                        placeholder="Enter Name"
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                </Col>
                <Col md={3}>
                    <input type="text" name="bio" className="form-control"
                        placeholder="Enter Bio"
                        onChange={(e) => setBio(e.target.value)}
                        value={bio} />
                </Col>
                {/* <Col md={1}>
                    <input type="checkbox" id="isActive"
                        checked={isActive === 1 ? true : false}
                        onChange={(e) => handleActiveChange(e)} value={isActive} />
                    &nbsp; <label htmlFor="isActive">IsActive</label><br></br>
                </Col> */}
                <Col md={1}>
                    <button className="btn btn-primary" onClick={(e) => handleSave(e)}>
                        Submit
                    </button>
                </Col>
            </Row>
            <br></br>
            <Row>
                <Col md={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Bio</th>
                                {/* <th>IsActive</th> */}
                                <th colSpan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data && data.length > 0 ?
                                    data.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.bio}</td>
                                                {/* <td>{item.isActive}</td> */}
                                                <td>
                                                    <button className="btn" onClick={(e) => handleEdit(e, item.id)}>Edit</button> |
                                                    <button className="btn" onClick={(e) => handleDelete(e, item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    "Loading..."
                            }
                        </tbody>
                    </Table></Col>
            </Row>

            <br></br>
            <br></br>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <input type="text" name="name" className="form-control"
                                placeholder="Enter Name"
                                onChange={(e) => setEditName(e.target.value)}
                                value={editName} />
                        </Col>
                        <Col md={4}>
                            <input type="text" name="bio" className="form-control"
                                placeholder="Enter Bio"
                                onChange={(e) => setEditBio(e.target.value)}
                                value={editBio} />
                        </Col>
                        {/* <Col md={4}>
                            <input type="checkbox" id="isActive"
                                checked={isEditActive === 1 ? true : false}
                                onChange={(e) => handleEditActiveChange(e)} />
                            &nbsp; <label htmlFor="isActive">IsActive</label><br></br>
                        </Col> */}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )

}

export default CRUD;