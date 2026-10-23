import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Paper, Typography, Divider } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const { userId } = useParams();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetchModel("/photosOfUser/" + userId)
            .then((data) => setPhotos(data))
            .catch((error) => console.error("UserPhotos fetch failed:", error));
    }, [userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <Box>
            {photos.map((photo) => (
                <Paper key={photo._id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        Taken on: {formatDate(photo.date_time)}
                    </Typography>
                    <img
                        src={"/images/" + photo.file_name}
                        alt={photo.file_name}
                        style={{ width: "100%", maxWidth: 500, display: "block", margin: "8px 0" }}
                    />
                    {photo.comments && photo.comments.map((comment) => (
                        <Box key={comment._id} sx={{ marginTop: 1 }}>
                            <Typography variant="body2">
                                <strong>
                                    <Link to={"/users/" + comment.user._id}>
                                        {comment.user.first_name} {comment.user.last_name}
                                    </Link>
                                </strong>
                                {" "}— {formatDate(comment.date_time)}
                            </Typography>
                            <Typography variant="body1">
                                {comment.comment}
                            </Typography>
                            <Divider sx={{ marginTop: 1 }} />
                        </Box>
                    ))}
                </Paper>
            ))}
        </Box>
    );
}

export default UserPhotos;