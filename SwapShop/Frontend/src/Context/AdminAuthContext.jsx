import { createContext } from "react";

const AdminAuthContext = createContext({
  admin: null,
  login: () => {},
  logout: () => {},
  fetchAdmin: () => {},
});

export default AdminAuthContext;
