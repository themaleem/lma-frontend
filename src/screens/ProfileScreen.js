import { Modal } from "react-responsive-modal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Tabs, Tab } from "react-bootstrap";

import {
  listLeaveRequests,
  listMyLeaveRequests,
  createLeaveRequest,
  approveLeaveRequest,
  rejectLeaveRequest,
  leaveRequest,
} from "../actions/leaveRequestActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";
import RequestComponent from "../components/RequestComponent";
import { LEAVE_REQUEST_CREATE_RESET } from "../constants/leaveRequestConstants";

const ProfileScreen = ({ history, location }) => {
  const [open, setOpen] = useState(false);
  const handleModal = () => setOpen(!open);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const leaveRequestCreate = useSelector((state) => state.leaveRequestCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    leaveRequest: createdLeaveRequest,
  } = leaveRequestCreate;

  const leaveRequestList = useSelector((state) => state.leaveRequestList);
  const {
    loading: loadingRequest,
    error: errorRequest,
    pendingLeaveRequests,
    approvedLeaveRequests,
    rejectedLeaveRequests,
  } = leaveRequestList;

  const leaveRequestListMy = useSelector((state) => state.leaveRequestListMy);
  const {
    loading: loadingMyRequest,
    error: errorMyRequest,
    pendingLeaveRequests: myPendingLeaveRequests,
    approvedLeaveRequests: myApprovedLeaveRequests,
    rejectedLeaveRequests: myRejectedLeaveRequests,
  } = leaveRequestListMy;

  const leaveRequestApprove = useSelector((state) => state.leaveRequestApprove);
  const {
    loading: loadingApprove,
    error: errorApprove,
    success: successApprove,
  } = leaveRequestApprove;

  const leaveRequestReject = useSelector((state) => state.leaveRequestReject);
  const {
    loading: loadingReject,
    error: errorReject,
    success: successReject,
  } = leaveRequestReject;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch({ type: LEAVE_REQUEST_CREATE_RESET });
    dispatch(listLeaveRequests());
    dispatch(listMyLeaveRequests());

    dispatch(getUserDetails()); //testing

    if (!userInfo) {
      history.push("/login");
    }
  }, [
    history,
    userInfo,
    dispatch,
    // user,
    // successCreate,
    // createdLeaveRequest,
    // successApprove,
    // successReject,
  ]);

  const createRequestHandler = () => {
    dispatch(createLeaveRequest());
  };

  const approveLeaveRequestHandler = (id, remark) => {
    dispatch(approveLeaveRequest(id, remark));
  };

  const rejectLeaveRequestHandler = (id, remark) => {
    dispatch(rejectLeaveRequest(id, remark));
  };

  const [leaveType, setLeaveType] = useState("annual");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [description, setDescription] = useState("");

  const handleRequestLeave = (e) => {
    e.preventDefault();
    dispatch(
      leaveRequest({
        start_date: from,
        end_date: to,
        leave_type: leaveType,
        requestor_remark: description,
      })
    );
    handleModal();
    setLeaveType("");
    setFrom();
    setTo();
    setDescription("");
  };

  const renderLeaveRequestModal = () => (
    <Modal open={open} onClose={handleModal} center>
      <FormContainer>
        <h4>Edit Leave Request</h4>
        {/* {loadingUpdate && <Loader />} */}
        {/* {errorUpdate && <Message variant="danger">{errorUpdate}</Message>} */}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={handleRequestLeave} className="p-3">
            <Form.Group controlId="leavetype">
              <Form.Label>Select Leave Type</Form.Label>
              <Form.Control
                as="select"
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="casual">Casual leave</option>
                <option value="sick">Sick leave</option>
                <option value="annual">Annual leave</option>
              </Form.Control>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} md="12" controlId="fromdate">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="12" controlId="todate">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </Form.Group>

            <button
              type="submit"
              disabled={!description || !to || !from}
              className="btn custom-btn-primary"
            >
              Request Leave
            </button>
          </Form>
        )}
      </FormContainer>
    </Modal>
  );

  return (
    <Row>
      {renderLeaveRequestModal()}
      <Col md={12}>
        <h1 className="site-headline font-weight-bold mb-3 text-dark">
          Welcome {""}
          <span className="hero-fancy-text text-capitalize">
            {user?.first_name}
          </span>
          ,
        </h1>
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loadingCreate && <Loader />}
        <button
          className="btn custom-btn-primary"
          onClick={handleModal}
          //   onClick={createRequestHandler}
        >
          <i className="fas fa-plus mr-2"></i>Apply for leave
        </button>
        <div className="py-3">
          <Tabs fill defaultActiveKey="pending" id="uncontrolled-tab-example">
            <Tab
              eventKey="pending"
              title={`Pending (${
                user.is_superuser
                  ? pendingLeaveRequests?.length
                  : myPendingLeaveRequests?.length
              })`}
            >
              <Row className="py-3">
                {errorApprove && (
                  <Message variant="danger">{errorApprove}</Message>
                )}
                {loadingApprove && <Loader />}
                {errorReject && (
                  <Message variant="danger">{errorReject}</Message>
                )}
                {loadingReject && <Loader />}
                {user.is_superuser ? (
                  loadingRequest ? (
                    <Loader />
                  ) : errorRequest ? (
                    <Message variant="danger">{errorRequest}</Message>
                  ) : pendingLeaveRequests.length > 0 ? (
                    pendingLeaveRequests.map((leaveRequest) => (
                      <>
                        <Col md={6}>
                          <RequestComponent
                            leaveRequest={leaveRequest}
                            approveLeaveRequestHandler={
                              approveLeaveRequestHandler
                            }
                            rejectLeaveRequestHandler={
                              rejectLeaveRequestHandler
                            }
                          />
                        </Col>
                      </>
                    ))
                  ) : (
                    <Col>
                      <Message variant="warning">No pending requests</Message>
                    </Col>
                  )
                ) : loadingMyRequest ? (
                  <Loader />
                ) : errorMyRequest ? (
                  <Message variant="danger">{errorMyRequest}</Message>
                ) : myPendingLeaveRequests.length > 0 ? (
                  myPendingLeaveRequests.map((leaveRequest) => (
                    <>
                      <Col md={6}>
                        <RequestComponent leaveRequest={leaveRequest} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message variant="warning">No pending requests</Message>
                  </Col>
                )}
              </Row>
            </Tab>
            <Tab
              eventKey="approved"
              title={`Approved (${
                user.is_superuser
                  ? approvedLeaveRequests?.length
                  : myApprovedLeaveRequests?.length
              })`}
            >
              <Row className="py-3">
                {user.is_superuser ? (
                  loadingRequest ? (
                    <Loader />
                  ) : errorRequest ? (
                    <Message variant="danger">{errorRequest}</Message>
                  ) : approvedLeaveRequests.length > 0 ? (
                    approvedLeaveRequests.map((leaveRequest) => (
                      <>
                        <Col md={6}>
                          <RequestComponent
                            leaveRequest={leaveRequest}
                            approveLeaveRequestHandler={
                              approveLeaveRequestHandler
                            }
                            rejectLeaveRequestHandler={
                              rejectLeaveRequestHandler
                            }
                          />
                        </Col>
                      </>
                    ))
                  ) : (
                    <Col>
                      <Message>No approved requests</Message>
                    </Col>
                  )
                ) : loadingMyRequest ? (
                  <Loader />
                ) : errorMyRequest ? (
                  <Message variant="danger">{errorMyRequest}</Message>
                ) : myApprovedLeaveRequests.length > 0 ? (
                  myApprovedLeaveRequests.map((leaveRequest) => (
                    <>
                      <Col md={6}>
                        <RequestComponent leaveRequest={leaveRequest} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message>No approved requests</Message>
                  </Col>
                )}
              </Row>
            </Tab>
            <Tab
              eventKey="rejected"
              title={`Rejected (${
                user.is_superuser
                  ? rejectedLeaveRequests?.length
                  : myRejectedLeaveRequests?.length
              })`}
            >
              <Row className="py-3">
                {user.is_superuser ? (
                  loadingRequest ? (
                    <Loader />
                  ) : errorRequest ? (
                    <Message variant="danger">{errorRequest}</Message>
                  ) : rejectedLeaveRequests.length > 0 ? (
                    rejectedLeaveRequests.map((leaveRequest) => (
                      <>
                        <Col md={6}>
                          <RequestComponent
                            leaveRequest={leaveRequest}
                            approveLeaveRequestHandler={
                              approveLeaveRequestHandler
                            }
                            rejectLeaveRequestHandler={
                              rejectLeaveRequestHandler
                            }
                          />
                        </Col>
                      </>
                    ))
                  ) : (
                    <Col>
                      <Message variant="danger">No rejected requests</Message>
                    </Col>
                  )
                ) : loadingMyRequest ? (
                  <Loader />
                ) : errorMyRequest ? (
                  <Message variant="danger">{errorMyRequest}</Message>
                ) : myRejectedLeaveRequests.length > 0 ? (
                  myRejectedLeaveRequests.map((leaveRequest) => (
                    <>
                      <Col md={6}>
                        <RequestComponent leaveRequest={leaveRequest} />
                      </Col>
                    </>
                  ))
                ) : (
                  <Col>
                    <Message variant="danger">No rejected requests</Message>
                  </Col>
                )}
              </Row>
            </Tab>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
