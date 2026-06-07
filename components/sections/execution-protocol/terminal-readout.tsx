"use client";

import React, { RefObject } from "react";
import { useAnimationSync } from "./use-animation-sync";

interface TerminalReadoutProps {
  nodeRef: RefObject<HTMLDivElement | null>;
}

export function TerminalReadout({ nodeRef }: TerminalReadoutProps) {
  const { activeNode, timeToNext } = useAnimationSync(nodeRef);

  return (
    <div className="absolute top-[60%] md:top-[70%] right-0 w-[320px] text-left font-label-mono text-[10px] text-bone-mute uppercase tracking-[0.22em] whitespace-pre leading-loose pointer-events-none z-20">
      {`SYNCING_NODES\nCURRENT NODE: ${activeNode}\nLATENCY: ${timeToNext} TO NEXT\nPACKET_LOSS: 0%\n> OVERRIDE_AUTH\n[ EXECUTING ]\nZEROAXIIS_FRAMEWORK_V1`}
    </div>
  );
}
