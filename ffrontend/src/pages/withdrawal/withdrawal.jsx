import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { getStudentEnrollments } from "../../store/enrollment/enrollmentActions";
import {
  createWithdrawal,
  getWithdrawals,
} from "../../store/withdrawal/withdrawalActions";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Swal from "sweetalert2";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");
  const withdrawals = useSelector((state) => state.withdrawal.withdrawal);
  const enrollments = useSelector((state) => state.enrollment.enrollment);
  const loading = useSelector(
    (state) => state.withdrawal.loading || state.enrollment.loading
  );
  const error = useSelector(
    (state) => state.withdrawal.error || state.enrollment.error
  );

  const handleUnenroll = (classId, studentId) => {
    dispatch(createWithdrawal(classId, studentId));
    Swal.fire({
      title: "Success!",
      text: "Withdrawal request sent successfully",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      dispatch(getWithdrawals(decoded.id));
      dispatch(getStudentEnrollments(decoded.id));
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/");
    }
  }, [dispatch, navigate, token]);

  return (
    <div className="mainwithdrawal">
      <Navbar />
      <div className="flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold mb-4">My Withdrawals</h2>
        <div className="withdrawalcards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {withdrawals && withdrawals.length > 0 ? (
            withdrawals.map((withdrawal) => (
              <WithdrawalCard key={withdrawal._id} withdrawal={withdrawal} />
            ))
          ) : (
            <p>No withdrawals available</p>
          )}
        </div>
        <h2 className="text-2xl font-bold mt-8 mb-4">My Enrollments</h2>
        <div className="enrollments grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {enrollments && enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <EnrollmentCard
                key={enrollment._id}
                enrollment={enrollment}
                studentId={userId}
                onUnenroll={handleUnenroll}
              />
            ))
          ) : (
            <p>No enrollments available</p>
          )}
        </div>
      </div>
    </div>
  );
};

const WithdrawalCard = ({ withdrawal }) => (
  <Card className="max-w-xs max-h-72">
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/class-room-background-illustration_274608-455.avif"
        alt="class image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Class Title: {withdrawal.class ? withdrawal.class.title : "N/A"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reason: {withdrawal.reason || "N/A"}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

const EnrollmentCard = ({ enrollment, studentId, onUnenroll }) => (
  <Card className="max-w-xs max-h-72">
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/class-room-background-illustration_274608-455.avif"
        alt="class image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Class Title: {enrollment.class ? enrollment.class.title : "N/A"}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => onUnenroll(enrollment.class._id, studentId)}
      >
        Unenroll
      </Button>
    </CardActions>
  </Card>
);

export default Withdrawal;
