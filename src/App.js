import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UnauthorizedError, ForbiddenError, NotFoundError  } from "./pages/error";
import { HomeIndex, HomeLayout } from "./pages/home";
import { AuthLogin } from "./pages/auth";
import { UserLayout, UserIndex, UserShow, UserEdit, UserNew } from "./pages/user";
import { ProfileLayout, ProfileIndex, ProfileShow, ProfileEdit, ProfileNew } from "./pages/profile";
import { PermissionLayout, PermissionIndex, PermissionShow, PermissionEdit, PermissionNew } from "./pages/permission";
import { SessionContextProvider } from "./contexts/session"
import { AuthenticatedRoute } from "./middlewares/authentication";
import { AuthorizatedRoute } from "./middlewares/authorization";
import "./App.css";

export default function App() {

  return (
    <SessionContextProvider>
      <BrowserRouter>
          <Routes>
              
              {/* Private pages */}
              <Route path="/" element={  
                <AuthenticatedRoute redirectTo="/unauthorized">
                    <HomeLayout />
                </AuthenticatedRoute>
              }>
                <Route index element={<HomeIndex />} />
              </Route>

              {/* Private user pages */}
              <Route path="/user" element={
                <AuthenticatedRoute redirectTo="/unauthorized">
                  <AuthorizatedRoute redirectTo="/forbidden">
                    <UserLayout />
                  </AuthorizatedRoute>
                </AuthenticatedRoute>
              }>
                <Route index element={<UserIndex />} />
                <Route path=":id" element={<UserShow />} /> 
                <Route path=":id/edit" element={<UserEdit />} />
                <Route path="new" element={<UserNew />} />
              </Route>

              {/* Private profile pages */}
              <Route path="/profile" element={
                <AuthenticatedRoute redirectTo="/unauthorized">
                  <AuthorizatedRoute redirectTo="/forbidden">
                    <ProfileLayout />
                  </AuthorizatedRoute>
                </AuthenticatedRoute>
              }>
                <Route index element={<ProfileIndex />} />
                <Route path=":id" element={<ProfileShow />} /> 
                <Route path=":id/edit" element={<ProfileEdit />} />
                <Route path="new" element={<ProfileNew />} />
              </Route>

              {/* Private profile pages */}
              <Route path="/permission" element={
                <AuthenticatedRoute redirectTo="/unauthorized">
                  <AuthorizatedRoute redirectTo="/forbidden">
                    <PermissionLayout />
                  </AuthorizatedRoute> 
                </AuthenticatedRoute>
              }>
                <Route index element={<PermissionIndex />} />
                <Route path=":id" element={<PermissionShow />} /> 
                <Route path=":id/edit" element={<PermissionEdit />} />
                <Route path="new" element={<PermissionNew />} />
              </Route>
              
              {/* Public pages */}
              <Route path="/login" element={<AuthLogin />} />
              <Route path="/redirect" element={ <Navigate to="/login" /> } />

              {/* Public errors pages */}
              <Route path="/unauthorized" element={<UnauthorizedError />} />
              <Route path="/forbidden" element={<ForbiddenError />} />
              <Route path="*" element={<NotFoundError />} />
              
          </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  );
}