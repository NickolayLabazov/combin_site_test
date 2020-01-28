import React, { useState } from 'react';

import img1 from '../static/image/desktop/img1.png';
import img12 from '../static/image/desktop/img1@2x.png';
import img13 from '../static/image/desktop/img1@3x.png';
import img2 from '../static/image/desktop/img2.png';
import img22 from '../static/image/desktop/img2@2x.png';
import img23 from '../static/image/desktop/img2@3x.png';
import img3 from '../static/image/desktop/img3.png';
import img32 from '../static/image/desktop/img3@2x.png';
import img33 from '../static/image/desktop/img3@3x.png';

import img1m from '../static/image/mobile/img1.png';
import img12m from '../static/image/mobile/img1@2x.png';
import img13m from '../static/image/mobile/img1@3x.png';
import img2m from '../static/image/mobile/img2.png';
import img22m from '../static/image/mobile/img2@2x.png';
import img23m from '../static/image/mobile/img2@3x.png';
import img3m from '../static/image/mobile/post3.png';
import img32m from '../static/image/mobile/post3@2x.png';
import img33m from '../static/image/mobile/post3@3x.png';

import News from './News.jsx'

import Card from "./Card.jsx";

function Main() {

    const [news, setNews] = useState([])
    const content = [
        {
            "id": 1,
            "title": "Instagram FAQ — All You Need To Know",
            "url": "https://blog.combin.com/instagram-faq-all-you-need-to-know-bb2559ac606b",
            "img": img1,
            "img1": img12,
            "img2": img13,
            "imgm": img1m,
            "img1m": img12m,
            "img2m": img13m,
        },
        {
            "id": 2,
            "title": "DMEXCO 2019 — Meet Combin in Cologne",
            "url": 'https://blog.combin.com/dmexco-2019-meet-combin-in-cologne-b845529a1e63',
            "img": img2,
            "img1": img22,
            "img2": img23,
            "imgm": img2m,
            "img1m": img22m,
            "img2m": img23m,
        },
        {
            "id": 3,
            "title": "Limits Display, New User Preview, New Filters, and Many More Features — All about Combin 2.1",
            "url": 'https://blog.combin.com/limits-display-new-user-preview-new-filters-and-many-more-features-all-about-combin-2-1-d78713383da7',
            "img": img3,
            "img1": img32,
            "img2": img33,
            "imgm": img3m,
            "img1m": img32m,
            "img2m": img33m,
        }
    ];

    function dateCompare(a, b) {
        const yearA = Number(a.date.slice(0, 4));
        const monthA = Number(a.date.slice(5, 7));
        const dayA = Number(a.date.slice(8, 10));

        const yearB = Number(b.date.slice(0, 4));
        const monthB = Number(b.date.slice(5, 7));
        const dayB = Number(b.date.slice(8, 10));

        if (yearA > yearB) {
            return -1
        } else if (yearA < yearB) {
            return 1
        } else {
            if (monthA > monthB) {
                return -1
            } else if (monthA < monthB) {
                return 1
            } else {
                if (dayA > dayB) {
                    return -1
                } else {
                    return 1
                }
            }
        }
    }

    async function More() {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/blog_posts`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            data.sort((a, b) => dateCompare(a, b));
            setNews(() => (data))
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <div className="title">
                What's new?
            </div>

            <div className="main">
                {content.map(item => <Card item={item} key={item.id} />)}
            </div>

            <div className="down">
                {news.length === 0 ?
                    <div className="down__text" onClick={More}>Read More

                        <svg className="down__text_symb" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                         viewBox="0 0 451.847 451.847" >
                            <g>
                                <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
                                      c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
                                      c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/>
                            </g>
                       </svg>
                    </div> : null
                }
                <div>
                    {news.map(item => <News item={item} key={item.id} />)}
                </div>
            </div>
        </>
    );
}

export default Main;