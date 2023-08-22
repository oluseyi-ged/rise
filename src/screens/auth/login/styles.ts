import { HDP, RF } from "@helpers"
import { family, palette } from "@theme"
import { Dimensions, StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window")

const style = StyleSheet.create({
  pageWrap: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  welcomeTxt: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.black,
  },
  orText: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: "#78909C",
    textAlign: "center",
  },
  upperBox: {
    alignItems: "flex-start",
    paddingHorizontal: HDP(32),
  },
  bottomBox: {
    paddingHorizontal: HDP(32),
  },
  existText: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.black,
    alignSelf: "center",
    textAlign: "center",
  },
  existSpan: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.blue,
    textDecorationLine: "underline",
  },
  existSpanDark: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.black,
    textDecorationLine: "underline",
  },
  optFloat: {
    width,
    backgroundColor: "#ECEFF1",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: HDP(15),
    paddingBottom: HDP(25),
  },
  floatText: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.black,
  },
  floatSub: {
    fontSize: RF(12),
    fontFamily: family.Bold,
    color: palette.blue,
    textDecorationLine: "underline",
  },
})

export default style
