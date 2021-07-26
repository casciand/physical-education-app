import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import uuid from "react-native-uuid";

import RosterScreen from "./screens/RosterScreen";
import FitnessTestsScreen from "./screens/FitnessTestsScreen";

const defaultStudent = {
  key: "null",
  name: "null",
  age: "null",
  gender: "null",
};

export default function App() {
  const [studentList, setStudentList] = useState([]);
  const [rosterMode, setRosterMode] = useState(true);

  const [addStudentMode, setAddStudentMode] = useState(false);
  const [studentInfoMode, setStudentInfoMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(defaultStudent);

  // AsyncStorage functions
  const saveStudent = async (student) => {
    try {
      await AsyncStorage.setItem(student.key, JSON.stringify(student));
    } catch (err) {
      alert(err);
    }
  };

  const deleteStudent = async () => {
    try {
      await AsyncStorage.removeItem(currentStudent.key);
    } catch (err) {
      alert(err);
    }
  };

  const loadStudents = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();

      for (let i = 0; i < keys.length; ++i) {
        let student = await AsyncStorage.getItem(keys[i]);

        if (student != null) {
          setStudentList((currentStudents) => [
            ...currentStudents,
            JSON.parse(student),
          ]);
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // regular functions
  const addStudentHandler = (student) => {
    let newStudent = {
      key: uuid.v1(),
      name: student.name,
      age: student.age,
      gender: student.gender,
    };

    setStudentList((currentStudents) => [...currentStudents, newStudent]);

    saveStudent(newStudent);
    setAddStudentMode(false);
  };

  const confirmDeleteStudentHandler = () => {
    Alert.alert(
      "Delete Student?",
      "This action cannot be undone. All of this student's data will be lost.",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteStudentHandler,
        },
        { text: "Cancel", style: "cancel", onPress: () => {} },
      ]
    );
  };

  const deleteStudentHandler = () => {
    setStudentList((currentStudents) => {
      return currentStudents.filter((student) => student != currentStudent);
    });

    deleteStudent();
    setStudentInfoMode(false);
  };

  const studentInfoModeHandler = (studentID) => {
    for (let i = 0; i < studentList.length; ++i) {
      if (studentID == studentList[i].key) {
        setCurrentStudent(studentList[i]);
        setStudentInfoMode(true);
        return;
      }
    }
  };

  let content = (
    <RosterScreen
      studentList={studentList}
      currentStudent={currentStudent}
      setStudentList={setStudentList}
      setAddStudentMode={setAddStudentMode}
      setStudentInfoMode={setStudentInfoMode}
      studentInfoModeHandler={studentInfoModeHandler}
      addStudentHandler={addStudentHandler}
      saveStudent={saveStudent}
      deleteStudent={deleteStudent}
      studentInfoMode={studentInfoMode}
      addStudentMode={addStudentMode}
      confirmDeleteStudentHandler={confirmDeleteStudentHandler}
      onPressRoster={() => setRosterMode(true)}
      onPressFitness={() => setRosterMode(false)}
    />
  );

  if (!rosterMode) {
    content = (
      <FitnessTestsScreen
        studentList={studentList}
        studentInfoModeHandler={studentInfoModeHandler}
        onPressRoster={() => setRosterMode(true)}
        onPressFitness={() => setRosterMode(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      {content}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
