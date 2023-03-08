import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundError from "./pages/error";
import HomeIndex from "./pages/home";
import { UserLayout, UserIndex, UserShow, UserEdit, UserNew } from "./pages/user";
import "./App.css";
import { AuthenticatedRoute } from "./middlewares/authentication";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomeIndex />} />
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserIndex />} />
              <Route path=":id" element={<UserShow />} /> 
              <Route path=":id/edit" element={<UserEdit />} />
              <Route path="new" element={<UserNew />} />
            </Route>
            <Route path="/about" element={
              <AuthenticatedRoute redirectTo="/">
                <h1>Done</h1>
              </AuthenticatedRoute>
            } />
            <Route path="/redirect" element={ <Navigate to="/user" /> } />
            <Route path="*" element={<NotFoundError />} />
        </Routes>
    </BrowserRouter>
  );
}