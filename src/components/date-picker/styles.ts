import { HDP, RF } from "@helpers"
import { family, palette } from "@theme"
import { Dimensions, StyleSheet } from "react-native"

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    height: HDP(48),
    alignItems: "center",
    // justifyContent: 'space-between',
    gap: HDP(12),
    paddingHorizontal: HDP(20),
    borderRadius: HDP(4),
    padding: HDP(14),
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E3E3E3",
  },
  placeholderText: {
    fontSize: RF(10),
    color: palette.blueBlack,
    fontFamily: family.Regular,
  },
  label: {
    fontSize: RF(10),
    color: palette.blueBlack,
    fontFamily: family.SemiBold,
  },
  error: {
    fontSize: RF(10),
    color: "#800000",
    fontFamily: family.Regular,
    alignSelf: "flex-start",
    marginTop: HDP(5),
  },
  bordered: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: palette.mutedGreen,
  },
  dateFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.9,
    borderRadius: HDP(8),
    padding: HDP(14),
    height: HDP(48),
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
})

export default styles
