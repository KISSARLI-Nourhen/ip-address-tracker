import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@generic/test/TestSetup.ts';
import {IpSearchForm} from "../IpSearchForm.tsx";
import {fireEvent} from "@testing-library/dom";

const setup = () => {
    const onMockSearch = vi.fn();
    const {user} = render(<IpSearchForm onSearch={onMockSearch}/>);
    return {user, onMockSearch};
}

describe('IpSearchForm', () => {
    it('should display an IP address input with placeholder', () => {
        setup();
        const input = screen.getByRole('textbox', {name: 'IP address or domain'});

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('placeholder', 'Search for any IP address or domain');
    });

    it('should allow the user to enter an IP address', async () => {
        const {user} = setup();
        const input = screen.getByRole('textbox', {name: 'IP address or domain'});

        await user.type(input, '8.8.8.8')

        expect(input).toHaveValue('8.8.8.8');
    });

    it('should display a search button', () => {
        setup();

        expect(screen.getByRole('button', {name: 'Search'})).toBeInTheDocument();
    });

    it('should submit the entered IP address when clicking Search', async () => {

        const {user, onMockSearch} = setup();
        const input = screen.getByRole('textbox', {name: 'IP address or domain'});

        await user.type(input, '8.8.8.8')
        await user.click(screen.getByRole('button', {name: 'Search'}));

        expect(onMockSearch).toHaveBeenCalledWith('8.8.8.8');
    });

    it('should submit the entered IP address when pressing Enter', async () => {
        const {user, onMockSearch} = setup();
        const input = screen.getByRole('textbox', {name: 'IP address or domain'});

        await user.type(input, '8.8.8.8{Enter}');
        expect(onMockSearch).toHaveBeenCalledWith('8.8.8.8');
    });

    it('should disable the search button when input is empty', () => {
        setup();
        const button = screen.getByRole('button', {name: 'Search'});

        expect(button).toBeDisabled();
    });

    it('should enable the search button when input is not empty', async () => {
        const {user} = setup();
        const input = screen.getByRole('textbox', {name: 'IP address or domain'});
        const button = screen.getByRole('button', {name: 'Search'});

        await user.type(input, '8.8.8.8');

        expect(button).toBeEnabled();
    });

    it('should not submit an empty IP address', async () => {
        const {user, onMockSearch} = setup();
        const input = screen.getByRole('textbox', {name: 'IP address or domain'});

        await user.type(input, '     ');
        await user.click(screen.getByRole('button', {name: 'Search'}));

        const form = input.closest('form');
        expect(form).not.toBeNull();

        fireEvent.submit(form!);

        expect(onMockSearch).not.toHaveBeenCalled();
    });
});