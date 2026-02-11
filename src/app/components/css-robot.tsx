'use client';
import './css-robot.css';

export default function CssRobot() {
  return (
    <div className="robot-container-css">
      <div className="robot-body-css">
        <div className="robot-head-css">
          <div className="robot-eye-css left"></div>
          <div className="robot-eye-css right"></div>
          <div className="robot-antenna-css">
            <div className="antenna-light-css"></div>
          </div>
        </div>
      </div>
      <div className="robot-shadow-css"></div>
    </div>
  );
}
