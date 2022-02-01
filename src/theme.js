import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";

export const customTheme = deepMerge(grommet, {
  name: "oythejoy",
  rounding: 6,
  spacing: 24,
  global: {
    colors: {
      "calendar-available": "rgba(148, 216, 255, 0.35)",
      "calendar-selected": "rgba(148, 216, 255, 0.85)",
      brand: "#94D8FF",
      "background-back": "#111111",
      "background-front": "#222222",
      text: "#000000",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
    },
    font: {
      family: "Helvetica",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
    control: {
      border: {
        radius: "10px",
      },
    },
    drop: {
      border: {
        radius: "6px",
      },
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  layer: {
    background: "#FFFFFF",
  },
  button: {
    default: {
      color: "text",
      border: undefined,
      padding: {
        horizontal: "12px",
        vertical: "8px",
      },
    },
    primary: {
      background: { color: "brand" },
      border: undefined,
      color: "text",
      padding: {
        horizontal: "5px",
        vertical: "2px",
      },
    },
    secondary: {
      border: { color: "brand", width: "1px" },
      color: "text",
      padding: {
        horizontal: "18px",
        vertical: "18px",
      },
      font: {
        weight: "normal",
      },
    },
    active: {
      background: { color: "brand-contrast" },
      color: "text",
      secondary: {
        background: "none",
        border: {
          color: "brand-contrast",
        },
      },
    },
    disabled: {
      opacity: "0.4",
      color: "text",
      border: {
        color: "#C4C4C4",
        width: "1px",
      },
      padding: {
        horizontal: "18px",
        vertical: "18px",
      },
    },
    hover: {
      background: { color: "active" },
      secondary: {
        border: { color: "active" },
      },
    },
  },
  checkBox: {
    check: {
      radius: "6px",
    },
    toggle: {
      radius: "6px",
    },
  },
  radioButton: {
    check: {
      radius: "6px",
    },
  },
  formField: {
    border: {
      color: "border",
      error: {
        color: "white",
      },
      position: "inner",
      side: "bottom",
    },
    content: {
      pad: "small",
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: "medium",
      },
    },
    error: {
      color: "status-critical",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    help: {
      color: "dark-3",
      margin: {
        start: "small",
      },
    },
    info: {
      color: "text-xweak",
      margin: {
        vertical: "xsmall",
        horizontal: "small",
      },
    },
    margin: {
      bottom: "small",
    },
    round: "6px",
  },
});
