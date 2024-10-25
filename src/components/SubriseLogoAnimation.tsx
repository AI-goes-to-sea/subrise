"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function SubriseLogoAnimation() {

  useEffect(() => {
    let select = (s: string) => document.querySelector(s),
      selectAll = (s: string) =>  document.querySelectorAll(s),
      mainSVG = select('#mainSVG')

    gsap.set('svg', {
      visibility: 'visible'
    })

    let tl = gsap.timeline({repeat: -1});
    tl.to('#allBoxes rect', {
      transformOrigin: '107% 50%',
      rotation: gsap.utils.wrap([180, -180]),
      stagger: {
        each: 0.14,
      }
    })
    .to('#allBoxes', {
      x: -112,
      duration: 0.5, // 使用固定的持续时间
      ease: 'linear'
    }, 0)

    gsap.set('#ref', {
      scaleY: -1,
      transformOrigin: '50% 50%'
    })
  }, []);

  return (
    <svg id="mainSVG"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="w-full h-[200px]">
      <defs>
        <g id="allBoxes">
          <rect x="62.92" y="231.96" width="100" height="100" fill="none"/>
          <rect x="185.14" y="231.96" width="100" height="100" rx="50"/>
          <rect x="305.14" y="231.96" width="100" height="100"/>
          <rect x="425.14" y="231.96" width="100" height="100" rx="50"/>
          <rect x="545.14" y="231.96" width="100" height="100"/>
          <rect x="665.14" y="231.96" width="100" height="100" rx="50"/>
          <rect x="785.14" y="231.96" width="100" height="100"/>
        </g>
      </defs>
	
      <use xlinkHref="#allBoxes" />
      <g id="ref">
        <use xlinkHref="#allBoxes" x="-0" y="100" opacity="0.1" />
      </g>
    </svg>
)}
  

export default SubriseLogoAnimation;