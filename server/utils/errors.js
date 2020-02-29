module.exports = {

    INCORRECT_REQUEST_PARAMETERS: {
        code: 1000,
        message :{
            tr: 'Lüften bütün zorunlu alanları doldurun',
            en: 'Please fill in all required fields'
        }
    },
    USER_ALREADY_EXISTS: {
        code: 1001,
        message :{
            tr: 'Bu isimle bir kullanıcı zaten var. Lütfen başka bir isim seçin',
            en: 'A user with this name already exists'
        }
    },
    USER_NOT_EXISTS: {
        code: 1002,
        message :{
            tr: 'Böyle bir kullanıcı bulunamadı',
            en: 'This user does not exist'
        }
    },
    BOOK_ALREADY_EXISTS: {
        code: 1001,
        message :{
            tr: 'Bu isimle bir kitap zaten var. Lütfen başka bir isim seçin',
            en: 'A book with this name already exists'
        }
    },
    UNKNOWN: {
        code: 4000,
        message: {
            tr: 'Bilinmeyen bir hata',
            en: 'Unknown error'
        }
    },
    INTERNAL_SERVER_ERROR: {
        code:54000,
        message: {
            tr: 'Sunucu hatası',
            en: 'Internal server error'
        }
    }

}