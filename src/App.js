import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UnauthorizedError, ForbiddenError, NotFoundError  } from "./pages/error";
import { HomeIndex, HomeLayout } from "./pages/home";
import { AuthLayout, AuthLogin, AuthSetting } from "./pages/auth";
import { UserLayout, UserIndex, UserShow, UserForm } from "./pages/user";
import { ProfileLayout, ProfileIndex, ProfileShow, ProfileForm } from "./pages/profile";
import { SessionContextProvider } from "./contexts/session"
import { AuthenticatedRoute } from "./middlewares/authentication";
import { AuthorizatedRoute } from "./middlewares/authorization";
import "./App.css";
import store from './stores/index';
import { Provider } from 'react-redux';
import { ErrorContextProvider } from "./contexts/error";

export default function App() {


  

  return (
    <Provider store={store}>
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
                    <Route path=":id/edit" element={<UserForm />} />
                    <Route path="new" element={<UserForm />} />
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
                  
                  {/* Public pages */}
                  <Route path="/login" element={<AuthLogin />} />
                  <Route path="/redirect" element={ <Navigate to="/login" /> } />

                  <Route path="/setting" element={  
                    <AuthenticatedRoute>
                        <AuthLayout />
                    </AuthenticatedRoute>
                  }>
                    <Route index element={<AuthSetting />} />
                  </Route>
                  
                  {/* Public errors pages */}
                  <Route path="/unauthorized" element={<UnauthorizedError />} />
                  <Route path="/forbidden" element={<ForbiddenError />} />
                  <Route path="*" element={<NotFoundError />} />
                  
              </Routes>
          </BrowserRouter>
        </ErrorContextProvider>
      </SessionContextProvider>
    </Provider>
  );
}