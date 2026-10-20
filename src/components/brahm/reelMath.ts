/*
 * Pure geometry for the Group Sectors reel (no React, no DOM) so it can be unit tested on its own.
 * 16 vertical cards sit on the inside of a cylinder; `formation` deals them out and `expansion`
 * opens the small tilted ring into the level carousel.
 */

export const REEL_SLOTS = 16;
const DEAL = 0.3;
export const START = {
  radius: 460,
  perspective: 1000,
  tilt: -22,
  roll: -20,
  scale: 0.52,
};
// Tuned down from the source prompt (radius 1800, perspective 450, scale 2.3) to fit a framed section
export const END = {
  radius: 1620,
  camera: 720,
  scale: 2.05,
};

export interface ReelScene {
  radius: number;
  anchor: number;
  perspective: number;
  tilt: number;
  roll: number;
  orientation: number;
  scale: number;
  expansion: number;
}

export interface ReelPose {
  x: number;
  y: number;
  z: number;
  yaw: number;
  roll: number;
  scale: number;
  scaleX: number;
  scaleY: number;
  appear: number;
  behindCamera: boolean;
}

export function reelAngle(slot: number, angle: number, slots = REEL_SLOTS): number {
  return ((((slot * 360) / slots + angle + 180) % 360) + 360) % 360 - 180;
}

export function reelSlotItem(
  slot: number,
  angle: number,
  total: number,
  slots = REEL_SLOTS,
): number {
  const lap = Math.floor(((360 * slot) / slots + angle + 180) / 360);
  return (((slot - lap * slots) % total) + total) % total;
}

export function reelScene(expansion: number, camera = END.camera): ReelScene {
  const tilt = START.tilt * (1 - expansion);
  const radius = START.radius + (END.radius - START.radius) * expansion;
  const anchor =
    -radius * Math.sin((tilt * Math.PI) / 180) +
    START.radius * Math.sin((START.tilt * Math.PI) / 180) * (1 - expansion);

  return {
    radius,
    anchor,
    perspective: START.perspective + (camera - START.perspective) * expansion,
    tilt,
    roll: START.roll * (1 - expansion),
    orientation: 1,
    scale: START.scale + (END.scale - START.scale) * expansion * expansion,
    expansion,
  };
}

export function reelPose(
  angle: number,
  formation: number,
  scene: ReelScene,
): ReelPose {
  const around = (((angle + 180) % 360) + 360) % 360;
  const order = around / 360;
  const t = Math.max(0, Math.min(1, (formation - order * (1 - DEAL)) / DEAL));
  const dealt = 1 - (1 - t) ** 3;
  const placed = -180 + around * dealt;
  const r = (placed * Math.PI) / 180;
  const radius = scene.radius - (1 - dealt) * order * 24;
  const x = -Math.sin(r) * radius;
  const z = -Math.cos(r) * radius;
  const cameraZ = z * Math.cos((scene.tilt * Math.PI) / 180);

  // Compensate for wide-angle rectilinear horizontal stretching on side cylinder cards
  const cosR = Math.cos(r);
  const rawStretch =
    cosR > 0.05
      ? (scene.radius + scene.perspective * cosR) /
        Math.max(120, scene.perspective + scene.radius * cosR)
      : 1;
  const stretch = Math.max(1, Math.min(2.1, rawStretch));
  const scaleX = scene.scale / (1 + (stretch - 1) * 0.68 * scene.expansion);
  const scaleY = scene.scale;

  return {
    x,
    y: 0,
    z,
    yaw: placed * scene.orientation,
    roll: 0,
    scale: scene.scale,
    scaleX,
    scaleY,
    appear: Math.min(1, t * 2.5),
    behindCamera: cameraZ >= scene.perspective - 70,
  };
}
