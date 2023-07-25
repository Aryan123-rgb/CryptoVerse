export const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b80ec82868msh600b6159ac58150p17fd4djsn6b6172bfaa59',
		'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
	}
};

export const fetchFromAPI = async (url,options) => {
    const response = await fetch(url, options);
    const data = response.json();
    return data;
};