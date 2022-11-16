import * as AnimationFile from './AnimationFile';
import './SolarSystemAnimation.css';

// AnimationFile();
function SolarSystemAnimation() {
  return (
    <div className='solar_system'>
      <div id='bucket'>{AnimationFile()}</div>
    </div>
  );
}

export default SolarSystemAnimation;
