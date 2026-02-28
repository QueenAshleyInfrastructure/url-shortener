import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import SearchResults from './pages/SearchResults';

export default function App() {
  return (
    <FavoritesProvider>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>
    </FavoritesProvider>
  );
}
