const antdTheme = {
  token: {
    fontFamily:
      '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    // colorPrimary: '#ccff00',
    controlHeight: 45,
    borderRadius: 15,
  },
  components: {
    Input: {
      controlPaddingHorizontal: 15,
      controlPaddingVertical: 30,
    },
    Button: {
      // colorText: '#212121',
      fontWeight: 500,
      colorBgContainerDisabled: '#ccff00',
      // colorTextDisabled: '#212121',
      // primaryColor: '#212121',
      // colorPrimaryText: '#212121',
    },
    Segmented: {
      itemSelectedBg: '#212121',
      itemSelectedColor: '#ffffff',
      borderRadius: '999px',
    },
    Alert: {
      borderRadiusLG: 0,
      borderRadiusSM: 0,
    },
  },
};

export default antdTheme;
