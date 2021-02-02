export class Client{
    id: number;
    name : String;
    username: String;
    phone: String;
    website: String;
    company: {
        bs: String;
        name: String;
        catchPhrase: String;
    }
    address:{
        city: String;
        street: String;
        suite: String;
        zipcode: String;
        geo: {
            lat: String;
            lng: String;
        }
    }

}