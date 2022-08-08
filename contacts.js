const fs = require('fs');

const chalk = require('chalk')
const validator = require('validator')

//reade and create folder
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

const dataPath = './data/contact.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync('data/contact.json', 'utf8')
    const contacts = JSON.parse(file)
    return contacts;
}

const simpanContact = (nama, email, noHp) => {
    const contact = { nama, email, noHp }

    const contacts = loadContact()

    //cekduplikat
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if (duplikat) {
        console.log(chalk.red.bgRed.bold('Contact sudah terdaftar, gunakan nama lain'))
        return false;
    }

    if (email) {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold('Email tidak valid'))
            return false;
        }
    }
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(chalk.red.inverse.bold('Nomor Hp tidak valid'))
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
    console.log(contacts);
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data'));
}

const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.blue.inverse.bold('Data contact : '));
    contacts.forEach((contact, i) => {

        console.log(`${i + 1}. ${contact.nama} - ${contact.noHp}`)
    });
}



//menampilkan detail dari contact
const detailContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if (!contact) {
        console.log(chalk.red.inverse.bold(` ${nama} tidak ditemukan!!`))
        return false;
    }
    console.log(chalk.blue.inverse.bold(contact.nama));
    console.log(chalk.blue.inverse.bold(contact.noHp));
    if (contact.email) {

        console.log(chalk.blue.inverse.bold(contact.email));
    }


}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContact = contacts.filter((contact)=> contact.nama.toLowerCase() !== nama.toLowerCase())
    if (contacts.length === newContact.length) {
        console.log(chalk.red.inverse.bold(` ${nama} tidak ditemukan!!`))
        return false;
    }
    fs.writeFileSync('data/contact.json', JSON.stringify(newContact));
    console.log(contacts);
    console.log(chalk.green.inverse.bold(`data contact ${nama} berhasil dihapus!`));

}
module.exports = { simpanContact, listContact, detailContact, deleteContact }