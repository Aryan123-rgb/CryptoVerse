export const newsoptions = {
	method: 'GET',
	headers: {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': 'f0021db587msh781fb1cbef39856p11c183jsn45521d5d1c85',
		'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
	}
};

export const fetchNewsApi = async (url,options) => {
    const response = await fetch(url, options);
    const data = response.json();
    return data;
};