import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({ left: false });
  const pages = ["login", "getUsers", "addUser"];
  // eslint-disable-next-line no-unused-vars
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        bgcolor: "primary.main1",
      }}
    >
      <React.Fragment key={"left"}>
        <Button variant="contained" onClick={toggleDrawer("left", true)}>
          <i className="fa-solid fa-bars" style={{ fontSize: "1.5rem" }}></i>{" "}
          All Categories
        </Button>

        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>

      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Link to={page}  key={page} underline="none">
            <Button
            id={page}
              key={page}
              onClick={handleCloseNavMenu}
              variant="outlined"
              // eslint-disable-next-line no-dupe-keys
              sx={{
                my: 2,
                color: "white",
                display: "block",
                color: "secondary.main",
              }}
            >
              {page}
            </Button>
          </Link>
        ))}
      </Box>

      <Box>
        <Button variant="contained">
          <i className="fa-solid fa-bolt"></i>Deal Today
        </Button>
      </Box>
    </Box>
  );
}
