// const newobj = {
//     name: "john doe"
// }

// const property = {
//     path: "firstname"
// }

// const path = property.path
// console.log(path)
// newobj.path = 10
// console.log(newobj)

const ob = {
    name: "john",
    last: "lesly",

    fullname: function (){
        console.log(this)
    }
}

ob.fullname()