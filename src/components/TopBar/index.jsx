import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useMatch } from "react-router-dom";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
    const userMatch = useMatch("/users/:userId");
    const photoMatch = useMatch("/photos/:userId");
    const [context, setContext] = useState("");

    const match = userMatch || photoMatch;
    const userId = match ? match.params.userId : undefined;
    const isPhotoView = Boolean(photoMatch);

    useEffect(() => {
        if (!userId) {
            setContext("");
            return;
        }
        let cancelled = false;
        fetchModel("/user/" + userId)
            .then((user) => {
                if (!cancelled && user) {
                    const name = user.first_name + " " + user.last_name;
                    setContext(isPhotoView ? "Photos of " + name : name);
                }
            })
            .catch((error) => console.error("TopBar fetch failed:", error));
        return () => {
            cancelled = true;
        };
    }, [userId, isPhotoView]);

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar>
                <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
                    Pham Quang Nam Hai
                </Typography>
                <Typography variant="h5" color="inherit">
                    {context}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;