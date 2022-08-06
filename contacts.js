const fs = require('fs');

const chalk = require('chalk')
const validator = require('validator')

//reade and create folder
const dirPath = './data'
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

const dataPath = './data/contact.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}


const simpanContact = (nama,email,noHp)=>{
    const contact = {nama, email, noHp}
    const file = fs.readFileSync('data/contact.json', 'utf8')
    const contacts = JSON.parse(file);


    //cekduplikat
    const duplikat = contacts.find((contact)=>contact.nama === nama)
    if(duplikat){
        console.log(chalk.red.bgRed.bold('Contact sudah terdaftar, gunakan nama lain'))
        return false;
    }

    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid'))
            return false;
        }
    }
    if(!validator.isMobilePhone(noHp, 'id-ID')){
        console.log(chalk.red.inverse.bold('Nomor Hp tidak valid'))
        return false;
    }

    contacts.push(contact);

    fs.writeFileSync('data/contact.json', JSON.stringify(contacts));
    console.log(contacts);
    console.log(chalk.green.inverse.bold('Terimakasih sudah memasukkan data'));
}

module.exports = { simpanContact}