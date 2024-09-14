import axios from "axios";

interface SearchLocationProps {
    cep: string;
}

const SearchLocation = async ({cep}: SearchLocationProps) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        return response.data;
    } catch (error) {
    }
}

export {SearchLocation}