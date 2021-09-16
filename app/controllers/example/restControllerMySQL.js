const Mysql = require("../../config/Mysql");
const DB = Mysql.users;
const Op = Mysql.Sequelize.Op;
const CryptoJS = require("crypto-js");

module.exports = class restContoller {
    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Find (All) Email
    static async multipurpose(request, response) {
        response.send("<i>xphrdite E-commerce restAPI</i>");
    }

    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Create User
    static async createUser(request, response) {
        const { email, password, photoURL } = request.body;
        const username = email.match(/^.+(?=@)/)[0].substring(0, 11);
        let securePassword = CryptoJS.AES.encrypt(
            password,
            "secretKey123"
        ).toString();
        photoURL ? photoURL : "/uploads/images/defaultAvatarcrop.png";

        const newUser = new DB({
            username: username,
            email,
            password: securePassword,
            photoURL: photoURL,
        });

        try {
            await newUser.save();
            DB.findAll({ where: { email: email } })
                .then((data) => {
                    data = JSON.stringify(data[0]);
                    let secureResponse = CryptoJS.AES.encrypt(
                        data,
                        "secretKey123"
                    ).toString();
                    response.status(200).json(secureResponse);
                })
                .catch((notFound) => {
                    response.status(404).json(notFound);
                });
        } catch (error) {
            response.status(401).json(error.name);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Find (All) Email, etc [Auth1]. //? by auth users
    static async fetchUserByEmail(request, response) {
        const userEmail = request.body.email;
        let condition = userEmail
            ? { email: { [Op.like]: `%${userEmail}%` } }
            : null;

        try {
            DB.findAll({ where: condition })
                .then((data) => {
                    data = JSON.stringify(data[0]);
                    let secureResponse = CryptoJS.AES.encrypt(
                        data,
                        "secretKey123"
                    ).toString();
                    response.status(200).json(secureResponse);
                })
                .catch((notFound) => {
                    response.status(404).json(notFound);
                });
        } catch (error) {
            response.status(401).json(error.message);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Find (All) Id, etc [Auth2]. //? by computed route
    static async fetchUserById(request, response) {
        const userId = request.body.id;
        let condition = userId ? { id: { [Op.like]: `%${userId}%` } } : null;

        try {
            DB.findAll({ where: condition })
                .then((data) => {
                    data = JSON.stringify(data[0]);
                    let secureResponse = CryptoJS.AES.encrypt(
                        data,
                        "secretKey123"
                    ).toString();
                    response.status(200).json(secureResponse);
                })
                .catch((notFound) => {
                    response.status(404).json(notFound);
                });
        } catch (error) {
            response.status(401).json(error.message);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Find (All) greedy
    static async greedy(request, response) {
        const userEmail = request.body.email;
        let condition = userEmail
            ? { email: { [Op.like]: `%${userEmail}%` } }
            : null;

        try {
            DB.findAll({ where: condition })
                .then((data) => {
                    data = JSON.stringify(data);
                    let secureResponse = CryptoJS.AES.encrypt(
                        data,
                        "secretKey123"
                    ).toString();
                    response.status(200).json(secureResponse);
                })
                .catch((notFound) => {
                    response.status(404).json(notFound);
                });
        } catch (error) {
            response.status(401).json(error.message);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Find (ONE) ID
    static async fetchUsersID(request, response) {
        try {
            const ID = request.params.id;
            DB.findByPk(ID)
                .then((data) => {
                    response.status(200).json(data);
                })
                .catch((notFound) => {
                    response.status(404).json(notFound);
                });
        } catch (error) {
            response.status(401).json(error.message);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return response exp
     */
    //! Find (ONE) and Update
    static async findOneAndUpdate(request, response) {
        try {
            const userEmail = request.params.email;
            const newUpdate = request.body;

            DB.update(newUpdate, {
                where: { email: userEmail },
            })
                .then((status) => {
                    if (status == 1) {
                        response.status(200).json({
                            exp: parseInt(request.body.exp),
                        });
                    }
                })
                .catch((fail) => {
                    console.log(fail);
                    response.status(401).json(fail);
                });
        } catch (error) {
            response.status(401).json(error.message);
        }
    }

    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Find (ONE) and Delete
    static async findOneAndDelete(request, response) {
        const userID = request.query.id;
        try {
            DB.destroy({
                where: { id: userID },
            })
                .then((status) => {
                    if (status == 1) {
                        response.status(200).json(true);
                    }
                })
                .catch((fail) => {
                    response.status(401).json(fail);
                });
        } catch (error) {
            response.status(401).json(error.message);
        }
    }
};
