import { ProtocolNode } from "./types";

export const PATH_1 = "M 140 40 L 140 170 L 150 180 L 500 180 L 510 170 L 510 90 L 520 80 L 800 80 L 810 90 L 810 170 L 820 180 L 960 180";
export const PATH_2 = "M 500 180 L 510 180 L 510 270 L 520 280 L 800 280 L 810 270 L 810 180 L 820 180";

export const MOBILE_PATH_1 = "M 200 60 L 200 560 L 210 570 L 290 570 L 300 580 L 300 860 L 290 870 L 210 870 L 200 880 L 200 1020";
export const MOBILE_PATH_2 = "M 210 570 L 200 570 L 110 570 L 100 580 L 100 860 L 110 870 L 200 870 L 210 870";

export const DESKTOP_VIAS = [
  [140, 170], [150, 180], [500, 180], [510, 170], [510, 90], [520, 80],
  [800, 80], [810, 90], [810, 170], [820, 180],
  [510, 270], [520, 280], [800, 280], [810, 270]
];

export const MOBILE_VIAS = [
  [200, 560], [210, 570], [290, 570], [300, 580], [300, 860], [290, 870], [210, 870], [200, 880],
  [110, 570], [100, 580], [100, 860], [110, 870]
];

export const NODES: ProtocolNode[] = [
  {
    id: "request",
    label: "Client",
    icon: "client",
    kind: "client",
    x: 140,
    y: 40,
    mobile_x: 200,
    mobile_y: 50,
    delay: "0s",
    description: "Request lands. Brief drops in.",
  },
  {
    id: "zero",
    label: "ZeroAxiis",
    icon: "brand",
    kind: "brand",
    x: 140,
    y: 180,
    mobile_x: 200,
    mobile_y: 250,
    delay: "2.5s",
    description: "Studio scopes and queues the work.",
  },
  {
    id: "ideate",
    label: "Ideate",
    icon: "lightbulb",
    kind: "step",
    x: 360,
    y: 180,
    mobile_x: 200,
    mobile_y: 450,
    delay: "5.0s",
    description: "Architecture mapped. Scope locked.",
  },
  {
    id: "engineering",
    label: "Build",
    icon: "terminal",
    kind: "step",
    x: 660,
    y: 80,
    mobile_x: 300,
    mobile_y: 720,
    delay: "8.5s",
    description: "Code written, reviewed, deployed.",
  },
  {
    id: "triage",
    label: "Triage",
    icon: "sync",
    kind: "step",
    x: 660,
    y: 280,
    mobile_x: 100,
    mobile_y: 720,
    delay: "8.5s",
    description: "Polished, hardened, ready to ship.",
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: "client",
    kind: "client",
    x: 960,
    y: 180,
    mobile_x: 200,
    mobile_y: 1020,
    delay: "11.0s",
    description: "Shipped — documented, monitored, supported.",
  },
];
