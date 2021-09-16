const Users = require("../../models/mongodb/users");
const Posts = require("../../models/mongodb/posts");
const fs = require("fs");

module.exports = class restContoller {
    /**
     * Display a listing of the resource.
     *
     * @return response
     */
    //! Multipurpose
    static async multipurpose(request, response) {
        response.redirect("/");
    }

    /**
     * Display all listing of the resource.
     *
     * @return response
     */
    //! Fetch all post
    static async fetchAllPost(request, response) {
        try {
            const post = await Posts.find();
            response.status(200).json(post);
        } catch (error) {
            response.status(404).json({ message: "Not Found" });
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return response
     */
    //! Fetch post by ID
    static async fetchPostByID(request, response) {
        const id = request.params.id;
        try {
            const post = await Posts.findById(id);
            response.status(200).json(post);
        } catch (error) {
            response.status(404).json({
                message: `Not found, ${error.message}`,
            });
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return response
     */
    //! Create post
    static async createPost(request, response) {
        const post = request.body;
        const imageName = request.file.filename;
        posts.image = imageName;

        try {
            await Posts.create(post);
            response.status(201).json({
                message: "Post created successfully",
                data: post,
            });
        } catch (error) {
            response.status(400).json({ message: error.message });
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return response
     */
    //! Update post
    static async updatePost(request, response) {
        const id = request.params.id;
        let new_image = "";
        if (request.file) {
            new_image = request.file.filename;
            const path = "public/uploads/post/" + request.body.old_image;
            try {
                fs.unlinkSync(path);
            } catch (error) {
                console.log(error.message);
            }
        } else {
            new_image = request.body.old_image;
        }
        const newPost = request.body;
        newPosts.image = new_image;

        try {
            await Posts.findByIdAndUpdate(id, newPost);
            response.status(200).json({ message: "Post update successfully" });
        } catch (error) {
            response.status(404).json({ message: error.message });
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return response
     */
    //! Delete post
    static async deletePost(request, response) {
        const id = request.params.id;
        try {
            const result = await Posts.findByIdAndDelete(id);
            if (result.image != "") {
                try {
                    fs.unlinkSync("public/uploads/post/" + result.image);
                } catch (error) {
                    console.log(error.message);
                }
            }
            response.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            response.status(404).json({ message: error.message });
        }
    }
};
