'use strict';

app.constant('JS_REQUIRES', {
    scripts: {
        'DashService': "app/dash/service/DashService.js",
        'DashCtrl': "app/dash/ctrl/DashCtrl.js",
        'UserService': "app/user/service/UserService.js",
        'UserCtrl': "app/user/ctrl/UserCtrl.js"
    },
    ViewArgs: {
        DashArgs: ['DashCtrl', 'DashService'],
        UserArgs: ['UserCtrl', 'UserService']
    }
});
