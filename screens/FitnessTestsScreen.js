import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import Header from "../components/Header";
import Navigator from "../components/Navigator";
import ImageButton from "../components/ImageButton";

import StaticFitnessScreen from "./StaticFitnessScreen";

import curlUp from "../assets/curlup.jpg";
import pullUp from "../assets/pullup.jpg";
import mileRun from "../assets/mile.jpg";
import shuttleRun from "../assets/shuttlerun.jpg";
import sitAndReach from "../assets/sitandreach.jpg";

const FitnessTestScreen = (props) => {
  const [staticFitnessScreenMode, setStaticFitnessScreenMode] = useState(false);
  const [timerFitnessScreenMode, setTimerFitnessScreenMode] = useState(false);
  const [currentActivity, setCurrentActivity] = useState("");

  const [curlUpsMode, setCurlUpsMode] = useState(false);
  const [pullUpsMode, setPullUpsMode] = useState(false);
  const [sitAndReachMode, setSitAndReachMode] = useState(false);

  const openCurlUpsHandler = () => {
    setCurrentActivity("Curl-Ups");

    setCurlUpsMode(true);
    setStaticFitnessScreenMode(true);
  };

  const openPullUpsHandler = () => {
    setCurrentActivity("Pull-Ups");

    setPullUpsMode(true);
    setStaticFitnessScreenMode(true);
  };

  const openSitAndReachHandler = () => {
    setCurrentActivity("Sit & Reach");

    setSitAndReachMode(true);
    setStaticFitnessScreenMode(true);
  };

  const closeStaticFitnessScreenHandler = () => {
    setCurlUpsMode(false);
    setStaticFitnessScreenMode(false);
  };

  return (
    <View style={styles.screen}>
      <StaticFitnessScreen
        visible={staticFitnessScreenMode}
        title={currentActivity}
        onCancel={closeStaticFitnessScreenHandler}
        studentList={props.studentList}
        studentInfoModeHandler={props.studentInfoModeHandler}
      />
      <View style={styles.header}>
        <Header style={styles.headerText} title="Fitness Tests" />
      </View>
      <View style={styles.fitnessTests}>
        <ImageButton
          style={styles.fitnessButton}
          title="Curl-Ups"
          source={curlUp}
          onPress={openCurlUpsHandler}
        />
        <ImageButton
          style={styles.fitnessButton}
          title="Pull-Ups"
          source={pullUp}
          onPress={openPullUpsHandler}
        />
      </View>
      <View style={styles.fitnessTests}>
        <ImageButton
          style={styles.fitnessButton}
          title="Mile Run"
          source={mileRun}
          onPress={() => {}}
        />
        <ImageButton
          style={styles.fitnessButton}
          title="Shuttle Run"
          source={shuttleRun}
          onPress={() => {}}
        />
      </View>
      <View style={styles.fitnessTests}>
        <ImageButton
          style={styles.fitnessButton}
          title="Sit & Reach"
          source={sitAndReach}
          onPress={openSitAndReachHandler}
        />
      </View>
      <View style={styles.footer}>
        <Navigator
          onPressRoster={props.onPressRoster}
          onPressFitness={props.onPressFitness}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },

  headerText: {
    left: 80,
  },

  fitnessTests: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    height: 100,
  },

  fitnessButton: {
    height: 85,
    width: 85,
    fontSize: 16,
    fontStyle: "italic",
    margin: 10,
  },

  footer: {
    position: "absolute",
    bottom: -140,
    width: "100%",
    height: "15%",
    flex: 1,
    zIndex: 1,
  },
});

export default FitnessTestScreen;