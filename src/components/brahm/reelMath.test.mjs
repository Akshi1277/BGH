// Unit tests for the reel geometry. Run with `npm test` (Node's built-in runner, no extra deps).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  END,
  REEL_SLOTS,
  START,
  reelAngle,
  reelPose,
  reelScene,
  reelSlotItem,
} from "./reelMath.ts";

const close = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} !≈ ${b}`);

test("scene starts as the small tilted ring and ends as the level carousel", () => {
  const s0 = reelScene(0);
  close(s0.radius, START.radius);
  close(s0.tilt, START.tilt);
  close(s0.roll, START.roll);
  close(s0.perspective, START.perspective);
  close(s0.scale, START.scale);

  const s1 = reelScene(1);
  close(s1.radius, END.radius);
  close(s1.tilt, 0);
  close(s1.roll, 0);
  close(s1.perspective, END.camera);
  close(s1.scale, END.scale);
});

test("slot angles are evenly spaced and wrapped to [-180, 180)", () => {
  const step = 360 / REEL_SLOTS;
  for (let slot = 0; slot < REEL_SLOTS; slot++) {
    for (const angle of [-725, -45, 0, 13.7, 360, 1000]) {
      const a = reelAngle(slot, angle);
      assert.ok(a >= -180 && a < 180, `angle ${a} out of range`);
      const next = reelAngle(slot + 1, angle);
      close((((next - a) % 360) + 360) % 360, step, 1e-9);
    }
  }
});

test("once dealt and opened, every card sits on the cylinder", () => {
  const scene = reelScene(1);
  for (let slot = 0; slot < REEL_SLOTS; slot++) {
    const p = reelPose(reelAngle(slot, 0), 1, scene);
    close(Math.hypot(p.x, p.z), scene.radius, 1e-4);
    close(p.appear, 1);
  }
});

test("the front card faces the camera head-on", () => {
  const p = reelPose(0, 1, reelScene(1));
  close(p.x, 0, 1e-9);
  close(p.yaw, 0, 1e-9);
  close(p.z, -END.radius, 1e-6);
  assert.equal(p.behindCamera, false);
});

test("before the deal starts, no card is visible (the waiting stack never shows)", () => {
  const scene = reelScene(0);
  for (let slot = 0; slot < REEL_SLOTS; slot++) {
    close(reelPose(reelAngle(slot, 0), 0, scene).appear, 0);
  }
});

test("recycling shows every sector twice across the 16 slots at any angle", () => {
  const total = 8;
  for (let angle = -720; angle <= 720; angle += 7.5) {
    const counts = new Array(total).fill(0);
    for (let slot = 0; slot < REEL_SLOTS; slot++) {
      const item = reelSlotItem(slot, angle, total);
      assert.ok(Number.isInteger(item) && item >= 0 && item < total);
      counts[item]++;
    }
    assert.deepEqual(counts, new Array(total).fill(REEL_SLOTS / total), `angle ${angle}`);
  }
});
