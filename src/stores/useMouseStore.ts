// src/stores/useMouseStore.ts
import { create } from 'zustand';

interface MouseState {
  x: number;
  y: number;
  isHovering: boolean;
  setPosition: (x: number, y: number) => void;
  setHovering: (hovering: boolean) => void;
}

export const useMouseStore = create<MouseState>((set) => ({
  x: 0,
  y: 0,
  isHovering: false,
  setPosition: (x, y) => set({ x, y }),
  setHovering: (isHovering) => set({ isHovering }),
}));