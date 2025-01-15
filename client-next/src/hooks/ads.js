import axios from "axios";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_DOMAIN
import { useMutation, useQuery } from "@tanstack/react-query";

const fetCustomeAds = async () => {
    const { data } = await axios.get('/get-advertisement');
    return data;
}

export const useCustomeAds = () => {
    return useQuery({
        queryKey: ['ads'],
        queryFn: fetCustomeAds,
        staleTime: 1000 * 60 * 2,
    })
}