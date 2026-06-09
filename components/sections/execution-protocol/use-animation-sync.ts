import { useState, useEffect, RefObject } from "react";

export function useAnimationSync(nodeRef: RefObject<HTMLDivElement | null>) {
  const [activeNode, setActiveNode] = useState("Client Brief");
  const [timeToNext, setTimeToNext] = useState("2.50s");

  useEffect(() => {
    const cycleDuration = 15000;

    // Map exact CSS delays to phases
    const phases = [
      { name: "Client Brief", start: 0, next: 2.5 },
      { name: "ZeroAxiis", start: 2.5, next: 5.0 },
      { name: "Ideate", start: 5.0, next: 8.5 },
      { name: "Build & Triage", start: 8.5, next: 11.0 },
      { name: "Delivery", start: 11.0, next: 15.0 },
    ];

    const interval = setInterval(() => {
      let elapsedSec = 0;
      
      // Sync perfectly with the physical CSS animation running in the DOM
      if (nodeRef.current) {
        const animations = nodeRef.current.getAnimations();
        // The animation we want to track is the 15s nodePulse
        const pulseAnim = animations.find(a => {
          const animName = (a as any).animationName;
          return typeof animName === 'string' && animName.includes('nodePulse');
        });
        
        if (pulseAnim && pulseAnim.currentTime !== null) {
          elapsedSec = (Number(pulseAnim.currentTime) % cycleDuration) / 1000;
        } else {
          return; // Animation hasn't initialized yet
        }
      } else {
        return;
      }
      
      const currentPhase = phases.find(p => elapsedSec >= p.start && elapsedSec < p.next) || phases[0];
      
      setActiveNode(currentPhase.name);
      setTimeToNext((currentPhase.next - elapsedSec).toFixed(2) + "s");
    }, 50);

    return () => clearInterval(interval);
  }, [nodeRef]);

  return { activeNode, timeToNext };
}
