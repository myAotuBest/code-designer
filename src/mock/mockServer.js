const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('src/mock/db.json')
const middlewares = jsonServer.defaults()

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
}))
server.use(middlewares)
server.use(router)
router.render = (req, res) => {
    res.jsonp({
        error: 0,
        data: {
            list: res.locals.data,
            count: res.locals.data.length
        }
    })
}
server.listen(3000, () => {
    console.log('JSON Server is running')
})
