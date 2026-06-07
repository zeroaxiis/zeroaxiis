"use client";

import React, { RefObject } from "react";
import { useAnimationSync } from "./use-animation-sync";

interface TerminalReadoutProps {
  nodeRef: RefObject<HTMLDivElement | null>;
}

export function TerminalReadout({ nodeRef }: TerminalReadoutProps) {
  const { activeNode, timeToNext } = useAnimationSync(nodeRef);

  return (
    <div className="relative md:absolute mt-8 md:mt-0 mb-12 md:mb-0 top-auto md:top-[70%] right-auto md:right-0 w-full md:w-[320px] text-left font-label-mono text-[8.5px] sm:text-[10px] text-bone-mute uppercase tracking-[0.22em] whitespace-pre leading-[1.8] pointer-events-none z-20">
      {`SYNCING_NODES\nCURRENT NODE: ${activeNode}\nLATENCY: ${timeToNext} TO NEXT\nPACKET_LOSS: 0%\n> OVERRIDE_AUTH\n[ EXECUTING ]\nZEROAXIIS_FRAMEWORK_V1`}
    </div>
  );
}
