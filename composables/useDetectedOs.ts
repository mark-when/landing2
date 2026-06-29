import { detectOs, detectOsFromNavigator, type DetectedOs } from "~/utils/detectOs";

export const useDetectedOs = () => {
  const requestHeaders = import.meta.server
    ? useRequestHeaders(["user-agent"])
    : {};

  const detectedOs = useState<DetectedOs>("detected-os", () =>
    detectOs({ userAgent: requestHeaders["user-agent"] }),
  );

  onMounted(() => {
    detectedOs.value = detectOsFromNavigator();
  });

  return detectedOs;
};
