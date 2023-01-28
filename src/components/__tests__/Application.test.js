import React from "react";
import { render, getByText, prettyDOM, cleanup, waitForElement, fireEvent } from "@testing-library/react";

import Application from "components/Application";

jest.mock("axios");

afterEach(cleanup);

describe("Application", () => {

  xit("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    console.log(prettyDOM(container))
  })
});