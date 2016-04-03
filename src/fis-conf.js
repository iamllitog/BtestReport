/**
 * Created by litong on 16-1-7.
 */
fis.set('project.ignore',['components/**','fis-conf.js']);
fis.hook('commonjs',{});
fis.match('::package',{
    postpackager : fis.plugin('loader',{
        useInlineMap : true
    })
});

//------------------css打包------------------
fis.match('{externalM/bootstrap/css/bootstrap.css,internalM/bodyHeader/bodyHeader.scss,internalM/bodyFooter/bodyFooter.scss}',{
    packTo : '/pkg/pkg.css'
});
fis.match('/pkg/**.css',{
    release : '/static/$0',
    url : '/dist/static$0'
});
fis.media('publish').match('/pkg/**.css',{
    release : '/static/$0',
    url : '/dist/static$0',
    optimizer : fis.plugin('clean-css')
});

//------------------js打包------------------
// fis.match('externalM/{avalon/avalon.shim,boot/browser-polyfill,boot/external-helpers}.js',{
//     packTo : '/pkg/pkg.js'
// });
// fis.match('/pkg/**.js',{
//     release : '/static/$0',
//     url : '/dist/static$0'
// });
// fis.media('publish').match('/pkg/**.js',{
//     release : '/static/$0',
//     url : '/dist/static$0',
//     optimizer :fis.plugin('uglify-js',{
//         compress:{
//             drop_console : true
//         }
//     })
// });

//------------------内部css------------------
fis.match('internalM/**.scss',{
    release : '/static/$0',
    url : '/dist/static$0',
    rExt : '.css',
    useSprite: true,
    parser : fis.plugin('node-sass',{
        include_paths:[
            './components/compass'
        ]
    })
});
fis.media('publish').match('internalM/**.scss',{
    release : '/static/$0',
    url : '/dist/static$0',
    rExt : '.css',
    useSprite: true,
    parser : fis.plugin('node-sass',{
        include_paths:[
            './components/compass'
        ]
    }),
    optimizer : fis.plugin('clean-css'),
    useHash : true
});

//------------------html------------------
fis.match('views/**.html',{
    isHtmlLike : true
});

//------------------html内部引用------------------
fis.match('inlinePart/**',{
    release : false
});

//------------------图片------------------
fis.match('*.png',{
    release : '/static/$0',
    url : '/dist/static$0',
});
//------------------字体------------------
fis.match('*.{eot,svg,ttf,woff,woff2}',{
    release : '/static/$0',
    url : '/dist/static$0',
});

//------------------js内部引用------------------
fis.match('internalM/**.js',{
    release : '/static/$0',
    url : '/dist/static$0',
    parser: fis.plugin('babel-5.x',{
        stage : 3,
        externalHelpers : true
    }),
    lint : fis.plugin('jshint',{
        i18n : 'zh-CN',
        esnext : true,
        camelcase :false,			//驼峰法命名
        curly : false,				//大口号包裹
        eqeqeq : true,				//对于简单类型，使用===和!==，而不是==和!=
        newcap : true,				//对于首字母大写的函数（声明的类），强制使用new
        noarg : true,				//禁用arguments.caller和arguments.callee
        sub : false,				//对于属性使用aaa.bbb而不是aaa['bbb']
        undef : true,				//查找所有未定义变量
        boss : true,				//查找类似与if(a = 0)这样的代码
        devel : true,				//定义用于调试的全局变量： console ， alert
        browser : true,				//浏览器环境
        nonstandard:true,
        scripturl:true,				//允许JavaScript:void 0
        globals : {
            //全局变量忽略--amd
            "$" : false,
            "avalon" : false,
            "swal" : false,
            "Simditor" : false,
            "Buffer" : false,
            "require" : false
        }
    })
});
fis.media('publish').match('internalM/**.js',{
    release : '/static/$0',
    url : '/dist/static$0',
    parser: fis.plugin('babel-5.x',{
        stage : 3,
        externalHelpers : true
    }),
    lint : fis.plugin('jshint',{
        i18n : 'zh-CN',
        esnext : true,
        camelcase :false,			//驼峰法命名
        curly : false,				//大口号包裹
        eqeqeq : true,				//对于简单类型，使用===和!==，而不是==和!=
        newcap : true,				//对于首字母大写的函数（声明的类），强制使用new
        noarg : true,				//禁用arguments.caller和arguments.callee
        sub : false,				//对于属性使用aaa.bbb而不是aaa['bbb']
        undef : true,				//查找所有未定义变量
        boss : true,				//查找类似与if(a = 0)这样的代码
        devel : true,				//定义用于调试的全局变量： console ， alert
        browser : true,				//浏览器环境
        nonstandard:true,
        scripturl:true,				//允许JavaScript:void 0
        globals : {
            //全局变量忽略
            "$" : false,
            "avalon" : false,
            "swal" : false,
            "Simditor" : false,
            "Buffer" : false,
            "require" : false
        }
    }),
    optimizer : fis.plugin('uglify-js',{
        compress:{
            drop_console : true
        }
    })
});

//------------------js外部引用------------------
fis.match("externalM/**.js",{
    release : '/static/$0',
    url : '/dist/static$0'
});
fis.media('publish').match("externalM/**.js",{
    release : '/static/$0',
    url : '/dist/static$0',
    optimizer : fis.plugin('uglify-js',{
        compress:{
            drop_console : true
        }
    })
});

//------------------资源外部引用------------------
fis.match("{externalM/**,!externalM/**.js}",{
    release : '/static/$0',
    url : '/dist/static$0'
});
fis.match("{externalM/**.css,!externalM/**.js}",{
    release : '/static/$0',
    url : '/dist/static$0',
    optimizer : fis.plugin('clean-css')
});