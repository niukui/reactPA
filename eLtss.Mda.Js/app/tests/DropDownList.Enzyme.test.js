import expect from 'expect'
import React from 'react';
import {mount, shallow} from 'enzyme';
import DropdownList from 'components/Common/DropdownList';
import sinon from 'sinon';

function setup (name, value, dataSource, saveRequired,lookupItem){

  const onSelect = (event) => {
    let changes = [];
  }

  return shallow(
  <DropdownList 
    readonly={false}
    id = {name}
    name = {name}
    value = {lookupItem}
    onChange = {onSelect}
    options = {dataSource}
    saveRequired = {false}/>);
}


//can only simulate change event of react-Select: https://github.com/airbnb/enzyme/issues/400
describe('DropDownComponenetTest', () => {
        let dataSource = [
        {text:"Person",value:"lookupitems/ispsignertypes/ed96a946-f109-406c-aa02-d528366f76af"},
        {text:"Substitute Decision Maker",value:"lookupitems/ispsignertypes/569f61b2-322d-470a-9012-4111fabda3b0"},
        {text:"SC/CM",value:"lookupitems/ispsignertypes/d1bf8017-cafe-454f-a730-f9d1271bfa36"},
        {text:"Provider",value:"lookupitems/ispsignertypes/26a8833d-4b25-454b-ad63-06f76f324c4d"},
        {text:"Family",value:"lookupitems/ispsignertypes/9b1af3ce-1b8d-4439-ad86-f481fff45b9e"},
        {text:"Friend",value:"lookupitems/ispsignertypes/349f359d-c577-48b5-b26c-cb34e57b6786"},
        {text:"Other",value:"lookupitems/ispsignertypes/a9c22f2a-cb8c-424d-8d2e-bf0c7508dbcf"}];

      let lookupItem = {Id: "lookupitems/ispsignertypes/26a8833d-4b25-454b-ad63-06f76f324c4d"};

    it('renders DropDown Component options', ()=>{
       //const onSelect = sinon.spy();   
       const wrapper = setup("testDropDown","testDropDown",dataSource, true, lookupItem);
       const optionWrapper = wrapper.find('option');
       expect(optionWrapper.length).toBe(8);
       
    });

    it("renders Dropdown component with inital value", ()=>{
        const wrapper = setup("testDropDown","testDropDown",dataSource, true, lookupItem);
        const selectWrapper = wrapper.find('option').parent();
       expect(selectWrapper.props().value).toBe(lookupItem.Id);
    });
})