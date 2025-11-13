import * as Application from "expo-application";
import Constants from "expo-constants";

export function getAppInfo() {
  // expo-application에서 가져오는 값(빌드 후에 가장 정확)
  const nativeVersion = Application.nativeApplicationVersion ?? null; // 예: "1.0.0"
  const nativeBuild = Application.nativeBuildVersion ?? null; // 예: "1" 또는 "100"

  // expo-constants fallback
  const expoVersion =
    Constants.expoConfig?.version ?? Constants.manifest?.version ?? null;
  const appName =
    Constants.expoConfig?.name ??
    Constants.manifest?.name ??
    Constants.manifest?.slug ??
    "App";

  return {
    name: appName,
    version: nativeVersion ?? expoVersion ?? "0.0.0",
    buildNumber: nativeBuild ?? null,
    expoSdkVersion:
      Constants.expoConfig?.sdkVersion ??
      Constants.manifest?.sdkVersion ??
      null,
  };
}
