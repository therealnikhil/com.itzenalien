import React, { useContext } from 'react';
import { GlobalActions, GlobalState } from '../App';
import { MusicContent as MC, SectionNames } from '../content';

const TrackView = (props) => {
  const { track, id } = props;
  const { lightMode } = useContext(GlobalState);

  return (
    <div className="track-wrapper">
      <img className="cover-art" src={track.coverArtURL ?? ''} alt={`${id}-cover-art`} />
      <p className="track-title">{track.title}</p>
      <div className="listen-button-wrapper" onClick={() => window.open(track.distrokidURL, '_blank')}>
        <img src={`/add-track-${lightMode ? 'dark' : 'light'}.png`} alt="listen-button-icon" />
      </div>
    </div>
  );
};

const MusicView = (props) => {
  const { onClickSection } = useContext(GlobalActions);
  
  return (
    <div className="section shown" onClick={() => onClickSection(SectionNames.left)}>
      <div className="past-music">
        <iframe
          id="youtube-frame"
          src={MC.tracks[MC.spotlight].youtubeURL}
          title={MC.tracks[MC.spotlight].title}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen>
        </iframe>

        <div className="track-list">
          {
            Object.keys(MC.tracks).map((track) => (
              <>
                <TrackView track={MC.tracks[track]} key={track} id={track} />
                <div className="hr" key={`line-after-${track}`} />
              </>
            ))
          }
        </div>
      </div>
      <div style={{ flexDirection: 'column' }}>
        <p className="nextup-text">Next Up...</p>
        <div className="upcoming-music">
          <img className="cover-art large" src={MC.upcoming.ep.coverArtURL ?? ''} alt="ep-cover-art" />
          <div className="upcoming-track-details">
            <h4>{MC.upcoming.ep.title}</h4>
            <p className="subtitle">{MC.upcoming.ep.date.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicView;