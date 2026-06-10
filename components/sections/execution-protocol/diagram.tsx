"use client";

import React, { RefObject } from "react";
import styles from "./execution-protocol.module.css";
import { NODES, PATH_1, PATH_2, MOBILE_PATH_1, MOBILE_PATH_2, DESKTOP_VIAS, MOBILE_VIAS } from "./constants";
import { SocketFootprint, ViaNodes, NodeMark } from "./pcb-nodes";

interface ExecutionProtocolDiagramProps {
  firstNodeRef: RefObject<HTMLDivElement | null>;
}

export function ExecutionProtocolDiagram({ firstNodeRef }: ExecutionProtocolDiagramProps) {
  return (
    <div
      className={`${styles.canvas} relative w-full aspect-[400/1100] md:w-full md:max-w-[1100px] md:aspect-[1100/360] md:h-auto mx-auto`}
    >
      {/* Desktop SVG */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full hidden md:block"
        viewBox="0 0 1100 360"
      >
        <rect width="100%" height="100%" fill="transparent" />

        {/* Sockets */}
        {NODES.map((node) => (
          <SocketFootprint key={`socket-desktop-${node.id}`} x={node.x} y={node.y} />
        ))}

        {/* Vias */}
        <ViaNodes points={DESKTOP_VIAS} />

        {/* Base Thick Trace */}
        <path d={PATH_1} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />
        <path d={PATH_2} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />

        {/* ENIG Gold Trace */}
        <path d={PATH_1} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d={PATH_2} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />

        {/* Digital Data Pattern Overlay */}
        <path d={PATH_1} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />
        <path d={PATH_2} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />

        {[0, 1, 2, 3].map((layer) => (
          <React.Fragment key={`trace1-${layer}`}>
            <path
              d={PATH_1}
              stroke="rgba(200,255,0,0.32)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
            />
            <path
              d={PATH_1}
              stroke="#c8ff00"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
            />
          </React.Fragment>
        ))}

        {[0, 1, 2, 3].map((layer) => (
          <React.Fragment key={`trace2-${layer}`}>
            <path
              d={PATH_2}
              stroke="rgba(200,255,0,0.32)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
            />
            <path
              d={PATH_2}
              stroke="#c8ff00"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
            />
          </React.Fragment>
        ))}
      </svg>

      {/* Mobile SVG */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full md:hidden"
        viewBox="0 0 400 1100"
      >
        <rect width="100%" height="100%" fill="transparent" />

        {/* Sockets Mobile */}
        {NODES.map((node) => (
          <SocketFootprint key={`socket-mobile-${node.id}`} x={node.mobile_x} y={node.mobile_y} />
        ))}

        {/* Vias */}
        <ViaNodes points={MOBILE_VIAS} />

        {/* Base Thick Trace */}
        <path d={MOBILE_PATH_1} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />
        <path d={MOBILE_PATH_2} stroke="rgba(255,255,255,0.02)" strokeWidth="12" fill="none" />

        {/* ENIG Gold Trace */}
        <path d={MOBILE_PATH_1} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />
        <path d={MOBILE_PATH_2} stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.3" />

        {/* Digital Data Pattern Overlay */}
        <path d={MOBILE_PATH_1} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />
        <path d={MOBILE_PATH_2} stroke="#c8ff00" strokeWidth="1.5" strokeDasharray="4 12" fill="none" opacity="0.25" />

        {[0, 1, 2, 3].map((layer) => (
          <React.Fragment key={`mobile-trace1-${layer}`}>
            <path
              d={MOBILE_PATH_1}
              stroke="rgba(200,255,0,0.32)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
            />
            <path
              d={MOBILE_PATH_1}
              stroke="#c8ff00"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace1_${layer}`]}`}
            />
          </React.Fragment>
        ))}

        {[0, 1, 2, 3].map((layer) => (
          <React.Fragment key={`mobile-trace2-${layer}`}>
            <path
              d={MOBILE_PATH_2}
              stroke="rgba(200,255,0,0.32)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.traceHalo} ${styles[`traceHaloLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
            />
            <path
              d={MOBILE_PATH_2}
              stroke="#c8ff00"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="40 9999"
              className={`${styles.trace} ${styles[`traceLayer${layer}`]} ${styles[`trace2_${layer}`]}`}
            />
          </React.Fragment>
        ))}
      </svg>

      {/* Nodes */}
      {NODES.map((node, i) => (
        <div
          key={node.id}
          ref={i === 0 ? firstNodeRef : null}
          className={`${styles.unifiedNode} ${node.kind === "brand" ? styles.unifiedNodeBrand : ""
            } ${node.kind === "client" ? styles.unifiedNodeClient : ""}`}
          style={
            {
              "--desktop-x": `${(node.x / 1100) * 100}%`,
              "--desktop-y": `${(node.y / 360) * 100}%`,
              "--mobile-x": `${(node.mobile_x / 400) * 100}%`,
              "--mobile-y": `${(node.mobile_y / 1100) * 100}%`,
              "--delay": node.delay,
            } as React.CSSProperties
          }
        >
          <div className={styles.nodeHole} />
          <div className={styles.nodeHead}>
            {node.kind === "step" ? (
              <span className="material-symbols-outlined">{node.icon}</span>
            ) : (
              <NodeMark kind={node.kind} />
            )}
            <span>{node.label}</span>
          </div>
          <div className={styles.nodeBody}>{node.description}</div>
        </div>
      ))}
    </div>
  );
}
