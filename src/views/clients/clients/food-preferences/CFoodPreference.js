import { CCol } from "@coreui/react-pro"
import React, { useState } from "react"
import { restApiGet, restApiPut } from "src/api_calls/rest";
import { mainUrl } from "src/components/Common";
import Select from 'react-select'
import { INITIAL_FOOD_OPTIONS } from "./initial_food_options"

var selected_food_options_csv = "";
var selected_food_options_export = [];

export const CFoodPreference = (props) => {

  const [food_options, setFoodOptions] = useState(INITIAL_FOOD_OPTIONS);
  const [selected_food_options, setSelectedFoodOptions] = useState([]);

  // Get Food Preferences
  React.useEffect(() => {
    Promise.resolve(
      restApiGet(mainUrl + '/clients/food-preferences/' + props.client_id)
        .then(function (value) {
          if (value.length != 0) {
            selected_food_options_csv = (value[0].value);
            selected_food_options_export = (selected_food_options_csv.split(',')) // convert csv imported from db to array
            setSelectedFoodOptions(selected_food_options_csv.split(',')) // setter is required to handle render changes
          }
        }));
  }, []);

  function handleFoodChange(e) {
    selected_food_options_export = (Array.isArray(e) ? e.map(x => x.value) : []);
    setSelectedFoodOptions(Array.isArray(e) ? e.map(x => x.value) : []);

    let selected_food_options_string = selected_food_options_export.toString();
    let obj = { client_id: props.client_id, value: selected_food_options_string }

    Promise.resolve(
      restApiPut(mainUrl + '/clients/food-preferences/update/' + props.client_id, obj, true)
        .then(function (value) {
        }));
  }

  return (
    <>
      <CCol md={12}>
        <CCol md={12}>
          <Select
            value={(selected_food_options) ? food_options.filter(food => selected_food_options.includes(food.value)) : ""} // set selected values
            onChange={handleFoodChange}
            isMulti
            options={food_options}
            className="form-multi-select-selection-tags" />
        </CCol>
      </CCol>
    </>
  )
}