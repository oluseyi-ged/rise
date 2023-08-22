import { HDP, RF } from "@helpers"
import { family, palette } from "@theme"
import { Dimensions, StyleSheet } from "react-native"

const { width, height } = Dimensions.get("window")

const style = StyleSheet.create({
  pageWrap: {
    backgroundColor: palette.white,
    flex: 1,
    position: "relative",
  },
  container: {
    paddingHorizontal: HDP(32),
    height: height * 0.9,
    justifyContent: "space-between",
  },
  welcomeLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.textWhite,
    width: width * 0.7,
    textAlign: "center",
    alignSelf: "center",
  },
  headerLabel: {
    fontSize: RF(24),
    fontFamily: family.Bold,
    color: palette.black,
    marginBottom: HDP(8),
    textAlign: "center",
  },
  headerSub: {
    fontSize: RF(12),
    fontFamily: family.Medium,
    color: "#4C4D50",
    textAlign: "center",
  },
  welcomeSub: {
    fontSize: RF(12),
    fontFamily: family.Regular,
    color: palette.mutedGreen,
    width: width * 0.7,
    textAlign: "center",
    alignSelf: "center",
    marginTop: HDP(5),
  },
  forgotText: {
    fontSize: RF(10),
    fontFamily: family.Medium,
    color: "#4C4D50",
  },
  bottomText: {
    alignItems: "center",
    width,
    marginBottom: HDP(20),
  },
  tcText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: "#f1f1f150",
    textAlign: "center",
  },
  tcFade: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: "#009FA980",
  },
  ctaGrid: {
    flexDirection: "row",
    gap: HDP(13),
  },
  forgotTxt: {
    fontSize: RF(10),
    fontFamily: family.Regular,
    color: palette.black,
    textAlign: "center",
    alignSelf: "flex-end",
  },
  backCta: {
    justifyContent: "center",
    gap: HDP(2),
    paddingHorizontal: HDP(32),
    paddingVertical: HDP(10),
    alignItems: "center",
  },
  backText: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.white,
  },
  requirementsContainer: {
    marginTop: 10,
  },
  requirement: {
    color: "red",
    fontSize: RF(10),
    fontFamily: family.Regular,
    marginBottom: HDP(5),
  },
  welcomeTxt: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.black,
  },
  upperBox: {
    alignItems: "flex-start",
  },
  orText: {
    fontSize: RF(14),
    fontFamily: family.Regular,
    color: palette.black,
    paddingVertical: HDP(16),
    alignSelf: "center",
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
})

export default style
