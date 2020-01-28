import React from 'react';

function Card(props) {
    return (
        <>
            <a className="main_card" target="_blank" rel="noopener noreferrer"
                href={props.item.url}>
                <picture>
                    <source srcSet={`${props.item.img} 1x, ${props.item.img1} 2x, ${props.item.img2} 3x`} media="(min-width: 600px)" />
                    <source srcSet={`${props.item.imgm} 1x, ${props.item.img1m} 2x, ${props.item.img2m} 3x`} media="(max-width: 599px)" />
                    <img className="main_card_img" src={props.item.img} alt={props.item.title}
                        srcSet={`${props.item.img1} 2x, ${props.item.img2} 3x`} />
                </picture>                
                <div>{props.item.title}</div>
            </a>
        </>
    );
}

export default Card;