import {IpSearchForm} from "./components/ip-search-form/IpSearchForm.tsx";

export default function App() {

    const handleSearch = (ipAdress: string) => {
        console.log(ipAdress);
    };

    return (
        <main>
            <h1>IP Address Tracker</h1>
            <IpSearchForm onSearch={handleSearch}/>
        </main>
    );
}
