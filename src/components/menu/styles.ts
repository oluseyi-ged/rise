import { RF } from "@helpers"
import { family, palette } from "@theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  navText: {
    fontSize: RF(8),
    fontFamily: family.Regular,
    color: palette.dark,
  },
  navActive: {
    fontSize: RF(8),
    fontFamily: family.Bold,
    color: palette.blue,
  },
})

export default styles
