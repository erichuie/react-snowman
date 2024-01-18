import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";

const TEST_IMAGES = [img0, img1, img2];

it("renders without crashing", function(){
  render(<Snowman images={TEST_IMAGES} words={["cat"]} maxWrong={3} />)
});


it("matches snapshot", function (){
  const { container } = render(
    <Snowman images={TEST_IMAGES} words={["cat"]} maxWrong={3} />);

  expect(container).toMatchSnapshot();
});
//test to detect bug: after max guesses, display You Lose
//test that the image doesn't change after max gueeses
//test that after max guesses show correct word
//test that button area no longer shows
//snapshot test

it("displays 'You lose!' after max guesses and shows correct word", function(){
  const { container } = render(
    <Snowman images={TEST_IMAGES} words={["cat"]} maxWrong={3} />);

  const b = container.querySelector("#b");
  const o = container.querySelector("#o");
  const y = container.querySelector("#y");
  const z = container.querySelector("#z");


  //click on letter keys
  fireEvent.click(b);
  fireEvent.click(o);
  fireEvent.click(y);

  expect(container.querySelector(".Snowman-status")).toContainHTML("You lose!");
  expect(container).toContainHTML("cat");
  expect(container.querySelector("p button")).not.toBeInTheDocument();

  fireEvent.click(z);

  expect(container.querySelector("img[alt='4']")).not.toBeInTheDocument();
  expect(container.querySelector("img[alt='3']")).toBeInTheDocument();

});
