export default function normalizePhoneNumber(phone) {
    // Удаляем всё, что не является цифрой
    return phone.replace(/\D/g, '');
}