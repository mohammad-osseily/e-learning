import React, { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { getclasses } from "../../store/classes/classesActions";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);

  useEffect(() => {
    dispatch(getclasses());
  }, [dispatch]);

  const MultiActionAreaCard = ({ title, description, instructorName }) => {
    return (
      <Card className="max-w-xs max-h-72">
        <CardActionArea>
          <CardMedia
            className="h-28"
            component="img"
            height="140"
            image="/erik-mclean-VOUicg8Ejus-unsplash.jpg"
            alt="class image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructor: {instructorName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="flex flex-col items-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes && classes.length > 0 ? (
            classes.map((classItem) => (
              <MultiActionAreaCard
                key={classItem._id}
                title={classItem.title}
                description={classItem.description}
                instructorName={classItem.instructor.name}
              />
            ))
          ) : (
            <p>No classes available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
