/**
 * To execute use "node environment"
 * to define environment use "export NODE_ENV=development"
 * @type {string}
 */


//Connect the DB
const devURL = "DevURL";
const prodURL = "ProdURL";

function connect() {
    let url = "";
    if(process.env.NODE_ENV === 'development') {
        url = devURL
    } else if(process.env.NODE_ENV === 'production') {
        url = prodURL;
    }
    console.log(url);
}

connect();