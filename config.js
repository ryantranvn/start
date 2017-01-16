// Check node_env, if not set default to development - or production
var env = (process.env.NODE_ENV || "development"); // production || development || maintaining
// var env = "development";

var config = {
    maintaining: {
        db: {
            port: "",
            host: "",
            name: "",
            user: "",
            pass: ""
        },
        env: {
            port: 3000,
            host: "localhost"
        }
    },
    development: {
        db: "mongodb://localhost:27017/base",
        env: {
            port: process.env.PORT || 3000,
            host: "localhost"
        }
    },
    production: {
        db: "",
        env: {
            port: 80,
            host: "localhost"
        }
    }
}

exports.getConfig = function getConfig() {
    return config[env] || config.development;
}
exports.getEnv = function getEnv()
{
    return env;
}
