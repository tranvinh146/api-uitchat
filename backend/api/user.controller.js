import MoviesDAO from '../dao/usersDAO.js';

export default class UsersController {
    static async apiGetUsers(req, res, next) {
        let filters = {};

        const { usersList, totalNumUsers } = await MoviesDAO.getUsers();
        let response = {
            users: usersList,
            total_results: totalNumUsers,
        };
        res.json(response);
    }
}