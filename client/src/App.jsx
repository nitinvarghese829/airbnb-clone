import { Routes, Route } from 'react-router-dom'
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./components/Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import {UserContextProvider} from "./UserContext.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PublicPlaces from "./pages/PublicPlaces.jsx";
import BookingDetailPage from "./pages/BookingDetailPage.jsx";
import BookinngsPage from "./pages/BookinngsPage.jsx";

axios.defaults.baseURL  = 'http://localhost:4000';
axios.defaults.withCredentials = true;
function App() {
  return (
      <UserContextProvider>
          <Routes>
              <Route path={'/'} element={<Layout />}>
                  <Route index element={<IndexPage />} />
                  <Route path={'/login'} element={<LoginPage />} />
                  <Route path={'/register'} element={<RegisterPage />} />
                  <Route path={'/account/:subpage?'} element={<AccountPage />} />
                  <Route path={'/account/accommodations/new'} element={<PlacesFormPage />} />
                  <Route path={'/account/accommodations/:id'} element={<PlacesFormPage />} />
                  <Route path={'/accommodations/:id'} element={<PublicPlaces />} />
                  <Route path={'/account/booking/:id'} element={<BookingDetailPage />} />

              </Route>
          </Routes>
      </UserContextProvider>

  )
}

export default App
