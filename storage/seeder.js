const MongoDriver = require('./mongoDriver.js');
const settings = require("../settings.js");
const mongoDriver = new MongoDriver(settings.mongo);
mongoDriver.onConnection().then(() => {
    init();
});
const hr = {
    "email": "Mariham@gmail.com",
    "gender": "female",
    "mobile": "01111111111",
    "name": "Mariham Melek",
    "title": "Employee",
    "job": "HR"
};

const users = [{
        "email": "karim@gmail.com",
        "firstname": "Samir",
        "lastname": "Hady",
        "password": "e10adc3949ba59abbe56e057f20f883e",
        "gender": "male",
        "dob": "1992-08-13",
        "mobile": "01111011111",
        "address": "3 st beirut",
        "title": "Manager",
        "job": "Manager HR"
    }, {
        "email": "mariham@gmail.com",
        "firstname": "Mariham",
        "lastname": "Melek",
        "password": "e10adc3949ba59abbe56e057f20f883e",
        "gender": "female",
        "dob": "1992-05-15",
        "mobile": "01111111111",
        "title": "Employee",
        "job": "HR"
    }, {
        "email": "karim@gmail.com",
        "firstname": "karim",
        "lastname": "hamdi",
        "password": "e10adc3949ba59abbe56e057f20f883e",
        "gender": "male",
        "dob": "1992-08-13",
        "mobile": "01111011111",
        "address": "3 st beirut",
        "title": "Employee",
        "job": "Developer"
    },
    {
        "email": "ahmed@gmail.com",
        "firstname": "ahmed",
        "lastname": "samir",
        "password": "e10adc3949ba59abbe56e057f20f883e",
        "gender": "male",
        "dob": "1990-10-15",
        "mobile": "01111011111",
        "address": "3 st mokhtar alGuindy",
        "title": "Employee",
        "job": "PR"
    }
];

const posts = [{
        title: 'New Employee on board',
        type: 'news',
        description: 'We are happy to greet a new employee in our modest company. Karim is our new employee, a hard worker. Welcome on board',
        hr: hr
    },
    {
        title: 'Medical insurance',
        type: 'benefit',
        description: 'We care about your health. We offer various package',
        hr: hr
    },
    {
        title: 'Gym membership',
        type: 'benefit',
        description: 'We care about your fitness and your body',
        hr: hr
    },
    {
        title: 'Course',
        type: 'benefit',
        description: 'We know the importance of continuous learning. We provide latest courses related to your field',
        hr: hr
    }
];

function init() {
    for (let i in posts) {
        mongoDriver.post.savePost(posts[i]).then(() => {});
    }

    for (let i in users) {
        mongoDriver.user.saveUser(users[i], hr).then(() => {
            if ((parseInt(i) + 1) === users.length) {
                console.log('mongo will disconnect');
                mongoDriver.disconnect();
            }
        });


    }

}