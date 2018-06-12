var faker = require("faker");


//var randomName = faker.name.findName(); // Caitlyn Kerluke
//var randomEmail = faker.internet.email(); // Rusty@arne.info
//var randomCard = faker.helpers.createCard(); // random contact card containing many properties

for(var i = 0; i < 10; i ++) {
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}