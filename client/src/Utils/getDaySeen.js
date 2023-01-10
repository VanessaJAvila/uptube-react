export default function getDaySeen(date) {
    const today = new Date().getTime();
    const videoDate = new Date(date).getTime();
    const diffTime = Math.abs(today - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
        return "Hoje";
    } else if (diffDays === 1) {
        return "Ontem";
    } else if (diffDays > 1 && diffDays <= 7) {
        return `Há ${diffDays} dias`;
    } else {
        return new Date(date).toLocaleDateString();
    }
}