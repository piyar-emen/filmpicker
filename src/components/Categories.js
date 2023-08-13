import React, { useContext } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { Context } from '../context/Context';
import constant from '../constants/constant';
import { GetWithToken } from '../api/crud';
import { motion } from 'framer-motion';

function Categories() {
    const {
        showCategories, setShowCategories,
        categories,
        language,
        activePage,
        setTopRated,
        setPopular
    } = useContext(Context);

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.7,
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    const getFilmsByCategory = async (e) => {
        const filteredFilms = [];
        if (activePage === "popular") {
            if (language === "EN") {
                for (let i = 1; i < 15; i++) {
                    const populars = await GetWithToken(`${constant.popular}${constant.enLanguage}${constant.pageText}${i}`).then(x => { return x.data });
                    const filtered = populars.results.filter(film => film.genre_ids.includes(parseInt(e.target.value)));
                    filteredFilms.push(...filtered);
                }
            }

            else {
                for (let i = 1; i < 15; i++) {
                    const populars = await GetWithToken(`${constant.popular}${constant.trLanguage}${constant.pageText}${i}`).then(x => { return x.data });
                    const filtered = populars.results.filter(film => film.genre_ids.includes(parseInt(e.target.value)));
                    filteredFilms.push(...filtered);
                }
            }
            setPopular(filteredFilms);
        }

        else {
            if (language === "EN") {
                for (let i = 1; i < 15; i++) {
                    const topRateds = await GetWithToken(`${constant.topRated}${constant.enLanguage}${constant.pageText}${i}`).then(x => { return x.data });
                    const filtered = topRateds.results.filter(film => film.genre_ids.includes(parseInt(e.target.value)));
                    filteredFilms.push(...filtered);
                }
            }

            else {
                for (let i = 1; i < 15; i++) {
                    const topRateds = await GetWithToken(`${constant.topRated}${constant.trLanguage}${constant.pageText}${i}`).then(x => { return x.data });
                    const filtered = topRateds.results.filter(film => film.genre_ids.includes(parseInt(e.target.value)));
                    filteredFilms.push(...filtered);
                }
            }
            setTopRated(filteredFilms);
        }
        setShowCategories(false);
    }

    return (
        <Offcanvas show={showCategories} onHide={() => setShowCategories(false)}>
            <Offcanvas.Header closeButton className='border-bottom border-2 border-black'>
                <Offcanvas.Title className='border-5 border-black'>
                    {language === "EN" ?
                        <span>Categories</span> :
                        <span>Kategoriler</span>
                    }
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <motion.ul variants={container} initial="hidden" animate="visible" className='d-flex flex-wrap list-unstyled'>
                    {
                        categories.map((category, index) =>
                            <motion.li variants={item} key={index}>
                                <Button className='mb-3 me-3 categoryButton' onClick={getFilmsByCategory} value={category.id}>{category.name}</Button>
                            </motion.li>
                        )
                    }
                </motion.ul>
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default Categories