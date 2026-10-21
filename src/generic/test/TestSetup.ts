import type {ReactElement} from "react";
import {userEvent} from '@testing-library/user-event';
import {render} from "@testing-library/react";


const customRender = (ui: ReactElement) => ({
    user: userEvent.setup(),
    ...render(ui)
});

export * from '@testing-library/react';
export {customRender as render} ;