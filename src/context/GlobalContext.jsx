import React, { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const useGlobalData = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [coverData, setCoverData] = useState({
    company: "",
    name: "",
    studentId: "",
    academicYear: "",
  });

  const [workplaceData, setWorkplaceData] = useState({
    page: "3",
    workplaceName: "",
    workplaceLocation: "",
    workplaceHistory: "",
    assignedTasks: "",
  });

  const [processData, setProcessData] = useState({
    page: "5",
    processImage: null,
    orgImage: null,
  });

  const [reflectionData, setReflectionData] = useState({
    page: "4",
    deptDetails: "",
    assignedTasks: "",
    problems: "",
    comments: "",
    thesisTopics: "",
  });

  const [twoColumnLeftData, setTwoColumnLeftData] = useState({
    date: "", month: "", year: "", startTime: "", endTime: "", page: "6", recordNo: "", work: "",
  });
  const [twoColumnRightData, setTwoColumnRightData] = useState({
    date: "", month: "", year: "", startTime: "", endTime: "", page: "6", recordNo: "", work: "",
  });

  const [singleColumnData, setSingleColumnData] = useState({
    date: "", month: "", year: "", startTime: "", endTime: "", page: "7", recordNo: "", work: "",
  });

  const value = {
    coverData, setCoverData,
    workplaceData, setWorkplaceData,
    processData, setProcessData,
    reflectionData, setReflectionData,
    twoColumnLeftData, setTwoColumnLeftData,
    twoColumnRightData, setTwoColumnRightData,
    singleColumnData, setSingleColumnData,
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};
