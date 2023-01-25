import React from "react";
import axios from "axios";
import { render } from "@testing-library/react";

import Application from "components/Application";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Application />);
  });
});