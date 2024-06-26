import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearEmail } from "../../redux/authSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  Drawer,
  MenuItem,
  InputBase,
  Paper,
  MenuList,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  setAnchorElNav,
  setAnchorElUser,
  setSearchQuery,
  clearHeaderState,
} from "../../redux/headerSlice";
import { jwtDecode } from "jwt-decode";
import API_BASE_URL from "../../helpers/apiConfig";

const pages = [
  { name: "Home", path: "/", icon: <HomeIcon sx={{ fontSize: 37 }} /> },
  {
    name: "Bookmarks",
    path: "/bookmarks",
    icon: <BookmarksIcon sx={{ fontSize: 30 }} />,
  },
  { name: "Chats", path: "/chats", icon: <ChatIcon sx={{ fontSize: 35 }} /> },
  {
    name: "Notifications",
    path: "/notifications",
    icon: <NotificationsIcon sx={{ fontSize: 35 }} />,
  },
];

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const [searchResults, setSearchResults] = useState({});
  const [open, setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const anchorElNav = useSelector((state) => state.header.anchorElNav);
  const anchorElUser = useSelector((state) => state.header.anchorElUser);
  const searchQuery = useSelector((state) => state.header.searchQuery);

  let testUser =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  //console.log(testUser);

 
  const settings = [
    { name: "Profile", path: `/profile/${parseInt(jwtDecode(testUser).sub)}` },
    { name: "Logout", path: "/logout" },
  ];

  const handleOpenNavMenu = (event) => {
    dispatch(setAnchorElNav(event.currentTarget));
  };

  const handleOpenUserMenu = (event) => {
    dispatch(setAnchorElUser(event.currentTarget));
  };

  const handleCloseNavMenu = () => {
    dispatch(setAnchorElNav(null));
  };

  const handleCloseUserMenu = () => {
    dispatch(setAnchorElUser(null));
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleSearch = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      console.error("Token not available.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${API_BASE_URL}/api/v1/users/search?input=${searchQuery}`, config)
      .then((response) => {
        setSearchResults(response.data);
        setOpen(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error searching:", error);
      });
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(clearEmail());
    dispatch(clearHeaderState());

    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <PeopleIcon
            sx={{ fontSize: 30, display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: "25px",
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            XBOOK
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <NavLink
                    to={page.path}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    {page.icon}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <PeopleIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            XBOOK
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={NavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  paddingLeft: { xs: "10px", md: "60px" },
                }}
              >
                {page.icon}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              position: "relative",
              borderRadius: 3,
              backgroundColor: "rgba(240, 240, 240, 0.7)",
              backdropFilter: "blur(5px)",
              marginRight: { xs: 1, md: 10 },
              display: { xs: searchOpen ? "flex" : "none", md: "flex" },
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                height: "100%",
              }}
            >
              <SearchIcon style={{ color: "gray" }} />

              <InputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                style={{ marginLeft: 4 }}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                    dispatch(setSearchQuery(""));
                  }
                }}
                ref={searchRef}
              />
            </div>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              marginLeft: { xs: "auto", md: 0 },
            }}
          >
            <IconButton
              size="large"
              aria-label="search"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={() => setSearchOpen(!searchOpen)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <SearchIcon />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <AccountCircleIcon sx={{ color: "white" }} fontSize="large" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={
                    setting.name === "Logout"
                      ? handleLogout
                      : handleCloseUserMenu
                  }
                >
                  <NavLink
                    to={setting.path}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    {setting.name}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>

      {open && (
        <Paper
          style={{
            position: "absolute",
            top: 70,
            right: 10,
            width: "90%",
            zIndex: 1,
          }}
        >
          <MenuList>
            {searchResults.length === 0 ? (
              <MenuItem>No results found</MenuItem>
            ) : (
              searchResults.map((result) => (
                <MenuItem
                  key={result.id}
                  onClick={() => {
                    handleCloseModal();
                    navigate(`/profile/${result.id}`);
                  }}
                >
                  {result.name} {result.surname}
                </MenuItem>
              ))
            )}
          </MenuList>
        </Paper>
      )}

      {searchOpen && (
        <Box
          sx={{
            position: "absolute",
            top: 70,
            left: 10,
            right: 10,
            backgroundColor: "white",
            zIndex: 1,
            borderRadius: 1,
            boxShadow: 3,
            p: 2,
            display: { xs: "flex", md: "none" },
          }}
        >
          <InputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                dispatch(setSearchQuery(""));
                setSearchOpen(false);
              }
            }}
            fullWidth
          />
          <IconButton onClick={() => setSearchOpen(false)}>
            <SearchIcon />
          </IconButton>
        </Box>
      )}

      <Drawer anchor="left" open={drawerOpen} onClose={handleCloseNavMenu}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleCloseNavMenu}
          onKeyDown={handleCloseNavMenu}
        >
          <List>
            {pages.map((page) => (
              <ListItem key={page.name} disablePadding>
                <ListItemButton component={NavLink} to={page.path}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
