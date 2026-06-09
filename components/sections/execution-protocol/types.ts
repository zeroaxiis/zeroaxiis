export type NodeKind = "client" | "brand" | "step";

export interface ProtocolNode {
  id: string;
  label: string;
  icon: string;
  kind: NodeKind;
  x: number;
  y: number;
  mobile_x: number;
  mobile_y: number;
  delay: string;
  description: string;
}
