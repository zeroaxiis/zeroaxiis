"use client";

import React, { RefObject } from "react";
import { useAnimationSync } from "./use-animation-sync";

interface TerminalReadoutProps {
  nodeRef: RefObject<HTMLDivElement | null>;
}

export function TerminalReadout({ nodeRef }: TerminalReadoutProps) {
  const { activeNode, timeToNext } = useAnimationSync(nodeRef);

  return (
    <div className="mt-8 flex justify-end w-full max-w-[1100px] mx-auto">
      <div className="text-left font-label-mono text-[8.5px] sm:text-[10px] text-bone-mute uppercase tracking-[0.22em] whitespace-pre leading-[1.8] pointer-events-none">
        {`SYNCING_NODES\nCURRENT NODE: ${activeNode}\nLATENCY: ${timeToNext} TO NEXT\nPACKET_LOSS: 0%\n> OVERRIDE_AUTH\n[ EXECUTING ]\nZEROAXIIS_FRAMEWORK_V1`}
      </div>
    </div>
  );
}
