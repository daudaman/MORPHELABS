import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItemButton, ListItemText } from "@mui/material";
import Login from "./Login.jsx";
import ContentManager from "./ContentManager.jsx";

const DRAWER_WIDTH = 200;

function Shell({ user, onLogout }) {
  return (
    <Box display="flex">
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6">CMS Admin</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">{user.name} ({user.role})</Typography>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: DRAWER_WIDTH, [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH } }}>
        <Toolbar />
        <List>
          <ListItemButton component={Link} to="/posts"><ListItemText primary="Blog" /></ListItemButton>
          <ListItemButton component={Link} to="/services"><ListItemText primary="Services" /></ListItemButton>
          <ListItemButton component={Link} to="/careers"><ListItemText primary="Careers" /></ListItemButton>
        </List>
      </Drawer>
      <Box component="main" flexGrow={1} p={3} mt={8}>
        <Routes>
          <Route path="/posts" element={<ContentManager resource="posts" label="Blog Posts" />} />
          <Route path="/services" element={<ContentManager resource="services" label="Services" />} />
          <Route path="/careers" element={<ContentManager resource="careers" label="Careers" />} />
          <Route path="*" element={<Navigate to="/posts" />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <BrowserRouter>
      {user ? <Shell user={user} onLogout={logout} /> : <Login onLogin={setUser} />}
    </BrowserRouter>
  );
}
