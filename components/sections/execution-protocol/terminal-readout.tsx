"use client";

import React, { RefObject } from "react";
import { useAnimationSync } from "./use-animation-sync";

interface TerminalReadoutProps {
  nodeRef: RefObject<HTMLDivElement | null>;
}

export function TerminalReadout({ nodeRef }: TerminalReadoutProps) {
  const { activeNode, timeToNext } = useAnimationSync(nodeRef);

  return (
    <div className="-mt-8 md:-mt-24 flex justify-start md:justify-end w-full max-w-[1100px] mx-auto px-4 md:px-0 relative z-10">
      <div className="w-[180px] sm:w-[240px] text-left font-label-mono text-[8.5px] sm:text-[10px] text-bone-mute uppercase tracking-[0.22em] whitespace-pre leading-[1.8] pointer-events-none">
        {`SYNCING_NODES\nCURRENT NODE: ${activeNode}\nLATENCY: ${timeToNext} TO NEXT\nPACKET_LOSS: 0%\n> OVERRIDE_AUTH\n[ EXECUTING ]\nZEROAXIIS_FRAMEWORK_V1`}
      </div>
    </div>
  );
}
