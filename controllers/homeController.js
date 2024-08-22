const getHomePage = (req, res) => {
    res.status(200).send('Hello Home Page');
}

export { getHomePage };