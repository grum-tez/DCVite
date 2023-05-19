import { expect } from 'chai'

describe('Button Test', () => {
  it('should have a button with the text "Poke"', () => {
    // simulate loading the page
    // ...
    
    // find the button element
    const button = document.querySelector('button');
    
    // check if the button exists and has the text "Poke"
    expect(button).to.exist;
    if (button) {
    expect(button.textContent).to.equal('Poke');
    }
  });
});