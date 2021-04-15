import React from "react";
import { render } from "@testing-library/react";

import App from "../App";

describe("GIVEN initial state with empty books list", () => {
    let getByLabelText, getByText, container: any;
    beforeEach(() => {
        ({ getByLabelText, getByText, container } = render(<App />));
    });

    test("THEN there are no books in search list shown", () => {
        expect(container).toHaveTextContent(/Try searching for a topic/i);
    });

});
