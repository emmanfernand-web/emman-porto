"use client";

import { useSyncExternalStore } from "react";
import { stageStore } from "./stage-store";

export function useStage() {
  const s = useSyncExternalStore(
    stageStore.subscribe,
    stageStore.getSnapshot,
    stageStore.getServerSnapshot,
  );
  return { ...s, store: stageStore };
}
