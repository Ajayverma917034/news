
import { logOutUser } from '../common/session';
import httpClient from './httpClient'
export const loadUser = async () => {
    try {
        const response = await httpClient.get('me');
        // console.log(response.data);
        storeInSession(
            "user",
            JSON.stringify({
                //   accessToken: response.accessToken,
                //   refreshToken: response.refreshToken,
                user: response.userData,
            })
        );
        return response;
    } catch (error) {
        // console.error(error?.response?.data?.message);
    }
}

// export const logOut = async () => {
//     try {
//         logOutUser();
//         const response = await httpClient.get("log-out");
//     } catch (error) {
//         toast.error("Error logging out");
//     }
// }

export const logOut = async () => {
    try {
        await httpClient.get("log-out");
        logOutUser();
        setUserAuth({ user: null });
        toast.success("Logged out successfully");
    } catch (error) {
        toast.error("Error logging out");
    }
};
