import { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
    const [language, setLanguage] = useState("EN");
    const [activePage, setActivePage] = useState("home");
    const [topRatedPage, setTopRatedPage] = useState(1);
    const [popularPage, setPopularPage] = useState(1);
    const [homeIsClicked, setHomeIsClicked] = useState(true);
    const [topRated, setTopRated] = useState([]);
    // const [topRatedAfterFilter, setTopRatedAfterFilter] = useState([]);
    const [categoriesIsClicked, setCategoriesIsClicked] = useState(false);
    const [categories, setCategories] = useState([]);
    const [popularIsClicked, setPopularIsClicked] = useState(false);
    const [popular, setPopular] = useState([]);
    const [showFilmDetail, setShowFilmDetail] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState("");
    const [selectedFilmVideoKey, setSelectedFilmVideoKey] = useState("");
    const [filmDetailPoster, setFilmDetailPoster] = useState(true);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [ratedFilms, setRatedFilms] = useState([]);
    const [user, setUser] = useState();

    const data = { language, setLanguage, activePage, setActivePage, topRatedPage, setTopRatedPage, popularPage, setPopularPage, homeIsClicked, setHomeIsClicked, topRated, setTopRated, categoriesIsClicked, setCategoriesIsClicked, categories, setCategories, popularIsClicked, setPopularIsClicked, popular, setPopular, showFilmDetail, setShowFilmDetail, showCategories, setShowCategories, selectedFilm, setSelectedFilm, selectedFilmVideoKey, setSelectedFilmVideoKey, filmDetailPoster, setFilmDetailPoster, signUpClicked, setSignUpClicked, ratedFilms, setRatedFilms, user, setUser }

    return (
        <Context.Provider value={data}>
            {children}
        </Context.Provider>
    )
}

export default Provider;