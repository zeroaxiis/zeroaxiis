import { useCallback, useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function useCalModal() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#c8ff00" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  const openCalModal = useCallback(async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    const cal = await getCalApi({ namespace: "30min" });
    const link = "zerozxiis/30min";
    cal("modal", {
      calLink: link,
      config: {
        layout: "month_view",
        theme: "dark",
        hideBranding: "true",
        useSlotsViewOnSmallScreen: "true"
      }
    });
  }, []);

  return openCalModal;
}
