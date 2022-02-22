import React, { useContext, useCallback, useEffect, useRef } from 'react';
import { GlobalActions, GlobalState } from '../App';
import MusicView from '../components/MusicView';
import Section from '../components/Section';
import TechView from '../components/TechView';
import { SectionNames } from '../content';
import gsap from 'gsap';

const Home = (props) => {
  const { currentPage, lightMode } = useContext(GlobalState);
  const { onClickSection } = useContext(GlobalActions);
  const contentRef = useRef();
  const leftTextRef = useRef();
  const rightTextRef = useRef();
  const fontAnimationTimeline = useRef();

  useEffect(() => {
    if (!!currentPage) {
      const q = gsap.utils.selector(contentRef);
      
      gsap.from(q('.section.shown'), {
        opacity: 0,
        paddingTop: '100%',
        duration: 1,
        ease: 'power3.out'
      });
    }
  }, [currentPage, contentRef]);

  const animateFont = (isLeft) => {
    fontAnimationTimeline.current = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: {
        duration: 1,
        ease: 'power3.inout'
      }
    })
    .to(isLeft ? leftTextRef.current : rightTextRef.current, {
      fontSize: '2.175rem'
    });
  };

  const stopAnimateFont = (isLeft) => {
    if (!!fontAnimationTimeline.current) {
      fontAnimationTimeline.current.kill();
    }
    
    gsap
    .to(isLeft ? leftTextRef.current : rightTextRef.current, {
      fontSize: '1.875rem',
      duration: 1,
      ease: 'power3.out'
    });
  };

  const hideSection = useCallback((isLeft) => {
    const tl = gsap.timeline({defaults: { duration: 1 }});
    const q = gsap.utils.selector(contentRef);
    
    tl
    .to(q('.section.shown'), {
      opacity: 0,
      paddingTop: '100%',
      ease: 'power3.inout',
      onComplete: () => {
        onClickSection(isLeft ? SectionNames.left : SectionNames.right);

        tl
        .from(q(`${isLeft ? '.left':'.right'}-tile .section.hidden`), {
          opacity: 0,
          ease: 'expo.inout',
          onComplete: () => {
            tl.kill();
          }
        });
      }
    });
  }, [contentRef, onClickSection]);

  const getLeftView = useCallback(() => {
    if (currentPage === SectionNames.left) {
      return <MusicView onHide={hideSection} />
    }
    return (
      <div
        className="section hidden"
        onClick={() => onClickSection(SectionNames.left)}
        onMouseEnter={() => animateFont(true)}
        onMouseLeave={() => stopAnimateFont(true)}
      >
        <div className="playlist-wrapper">
          <div id="playlist-img" />
          <p ref={leftTextRef} className="widescreen-only">Always</p>
        </div>
      </div>
    );
  }, [currentPage, leftTextRef, onClickSection, hideSection]);

  const getRightView = useCallback(() => {
    if (currentPage === SectionNames.right) {
      return <TechView onHide={hideSection} />
    }
    return (
      <div
        className="section hidden"
        onClick={() => onClickSection(SectionNames.right)}
        onMouseEnter={() => animateFont(false)}
        onMouseLeave={() => stopAnimateFont(false)}
      >
        <p ref={rightTextRef}>{'<'}<span className="widescreen-only">
          Learning
        </span>{'/>'}</p>
      </div>
    );
  }, [currentPage, rightTextRef, onClickSection, hideSection]);
  
  return (
    <div className="wallpaper">
      <div className={`dynamic-screen hour-${(new Date()).getHours()}`}>
        <div className={`content ${lightMode === true ? 'light' : 'dark'}`} ref={contentRef}>
          <Section name={SectionNames.left} isLeft={true}>{getLeftView()}</Section>
          <Section name={SectionNames.right}>{getRightView()}</Section>
        </div>
      </div>
    </div>
  );
};

export default Home;