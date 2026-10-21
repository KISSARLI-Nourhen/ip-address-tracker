import {type SubmitEvent, useState} from 'react';

type IpSearchFormProps = {
    onSearch: (ipAdress: string) => void;
}

export const IpSearchForm = ({onSearch}: IpSearchFormProps) => {

    const [ipAdresse, setIpAdresse] = useState<string>('');

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!ipAdresse.trim()) return;
        onSearch(ipAdresse)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={ipAdresse}
                onChange={(event) => setIpAdresse(event.target.value)}
                type="text"
                aria-label="IP address or domain"
                placeholder="Search for any IP address or domain"
            />
            <button type="submit" disabled={!ipAdresse.trim()}>Search</button>
        </form>
    );
}