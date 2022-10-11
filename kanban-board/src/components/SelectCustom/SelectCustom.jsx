import React from "react";
import Select from "react-select";
import styled from "styled-components";

const FormOptionLabel = styled.div`
  display: flex;
  & > img {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

const SelectCustom = ({ name, useIcon, list, selectValue, onChange }) => {
  return (
    <Select
      options={list}
      value={list.find((item) => item.value === selectValue) || list[0]}
      onChange={(item) => onChange({ target: { name: name, value: item.value } })}
      formatOptionLabel={(item) => {
        if (useIcon) {
          return (
            <FormOptionLabel>
              <img src={item.icon} alt={"icon" + item.value} />
              <span>{item.label}</span>
            </FormOptionLabel>
          );
        }
        return <span>{item.label}</span>;
      }}
    />
  );
};

export default SelectCustom;
