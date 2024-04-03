const router = createRouter();

router.get('/thuc', defineEventHandler(e => {
    return 'test lego'
}))

router.post('/thuc', defineEventHandler(e => {
    return 'post lego'
}))

export default useBase('/api/lego', router.handler);