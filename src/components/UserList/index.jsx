import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

import "./styles.css";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchModel("/user/list")
            .then((data) => setUsers(data))
            .catch((error) => console.error("UserList fetch failed:", error));
    }, []);

    return (
      <div>
        <List component="nav">
          {users.map((item) => (
            <React.Fragment key={item._id}>
              <ListItem>
                <ListItemText
                  primary={
                    <Link to={"/users/" + item._id}>
                      {item.first_name} {item.last_name}
                    </Link>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    );
}

export default UserList;