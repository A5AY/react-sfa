import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  Button,
} from "@mui/material";
import {
  People,
  ListAlt,
  History,
  Description,
  Logout,
  Assessment,
} from "@mui/icons-material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const drawerWidth = 240;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    { label: "顧客一覧", icon: <People />, path: "/" },
    { label: "顧客リスト（未実装）", icon: <ListAlt />, path: "/list" },
    { label: "活動履歴一覧（未実装）", icon: <History />, path: "/activities" },
    { label: "契約一覧（未実装）", icon: <Description />, path: "/contracts" },
    { label: "Yahoo天気予報（未実装）", icon: <Assessment />, path: "/weather" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "white",
          },
        }}
      >
        <List>
          {menuItems.map((item) => {
            const selected = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: selected ? "rgba(255,255,255,0.15)" : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.25)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)" }} />

        <Box sx={{ mt: "auto", p: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              logout();
              navigate("/login");
            }}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
            startIcon={<Logout />}
          >
            ログアウト
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
