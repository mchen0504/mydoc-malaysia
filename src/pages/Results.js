import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchResults from "../components/results/SearchResults";
import Navbar from "../components/Navbar";

export default function Results(props) {
  const locationParts = useLocation().pathname.split("/");
  const searchType = locationParts[2];
  const searchValue = locationParts[3].replace(/-/g, " ");
  const reportMax = 50;

  const [docInfo, setDocInfo] = useState([]);
  const [hospitalInfo, sethospitalInfo] = useState([]);
  const [filtered, setFiltered] = useState({
    docInfo: [],
    HospitalInfo: [],
  });

  const [filters, setFilters] = useState({
    hosType: "both",
    languageList: [],
    yearOfPractice: [1000, -1],
  });

  // const [searchingState, setSearchingState] = React.useState("in-progress");

  useEffect(() => {
    axios
      .get("/alldata")
      .then((res) => {
        console.log(res.data);
        let userKeyWords = searchValue.replace(/-/g, " ").toLowerCase();
        let searchResults = getSearchInfo(userKeyWords, res.data);
        sethospitalInfo(searchResults.newHosData);
        setDocInfo(searchResults.newDocData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getSearchInfo = (userKeyWords, data) => {
    console.log("in method");
    let newDocData = [];
    let newHosData = [];
    if (searchType == "Specialty") {
      for (let specialty in data) {
        if (specialty.replace(/\s/g, "").toLowerCase() == userKeyWords) {
          for (let hospital in data[specialty].hospitals) {
            let hospitalInfo = data[specialty].hospitals[hospital];
            if (
              hospitalInfo.report == null ||
              hospitalInfo.report.reportCount < reportMax
            ) {
              newHosData.push(hospitalInfo);
            }
            for (let doctor in hospitalInfo.doctors) {
              if (
                !hospitalInfo.doctors[doctor].deleted &&
                hospitalInfo.doctors[doctor].publish &&
                (hospitalInfo.doctors[doctor].report == null ||
                  hospitalInfo.doctors[doctor].report.reportCount < reportMax)
              ) {
                hospitalInfo.doctors[doctor].username = doctor;
                newDocData.push(hospitalInfo.doctors[doctor]);
              }
            }
          }
        }
      }
    } else if (searchType == "Doctor") {
      for (let specialty in data) {
        for (let hos in data[specialty].hospitals) {
          let potentialHos = data[specialty].hospitals[hos];
          let docFound = 0;
          for (let doctor in potentialHos.doctors) {
            let targetDoctor = potentialHos.doctors[doctor];
            if (
              targetDoctor.name
                .replace(/\s/g, "")
                .toLowerCase()
                .includes(userKeyWords)
            ) {
              if (
                !targetDoctor.deleted &&
                (targetDoctor.report == null ||
                  targetDoctor.report.reportCount < reportMax) &&
                targetDoctor.publish
              ) {
                targetDoctor.username = doctor;
                newDocData.push(targetDoctor);
                docFound++;
              }
            }
            if (docFound == 1) {
              if (
                potentialHos.report == null ||
                potentialHos.report.reportCount < reportMax
              ) {
                newHosData.push(potentialHos);
              }
            }
          }
        }
      }
    } else if (searchType == "Hospital") {
      for (let specialty in data) {
        for (let hos in data[specialty].hospitals) {
          let potentialHos = data[specialty].hospitals[hos];
          let hosNameMacth = potentialHos.name
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(userKeyWords);
          if (hosNameMacth) {
            if (
              potentialHos.report == null ||
              potentialHos.report.reportCount < reportMax
            ) {
              newHosData.push(potentialHos);
            }
            for (let doctor in potentialHos.doctors) {
              let targetDoctor = potentialHos.doctors[doctor];
              if (
                !targetDoctor.deleted &&
                (targetDoctor.report == null ||
                  targetDoctor.report.reportCount < reportMax) &&
                targetDoctor.publish
              ) {
                potentialHos.doctors[doctor].username = doctor;
                newDocData.push(potentialHos.doctors[doctor]);
              }
            }
          }
        }
      }
    } else {
      for (let specialty in data) {
        let conditionList = data[specialty].conditions;
        conditionList = conditionList.map((item) => {
          return item.toLowerCase().replace(/\s/g, "");
        });
        let conditionMatch = conditionList.includes(userKeyWords);
        if (conditionMatch) {
          for (let hos in data[specialty].hospitals) {
            let potentialHos = data[specialty].hospitals[hos];
            if (
              potentialHos.report == null ||
              potentialHos.report.reportCount < reportMax
            ) {
              newHosData.push(potentialHos);
            }
            for (let doctor in potentialHos.doctors) {
              let doctorCondition = potentialHos.doctors[doctor].conditions;
              doctorCondition = doctorCondition.map((item) => {
                return item.toLowerCase().replace(/\s/g, "");
              });
              let targetDoctor = potentialHos.doctors[doctor];
              if (
                doctorCondition.includes(userKeyWords) &&
                !targetDoctor.deleted &&
                (targetDoctor.report == null ||
                  targetDoctor.report.reportCount < reportMax) &&
                targetDoctor.publish
              ) {
                potentialHos.doctors[doctor].username = doctor;
                newDocData.push(potentialHos.doctors[doctor]);
              }
            }
          }
        }
      }
    }

    newHosData.forEach((hos) => {
      let conditionList = [];
      for (let doctor in hos.doctors) {
        let targetDoc = hos.doctors[doctor];
        targetDoc.conditions = targetDoc.conditions.map((item) => {
          let newItem = item.toLowerCase();
          newItem = newItem.replace(newItem[0], newItem[0].toUpperCase());
          return newItem;
        });
        targetDoc.conditions.forEach((condition) => {
          if (conditionList.indexOf(condition) == -1) {
            conditionList.push(condition);
          }
        });
      }
      hos.conditions = conditionList;
    });

    newDocData.sort((a, b) => {
      return b.likes - a.likes;
    });
    newHosData.sort((a, b) => {
      return b.likes - a.likes;
    });
    return {
      newDocData,
      newHosData,
    };
  };

  useEffect(() => {
    console.log(docInfo);
    let newDocList = docInfo;
    let newHospitalList = hospitalInfo;

    if (docInfo.length > 0 && hospitalInfo.length > 0) {
      docInfo.forEach((doctor) => {
        let validateType =
          doctor.type.toLowerCase() == filters.hosType.toLowerCase() ||
          filters.hosType.toLowerCase() == "both";
        let validateLanguage =
          filters.languageList.every(
            (element) => doctor.languages.indexOf(element) > -1
          ) || filters.languageList == [];
        let validateYear =
          (filters.yearOfPractice[0] <= doctor.yearsOfPractice &&
            filters.yearOfPractice[1] >= doctor.yearsOfPractice) ||
          filters.yearOfPractice[0] == 1000;

        if (validateType && validateLanguage && validateYear) {
          newDocList.push(doctor);
        }
      });

      hospitalInfo.forEach((hos) => {
        let validateType =
          hos.type.toLowerCase() == filters.hosType.toLowerCase() ||
          filters.hosType.toLowerCase() == "both";
        let validateLanguage =
          filters.languageList.every(
            (element) => hos.languages.indexOf(element) > -1
          ) || filters.languageList == [];

        if (validateType && validateLanguage) {
          newHospitalList.push(hos);
        }
      });

      setFiltered({
        docInfo: newDocList,
        hospitalInfo: newHospitalList,
      });
    }
  }, [docInfo, hospitalInfo, filters]);

  // const filterFunction = () => {
  //   let newDocList = docInfo;
  //   let newHospitalList = hospitalInfo;
  //   docInfo.forEach((doctor) => {
  //     let validateType =
  //       doctor.type.toLowerCase() == filters.hosType.toLowerCase() ||
  //       filters.hosType.toLowerCase() == "both";
  //     let validateLanguage =
  //       filters.languageList.every(
  //         (element) => doctor.languages.indexOf(element) > -1
  //       ) || languageList == [];

  //     let validateYear =
  //       (filters.yearOfPractice[0] <= doctor.yearsOfPractice &&
  //         filters.yearOfPractice[1] >= doctor.yearsOfPractice) ||
  //       filters.yearOfPractice[0] == 1000;
  //     if (validateType && validateLanguage && validateYear) {
  //       newDocList.push(doctor);
  //     }
  //   });

  //   hospitalInfo.forEach((hos) => {
  //     let validateType =
  //       hos.type.toLowerCase() == filters.hosType.toLowerCase() ||
  //       filters.hosType.toLowerCase() == "both";
  //     let validateLanguage =
  //       filters.languageList.every(
  //         (element) => hos.languages.indexOf(element) > -1
  //       ) || filters.languageList == [];

  //     if (validateType && validateLanguage) {
  //       newHospitalList.push(hos);
  //     }
  //   });

  //   setFiltered({
  //     docInfo: newDocList,
  //     hospitalInfo: newHospitalList,
  //   });
  // };

  // useEffect(() => {
  //   if (filterBegin) {
  //     filterFunction();
  //     return setFilterBegin(false);
  //   }
  // });

  return (
    <div>
      {console.log(docInfo)}
      <Navbar currentPage="results" {...props} />
      <SearchResults
        filtered={filtered}
        // searchingState={searchingState}
        searchType={searchType}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}
