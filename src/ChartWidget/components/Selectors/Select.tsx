import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelect = (props : any) => {

    const customStyles = {
        control: (base: any, state: any) => ({
          ...base,
          background: "#222222",
          borderColor: state.isFocused ? "#333333" : "#222222",
          boxShadow: state.isFocused ? null : null,
          "&:hover": {
            borderColor: state.isFocused ? "#333333" : "#222222"
          }
        }),
        
        singleValue: (provided : any, state : any) => {
            return { ...provided, color:"#FFFFFF" };
        },

        option: (provided: any, state: any) => ({
            ...provided,
            color: state.isSelected ? '#FFFFFF' : '#F0F0F0',
            background: state.isSelected ? '#444444' : '#222222',
            "&:hover": {
                background: state.isFocused ? '#333333' : '#222222',
              }
          }),
      };
    
    return (
        <Select styles={customStyles} 
            options={props.options} 
            onChange={props.onChange} 
            value={props.value}> 
        </Select>

    )
}

export default CustomSelect;