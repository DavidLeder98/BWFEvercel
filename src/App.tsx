import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Nav from './components/navbar/Nav';
import Footer from './components/footer/Footer';
import { CartProviderGuest } from './services/cart/CartContextGuest';
import { CartProviderUser } from './services/cart/CartContextUser';
import { AuthProvider } from './services/account/AuthContext';
import ProtectedRoute from './services/account/ProtectedRoute';

import Home from './pages/marketing/Home';
import Deals from './pages/marketing/Deals';
import BestSellers from './pages/marketing/BestSellers';
import CartPage from './pages/marketing/CartPage';

import BookDetailsPage from './pages/products/BookDetailsPage';
import AllBooksPage from './pages/products/AllBooksPage';
import CategoryPage from './pages/products/CategoryPage';
import AllCategoriesPage from './pages/products/AllCategoriesPage';
import AuthorPage from './pages/products/AuthorPage';
import AuthorsPage from './pages/products/AuthorsPage';

import Sorry from './pages/other/Sorry';
import Privacy from './pages/other/Privacy';
import About from './pages/other/About';
import HiddenMessage from './pages/other/HiddenMessage';
import Boring from './pages/other/Boring';

import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import AccountPage from './pages/account/AccountPage';
import AccountUpdatePage from './pages/account/AccountUpdatePage';


import AdminPage from './pages/managment/AdminPage';

import AdminAuthorPage from './pages/managment/author/AdminAuthorPage';
import AdminAuthorCreatePage from './pages/managment/author/AdminAuthorCreatePage';
import AdminAuthorEditPage from './pages/managment/author/AdminAuthorEditPage';
import AdminAuthorDeletePage from './pages/managment/author/AdminAuthorDeletePage';

import AdminBookPage from './components/admin/book/AdminBook';
import AdminBookCreatePage from './pages/managment/book/AdminBookCreatePage';
import AdminBookEditPage from './pages/managment/book/AdminBookEditPage';
import AdminBookDeletePage from './pages/managment/book/AdminBookDeletePage';

import AdminCategoryPage from './pages/managment/category/AdminCategoryPage';
import AdminCategoryCreatePage from './pages/managment/category/AdminCategoryCreatePage';
import AdminCategoryEditPage from './pages/managment/category/AdminCategoryEditPage';
import AdminCategoryDeletePage from './pages/managment/category/AdminCategoryDeletePage';

import AdminBundlePage from './pages/managment/bundle/AdminBundlePage';
import AdminBundleEditPage from './pages/managment/bundle/AdminBundleEditPage';

function App() {
  return (
    <>
      <AuthProvider>
        <CartProviderUser>
          <CartProviderGuest>
            <BrowserRouter>
              <div className="main-content col">
                <Nav />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/bestsellers" element={<BestSellers />} />
                  <Route path="/cart" element={<CartPage />} />

                  <Route path="/allbooks" element={<AllBooksPage />} />
                  <Route path="/book/:id" element={<BookDetailsPage />} />
                  <Route path="/allcategories" element={<AllCategoriesPage />} />
                  <Route path="/category/:id" element={<CategoryPage />} />
                  <Route path="/author/:id" element={<AuthorPage />} />
                  <Route path="/authors" element={<AuthorsPage />} />

                  <Route path="/sorry" element={<Sorry />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/hiddenmessage" element={<HiddenMessage />} />
                  <Route path="/easteregg" element={<Boring />} />

                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/update" element={<AccountUpdatePage />} />

                  {/* Protected Admin Routes */}
                  <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
                  <Route path="/admin/book" element={<ProtectedRoute element={<AdminBookPage />} />} />
                  <Route path="/admin/book/create" element={<ProtectedRoute element={<AdminBookCreatePage />} />} />
                  <Route path="/admin/book/edit/:id" element={<ProtectedRoute element={<AdminBookEditPage />} />} />
                  <Route path="/admin/book/delete/:id" element={<ProtectedRoute element={<AdminBookDeletePage />} />} />

                  <Route path="/admin/author" element={<ProtectedRoute element={<AdminAuthorPage />} />} />
                  <Route path="/admin/author/create" element={<ProtectedRoute element={<AdminAuthorCreatePage />} />} />
                  <Route path="/admin/author/edit/:id" element={<ProtectedRoute element={<AdminAuthorEditPage />} />} />
                  <Route path="/admin/author/delete/:id" element={<ProtectedRoute element={<AdminAuthorDeletePage />} />} />

                  <Route path="/admin/category" element={<ProtectedRoute element={<AdminCategoryPage />} />} />
                  <Route path="/admin/category/create" element={<ProtectedRoute element={<AdminCategoryCreatePage />} />} />
                  <Route path="/admin/category/edit/:id" element={<ProtectedRoute element={<AdminCategoryEditPage />} />} />
                  <Route path="/admin/category/delete/:id" element={<ProtectedRoute element={<AdminCategoryDeletePage />} />} />

                  <Route path="/admin/bundle" element={<ProtectedRoute element={<AdminBundlePage />} />} />
                  <Route path="/admin/bundle/edit/:id" element={<ProtectedRoute element={<AdminBundleEditPage />} />} />
                </Routes>
                <Footer />
              </div>
            </BrowserRouter>
          </CartProviderGuest>
        </CartProviderUser>
      </AuthProvider>
    </>
  );
}


export default App
