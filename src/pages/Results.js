import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import SearchResults from "../components/results/SearchResults";
import Navbar from "../components/Navbar";

export default function Results() {
  const { database } = props;

  const locationParts = useLocation().pathname.split("/");
  const searchType = locationParts[2];
  const searchValue = locationParts[3];
  const reportMax = 50;

  const [docInfo, setDocInfo] = useState([]);
  const [hospitalInfo, sethospitalInfo] = useState([]);
  const [docInfoCopy, setDocInfoCopy] = useState([]);
  const [hospitalInfoCopy, sethospitalInfoCopy] = useState([]);

  const [searchingState, setSearchingState] = React.useState("in-progress");

  const doMainSearch = (pageProps) => {
    if (hospitalInfo.length != 0 || docInfo.length != 0) {
      sethospitalInfo([]);
      setDocInfo([]);
      sethospitalInfoCopy([]);
      setDocInfoCopy([]);
      setSearchingState("in-progress");
    }

    if (pageProps.history != null) {
      pageProps.history.push("/results");
    }

    if (searchBegin) {
      let userKeyWords = searchValue.replace(/-/g, "").toLowerCase();
      let newDocData = [];
      let newHosData = [];
      let searchResults = getSearchInfo(userKeyWords);
      newDocData = searchResults.newDocData;
      newHosData = searchResults.newHosData;
      sethospitalInfo(newHosData);
      setDocInfo(newDocData);
      sethospitalInfoCopy(newHosData);
      setDocInfoCopy(newDocData);
      setSearchingState("finished");
    }

    return function resetSearchStatus() {
      setSearchBegin(false);
    };
  };

  let getSearchInfo = (userKeyWords) => {
    let newDocData = [];
    let newHosData = [];
    if (searchType == "Specialty") {
      for (let specialty in database) {
        if (specialty.replace(/\s/g, "").toLowerCase() == userKeyWords) {
          for (let hospital in database[specialty].hospitals) {
            let hospitalInfo = database[specialty].hospitals[hospital];
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
      for (let specialty in database) {
        for (let hos in database[specialty].hospitals) {
          let potentialHos = database[specialty].hospitals[hos];
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
      for (let specialty in database) {
        for (let hos in database[specialty].hospitals) {
          let potentialHos = database[specialty].hospitals[hos];
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
      for (let specialty in database) {
        let conditionList = database[specialty].conditions;
        conditionList = conditionList.map((item) => {
          return item.toLowerCase().replace(/\s/g, "");
        });
        let conditionMatch = conditionList.includes(userKeyWords);
        if (conditionMatch) {
          for (let hos in database[specialty].hospitals) {
            let potentialHos = database[specialty].hospitals[hos];
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

  return (
    <div>
      <Navbar currentPage="results" {...props} />
      <SearchResults {...props} />
    </div>
  );
}
