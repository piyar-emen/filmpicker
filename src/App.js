import { useContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Context';
import { Context } from './context/Context';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Popular from './components/Popular';
import FilmDetails from './components/FilmDetails';
import Categories from './components/Categories';
import Footer from './components/Footer';

function App() {
  return (
    <Provider>
      <div className='bg-black d-flex flex-column' style={{ minHeight: "100vh" }}>
        <div style={{flex: 1}}>
          <Navbar />
          <AppWrapper />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </Provider>
  )
}

function AppWrapper() {
  const { activePage } = useContext(Context);
  const { showFilmDetail } = useContext(Context);
  const { showCategories } = useContext(Context);

  return (
    <div>
      <div>
            {
              activePage === "home" &&
              <>
                <Home />
              </>

            }
            {
              activePage === "popular" &&
              <>
                <Popular />
              </>
            }
            {
              showFilmDetail &&
              <FilmDetails />
            }
            {
              showCategories &&
              <Categories />
            }
          </div>

    </div>
  )
}

export default App;
