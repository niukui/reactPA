import expect from 'expect'
import React from 'react';
import {mount, shallow} from 'enzyme';
import String from 'components/Common/Boolean';


function setup (input){
  const props = {
      value: input
  }

  return shallow(<String {...props}/>);
}

describe('Boolean Componenet via Enzyme', () => {
    it('renders componenet and span', ()=>{``
       const wrapper = setup();
       expect(wrapper.find('span').length).toBe(1);
    });

    it('span with true parameter', ()=>{
       const wrapper = setup(true);
       expect(wrapper.find('span').text()).toEqual('Yes');
    });

    it('span with false parameter', ()=>{
       const wrapper = setup(false);
       expect(wrapper.find('span').text()).toEqual('No');
    });
})


