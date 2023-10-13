import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { GetWithToken } from '../api/crud';
import constant from '../constants/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faFire, faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Navbar as RBNavbar, Nav, Container } from 'react-bootstrap';

function Navbar() {
    const {
        language, setLanguage,
        activePage, setActivePage,
        setCategories, setShowCategories,
        setSelectedFilmVideoKey,
        setShowFilmDetail,
        setSelectedFilm,
        setFilmDetailPoster
    } = useContext(Context);

    const [searchedFilmName, setSearchedFilmName] = useState();
    const [foundFilms, setFoundFilms] = useState([]);

    const getTopRated = () => {
        setActivePage("home");
    }

    const getCategories = async () => {
        if (language === "EN") {
            var categories = await GetWithToken(`${constant.categories}${constant.enLanguage}`).then(x => { return x.data });
        }

        else {
            var categories = await GetWithToken(`${constant.categories}${constant.trLanguage}`).then(x => { return x.data });
        }
        setCategories(categories.genres);
        setShowCategories(true);
    }

    const getPopular = () => {
        setActivePage("popular");
    }

    const languageTR = () => {
        setLanguage("TR");
    }

    const languageEN = () => {
        setLanguage("EN");
    }

    const findFilm = async (e) => {
        if (e.target.value.length > 2) {
            setSearchedFilmName(e.target.value);
            if (language === "EN") {
                var film = await GetWithToken(constant.findFilm + e.target.value + constant.adultTrue + <constant className="enL"></constant> + constant.pageText + "1").then(x => { return x.data });
            }

            else {
                var film = await GetWithToken(constant.findFilm + e.target.value + constant.adultTrue + constant.trLanguage.replace("?", "") + constant.pageText + "1").then(x => { return x.data });
            }
            setFoundFilms(film.results);
        }

        else {
            setSearchedFilmName(null);
        }
    }

    useEffect(() => {
        if (activePage === "home") {
            getTopRated();
        }

        else {
            getPopular();
        }
    }, [language])

    const filmClicked = async (e) => {
        if (language === "EN") {
            var details = await GetWithToken(`${constant.filmDetails}${e.target.id}${constant.enLanguage}`).then(x => { return x.data });
        }

        else {
            var details = await GetWithToken(`${constant.filmDetails}${e.target.id}${constant.trLanguage}`).then(x => { return x.data });
        }
        setSelectedFilm(details);
        setShowFilmDetail(true);
        setFilmDetailPoster(true);
        var video = await GetWithToken(`${constant.filmDetails}${e.target.id}/videos?language=en-US`).then(x => { return x.data });
        const trailer = video.results.filter(v => v.name.toLowerCase().includes("trailer") && v.type === "Trailer")
        if (trailer.length > 0) {
            setSelectedFilmVideoKey(trailer[0].key);
        }

        else {
            if (video.results.length > 0) {
                setSelectedFilmVideoKey(video.results[0].key);
            }
        }
    }

    return (
        <header className='header'>
            <RBNavbar collapseOnSelect expand='lg' className='px-0 py-3'>
                <Container>
                    <div className='w-100 d-lg-flex align-items-baseline'>
                        <div className='d-flex justify-content-between'>
                            <RBNavbar.Brand className='nav-item p-0 my-0'>
                                <button className='navbar-brand m-0 navbar-item'>
                                    <span>filmpicker</span>
                                </button>
                            </RBNavbar.Brand>
                            <RBNavbar.Toggle aria-controls="responsive-navbar-nav" className='ms-auto my-2' />
                        </div>
                        <RBNavbar.Collapse id="responsive-navbar-nav" className='d-lg-flex justify-content-lg-between w-lg-100 align-items-center'>
                            <Nav className='d-flex align-items-center'>
                                <Nav.Link className='nav-item mx-lg-4 p-0 mt-0'>
                                    <button className='text-decoration-none navbar-item' onClick={getTopRated} style={{ border: activePage === "home" && "2px #7161ef solid", borderRadius: activePage === "home" && "5px" }}>
                                        {
                                            language === "EN" ?
                                                <>
                                                    <FontAwesomeIcon icon={faHouse} className='fa-sm me-1' />
                                                    <span>{constant.en.home}</span>
                                                </> :
                                                <>
                                                    <FontAwesomeIcon icon={faHouse} className='fa-sm me-1' />
                                                    <span>{constant.tr.home}</span>
                                                </>
                                        }
                                    </button>
                                </Nav.Link>
                                <Nav.Link className='nav-item me-lg-4 p-0 my-1 mt-md-0'>
                                    <button className='text-decoration-none navbar-item' onClick={getPopular} style={{ border: activePage === "popular" && "2px #7161ef solid", borderRadius: activePage === "popular" && "5px" }}>
                                        {
                                            language === "EN" ?
                                                <>
                                                    <FontAwesomeIcon icon={faFire} className='fa-sm me-1' />
                                                    <span>{constant.en.popular}</span>
                                                </> :
                                                <>
                                                    <FontAwesomeIcon icon={faFire} className='fa-sm me-1' />
                                                    <span>{constant.tr.popular}</span>
                                                </>
                                        }
                                    </button>
                                </Nav.Link>
                                <Nav.Link className='nav-item me-lg-4 p-0my-1 mt-md-0'>
                                    <button className='text-decoration-none navbar-item' onClick={getCategories}>
                                        {
                                            language === "EN" ?
                                                <>
                                                    <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} className='fa-sm me-1' />
                                                    <span>{constant.en.categories}</span>
                                                </> :
                                                <>
                                                    <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} className='fa-sm me-1' />
                                                    <span>{constant.tr.categories}</span>
                                                </>
                                        }
                                    </button>
                                </Nav.Link>
                                <Nav.Link className='nav-item p-0 my-1 mt-md-0 d-flex dropdownWidth justify-content-end' as='a'>
                                    <Dropdown drop='down-centered' className='w-100'>
                                        <Dropdown.Toggle className='p-0' as="div">
                                            <input className="form-control me-2 form-control-sm w-100 text-center" type="search" placeholder={language === "EN" ? "Search Film (Min 3 Char)" : "Film Ara (En az 3 Kr.)"} aria-label="Search" onChange={findFilm} />
                                        </Dropdown.Toggle>
                                        {
                                            searchedFilmName && searchedFilmName.length > 2 &&
                                            <Dropdown.Menu show={true} className='w-100' style={{ maxHeight: '30vh', maxWidth: '100%', overflow: "auto" }}>
                                                {
                                                    foundFilms.map(film =>
                                                        <Dropdown.Item onClick={filmClicked} id={film.id} key={film.id} as='a'>
                                                            {film.title}
                                                        </Dropdown.Item>
                                                    )
                                                }
                                            </Dropdown.Menu>
                                        }
                                    </Dropdown>
                                </Nav.Link>
                            </Nav>
                            <Nav className='d-flex align-items-center my-1 mt-md-0'>
                                <Nav.Link className='nav-item p-0 my-0'>
                                    <button className='text-decoration-none navbar-item' onClick={languageTR}>
                                        <span>TR</span>
                                    </button>
                                    <span className='text-white'> / </span>
                                    <button className='text-decoration-none navbar-item' onClick={languageEN}>
                                        <span>EN</span>
                                    </button>
                                </Nav.Link>
                            </Nav>
                        </RBNavbar.Collapse>

                    </div>
                </Container>
            </RBNavbar>
        </header>
    )
}

export default Navbar
