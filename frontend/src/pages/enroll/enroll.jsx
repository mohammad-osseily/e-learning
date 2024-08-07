import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { jwtDecode } from "jwt-decode";
import { getNotInClasses } from "../../store/classes/classesActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { createEnroll } from "../../store/enrollment/enrollmentActions";
import Swal from "sweetalert2";

const Enroll = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const studentId = user.id;
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const loading = useSelector((state) => state.classes.loading);
  const error = useSelector((state) => state.classes.error);

  useEffect(() => {
    dispatch(getNotInClasses(studentId));
  }, [dispatch, studentId]);

  const handleEnroll = (classId) => {
    dispatch(createEnroll(studentId, classId));
    Swal.fire({
      title: "Success!",
      text: "Enrollment created successfully",
      icon: "success",
      timer: 3000,
      showConfirmButton: false,
    });
  };

  const MultiActionAreaCard = ({ classItem }) => (
    <Card className="max-w-xs max-h-72">
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/class-room-background-illustration_274608-455.avif"
          alt="class image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {classItem.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {classItem.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Instructor: {classItem.instructor.name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleEnroll(classItem._id)}
        >
          Enroll
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center p-4">
        <h2 className="text-2xl font-bold mb-4">Enroll in Classes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message || JSON.stringify(error)}</p>}
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((classItem) => (
              <MultiActionAreaCard key={classItem._id} classItem={classItem} />
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Enroll;
