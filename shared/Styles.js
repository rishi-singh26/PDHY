import { StyleSheet, Dimensions } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 44 : 20) : 25;
const HEADER_HEIGHT = Platform.OS === "ios" ? (IS_IPHONE_X ? 88 : 64) : 95;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingBottom: 30,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    elevation: 6,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: "transparent",
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  titleStyle: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 30,
  },
  detail: {
    fontSize: 15,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  renderCard: {
    backgroundColor: "#fff",
    marginTop: 8,
    padding: 15,
  },
  renderMedicineCards: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 20,
  },
  image: {
    width: SCREEN_WIDTH - 20,
    height: SCREEN_WIDTH - 20,
    borderRadius: 20,
  },
  headerIcon: {
    marginHorizontal: 10,
  },
  textInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  plusMinusButton: {
    flexDirection: "row",
    borderColor: "green",
    borderWidth: 1,
    justifyContent: "space-between",
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignItems: "center",
  },
});
