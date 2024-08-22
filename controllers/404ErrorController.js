const getErrorStatus = (req, res) => {
    res.status(404).send('Page Not Found');
}

export { getErrorStatus };