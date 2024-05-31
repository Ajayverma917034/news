
import httpClient from './httpClient'
export const handleRefreshToken = async () => {
    try {
        const response = await httpClient.get('refresh-token');
        // console.log(response.data);
        return response;
    } catch (error) {
        // console.error(error);
        throw error;
    }
}