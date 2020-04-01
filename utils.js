console.log('utils.js');s

const name = 'Mike';
//module.exports= name //otherwise scope of name is only within this file

const add=function(a,b) {
    return a+b;
}

module.exports= add;