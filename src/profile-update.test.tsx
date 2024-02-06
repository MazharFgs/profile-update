import React from "react"
import {screen, render} from "@testing-library/react"

import {ProfileUpdate} from "./profile-update";

describe("ProfileUpdate", () => {
    it("should render the component", () => {
        render(<ProfileUpdate contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
