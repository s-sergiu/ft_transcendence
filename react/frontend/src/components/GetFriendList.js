import { useState, useEffect } from 'react';

const URL = `${process.env.REACT_APP_HTTP_METHOD}://${process.env.REACT_APP_HOST_NAME}:${process.env.REACT_APP_DJANGO_PORT}`;

const GetFriendList = (body) => {
    const [friendList, setFriends] = useState([]);
    const csrf = document.cookie.match(/(^|;)\s*csrftoken\s*=([^;]+)/)?.[2];

    useEffect(() => {
        const fetchFriendList = async () => {
            try {
                const response = await fetch(URL + '/api/get-friendlist', {
                    mode: 'cors',
                    method: 'POST',
                    credentials: 'include',
                    body: JSON.stringify({ login: body }),
                    headers: {
                        "X-Csrftoken": csrf,
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                setFriends(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchFriendList();
    }, [body, csrf]);

    return { friendList };
};

export default GetFriendList;
