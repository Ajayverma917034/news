import News from "../model/news.models.js";
import User from "../model/user.model.js";
import tryCatch from "../utils/asyncFunction.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getNews = tryCatch(async (req, res, next) => {
    let { page, limit, state, district, location, news_section_type, draft, createdAt, search } = req.body;
    const query = {}

    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (news_section_type && news_section_type.length) query.news_section_type = { $in: news_section_type };
    if (createdAt) {
        const start = new Date(createdAt);
        console.log(start)
        start.setHours(0, 0, 0, 0); // Start of the day
        const end = new Date(createdAt);
        end.setHours(23, 59, 59, 999); // End of the day
        query.createdAt = { $gte: start, $lt: end };
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },  // Case-insensitive search on title
            { location: { $regex: search, $options: 'i' } },  // Case-insensitive search on location
            { state: { $regex: search, $options: 'i' } },  // Case-insensitive search on state
            { district: { $regex: search, $options: 'i' } }  // Case-insensitive search on district
        ];
    }

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    News.find(query)
        .populate('author', 'username email -_id')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('news_id title draft banner createdAt activity -_id')
        .then((news) => {
            return res.status(200).json(news)
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
});
export const getAdminNewsCount = tryCatch(async (req, res, next) => {
    let { page, limit, state, district, location, news_section_type, draft, createdAt, search } = req.body;
    const query = {}

    if (state) query.state = state;
    if (district) query.district = district;
    if (location) query.location = location;
    if (news_section_type && news_section_type.length) query.news_section_type = { $in: news_section_type };
    if (createdAt) {
        const start = new Date(createdAt);
        console.log(start)
        start.setHours(0, 0, 0, 0); // Start of the day
        const end = new Date(createdAt);
        end.setHours(23, 59, 59, 999); // End of the day
        query.createdAt = { $gte: start, $lt: end };
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },  // Case-insensitive search on title
            { location: { $regex: search, $options: 'i' } },  // Case-insensitive search on location
            { state: { $regex: search, $options: 'i' } },  // Case-insensitive search on state
            { district: { $regex: search, $options: 'i' } }  // Case-insensitive search on district
        ];
    }

    // console.log(query)
    const count = await News.countDocuments(query).exec();
    return res.status(200).json({ totalDocs: count });
});

export const deleteNewsAdmin = tryCatch(async (req, res, next) => {
    const { id } = req.params;
    const news = await News.findOne({ news_id: id }).populate('author', 'username');
    if (!news) {
        return next(new ErrorHandler(404, 'News not found'))
    }

    // return res.status(200).json({ message: "News deleted successfully" })

    await News.deleteOne({ news_id: id })

    User.findOneAndUpdate({ username: news.author.username }, { $inc: { "account_info.total_news": -1 }, $pull: { "news": news._id } })
        .then(user => {
            return res.status(200).json({ message: "News deleted successfully" })
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))

        })
})


export const getUsers = tryCatch(async (req, res, next) => {
    let { page, limit } = req.body;
    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;

    User.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .select('username email fullName profile role account_info -_id')
        .then((users) => {
            return res.status(200).json(users)
        })
        .catch(err => {
            return next(new ErrorHandler(500, err.message))
        })
})

export const Createuser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const data = await User.findOne({ $or: [{ email }, { username }] });
        if (data) {
            return res.status(200).json({
                message: "User already exists with this email or username",
                success: false,
            });
        }
        await User.create({ username, email, password, role });
        return res
            .status(200)
            .json({ success: true, message: "User created successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const GetUser = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({
                message: "Email or username is required",
                success: false,
            });
        }

        const user = await UserModel.findOne({
            $or: [{ email: data }, { username: data }],
        }).select("username password email -_id").exec();
        if (user) {
            res.status(200).json({ success: true, user: user });
        } else {
            res.status(400).json({
                success: false,
                message: "not any user register at this email of username",
            });
        }
    } catch (err) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// it is a optional funtion like update the password with teh helpp of the emeial or udpdetae the pasword with the help of the username

export const Updateuser = async (req, res) => {
    try {
        const { password, data } = req.body;

        if (!data || !password) {
            return res.status(400).json({
                message: "email/username or password is required",
                success: false,
            });
        }

        const user = await UserModel.findOne({
            $or: [{ email: data }, { username: data }],
        }).select('+password');


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email or username",
            });
        }

        const isMatchpassword = await user.comparePassword(password);
        if (isMatchpassword) {
            return res.status(400).json({
                message: "the old password and new password are same",
                success: false,
            });
        }
        user.password = password;
        await user.save();
        return res.status(200).json({
            message: "User's password updated successfully",
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

//  it is a optional function like deleted by username or deleted by email

export const Deleteuser = async (req, res) => {
    try {
        const { data } = req.body;
        if (!data) {
            return res.status(400).json({
                message: "Email or username is required",
                success: false,
            });
        }
        await UserModel.findOneAndDelete({
            $or: [{ email: data }, { username: data }],
        });
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
};
