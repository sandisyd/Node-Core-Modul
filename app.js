//mengambil argumen dari cmd

const yargs = require('yargs')
const { simpanContact } = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email address',
            demanOption: true,
            type: 'string'
        },
        noHp: {
            describe: 'Nomor Handphone',
            demanOption: 'false',
            type: 'string'
        }
    },
    handler(argv) {
        simpanContact(argv.nama, argv.email, argv.noHp)
    }
})
yargs.parse()


