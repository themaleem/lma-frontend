import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import { Form, Card, Col, Row } from "react-bootstrap";

import Message from "../components/Message";

const RequestComponent = ({
  leaveRequest,
  rejectLeaveRequestHandler,
  approveLeaveRequestHandler,
}) => {
  const [type, setType] = useState("Approval");
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);

  const toggleApproveModal = () => {
    setType("Approval");
    handleModal();
  };

  const toggleRejectModal = () => {
    setType("Rejection");
    handleModal();
  };

  const [remark, setRemark] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const handleApprove = (e) => {
    e.preventDefault();
    approveLeaveRequestHandler(leaveRequest.pk, remark);
    handleModal();
  };

  const handleReject = (e) => {
    e.preventDefault();
    rejectLeaveRequestHandler(leaveRequest.pk, remark);
    handleModal();
  };

  const renderApprovalRequestModal = () => (
    <Modal open={open} onClose={handleModal} center>
      <Form
        className="p-3"
        onSubmit={type === "Approval" ? handleApprove : handleReject}
      >
        <Form.Group controlId="subject">
          <Form.Label>{type} Remark</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Enter remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <button
          type="submit"
          disabled={!remark}
          className="btn custom-btn-primary"
        >
          {type === "Approval" ? "Approve" : "Reject"}
        </button>
      </Form>
    </Modal>
  );

  return (
    <>
      {renderApprovalRequestModal()}
      <Card>
        <Card.Header>Employee: {leaveRequest.employee}</Card.Header>
        <Card.Body>
          <Card.Text>
            From: {leaveRequest.start_date} <br />
            To: {leaveRequest.end_date}
          </Card.Text>
          <Card>
            <Card.Header>Type: {leaveRequest.leave_type}</Card.Header>
            <Card.Body>
              <Card.Title>
                Total days: {leaveRequest.work_days_in_leave_period}
              </Card.Title>
              <Card.Text>
                Request Remark: {leaveRequest.requestor_remark}
              </Card.Text>
              <Card.Text>
                Submitted:{Date(Date.parse(leaveRequest.submission_date))}
              </Card.Text>
            </Card.Body>
          </Card>
          {leaveRequest.status === "pending" ? (
            <Message variant="warning">Pending</Message>
          ) : leaveRequest.status === "approved" ? (
            <Message variant="success">Approved</Message>
          ) : leaveRequest.status === "declined" ? (
            <Message variant="danger">Declined</Message>
          ) : null}
          <p>Approved at: {Date(Date.parse(leaveRequest?.approval_date))}</p>
          <p>Approver: {leaveRequest?.approver}</p>
          <p>Approver's Remark: {leaveRequest?.approver_remark}</p>
          {user.is_superuser && leaveRequest.status === "pending" && (
            <Row>
              <Col md={6}>
                <button
                  onClick={toggleApproveModal}
                  className="btn btn-block custom-btn-primary"
                >
                  Approve
                </button>
              </Col>
              <Col md={6}>
                <button
                  onClick={toggleRejectModal}
                  className="btn btn-block btn-danger"
                >
                  Reject
                </button>
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default RequestComponent;
