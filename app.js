//mengambil argumen dari cmd

const yargs = require('yargs')
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts')

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
}).demandCommand()


//menampilkan daftar semua nama kontak
yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & no Hp Contact',
    handler(){
        listContact()
    }
})

//menampilkan detail sebuah contact
yargs.command({
    command:'detail',
    describe: 'Menampilkan detail sebuah contact',
    builder:{
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string'
        },
    },
    handler(argv){
        detailContact(argv.nama)
    }
})


//menghapus sebuah contact

yargs.command({
    command:'delete',
    describe: 'Menghapus sebuah contact',
    builder:{
        nama: {
            describe: 'Nama Lengkap',
            demanOption: true,
            type: 'string'
        },
    },
    handler(argv){
        deleteContact(argv.nama)
    }
})
yargs.parse()


