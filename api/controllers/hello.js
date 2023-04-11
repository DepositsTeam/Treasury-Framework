
///This will return "hello" to verify that the app is running fine on your machine.
exports.hello = (req, res) => {
    res.status(200).json({
        message: 'hello'
    })
}