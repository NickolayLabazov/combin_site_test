import React, { useState, useEffect } from 'react';

import Review from './Review.jsx'

function Rewievs() {
    const [reviews, setReviews] = useState([
        {
            "name": "Rusty",
            "instagram_username": "pet.of.art",
            "text": "I have never come across an Instagram growth application like Combin. It has everything I need: PC-friendly, targeted hashtag search and many other handy features. Combin has worked wonders for my account @pet.of.art with getting new followers!"
        },
        {
            "name": "Brittney Jae",
            "instagram_username": "brittney_jae_",
            "text": "A friend of mine introduced me to Combin a few weeks ago and it's made my work life so much easier. As a brand ambassador, it's my duty to interact with as many of our supporters as possible. Combin allows me to search for specific hashtags associated with the topics of the event and comment on or like them. It also allows me to pinpoint specific locations that we want to target. I recommend Combin and will definitely continue using it myself."
        },
        {
            "name": "Calvin Uy",
            "instagram_username": "calvinathor",
            "text": "I really love the user interface. It is very user friendly. I love how the filter works. It is very useful. I am so happy I saw Combin, I am planning to be using this in the long run in supplement to other Instagram tools out there. It's a clean, and to the point experience in managing an Instagram account."
        }
    ])

    const [allReviews, setAllReviews] = useState([]);

    const [caruselPosition, setPosition] = useState({
        style: 'reviews__visible',
    })

    const [timer, setTime] = useState(true);

    function setAll(data) {
        setAllReviews(prevReview => prevReview.concat(data));
    }

    function newPosition(position) {
        setPosition(() => ({ style: position }));
    }

    function newReviews(rev) {
        setReviews(() => (rev));
    }

    function invTime() {
        setTime(prevTime => !prevTime);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/feedback_data`);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setAll(data);
                newReviews(data.slice(0, 3))
            } catch (e) {
                console.error(e)
            }
        }
        fetchUsers();
        // eslint-disable-next-line
    }, [])

    function handlerLeft() {
        newPosition('reviews__visible_left');
        const index = allReviews.indexOf(reviews[0]);
        let newRev = null;
        if (index < allReviews.length - 3) {
            newRev = allReviews.slice(index + 1, index + 4)
        } else if (index === allReviews.length - 3) {
            newRev = allReviews.slice(index + 1, index + 3).concat(allReviews[0]);
        } else if (index === allReviews.length - 2) {
            newRev = [allReviews[index + 1]].concat(allReviews.slice(0, 2));
        } else {
            newRev = allReviews.slice(0, 3);
        }
        if (timer) {
            invTime();
            setTimeout(() => {
                newReviews(newRev);
                newPosition('reviews__visible');
                invTime();
            }, 300);
        }
    }

    function handlerRight() {
        newPosition('reviews__visible_right');
        const index = allReviews.indexOf(reviews[0]);
        let newRev = null;
        if (index === 0) {
            newRev = [allReviews[allReviews.length - 1]].concat(allReviews.slice(0, 2));
        } else if (index === allReviews.length - 1) {
            newRev = allReviews.slice(allReviews.length - 2, allReviews.length).concat([allReviews[0]]);
        } else if (index === allReviews.length - 2) {
            newRev = allReviews.slice(allReviews.length - 3, allReviews.length);
        } else {
            newRev = allReviews.slice(index - 1, index + 2);
        }
        if (timer) {
            invTime();
            setTimeout(() => {
                invTime();
                newReviews(newRev);
                newPosition('reviews__visible');
            }, 300);
        }
    }

    return (
        <div className="reviews">
            <div className={caruselPosition.style}>
                {reviews.map(review => <Review review={review} key={review.name} />)}
            </div>
            <div className="reviews_buttons" >
                <div className="reviews__buttons_button" onClick={handlerLeft}>
                    <svg className="reviews__buttons_button_symb" x="0px" y="0px" viewBox="0 0 492 492">
                        <g>
                             <path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12
                                 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084
                                 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864
                                 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z" />
                        </g>
                     </svg> 
                </div>
                <div className="reviews__buttons_button" onClick={handlerRight}>
                    <svg className="reviews__buttons_button_symb" x="0px" y="0px" viewBox="0 0 492 492">
                        <g>
                            <path d="M382.678,226.804L163.73,7.86C158.666,2.792,151.906,0,144.698,0s-13.968,2.792-19.032,7.86l-16.124,16.12
                                 c-10.492,10.504-10.492,27.576,0,38.064L293.398,245.9l-184.06,184.06c-5.064,5.068-7.86,11.824-7.86,19.028
                                 c0,7.212,2.796,13.968,7.86,19.04l16.124,16.116c5.068,5.068,11.824,7.86,19.032,7.86s13.968-2.792,19.032-7.86L382.678,265
                                 c5.076-5.084,7.864-11.872,7.848-19.088C390.542,238.668,387.754,231.884,382.678,226.804z" />
                        </g>
                     </svg> 
                </div>
            </div>
        </div>
    );
}

export default Rewievs;