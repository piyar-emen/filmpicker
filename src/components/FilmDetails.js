import React, { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import { Context } from '../context/Context';
import constant from '../constants/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

function FilmDetails() {
    const {
        showFilmDetail, setShowFilmDetail,
        filmDetailPoster, setFilmDetailPoster,
        selectedFilm,
        selectedFilmVideoKey,
        language
    } = useContext(Context);

    return (
        <Modal show={showFilmDetail} onHide={() => setShowFilmDetail(false)} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header className='d-flex justify-content-center' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <span className='modal-title'>{selectedFilm.title}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='filmmodal-overview px-4'>
                <div className='position-relative' role='button' onClick={() => { setFilmDetailPoster(false) }}>
                    {filmDetailPoster === true ?
                        <div className='d-flex justify-content-center'>
                            <img src={`${constant.posterUrl}${selectedFilm.backdrop_path}`} alt="" className='modal-img' />
                            <FontAwesomeIcon icon={faPlayCircle} className='position-absolute top-50 start-50 translate-middle fa-6x play-icon' />
                        </div> :
                        <div className='d-flex justify-content-center'>
                            <iframe className='video' src={`${constant.filmTrailer}${selectedFilmVideoKey}?autoplay=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    }
                </div>
                <div className='mt-3'>
                    <div>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.summary}</span> :
                                <span className='fw-medium'>{constant.tr.summary}</span>
                        }
                        <span className='ms-1'>{selectedFilm.overview}</span>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.prodCompanies}</span> :
                                <span className='fw-medium'>{constant.tr.prodCompanies}</span>
                        }
                        <ul>
                            {selectedFilm.production_companies.map((com, index) =>
                                <li key={index}>{`${com.name}`}</li>
                            )}
                        </ul>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.prodCountries}</span> :
                                <span className='fw-medium'>{constant.tr.prodCountries}</span>
                        }
                        <ul>
                            {selectedFilm.production_countries.map((co, index) =>
                                <li key={index}>{`${co.name}`}</li>
                            )}
                        </ul>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.releaseDate}</span> :
                                <span className='fw-medium'>{constant.tr.releaseDate}</span>
                        }
                        <span className='ms-1'>{selectedFilm.release_date}</span>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.revenue}</span> :
                                <span className='fw-medium'>{constant.tr.revenue}</span>
                        }
                        <span className='ms-1'>{selectedFilm.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.runtime}</span> :
                                <span className='fw-medium'>{constant.tr.runtime}</span>
                        }
                        <span className='ms-1'>{`${selectedFilm.runtime} minutes`}</span>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.voteCount}</span> :
                                <span className='fw-medium'>{constant.tr.voteCount}</span>
                        }
                        <span className='ms-1'>{selectedFilm.vote_count}</span>
                    </div>
                    <div className='mt-3'>
                        {
                            language === "EN" ?
                                <span className='fw-medium'>{constant.en.voteAverage}</span> :
                                <span className='fw-medium'>{constant.tr.voteAverage}</span>
                        }
                        <span className='ms-1'>{`${selectedFilm.vote_average} / 10`}</span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default FilmDetails