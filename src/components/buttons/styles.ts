import { HDP, RF } from "@helpers"
import { family, palette } from "@theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  containerCommonStyle: {
    backgroundColor: "red",
    paddingVertical: HDP(16),
    width: "100%",
    // height: HDP(49),
    borderRadius: HDP(4),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  textCommonStyle: {
    color: palette.textWhite,
    fontSize: RF(12),
    fontFamily: family.Bold,
  },

  borderStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderRadius: HDP(8),
    borderColor: palette.dark,
  },
  borderTextStyle: {
    color: palette.dark,
    fontSize: RF(12),
    fontFamily: family.Bold,
  },
  iconContainer: {
    marginRight: HDP(5),
  },
  secondaryStyle: {
    backgroundColor: palette.purpleFade,
    borderWidth: 1,
    borderRadius: HDP(6),
    borderColor: palette.borderGreen,
  },
})

export default styles
