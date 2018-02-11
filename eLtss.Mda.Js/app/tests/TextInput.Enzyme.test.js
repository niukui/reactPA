import expect from 'expect'
import React from 'react';
import {mount, shallow} from 'enzyme';
import TextInput from 'components/Common/TextInput';


function setup(name, label, value, error, saveRequired, type, stackedInput){

   const onChange = (event) =>{
       let changes = [];      
   }
   return shallow(<TextInput
    name = {name}
    label = {label}
    onChange = {onChange}
    value = {value}
    error = {error}
    saveRequired = {saveRequired}
    type = {type}
    stackedInput = {stackedInput}
   />)
}

describe('TextInputComponentTest', ()=>{

    const wrapper = setup("testInput","unit test nput","Enzyme",null,true,null,false);
    
    it('renders save required lablel',()=>{
        const label = wrapper.find('label').first();
        expect(label.props().className).toBe('complete-required');

        const indicator = wrapper.find('RequiredIndicator');
        expect(indicator.length).toBe(1);
    });

    it('renders text input value with required class ', ()=>{

       const input = wrapper.find('input').first();
       expect(input.props().name).toBe('testInput');
       expect(input.props().value).toBe('Enzyme');
       expect(input.hasClass('required'));
    })
})