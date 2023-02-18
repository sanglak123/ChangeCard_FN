const axios = require("axios")

export const sendMail = async (name, email, subject, message) => {
    const data = JSON.stringify({
        "Messages": [{
            "From": { "Email": "<YOUR EMAIL>", "Name": "<YOUR NAME>" },
            "To": [{ "Email": email, "Name": name }],
            "Subject": subject,
            "TextPart": message
        }]
    });

    const config = {
        method: 'post',
        url: 'https://api.mailjet.com/v3.1/send',
        data: data,
        headers: { 'Content-Type': 'application/json' },
        auth: { username: '<API Key>', password: '<Secret Key>' },
    };
    return axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}