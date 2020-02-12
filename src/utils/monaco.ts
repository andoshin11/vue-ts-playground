import { MONACO_TS_VERSIONS } from "@/const";

export function getLatestMonacoTSVersion(): string {
  return MONACO_TS_VERSIONS.sort().reverse()[0]
}
