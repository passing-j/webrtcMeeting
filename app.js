var express = require('express'); //调用express框架
var app = express();
//调用包
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');

//声明自定义的文件变量
var routes = require('./routes/index');
var users = require('./routes/users');

//定义全局变量dbHandel和db，用来处理数据库
global.dbHandel = require('./database/dbHandel');
global.db = mongoose.connect("mongodb://localhost:27017/nodedb");

//设置cookie过期时间
app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}));
// 启动模板引擎
app.set('views', path.join(__dirname, 'views')); //设置模板目录
app.engine("html", require("ejs").__express); //用ejs引擎渲染模板
app.set('view engine', 'html'); //渲染html模板
app.use(logger('dev')); //express-generator生成的express项目默认使用morgan日志中间件
app.use(bodyParser.json()); //用来解析http请求体，解析json数据格式
app.use(bodyParser.urlencoded({ extended: true }));
//用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}，
//extended选项允许配置使用querystring(false)或qs(true)来解析数据
app.use(multer()); //用来上传文件
app.use(cookieParser()); //用来设置cookie
app.use(express.static(path.join(__dirname, 'public'))); //public提供静态文件服务
//错误反馈
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    var err = req.session.error;
    delete req.session.error;
    res.locals.message = "";
    if (err) {
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">' + err + '</div>';
    }
    next();
});
//为路径设置路由
app.use('/', routes);
app.use('/users', users);
app.use('/login', routes);
app.use('/register', routes);
app.use('/meetingroom', routes);
app.use("/logout", routes);
app.use("/home", routes);
app.use("/recording", routes);


// 捕获错误信息
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development 错误处理
// 打印状态信息
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 错误处理
// 实例没启动的情况下显示的信息
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
