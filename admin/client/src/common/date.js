export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    // Get parts of the date
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12; // Convert to 12-hour format
    const minutesPadded = minutes.toString().padStart(2, '0'); // Add leading zero if needed

    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date string
    return `${hours12}:${minutesPadded} ${ampm}, ${month} ${day}, ${year}`;
}
