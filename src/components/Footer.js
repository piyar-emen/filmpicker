import React, { useContext } from 'react';
import { Context } from '../context/Context';
import constant from '../constants/constant';

function Footer() {
    const { language } = useContext(Context);
    return (
        <div>
            {
                language === "EN" ?
                    <footer className='footer justify-content-center d-flex align-items-center mt-5'>
                        <span className='text-white'>{constant.en.developedBy} <a href="https://www.linkedin.com/in/piyaremen/" className='text-decoration-none footer-link' target='_blank'>Piyar Emen</a></span>
                    </footer> :
                    <footer className='footer justify-content-center d-flex align-items-center mt-5'>
                        <span className='text-white'><a href="https://www.linkedin.com/in/piyaremen/" className='text-decoration-none footer-link' target='_blank'>Piyar Emen</a> {constant.tr.developedBy}</span>
                    </footer>
            }
        </div>
    )
}

export default Footer