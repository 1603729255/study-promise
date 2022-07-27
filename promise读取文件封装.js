const util=require('util')
const fs=require('fs')

let mineReadFile=util.promisify(fs.readFile)
// function mineReadFile(path){
//   return new Promise((resolve,reject)=>{
//     require('fs').readFile(path,(err,data)=>{
//       if(err) throw reject(err)
//       resolve(data)
//     })
//   })
// }
mineReadFile('./resource/test.txt').then(value=>{console.log(value.toString())})
// mineReadFile('./resource/test.txt').then(value=>{console.log(value.toString()),reason=>{console.log(reason)}})