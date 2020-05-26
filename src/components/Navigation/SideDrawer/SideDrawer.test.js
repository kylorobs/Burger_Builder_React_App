import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideDrawer from './SideDrawer';
import Backdrop from '../../UI/Backdrop/Backdrop';


configure({adapter: new Adapter})

describe('<SideDrawer>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SideDrawer />);
    })


    it('should contain a prop named Open', () => {
        expect(wrapper.props().open);
    })

    it('should have have child <Backdrop>  prop show=false on first mount', () => {
        wrapper.setProps({open: false})
        expect(wrapper.find(Backdrop).props().show).toBe(false);
    })

    it('should have Open class when prop set to open', () => {
        wrapper.setProps({open: true})
        expect(wrapper.find('.SideDrawer').hasClass('Open')).toBeTruthy();
    })

    it('should NOT have Open class when prop set to open', () => {
        wrapper.setProps({open: false})
        expect(wrapper.find('.SideDrawer').hasClass('Open')).toBeFalsy();
    })

    it('should have Closed class when prop set to open', () => {
        wrapper.setProps({open: false})
        expect(wrapper.find('.SideDrawer').hasClass('Closed')).toBeTruthy();
    })
})

