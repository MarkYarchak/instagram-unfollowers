import { useTheme } from 'vuetify';
import { useCookies } from '@vueuse/integrations/useCookies';
import { ApplicationTheme, COOKIE_THEME } from '@/constants/theme';

export function useApplicationTheme() {
  const theme = useTheme();
  const storage = useThemeStorage();

  function set(t: ApplicationTheme) {
    theme.global.name.value = t;
    storage.set(t);
  }

  function setLight() {
    set(ApplicationTheme.Light);
  }

  function setDark() {
    set(ApplicationTheme.Dark);
  }

  function toggle() {
    if (isDark()) {
      setLight();
    } else {
      setDark();
    }
  }

  function isDark() {
    return theme.global.current.value.dark;
  }

  return {
    set,
    setLight,
    setDark,
    toggle,
    isDark,
  };
}

export function useThemeStorage() {
  const cookies = useCookies();
  const allowedThemes = [ApplicationTheme.Light, ApplicationTheme.Dark];

  return {
    get() {
      const storedTheme = cookies.get(COOKIE_THEME);
      if (allowedThemes.includes(storedTheme)) {
        return storedTheme;
      }
      return ApplicationTheme.Light;
    },
    set(t: ApplicationTheme) {
      cookies.set(COOKIE_THEME, t);
    },
  };
}
