import React from 'react';

function Rewiev(props) {
    return (
        < div className="reviews__box">
            <div className="reviews__left">
                <div className="reviews__review">
                    {props.review.text}
                </div>
                <div className="reviews__review_name"><span>{props.review.name}</span><span className="reviews__review_name_comma">,</span> <span className="reviews__review_username">{props.review.instagram_username}</span>
                </div>
            </div>

            <div className="reviews__right">
                <div className="reviews_ring"></div>
            </div>
        </div>
    );
}

export default Rewiev;