export type Theme = "dark" | "light";

type StageState = {
  theme: Theme;
  sound: boolean;
  introSeen: boolean;
};

const THEME_KEY = "gig-theme";
const INTRO_KEY = "gig-intro-seen";

const serverState: StageState = { theme: "dark", sound: false, introSeen: false };

let state: StageState = serverState;
let hydrated = false;
const listeners = new Set<() => void>();

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage can be blocked; the site still works */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = {
    theme: read(THEME_KEY) === "light" ? "light" : "dark",
    sound: false, // always muted by default
    introSeen: read(INTRO_KEY) === "1",
  };
}

function set(patch: Partial<StageState>) {
  state = { ...state, ...patch };
  if (patch.theme) {
    document.documentElement.dataset.theme = patch.theme;
    write(THEME_KEY, patch.theme);
  }
  if (patch.introSeen) write(INTRO_KEY, "1");
  listeners.forEach((l) => l());
}

export const stageStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): StageState {
    hydrate();
    return state;
  },
  getServerSnapshot(): StageState {
    return serverState;
  },
  toggleTheme() {
    set({ theme: state.theme === "dark" ? "light" : "dark" });
  },
  setSound(on: boolean) {
    set({ sound: on });
  },
  markIntroSeen() {
    set({ introSeen: true });
  },
  /** For the "replay intro" link. */
  resetIntro() {
    try {
      window.localStorage.removeItem(INTRO_KEY);
    } catch {
      /* ignore */
    }
    delete document.documentElement.dataset.intro;
    state = { ...state, introSeen: false };
    listeners.forEach((l) => l());
  },
};
