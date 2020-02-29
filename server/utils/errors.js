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
    BOOK_NOT_EXISTS: {
        code: 1003,
        message :{
            tr: 'Böyle bir kitap bulunamadı',
            en: 'This book does not exist'
        }
    },
    BOOK_ALREADY_EXISTS: {
        code: 1004,
        message :{
            tr: 'Bu isimle bir kitap zaten var. Lütfen başka bir isim seçin',
            en: 'A book with this name already exists'
        }
    },
    BOOK_ALREADY_RENTED: {
        code: 1005,
        message :{
            tr: 'Bu kitabı zaten kiraladınız. Aynı kitabı bir daha kiralayamazsınız',
            en: 'This book has already been rented by you before. You cannot rent a book twice'
        }
    },
    BOOK_NOT_RENTED: {
        code: 1006,
        message :{
            tr: 'Bu kitap sizin tarafınızdan kiralanmamış',
            en: 'This book was not rented by you'
        }
    },
    INCORRECT_SCORE: {
        code: 1007,
        message :{
            tr: 'Skor 0 ile 10 arasında bir sayı olmalıdır',
            en: 'Score must be between 0 and 10'
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