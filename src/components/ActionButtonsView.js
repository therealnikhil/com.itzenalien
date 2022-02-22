import React, { useContext } from 'react';
import { GlobalState } from '../App';
import { ActionButtons, SectionNames } from '../content';

const ActionButtonsView = (props) => {
  const { side, buttons } = props;
  const { currentPage } = useContext(GlobalState);

  const renderedButtons = () => (
    ActionButtons
      .filter(button => buttons.includes(button.name.toLowerCase()))
      .map(button => (
        <div
          key={button.name}
          className={`social-button ${!!button.wide ? 'wide':''}`}
          onClick={() => window.open(button.url)}
        >
          <img src={button.iconURL} alt={`${button.name}-link-icon`} />
        </div>
      ))
  );

  return (
    <div className={`social-wrapper ${(currentPage === SectionNames[side]) ? 'show':''}`}>
      {renderedButtons()}
    </div>
  );
};

export default ActionButtonsView;