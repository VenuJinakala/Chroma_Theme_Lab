import React from "react";
import { useTheme } from "../context/ThemeContext";

const options = [
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "system", label: "System" },
];

function ThemeToggle() {
  const { mode, theme, setThemeMode, resetToSystem } = useTheme();

  return (
    <div className="theme-toggle-row" role="group" aria-label="Theme switcher">
      <div className="theme-buttons" role="tablist">
        {options.map((option) => {
          const isSelected = mode === option.key;
          return (
            <button
              key={option.key}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`theme-button ${
                isSelected ? "selected" : "not-selected"
              } ${theme === "dark" && !isSelected ? "theme-button-dark" : ""}`}
              onClick={() => setThemeMode(option.key)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="reset-button"
        onClick={resetToSystem}
        aria-label="Reset theme to system preference"
      >
        Reset to system
      </button>
    </div>
  );
}

export default React.memo(ThemeToggle);
