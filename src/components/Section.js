import React, { useContext } from 'react';
import { GlobalState } from '../App';
import ActionButtonsView from './ActionButtonsView';
import { SectionNames } from '../content';

const Section = (props) => {
  const { isLeft = false, children } = props;
  const { currentPage } = useContext(GlobalState);

  const getContent = () => {
    if (isLeft) {
      return (
        <>
          <ActionButtonsView side="left" buttons={['instagram','youtube','spotify']} />
          {children}
        </>
      );
    }

    return (
      <>
        {children}
        <ActionButtonsView side="right" buttons={['linkedin', 'github', 'instagram']} />
      </>
    );
  }

  return (
    <div className={`${isLeft ? 'fixed left': 'right'}-tile ${
      (currentPage !== null && currentPage !== SectionNames[isLeft ? 'left' : 'right']) ?
      'hide-mobile':
      (currentPage === SectionNames[isLeft ? 'left' : 'right']) ? 'show-mobile' : ''}`
    }>
      {getContent()}
    </div>
  );
};

export default Section;