
const fs = require('fs');

// menuliskan string ke file (sync)
// try {
//     fs.writeFileSync('data/test.txt','Hello World');

// } catch (error) {
//     console.log(error);
// }

//menuliskan string ke file (async)
// fs.writeFile('data/test2.txt', 'Ini Async', (err)=>{
//     if(err)throw err;
//     console.log("File sudah tersimpan")
// });


//membaca isi file (sync)
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data)

//mebaca isi file (async)
// fs.readFile('data/test2.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

//Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukkan nama anda : ', (nama) => {
    rl.question('Masukkan umur anda : ', (umur) => {

       const contact = {
        nama,
        umur
       }
       const file = fs.readFileSync('data/contacts.json', 'utf8')
       const contacts = JSON.parse(file);
       contacts.push(contact);

       fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
       console.log(contacts);
       console.log('Terimakasih sudah memasukkan data');
        rl.close();
    });
});