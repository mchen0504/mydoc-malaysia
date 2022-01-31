import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchResults from "../components/results/SearchResults";
import Navbar from "../components/Navbar";

import { getData } from "../redux/actions/dataActions";

function Results(props) {
  const location = useLocation();
  const locationParts = location.pathname.split("/");
  const searchType = locationParts[2];
  const searchValue = locationParts[3].replace(/-/g, "");
  const keyword = locationParts[3].replace(/-/g, " ");
  const reportMax = 50;

  const [searchState, setSearchState] = useState("in-progress");
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
    setSearchState("in-progress");
    props.getData();
  }, []);

  useEffect(() => {
    if (props.searchData) {
      let userKeyWords = searchValue.toLowerCase();
      console.log(props.searchData);
      let searchResults = getSearchInfo(userKeyWords, props.searchData);
      console.log(searchResults);
      sethospitalInfo(searchResults.newHosData);
      setDocInfo(searchResults.newDocData);
      // setSearchState("finished");
    }
  }, [location.key, props.searchData]);

  const getSearchInfo = (userKeyWords, data) => {
    let newDocData = [];
    let newHosData = [];
    if (searchType === "Specialty") {
      for (let specialty in data) {
        if (specialty.replace(/\s/g, "").toLowerCase() === userKeyWords) {
          for (let hospital in data[specialty].hospitals) {
            let hosp = data[specialty].hospitals[hospital];
            if (!hosp.report || hosp.report.reportCount < reportMax) {
              let docFound = 0;
              for (let doctor in hosp.doctors) {
                let doc = hosp.doctors[doctor];
                if (
                  !doc.deleted &&
                  doc.publish &&
                  (!doc.report || doc.report.reportCount < reportMax)
                ) {
                  doc.username = doctor;
                  newDocData.push(doc);
                  docFound++;
                }
              }
              if (docFound > 0) {
                newHosData.push(hosp);
              }
            }
          }
        }
      }
    } else if (searchType === "Doctor") {
      for (let specialty in data) {
        for (let hospital in data[specialty].hospitals) {
          let hosp = data[specialty].hospitals[hospital];
          if (!hosp.report || hosp.report.reportCount < reportMax) {
            let doctorsFound = 0;
            for (let doctor in hosp.doctors) {
              let doc = hosp.doctors[doctor];
              if (
                doc.name.replace(/\s/g, "").toLowerCase().includes(userKeyWords)
              ) {
                if (
                  !doc.deleted &&
                  (!doc.report || doc.report.reportCount < reportMax) &&
                  doc.publish
                ) {
                  doc.username = doctor;
                  newDocData.push(doc);
                  doctorsFound++;
                }
              }
            }
            if (doctorsFound > 0) {
              newHosData.push(hosp);
            }
          }
        }
      }
    } else if (searchType === "Hospital") {
      for (let specialty in data) {
        for (let hospital in data[specialty].hospitals) {
          let hosp = data[specialty].hospitals[hospital];
          let hosNameMatch = hosp.name
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(userKeyWords);
          if (hosNameMatch) {
            if (!hosp.report || hosp.report.reportCount < reportMax) {
              let doctorsFound = 0;
              for (let doctor in hosp.doctors) {
                let doc = hosp.doctors[doctor];
                if (
                  !doc.deleted &&
                  (!doc.report || doc.report.reportCount < reportMax) &&
                  doc.publish
                ) {
                  doc.username = doctor;
                  newDocData.push(doc);
                  doctorsFound++;
                }
              }
              if (doctorsFound > 0) {
                newHosData.push(hosp);
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
        console.log("found condition");
        if (conditionMatch) {
          for (let hospital in data[specialty].hospitals) {
            let hosp = data[specialty].hospitals[hospital];
            if (!hosp.report || hosp.report.reportCount < reportMax) {
              console.log(hosp.name);
              let doctorsFound = 0;
              for (let doctor in hosp.doctors) {
                let doc = hosp.doctors[doctor];
                let doctorCondition = doc.conditions;
                doctorCondition = doctorCondition.map((item) => {
                  return item.toLowerCase().replace(/\s/g, "");
                });
                console.log(doctorCondition);
                console.log(doc);
                if (
                  doctorCondition.includes(userKeyWords) &&
                  !doc.deleted &&
                  (!doc.report || doc.report.reportCount < reportMax) &&
                  doc.publish
                ) {
                  console.log(doctor);
                  doc.username = doctor;
                  newDocData.push(doc);
                  doctorsFound++;
                }
              }
              console.log(newDocData);
              if (doctorsFound > 0) {
                console.log(hosp);
                newHosData.push(hosp);
              }
              console.log(newHosData);
            }
          }
        }
      }
    }

    newHosData.forEach((hos) => {
      let conditionList = [];
      for (let doctor in hos.doctors) {
        let targetDoc = hos.doctors[doctor];
        targetDoc.conditions = targetDoc.conditions?.map((item) => {
          let newItem = item.toLowerCase();
          newItem = newItem.replace(newItem[0], newItem[0].toUpperCase());
          return newItem;
        });
        // targetDoc.conditions?.forEach((condition) => {
        // for (let condition in targetDoc.conditions) {
        for (let i = 0; i < targetDoc.conditions?.length; i++) {
          console.log(targetDoc.conditions[i]);
          console.log(conditionList.indexOf(targetDoc.conditions[i]));
          if (conditionList.indexOf(targetDoc.conditions[i]) === -1) {
            conditionList.push(targetDoc.conditions[i]);
          }
        }
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
    let newDocList = [];
    let newHospitalList = [];

    if (docInfo.length > 0 && hospitalInfo.length > 0) {
      docInfo.forEach((doctor) => {
        let validateType =
          doctor.type.toLowerCase() === filters.hosType.toLowerCase() ||
          filters.hosType.toLowerCase() === "both";
        let validateLanguage =
          filters.languageList.every(
            (element) => doctor.languages.indexOf(element) > -1
          ) || filters.languageList === [];
        let validateYear =
          (filters.yearOfPractice[0] <= doctor.yearsOfPractice &&
            filters.yearOfPractice[1] >= doctor.yearsOfPractice) ||
          filters.yearOfPractice[0] === 1000;

        if (validateType && validateLanguage && validateYear) {
          newDocList.push(doctor);
        }
      });

      hospitalInfo.forEach((hos) => {
        let validateType =
          hos.type.toLowerCase() === filters.hosType.toLowerCase() ||
          filters.hosType.toLowerCase() === "both";
        let validateLanguage =
          filters.languageList.every(
            (element) => hos.languages.indexOf(element) > -1
          ) || filters.languageList === [];

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

  return (
    <div key={location.key}>
      {console.log(searchState)}
      {console.log(docInfo)}
      <Navbar
        currentPage="results"
        {...props}
        database={props.database}
        conditionListForInput={props.conditionListForInput}
        specialtyListForInput={props.specialtyListForInput}
        searchType={props.searchType}
        setFilters={setFilters}
        setSearchType={props.setSearchType}
        searchValue={props.searchValue}
        setSearchValue={props.setSearchValue}
      />
      <SearchResults
        setSearchState={setSearchState}
        keyword={keyword}
        filtered={filtered}
        searchState={searchState}
        searchType={searchType}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

Results.propTypes = {
  getData: PropTypes.func.isRequired,
  searchData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  searchData: state.data.searchInfo,
});

const mapActionsToProps = {
  getData,
};

export default connect(mapStateToProps, mapActionsToProps)(Results);
