import React, { useContext } from 'react';
import { GlobalActions } from '../App';
import { SectionNames, TechContent } from '../content';

const TechView = (props) => {
  const { onClickSection } = useContext(GlobalActions);
  
  return (
    <div className="section shown" onClick={() => onClickSection(SectionNames.right)}>
      <div className="scrollable">
      {
        Object.keys(TechContent).map((category, index) => (
          <div key={category} className="category-wrapper">
            <h1>{category[0].toUpperCase() + category.slice(1)}</h1>
            <div className="software-list-wrapper">
              <ul>
                {
                  TechContent[category].past.map(software => (
                    <li className="software-text">{software}</li>
                  ))
                }
              </ul>
              <ul>
                {
                  TechContent[category].present.length > 0 &&
                  <p className="nextup-text">Next Up...</p>
                }
                {
                  TechContent[category].present.map(software => (
                    <li className="software-text">{software}</li>
                  ))
                }
              </ul>
            </div>
            {
              (index < Object.keys(TechContent).length - 1) &&
              <div className="hr" />
            }
          </div>
        ))
      }
      </div>
    </div>
  );
};

export default TechView;