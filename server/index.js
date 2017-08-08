const port = 3000;
const Koa = require('koa');
const Ctrl = require('koa-route');
const app = new Koa();
const FileManager = require('./module/file_manager.js');

app.use(async (ctx, next) => {
    try{
        await next();
    }catch(e){
        // console.log(ctx.req)
        console.log('-------------------------------------------------------------------')
        console.log(ctx.url);
        console.log('-------------------------------------------------------------------')
        console.log(e);
        ctx.throw(404);
        ctx.body = e.Error;
    }
})

app.use(Ctrl.get('/api/item_list', async (ctx) => {
    ctx.set('Cache-Control', 'no-cache');
    ctx.body = await FileManager.getItemList();
}))

app.listen(port, () => {
    console.log(`server has been started at http://127.0.0.1:${port}`)
});
