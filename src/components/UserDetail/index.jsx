import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Paper, Divider } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchModel("/user/" + userId)
            .then((data) => setUser(data))
            .catch((error) => console.error("UserDetail fetch failed:", error));
    }, [userId]);

    if (!user) {
        return <Typography variant="body1">Loading...</Typography>;
    }

    return (
        <Paper className="user-detail-paper" elevation={3}>
            <Typography variant="h4" gutterBottom>
                {user.first_name} {user.last_name}
            </Typography>
            <Divider />
            <Typography variant="body1" gutterBottom>
                <strong>Location:</strong> {user.location}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {user.description}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Occupation:</strong> {user.occupation}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <Link to={"/photos/" + user._id}>
                    See {user.first_name}'s photos
                </Link>
            </Typography>
        </Paper>
    );
}

export default UserDetail;