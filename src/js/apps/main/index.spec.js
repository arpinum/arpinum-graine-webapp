import 'reflect-metadata';
import {AppComponent} from './index.js';
import {expect} from 'chai';

describe('Test', () => {
  it('works', () => {
    let component = new AppComponent();

    expect(component).to.be.defined;
  });
});
