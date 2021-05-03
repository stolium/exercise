import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import App from "../App";
import Response from "../sampleResponse.json";

const fetchMock = jest
    .spyOn(global, 'fetch')
    .mockImplementation((url, config) => new Promise(resolve => {
        resolve({
            json: async () => Promise.resolve(Response),
            ok: true
        })
    }))

afterAll(() => {
    global.fetch.mockClear();
});


describe("GIVEN initial state with empty books list", () => {
    let getByLabelText, getByText, container: any;
    beforeEach(() => {
        ({ getByLabelText, getByText, container } = render(<App />));
    });

    test("THEN there are no books in search list shown", () => {
        expect(container).toHaveTextContent(/Try searching for a topic/i);
    });

    test('THEN there are no books in favorites list', async () => {

        const items = await screen.queryAllByText(/\[-]/)
        expect(items).toHaveLength(0)
    });
});


describe('TYPE "javascript" in search input', ()=>{
    let getByLabelText, getByText, container: any;
    beforeEach(() => {
        ({ getByLabelText, getByText, container } = render(<App />));
        fireEvent.change(screen.getByPlaceholderText(/Search for books to add to your reading list and press Enter/i), { target: { value: 'javascript' } })
    });

    test('THEN look for javascript books in list and check API request params', async () => {
        const addButtons = await screen.findAllByText(/Add to favorites/i)

        expect(fetchMock).toHaveBeenCalledWith(
            'https://www.googleapis.com/books/v1/volumes?q=javascript', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            }
        )
        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(addButtons).toHaveLength(10)
    })

    test('THEN click on add button set correct state to favorites list', async () => {
        const addButtons = await screen.findAllByText(/Add to favorites/i)

        fireEvent.click(addButtons[0]);

        const removeButtons = await screen.queryAllByText(/\[-]/)
        expect(removeButtons).toHaveLength(1)
    })

    test('THEN double click on add button set correct state to favorites list', async () => {
        const addButtons = await screen.findAllByText(/Add to favorites/i)

        fireEvent.click(addButtons[0]);
        fireEvent.click(addButtons[0]);

        const removeButtons = await screen.queryAllByText(/\[-]/)
        expect(removeButtons).toHaveLength(1)
    })

    test('THEN click on different add buttons set correct state to favorites list', async () => {
        const addButtons = await screen.findAllByText(/Add to favorites/i)

        fireEvent.click(addButtons[0]);
        fireEvent.click(addButtons[1]);

        const removeButtons = await screen.queryAllByText(/\[-]/)
        expect(removeButtons).toHaveLength(2)
    })
})
