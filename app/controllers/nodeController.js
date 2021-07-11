module.exports = class mevnContoller {
    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    static async index(request, response) {
        response.status = 200;
        response.render("index", { csrfToken: request.csrfToken() });
    }
};
