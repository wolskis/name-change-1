print('Start #################################################################');

db.createUser(
    {
        user: "admin",
        pwd: "password",
        roles:[
            {
                role: "readWrite",
                db:   "namechange"
            }
        ]
    }
);