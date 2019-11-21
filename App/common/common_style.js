import { windowWidth, alpha } from "./size";
import { StyleSheet, Platform } from "react-native";

export const TITLE_FONT = "ClanPro-News";
export const NON_TITLE_FONT = "ClanPro-Book";
export const PRIMARY_COLOR = "rgb(0, 178, 227)"
export const LIGHT_GREY = "rgb(130, 130, 130)"
export const LIGHT_BLUE = "rgb(181, 219, 229)"
export const LIGHT_BLUE_BACKGROUND = "rgb(218, 247, 255)"
export const DEFAULT_GREY_BACKGROUND = "rgb(228, 228, 228)"
export const RED = "rgb(239, 81, 81)"
export const DISABLED_COLOR = "rgb(191, 191, 191)"
export const TABBAR_INACTIVE_TINT = "rgb(85, 85, 85)"
export const TABBAR_ACTIVE_TINT = "black"
export const BUTTONBOTTOMPADDING = Platform.OS === "ios" ? 40 * alpha : 0
export const TOAST_DURATION = 2000
export const commonStyles = StyleSheet.create({
  lightGraySeparator: {
    backgroundColor: "blue",
    height: 5 * alpha,
    width: windowWidth
  },
  normal: {
    backgroundColor: "rgb(0, 178, 227)"
  },
  disabled: {
    backgroundColor: "rgba(0, 178, 227, 0.5)"
  },
  text_primary_color: {
    color: "rgb(0, 178, 227)",
  },
  background_primary_color: {
    backgroundColor: "rgb(0, 178, 227)",
  }
});
