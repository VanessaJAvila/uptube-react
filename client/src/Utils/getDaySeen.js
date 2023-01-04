export default function getDaySeen(date) {
    const today = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(today - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        return "today";
    } else if (diffDays === 1) {
        return "yesterday";
    } else if (diffDays > 1 && diffDays <= 7) {
        return `Há ${diffDays} dias`;
    } else {
        return videoDate.toLocaleDateString();
    }
}