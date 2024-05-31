export const uploadImage = async (image) => {
    try {
        const formData = new FormData();
        formData.append("file", image);
        const res = await fetch(
            `${import.meta.env.VITE_IMAGE_SERVER_DOMAIN}/upload`,
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await res.json();
        return data.url;
    } catch (err) {
        return err;
    }
};
