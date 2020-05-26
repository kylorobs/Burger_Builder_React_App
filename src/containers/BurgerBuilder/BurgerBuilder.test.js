import { BurgerBuilder } from './BurgerBuilder';  //THIS STRIPS OUT CONNECTION TO REDUX
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow} from 'enzyme';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter});

describe('<BurgerBuilder>', () => {

    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder ON_INIT_INGREDIENTS={() => {}} />)
    })

    it('should rennder <BuildControls/> when receiving ingredients', () => {
        wrapper.setProps({ing: {salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
    

})