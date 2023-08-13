import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import { Context } from '../context/Context';
import { GetWithToken } from '../api/crud';
import constant from '../constants/constant';
import { Card, Button, Container } from 'react-bootstrap';
import { faCircleInfo, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import Loading from './Loading';

function Popular() {
    const {
        popular, setPopular,
        language,
        setSelectedFilm,
        setShowFilmDetail,
        setFilmDetailPoster,
        setSelectedFilmVideoKey    
    } = useContext(Context);

    const [page, setPage] = useState(1);
    const [isloading, setIsLoading] = useState(true);

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

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [popular])

    useEffect(() => {
        getPopular();
    }, [page, language])

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
            setSelectedFilmVideoKey(video.results[0].key);
        }
    }

    const nextPopular = () => {
        setPage(page + 1);
    }

    const previousPopular = () => {
        setPage(page - 1);
    }

    const getPopular = async () => {
        if (language === "EN") {
            var populars = await GetWithToken(`${constant.popular}${constant.enLanguage}${constant.pageText}${page}`).then(x => { return x.data });
        }

        else {
            var populars = await GetWithToken(`${constant.popular}${constant.trLanguage}${constant.pageText}${page}`).then(x => { return x.data });
        }
        setPopular(populars.results);
        setIsLoading(false);
        window.scrollTo(0, 0);
    }

    return (
        <>
            {
                isloading ?
                    <Loading /> :
                    <div className='mt-3'>
                        <Container className='d-flex justify-content-center flex-column align-items-center px-md-3 px-5'>
                            <motion.ul variants={container} initial="hidden" animate="visible" className='d-flex flex-wrap justify-content-center gap-3 p-0'>
                                {popular.map((popular, index) =>
                                    <motion.li variants={item} key={index} className='d-flex rated-films basis1'>
                                        <Card className="overflow-hidden">
                                            <div className='overflow-hidden'>
                                                <Card.Img variant='top' src={`${constant.posterUrl}${popular.backdrop_path}`} alt="" className='filmcard-img' id={popular.id} onClick={filmClicked} />
                                            </div>
                                            <Card.Header className='fw-medium'>
                                                {popular.title}
                                            </Card.Header>
                                            <Card.Body className='filmcard-overview py-1'>
                                                {popular.overview}
                                            </Card.Body>
                                            <Card.Footer className='d-flex align-items-center justify-content-end py-1'>
                                                <Button className='details-link border-0 bg-transparent p-0 m-0' id={popular.id} onClick={filmClicked}>
                                                    {
                                                        language === "EN" ?
                                                            <span className='me-1 p-0' role='button' id={popular.id} onClick={filmClicked}>{constant.en.details}</span> :
                                                            <span className='me-1 p-0' role='button' id={popular.id} onClick={filmClicked}>{constant.tr.details}</span>
                                                    }
                                                    <FontAwesomeIcon icon={faCircleInfo} role='button' id={popular.id} onClick={filmClicked} />
                                                </Button>
                                            </Card.Footer>
                                        </Card>
                                    </motion.li>
                                )}
                            </motion.ul>
                            {
                                popular.length === 20 &&
                                <div className='w-100'>
                                    {
                                        language === "EN" ?
                                            <div className='d-flex justify-content-center'>
                                                {
                                                    page > 1 &&
                                                    <Button className="previousPageButton w-25 ms-2 d-flex align-items-center justify-content-center" onClick={previousPopular}>
                                                        <span className='me-2'>{constant.en.previousPage}</span>
                                                        <FontAwesomeIcon icon={faArrowLeft} />
                                                    </Button>
                                                }
                                                <Button className="nextPageButton w-25 ms-2 d-flex align-items-center justify-content-center" onClick={nextPopular}>
                                                    <span className='me-2'>{constant.en.nextPage}</span>
                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                </Button>
                                            </div> :
                                            <div className='d-flex justify-content-center'>
                                                {
                                                    page > 1 &&
                                                    <Button className="nextPageButton w-25 ms-2 d-flex align-items-center justify-content-center" onClick={previousPopular}>
                                                        <span className='me-2'>{constant.tr.previousPage}</span>
                                                        <FontAwesomeIcon icon={faArrowLeft} />
                                                    </Button>
                                                }
                                                <Button className="nextPageButton w-25 d-flex align-items-center justify-content-center ms-2" onClick={nextPopular}>
                                                    <span className='me-2'>{constant.tr.nextPage}</span>
                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                </Button>
                                            </div>
                                    }
                                </div>
                            }
                        </Container>
                    </div>
            }
        </>
    )
}

export default Popular