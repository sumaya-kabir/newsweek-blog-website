const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = categories => {
    categories.forEach(category => {
        const categoryContainer = document.getElementById('category-container');
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
                <li onclick="loadNews('${category.category_id}')" class="mr-2">
                    <a href="#" class="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">${category.category_name}</a>
                </li>
        `;

        categoryContainer.appendChild(categoryDiv);
    })
}

const loadNews = async (category_id) => {
    const url = `
    https://openapi.programming-hero.com/api/news/category/${category_id}
    `;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}

const displayNews = newsAll => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newsAll.forEach(news => {
        const newsDiv = document.createElement('div');
    newsDiv.innerHTML = `
    
            <a href="#" class="flex flex-col justify-center items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${news.image_url
            }" alt="">
            <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${news.title}</h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${news.details.slice(0, 200)}...</p>
            </div>
            </a>

    `;
    newsContainer.appendChild(newsDiv);
    })
}

loadCategory();