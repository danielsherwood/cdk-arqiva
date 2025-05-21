exports.handler = async (event) => {
    let dynamic_string = 'dynamic string';
    let saved_string = `<h1>The saved string is a ${dynamic_string}</h1>`;
    return {
        statusCode: 200,
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ message: `${saved_string}` }),
    };
};