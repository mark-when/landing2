export type DetectedOs =
  | "android"
  | "ios"
  | "linux"
  | "macos"
  | "windows"
  | "unknown";

type OsDetectionInput = {
  platform?: string | null;
  userAgent?: string | null;
};

const normalize = (value?: string | null) => value?.toLowerCase() ?? "";

export const detectOs = ({
  platform,
  userAgent,
}: OsDetectionInput = {}): DetectedOs => {
  const platformValue = normalize(platform);
  const userAgentValue = normalize(userAgent);
  const source = `${platformValue} ${userAgentValue}`;

  if (/android/.test(source)) {
    return "android";
  }

  if (/(iphone|ipad|ipod)/.test(source)) {
    return "ios";
  }

  if (
    /mac/.test(source) ||
    (/ipad/.test(userAgentValue) && /mac/.test(platformValue))
  ) {
    return "macos";
  }

  if (/(win32|win64|windows|wow64)/.test(source)) {
    return "windows";
  }

  if (/(linux|x11|ubuntu|fedora|debian)/.test(source)) {
    return "linux";
  }

  return "unknown";
};

export const detectOsFromNavigator = (): DetectedOs => {
  if (typeof navigator === "undefined") {
    return "unknown";
  }

  const navigatorWithUserAgentData = navigator as Navigator & {
    userAgentData?: {
      platform?: string;
    };
  };

  return detectOs({
    platform:
      navigatorWithUserAgentData.userAgentData?.platform ??
      navigator.platform,
    userAgent: navigator.userAgent,
  });
};
