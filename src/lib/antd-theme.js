const antdTheme = {
  token: {
    fontFamily:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    colorPrimary: '#ccff00',
    colorPrimaryHover: '#d4ff33',
    colorTextLightSolid: '#171717',
    colorBorder: 'rgba(255, 255, 255, 0.12)',
    colorBorderSecondary: 'rgba(255, 255, 255, 0.08)',
    controlHeight: 42,
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 10,
  },
  components: {
    Input: {
      controlPaddingHorizontal: 14,
      activeBorderColor: '#ccff00',
      hoverBorderColor: 'rgba(204, 255, 0, 0.45)',
      activeShadow: '0 0 0 1px rgba(204, 255, 0, 0.25)',
    },
    Select: {
      activeBorderColor: '#ccff00',
      hoverBorderColor: 'rgba(204, 255, 0, 0.45)',
      optionSelectedBg: 'rgba(204, 255, 0, 0.12)',
    },
    Button: {
      fontWeight: 500,
      colorBgContainerDisabled: '#ccff00',
      defaultBorderColor: 'rgba(255, 255, 255, 0.12)',
      defaultColor: '#d1d5db',
      defaultHoverBorderColor: 'rgba(204, 255, 0, 0.55)',
      defaultHoverColor: '#ccff00',
    },
    Segmented: {
      itemSelectedBg: '#212121',
      itemSelectedColor: '#ffffff',
      borderRadius: '999px',
    },
    Alert: {
      borderRadiusLG: 12,
      borderRadiusSM: 10,
    },
  },
};

export default antdTheme;
