function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
}

export const DB = { setData, getData }