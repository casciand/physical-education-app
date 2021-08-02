import React from "react";
import { View, StyleSheet } from "react-native";

import ImageButton from "./ImageButton";

import roster from "../assets/roster.jpg";
import fitness from "../assets/fitness.jpg";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

const Navigator = (props) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.buttonContainer}>
        <ImageButton
          title="Roster"
          source={roster}
          textStyle={styles.navTitle}
          onPress={props.onPressRoster}
        />
        <ImageButton
          title="Fitness Tests"
          source={fitness}
          textStyle={styles.navTitle}
          onPress={props.onPressFitness}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.5,
    elevation: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },

  buttonContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },

  navTitle: {
    fontSize: 10,
    fontFamily: fonts.primary,
    color: colors.primary,
  },
});

export default Navigator;
