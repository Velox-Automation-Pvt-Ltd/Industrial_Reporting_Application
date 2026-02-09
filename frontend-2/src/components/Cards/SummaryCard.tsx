import React from 'react';
import styled from 'styled-components';

const SummaryCard = () => {
  return (
    <StyledWrapper>
      <div className="battery-widget-container">
        <div className="widget-container">
          <div className="border-glow" />
          <div className="battery-widget">
            <div className="particles">
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
              <div className="particle" />
            </div>
            <div className="mirror-polish" />
            <div className="shine" />
            <div className="percentage">69%</div>
            <div className="status">
              <span className="icon">⚡</span>
              <span>CHARGING</span>
            </div>
            <div className="info-row">
              <div className="health-info">
                <span className="icon">🔋</span>
                <span>96% BATTERY HEALTH</span>
              </div>
              <div className="cycles-info">
                <span className="icon">🔄</span>
                <span>215 CYCLES</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="segment active" />
              <div className="segment active" />
              <div className="segment active" />
              <div className="segment" />
              <div className="segment" />
              <div className="segment" />
              <div className="segment" />
              <div className="segment" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .battery-widget-container {
    --bg-color: #212121;
    --card-bg: #1a1a1a;
    --card-highlight: #2a2a2a;
    --card-shadow: #141414;
    --text-primary: #ffffff;
    --text-secondary: rgba(255, 255, 255, 0.7);
    --charging-color: #4ade80;
    --progress-color: #4ade80;
    --progress-bg: rgba(255, 255, 255, 0.1);
    background-color: var(--bg-color);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    perspective: 1000px;
  }

  .battery-widget-container .widget-container {
    position: relative;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
  }

  .battery-widget-container .border-glow {
    position: absolute;
    width: 280px;
    height: 280px;
    border-radius: 28px;
    pointer-events: none;
    z-index: 1;
    background: transparent;
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
    clip-path: path(
      'M 28 0 C 12 0 0 12 0 28 V 90 M 0 190 V 252 C 0 268 12 280 28 280 H 90 M 190 280 H 252 C 268 280 280 268 280 252 V 190 M 280 90 V 28 C 280 12 268 0 252 0 H 190'
    );
    animation: borderPulse 8s infinite ease-in-out;
  }

  @keyframes borderPulse {
    0%,
    100% {
      box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
    }
    50% {
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    }
  }

  .battery-widget-container .battery-widget {
    position: relative;
    width: 260px;
    height: 260px;
    border-radius: 28px;
    background: linear-gradient(
      145deg,
      var(--card-shadow) 0%,
      var(--card-bg) 40%,
      var(--card-highlight) 65%,
      var(--card-shadow) 100%
    );
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.05);
    padding: 30px 25px;
    z-index: 2;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-style: preserve-3d;
  }

  /* Enhanced hover effects */
  .battery-widget-container .battery-widget:hover {
    transform: scale(1.02) rotateX(5deg) rotateY(5deg);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 60px rgba(74, 222, 128, 0.2);
    animation: cardFloat 6s infinite ease-in-out;
  }

  @keyframes cardFloat {
    0%,
    100% {
      transform: scale(1.02) rotateX(5deg) rotateY(5deg) translateY(0);
    }
    50% {
      transform: scale(1.02) rotateX(3deg) rotateY(3deg) translateY(-10px);
    }
  }

  /* Enhanced percentage animation */
  .battery-widget-container .percentage {
    font-size: 64px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 5px;
    position: relative;
    z-index: 5;
    --random-x: 100px;
    --fall-distance: 150px;
    --random-rotate: 45deg;
    animation: fall 4s infinite, percentageGlow 3s infinite alternate;
  }

  @keyframes percentageGlow {
    0% {
      text-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
    }
    100% {
      text-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
    }
  }

  /* Enhanced status animation */
  .battery-widget-container .status {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
    font-size: 12px;
    letter-spacing: 0.5px;
    margin-bottom: 25px;
    position: relative;
    z-index: 5;
    --random-x: -120px;
    --fall-distance: 180px;
    --random-rotate: -30deg;
    animation: fall 4s infinite 0.2s, statusPulse 2s infinite;
  }

  @keyframes statusPulse {
    0%,
    100% {
      opacity: 0.7;
    }
    50% {
      opacity: 1;
    }
  }

  .battery-widget-container .icon {
    display: inline-block;
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  .battery-widget-container .battery-widget:hover .icon {
    transform: scale(1.2);
    opacity: 1;
  }

  /* Enhanced info row animations */
  .battery-widget-container .info-row {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 25px;
    position: relative;
    z-index: 5;
  }

  .battery-widget-container .health-info,
  .battery-widget-container .cycles-info {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
    font-size: 12px;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .battery-widget-container .health-info {
    --random-x: 80px;
    --fall-distance: 200px;
    --random-rotate: 60deg;
    animation: fall 4s infinite 0.4s, healthPulse 4s infinite;
  }

  @keyframes healthPulse {
    0%,
    100% {
      color: var(--text-secondary);
    }
    50% {
      color: var(--charging-color);
    }
  }

  .battery-widget-container .cycles-info {
    --random-x: -90px;
    --fall-distance: 160px;
    --random-rotate: -45deg;
    animation: fall 4s infinite 0.6s, cyclesFloat 3s infinite;
  }

  @keyframes cyclesFloat {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(5px);
    }
  }

  /* Enhanced progress bar */
  .battery-widget-container .progress-bar {
    display: flex;
    gap: 4px;
    width: 100%;
    margin-top: auto;
    position: relative;
    z-index: 5;
    transform-style: preserve-3d;
  }

  .battery-widget-container .segment {
    flex: 1;
    height: 4px;
    background-color: var(--progress-bg);
    border-radius: 2px;
    animation: segmentFall 3s infinite, segmentBreath 2s infinite alternate;
  }

  @keyframes segmentBreath {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }

  .battery-widget-container .segment.active {
    background-color: var(--progress-color);
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.3);
    animation: segmentFall 3s infinite, activeSegmentGlow 2s infinite alternate;
  }

  @keyframes activeSegmentGlow {
    0% {
      box-shadow: 0 0 8px rgba(74, 222, 128, 0.3);
    }
    100% {
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.6);
    }
  }

  /* Enhanced mirror polish */
  .battery-widget-container .mirror-polish {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
    z-index: 4;
    pointer-events: none;
    animation: polishMove 8s infinite alternate;
  }

  @keyframes polishMove {
    0% {
      background-position: 30% 30%;
    }
    100% {
      background-position: 70% 70%;
    }
  }

  /* Enhanced shine effect */
  .battery-widget-container .shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0.03) 20%,
      rgba(255, 255, 255, 0.1) 40%,
      rgba(255, 255, 255, 0.03) 60%,
      transparent 100%
    );
    z-index: 3;
    pointer-events: none;
    animation: enhancedShine 4s infinite, shineRotate 15s infinite linear;
  }

  @keyframes shineRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  /* Enhanced particles */
  .battery-widget-container .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .battery-widget-container .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--charging-color);
    border-radius: 50%;
    animation: particleFloat 3s infinite, particlePulse 2s infinite alternate;
  }

  @keyframes particlePulse {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.5);
    }
  }

  /* Additional particles for more complexity */
  .battery-widget-container .particle:nth-child(6) {
    --float-x: 70px;
    --float-y: -50px;
    left: 10%;
    top: 20%;
    animation-delay: 1s;
    width: 3px;
    height: 3px;
  }

  .battery-widget-container .particle:nth-child(7) {
    --float-x: -30px;
    --float-y: 80px;
    left: 70%;
    top: 80%;
    animation-delay: 1.2s;
    width: 2px;
    height: 2px;
  }

  .battery-widget-container .particle:nth-child(8) {
    --float-x: 20px;
    --float-y: -70px;
    left: 40%;
    top: 10%;
    animation-delay: 1.4s;
    width: 3px;
    height: 3px;
  }

  /* Background grid pattern */
  .battery-widget-container .battery-widget::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 20px 20px;
    z-index: 1;
    animation: gridMove 20s infinite linear;
  }

  @keyframes gridMove {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 40px 40px;
    }
  }

  /* Subtle border animation */
  .battery-widget-container .battery-widget::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    pointer-events: none;
    animation: borderFlicker 5s infinite alternate;
  }

  @keyframes borderFlicker {
    0%,
    100% {
      border-color: rgba(255, 255, 255, 0.05);
    }
    50% {
      border-color: rgba(255, 255, 255, 0.1);
    }
  }

  /* Charging animation */
  .battery-widget-container .battery-widget:hover .status .icon {
    animation: chargingBounce 0.8s infinite alternate;
  }

  @keyframes chargingBounce {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.3);
    }
  }

  /* Depth effect on hover */
  .battery-widget-container .battery-widget:hover .percentage {
    transform: translateZ(20px);
  }

  .battery-widget-container .battery-widget:hover .status {
    transform: translateZ(15px);
  }

  .battery-widget-container .battery-widget:hover .info-row {
    transform: translateZ(10px);
  }

  .battery-widget-container .battery-widget:hover .progress-bar {
    transform: translateZ(5px);
  }

  /* Responsive pulse effect */
  @keyframes responsivePulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.01);
    }
  }

  .battery-widget-container .battery-widget {
    animation: responsivePulse 10s infinite ease-in-out;
  }

  /* Additional decorative elements */
  .battery-widget-container .corner-decoration {
    position: absolute;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 3;
    pointer-events: none;
    animation: cornerPulse 4s infinite alternate;
  }

  .battery-widget-container .corner-decoration:nth-child(1) {
    top: 10px;
    left: 10px;
    border-right: none;
    border-bottom: none;
  }

  .battery-widget-container .corner-decoration:nth-child(2) {
    top: 10px;
    right: 10px;
    border-left: none;
    border-bottom: none;
  }

  .battery-widget-container .corner-decoration:nth-child(3) {
    bottom: 10px;
    left: 10px;
    border-right: none;
    border-top: none;
  }

  .battery-widget-container .corner-decoration:nth-child(4) {
    bottom: 10px;
    right: 10px;
    border-left: none;
    border-top: none;
  }

  @keyframes cornerPulse {
    0% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.7;
    }
  }

  /* Micro-interactions */
  .battery-widget-container .battery-widget:hover .segment.active {
    animation: segmentFall 3s infinite, activeSegmentGlow 2s infinite alternate,
      segmentBounce 0.5s infinite alternate;
  }

  @keyframes segmentBounce {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-2px);
    }
  }

  /* Subtle background noise */
  .battery-widget-container .battery-widget::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
    z-index: 2;
    pointer-events: none;
  }

  /* Floating energy waves */
  .battery-widget-container .energy-wave {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 28px;
    background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
    animation: waveExpand 8s infinite ease-in-out;
  }

  @keyframes waveExpand {
    0%,
    100% {
      transform: scale(0.8);
      opacity: 0;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.1;
    }
  }

  /* Additional hover effects */
  .battery-widget-container .battery-widget:hover .mirror-polish {
    animation: polishMove 8s infinite alternate, polishIntensify 0.5s forwards;
  }

  @keyframes polishIntensify {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.8;
    }
  }

  /* Final touch - parallax effect */
  .battery-widget-container .widget-container {
    transition: transform 0.3s ease;
  }

  .battery-widget-container:hover .widget-container {
    transform: rotateX(2deg) rotateY(2deg);
  }
`;

export default SummaryCard;
