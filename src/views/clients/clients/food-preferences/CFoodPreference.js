import { CCol } from "@coreui/react-pro"
import React, { useState } from "react"
import { restApiGet, restApiPost, restApiPut } from "src/api_calls/rest";
import { mainUrl } from "src/components/Common";
// import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { ActionMeta, OnChangeValue } from 'react-select';
import { INITIAL_FOOD_OPTIONS } from "./initial_food_options"

var selected_food_options_csv = "";
var selected_food_options_export = [];

export const CFoodPreference = (props) => {

  const [food_options, setFoodOptions] = useState([]);
  const [selected_food_options, setSelectedFoodOptions] = useState(INITIAL_FOOD_OPTIONS);

  // Initialize Food Options
  React.useEffect(() => {

    Promise.resolve(
      restApiGet(mainUrl + '/food-options')
        .then(function (value) {
          if (value.length != 0) {
            setFoodOptions(value)
          }
        }));
  }, []);

  // Get Food Preferences
  if (props.client_id) {
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
  }

  function handleFoodChange(e, actionMeta) {
    if (actionMeta.action === 'create-option') { // Create New Food Option
      e.map(option => {
        if (option.__isNew__) {
          let new_food_object = {
            label: option.label,
            value: option.value,
            text: option.label
          };


          Promise.resolve(
            restApiPost(mainUrl + '/food-options/create', new_food_object, true)
              .then(function (value) {
                window.location.reload(false)
              }));
        }
      })
    }

    selected_food_options_export = (Array.isArray(e) ? e.map(x => x.value) : []);
    setSelectedFoodOptions(Array.isArray(e) ? e.map(x => x.value) : []);

    let selected_food_options_string = selected_food_options_export.toString();
    let food_object = { client_id: props.client_id, value: selected_food_options_string }

    Promise.resolve(
      restApiPut(mainUrl + '/clients/food-preferences/update/' + props.client_id, food_object, false)
        .then(function (value) {
        }));
  }

  return (
    <>
      <CCol md={12}>
        <CCol>
          <small>Type to create new food option</small>
        </CCol>
        <CCol md={12} style={{ padding: '10px 0 0' }}>
          <CreatableSelect
            value={food_options.filter(food => selected_food_options.includes(food.value))} // set selected values
            isMulti
            onChange={handleFoodChange}
            options={food_options}
            className="form-multi-select-selection-tags"
          />
        </CCol>
      </CCol>
    </>
  )
}