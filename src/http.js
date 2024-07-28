export async function sendOrder(order) {
    console.log(order);
    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        body: JSON.stringify({ order }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const resData = await response.json();

    if (!response.ok) {throw new Error(resData.message) }
    return resData.message;
}

export async function fetchMeals() {
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json();

    if(!response.ok) {throw Error('Failde to fetch meals.')};
    return resData;
}