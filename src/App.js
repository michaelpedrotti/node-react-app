import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UnauthorizedError, ForbiddenError, NotFoundError  } from "./pages/error";
import { HomeIndex, HomeLayout } from "./pages/home";
import { AuthLogin } from "./pages/auth";
import { UserLayout, UserIndex, UserShow, UserEdit, UserNew } from "./pages/user";
import { ProfileLayout, ProfileIndex, ProfileShow, ProfileForm } from "./pages/profile";
import { PermissionLayout, PermissionIndex, PermissionShow, PermissionForm } from "./pages/permission";
import { SessionContextProvider } from "./contexts/session"
import { AuthenticatedRoute } from "./middlewares/authentication";
import { AuthorizatedRoute } from "./middlewares/authorization";
import "./App.css";
import { ErrorContextProvider } from "./contexts/error";

export default function App() {

  return (
    <SessionContextProvider>
      <ErrorContextProvider>
        <BrowserRouter>
            <Routes>
                
                {/* Private pages */}
                <Route path="/" element={  
                  <AuthenticatedRoute>
                      <HomeLayout />
                  </AuthenticatedRoute>
                }>
                  <Route index element={<HomeIndex />} />
                </Route>

                {/* Private user pages */}
                <Route path="/user" element={
                  <AuthenticatedRoute>
                    <AuthorizatedRoute>
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
                  <AuthenticatedRoute>
                    <AuthorizatedRoute>
                      <ProfileLayout />
                    </AuthorizatedRoute>
                  </AuthenticatedRoute>
                }>
                  <Route index element={<ProfileIndex />} />
                  <Route path=":id" element={<ProfileShow />} /> 
                  <Route path=":id/edit" element={<ProfileForm />} />
                  <Route path="new" element={<ProfileForm />} />
                </Route>

                {/* Private profile pages */}
                <Route path="/permission" element={
                  <AuthenticatedRoute>
                    <AuthorizatedRoute>
                      <PermissionLayout />
                    </AuthorizatedRoute> 
                  </AuthenticatedRoute>
                }>
                  <Route index element={<PermissionIndex />} />
                  <Route path=":id" element={<PermissionShow />} /> 
                  <Route path=":id/edit" element={<PermissionForm />} />
                  <Route path="new" element={<PermissionForm />} />
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
      </ErrorContextProvider>
    </SessionContextProvider>
  );
}