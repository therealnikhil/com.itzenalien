import React, { useContext, useCallback, createRef } from 'react';
import { GlobalActions, GlobalState } from '../App';
import MusicView from '../components/MusicView';
import Section from '../components/Section';
import TechView from '../components/TechView';
import { SectionNames } from '../content';
import { useSquare } from '../util';

const Home = (props) => {
  const { currentPage, lightMode } = useContext(GlobalState);
  const { onClickSection } = useContext(GlobalActions);
  const squareRef = createRef();
  const height = useSquare(squareRef);

  const getLeftView = useCallback(() => {
    if (currentPage === SectionNames.left) {
      return <MusicView />
    }
    return (
      <div className="section hidden" onClick={() => onClickSection(SectionNames.left)}>
        <div className="playlist-wrapper">
          <div id="playlist-img" ref={squareRef} style={{ width: `${
            !!height ? height : 'auto'}` }} />
          <p className="widescreen-only">Always</p>
        </div>
      </div>
    );
  }, [currentPage, squareRef, height, onClickSection]);

  const getRightView = useCallback(() => {
    if (currentPage === SectionNames.right) {
      return <TechView />
    }
    return (
      <div className="section hidden" onClick={() => onClickSection(SectionNames.right)}>
        <p>{'<'}<span className="widescreen-only">
          Learning
        </span>{'/>'}</p>
      </div>
    );
  }, [currentPage, onClickSection]);
  
  return (
    <div className="wallpaper">
      <div className={`dynamic-screen hour-${(new Date()).getHours()}`}>
        <div className={`content ${lightMode === true ? 'light' : 'dark'}`}>
          <Section name={SectionNames.left} isLeft={true}>{getLeftView()}</Section>
          <Section name={SectionNames.right}>{getRightView()}</Section>
        </div>
      </div>
    </div>
  );
};

export default Home;